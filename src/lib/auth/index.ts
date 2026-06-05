import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import { users, apiLogs } from "@/lib/db/schema";
import { eq, and, gte, sql } from "drizzle-orm";
import { formatarNome } from "@/lib/utils/name-formatter";

const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutos

function getReqIp(request?: Request): string {
  try {
    const xff = request?.headers?.get("x-forwarded-for");
    return xff?.split(",")[0]?.trim() || request?.headers?.get("x-real-ip") || "desconhecido";
  } catch {
    return "desconhecido";
  }
}

async function countRecentFailures(ip: string): Promise<number> {
  try {
    const since = new Date(Date.now() - LOGIN_WINDOW_MS);
    const rows = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(apiLogs)
      .where(
        and(
          eq(apiLogs.endpoint, "login-failed"),
          gte(apiLogs.createdAt, since),
          sql`${apiLogs.requestBody}->>'ip' = ${ip}`
        )
      );
    return rows[0]?.count ?? 0;
  } catch {
    return 0; // se o banco falhar, não bloqueia
  }
}

async function logLoginFailure(ip: string, email: string): Promise<void> {
  try {
    await db.insert(apiLogs).values({
      endpoint: "login-failed",
      method: "POST",
      statusCode: 401,
      requestBody: { ip, email },
      responseTimeMs: 0,
    });
  } catch {
    /* silencioso */
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true, // necessário atrás de proxy reverso (Nginx/Cloudflare)
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;
        const ip = getReqIp(request as Request);

        // Rate limit: bloqueia após muitas tentativas falhas do mesmo IP
        const failures = await countRecentFailures(ip);
        if (failures >= MAX_LOGIN_ATTEMPTS) {
          throw new Error("Muitas tentativas de login. Aguarde 15 minutos e tente novamente.");
        }

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user || !user.password) {
          await logLoginFailure(ip, email);
          return null;
        }

        // Bloqueia login de usuários desativados
        if (user.active === false) {
          throw new Error("Conta desativada. Entre em contato com o suporte.");
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          await logLoginFailure(ip, email);
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.avatarUrl,
        };
      },
    }),
  ],
  callbacks: {
    // Ao logar com Google, cria o usuário no banco se ainda não existir
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const email = user.email.toLowerCase().trim();
        const [existing] = await db
          .select({ id: users.id })
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!existing) {
          await db.insert(users).values({
            name: formatarNome(user.name || email.split("@")[0]),
            email,
            role: "user",
            emailVerified: true,
            avatarUrl: user.image,
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // No primeiro login, busca id e role do banco (vale para Google e credentials)
      if (user?.email) {
        const [dbUser] = await db
          .select({ id: users.id, role: users.role })
          .from(users)
          .where(eq(users.email, user.email.toLowerCase().trim()))
          .limit(1);

        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/cadastro",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
});
