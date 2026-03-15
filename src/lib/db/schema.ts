import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  decimal,
  uniqueIndex,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "editor"]);
export const reportTypeEnum = pgEnum("report_type", [
  "basic",
  "complete",
  "premium",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "pix",
  "credit_card",
  "debit_card",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "confirmed",
  "received",
  "overdue",
  "refunded",
  "chargeback",
  "cancelled",
]);
export const requestStatusEnum = pgEnum("request_status", [
  "pending_payment",
  "processing",
  "completed",
  "failed",
  "cancelled",
]);
export const postStatusEnum = pgEnum("post_status", [
  "draft",
  "published",
  "inactive",
]);

// Users
export const users = pgTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: text("password"),
    cpfCnpj: varchar("cpf_cnpj", { length: 18 }),
    role: userRoleEnum("role").default("user").notNull(),
    avatarUrl: text("avatar_url"),
    emailVerified: boolean("email_verified").default(false),
    asaasCustomerId: varchar("asaas_customer_id", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("users_email_idx").on(table.email),
    uniqueIndex("users_cpf_cnpj_idx").on(table.cpfCnpj),
  ]
);

// Vehicles
export const vehicles = pgTable(
  "vehicles",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    plate: varchar("plate", { length: 10 }).notNull(),
    brand: varchar("brand", { length: 100 }),
    model: varchar("model", { length: 200 }),
    yearFab: integer("year_fab"),
    yearModel: integer("year_model"),
    color: varchar("color", { length: 50 }),
    fuel: varchar("fuel", { length: 50 }),
    type: varchar("type", { length: 50 }),
    uf: varchar("uf", { length: 2 }),
    data: jsonb("data"),
    lastQueriedAt: timestamp("last_queried_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("vehicles_plate_idx").on(table.plate)]
);

// Payments
export const payments = pgTable(
  "payments",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    asaasId: varchar("asaas_id", { length: 100 }),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    method: paymentMethodEnum("method").notNull(),
    status: paymentStatusEnum("status").default("pending").notNull(),
    installments: integer("installments").default(1),
    externalRef: varchar("external_ref", { length: 100 }),
    couponId: text("coupon_id"),
    discountAmount: decimal("discount_amount", { precision: 10, scale: 2 }),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("payments_user_idx").on(table.userId),
    index("payments_asaas_idx").on(table.asaasId),
  ]
);

// Report Requests
export const reportRequests = pgTable("report_requests", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  plate: varchar("plate", { length: 10 }).notNull(),
  reportType: reportTypeEnum("report_type").notNull(),
  status: requestStatusEnum("status").default("pending_payment").notNull(),
  paymentId: text("payment_id").references(() => payments.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Reports
export const reports = pgTable(
  "reports",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    requestId: text("request_id")
      .references(() => reportRequests.id)
      .notNull(),
    plate: varchar("plate", { length: 10 }).notNull(),
    type: reportTypeEnum("type").notNull(),
    data: jsonb("data").notNull(),
    pdfUrl: text("pdf_url"),
    score: integer("score"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("reports_plate_idx").on(table.plate),
    index("reports_request_idx").on(table.requestId),
  ]
);

// Consulta Types (dynamic, managed via admin)
export const consultaTypes = pgTable("consulta_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  benefits: jsonb("benefits").$type<string[]>().default([]),
  popular: boolean("popular").default(false),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Pacotes (packages, managed via admin)
export const pacotes = pgTable("pacotes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  popular: boolean("popular").default(false),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Blog Categories
export const blogCategories = pgTable(
  "blog_categories",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("blog_categories_slug_idx").on(table.slug)]
);

// Blog Posts
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 300 }).notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    featuredImage: text("featured_image"),
    categoryId: text("category_id").references(() => blogCategories.id),
    tags: text("tags").array(),
    author: varchar("author", { length: 100 }),
    status: postStatusEnum("status").default("draft").notNull(),
    // SEO Tab
    seoTitle: varchar("seo_title", { length: 70 }),
    seoDescription: varchar("seo_description", { length: 160 }),
    seoCanonical: text("seo_canonical"),
    seoRobots: varchar("seo_robots", { length: 50 }).default("index, follow"),
    seoKeyword: varchar("seo_keyword", { length: 100 }),
    // Open Graph Tab
    ogTitle: varchar("og_title", { length: 100 }),
    ogDescription: varchar("og_description", { length: 200 }),
    ogImage: text("og_image"),
    ogUrl: text("og_url"),
    // Dates & Stats
    publishedAt: timestamp("published_at"),
    viewCount: integer("view_count").default(0),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("blog_posts_slug_idx").on(table.slug),
    index("blog_posts_category_idx").on(table.categoryId),
    index("blog_posts_status_idx").on(table.status),
  ]
);

// Blog Redirects
export const blogRedirects = pgTable(
  "blog_redirects",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    oldSlug: varchar("old_slug", { length: 300 }).notNull(),
    newSlug: varchar("new_slug", { length: 300 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("blog_redirects_old_slug_idx").on(table.oldSlug)]
);

// Noticias Automotivas
export const noticias = pgTable(
  "noticias",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    titulo: varchar("titulo", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 300 }).notNull(),
    resumo: text("resumo").notNull(),
    conteudo: text("conteudo").notNull(),
    categoria: varchar("categoria", { length: 50 }).notNull(),
    tags: text("tags").array(),
    status: postStatusEnum("status").default("draft").notNull(),
    publishedAt: timestamp("published_at"),
    viewCount: integer("view_count").default(0),
    // Origem (uso interno — filtro de duplicatas)
    origemUrlOriginal: text("origem_url_original"),
    geradoPorIA: boolean("gerado_por_ia").default(true),
    // SEO
    seoTitle: varchar("seo_title", { length: 70 }),
    seoDescription: varchar("seo_description", { length: 160 }),
    seoCanonical: text("seo_canonical"),
    // CTA
    ctaExibir: boolean("cta_exibir").default(true),
    ctaTexto: text("cta_texto").default(
      "Vai comprar um veículo? Consulte a placa antes!"
    ),
    ctaLink: text("cta_link").default("https://consultaplacabrasil.com/"),
    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("noticias_slug_idx").on(table.slug),
    index("noticias_categoria_idx").on(table.categoria),
    index("noticias_status_idx").on(table.status),
  ]
);

// Noticias Config
export const noticiasConfig = pgTable(
  "noticias_config",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    categoria: varchar("categoria", { length: 50 }).notNull(),
    categoriaLabel: varchar("categoria_label", { length: 100 }).notNull(),
    ativa: boolean("ativa").default(true),
    limiteDiario: integer("limite_diario").default(10),
    feedUrl: text("feed_url").notNull(),
    autoPublish: boolean("auto_publish").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("noticias_config_categoria_idx").on(table.categoria),
  ]
);

// FAQs (managed via admin)
export const faqs = pgTable("faqs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").default(0),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Pages (institutional pages, managed via admin)
export const pages = pgTable(
  "pages",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 300 }).notNull(),
    content: text("content").notNull(),
    // SEO
    seoTitle: varchar("seo_title", { length: 70 }),
    seoDescription: varchar("seo_description", { length: 160 }),
    seoCanonical: text("seo_canonical"),
    seoRobots: varchar("seo_robots", { length: 50 }).default("index, follow"),
    // Open Graph
    ogTitle: varchar("og_title", { length: 100 }),
    ogDescription: varchar("og_description", { length: 200 }),
    ogImage: text("og_image"),
    ogUrl: text("og_url"),
    // Status
    published: boolean("published").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("pages_slug_idx").on(table.slug)]
);

// Coupons
export const coupons = pgTable(
  "coupons",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length: 50 }).notNull(),
    discountPercent: integer("discount_percent").notNull(),
    active: boolean("active").default(true),
    usageCount: integer("usage_count").default(0),
    maxUsage: integer("max_usage"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("coupons_code_idx").on(table.code)]
);

// Site Settings (key-value store)
export const siteSettings = pgTable("site_settings", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  key: varchar("key", { length: 100 }).notNull(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// FAQ Page SEO (single row for FAQ page-level SEO)
export const faqPageSeo = pgTable("faq_page_seo", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  seoTitle: varchar("seo_title", { length: 70 }),
  seoDescription: varchar("seo_description", { length: 160 }),
  seoCanonical: text("seo_canonical"),
  seoRobots: varchar("seo_robots", { length: 50 }).default("index, follow"),
  ogTitle: varchar("og_title", { length: 100 }),
  ogDescription: varchar("og_description", { length: 200 }),
  ogImage: text("og_image"),
  ogUrl: text("og_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Admin Logs
export const adminLogs = pgTable(
  "admin_logs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    adminId: text("admin_id")
      .references(() => users.id)
      .notNull(),
    action: varchar("action", { length: 100 }).notNull(),
    entity: varchar("entity", { length: 50 }).notNull(),
    entityId: text("entity_id"),
    details: jsonb("details"),
    ipAddress: varchar("ip_address", { length: 45 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("admin_logs_admin_idx").on(table.adminId),
    index("admin_logs_entity_idx").on(table.entity),
  ]
);

// API Logs
export const apiLogs = pgTable(
  "api_logs",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    endpoint: varchar("endpoint", { length: 255 }).notNull(),
    method: varchar("method", { length: 10 }).notNull(),
    statusCode: integer("status_code"),
    responseTimeMs: integer("response_time_ms"),
    requestBody: jsonb("request_body"),
    error: text("error"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("api_logs_endpoint_idx").on(table.endpoint),
    index("api_logs_created_at_idx").on(table.createdAt),
  ]
);

// Tool Suggestions (user-submitted)
export const toolSuggestions = pgTable("tool_suggestions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  nome: varchar("nome", { length: 100 }),
  email: varchar("email", { length: 255 }),
  ferramentas: jsonb("ferramentas")
    .$type<{ nome: string; descricao: string }[]>()
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// LGPD Requests
export const lgpdRequests = pgTable("lgpd_requests", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 18 }).notNull(),
  requestType: varchar("request_type", { length: 50 }).notNull(),
  details: text("details"),
  status: varchar("status", { length: 20 }).default("pendente").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contact Messages
export const contactMessages = pgTable("contact_messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).default("novo").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Vehicle Alerts
export const vehicleAlerts = pgTable(
  "vehicle_alerts",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    plate: varchar("plate", { length: 10 }).notNull(),
    alertType: varchar("alert_type", { length: 50 }).notNull(),
    isActive: boolean("is_active").default(true),
    lastCheckedAt: timestamp("last_checked_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("vehicle_alerts_user_plate_idx").on(table.userId, table.plate),
  ]
);
