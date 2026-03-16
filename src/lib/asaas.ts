import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

interface AsaasConfig {
  apiKey: string;
  environment: "sandbox" | "production";
  webhookToken: string;
}

async function getAsaasConfig(): Promise<AsaasConfig> {
  const rows = await db
    .select({ key: siteSettings.key, value: siteSettings.value })
    .from(siteSettings)
    .where(eq(siteSettings.key, "asaas_api_key"))
    .limit(1);

  const envRows = await db
    .select({ key: siteSettings.key, value: siteSettings.value })
    .from(siteSettings)
    .where(eq(siteSettings.key, "asaas_environment"))
    .limit(1);

  const tokenRows = await db
    .select({ key: siteSettings.key, value: siteSettings.value })
    .from(siteSettings)
    .where(eq(siteSettings.key, "asaas_webhook_token"))
    .limit(1);

  return {
    apiKey: rows[0]?.value || "",
    environment: (envRows[0]?.value as "sandbox" | "production") || "sandbox",
    webhookToken: tokenRows[0]?.value || "",
  };
}

function getBaseUrl(environment: "sandbox" | "production"): string {
  return environment === "production"
    ? "https://api.asaas.com/v3"
    : "https://sandbox.asaas.com/api/v3";
}

async function asaasFetch(path: string, options: RequestInit = {}) {
  const config = await getAsaasConfig();
  if (!config.apiKey) {
    throw new Error("API Key do Asaas não configurada");
  }

  const baseUrl = getBaseUrl(config.environment);
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      access_token: config.apiKey,
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Asaas API error:", data);
    throw new Error(data.errors?.[0]?.description || "Erro na API do Asaas");
  }

  return data;
}

// Create or find customer
export async function findOrCreateCustomer(customer: {
  name: string;
  email: string;
  cpfCnpj: string;
  phone?: string;
}): Promise<string> {
  const cleanCpf = customer.cpfCnpj.replace(/\D/g, "");

  // Try to find existing customer by CPF
  try {
    const existing = await asaasFetch(`/customers?cpfCnpj=${cleanCpf}`);
    if (existing.data?.length > 0) {
      return existing.data[0].id;
    }
  } catch {
    // Not found, will create
  }

  // Create new customer
  const created = await asaasFetch("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: customer.name,
      email: customer.email,
      cpfCnpj: cleanCpf,
      phone: customer.phone?.replace(/\D/g, "") || undefined,
      notificationDisabled: false,
    }),
  });

  return created.id;
}

// Create PIX payment
export async function createPixPayment(params: {
  customerId: string;
  value: number;
  description: string;
  externalReference: string;
  dueDate?: string;
}): Promise<{
  paymentId: string;
  pixQrCodeUrl: string;
  pixCopyPaste: string;
  expirationDate: string;
}> {
  const dueDate =
    params.dueDate ||
    new Date(Date.now() + 30 * 60 * 1000).toISOString().split("T")[0]; // today

  const payment = await asaasFetch("/payments", {
    method: "POST",
    body: JSON.stringify({
      customer: params.customerId,
      billingType: "PIX",
      value: params.value,
      dueDate,
      description: params.description,
      externalReference: params.externalReference,
    }),
  });

  // Get PIX QR Code
  const pix = await asaasFetch(`/payments/${payment.id}/pixQrCode`);

  return {
    paymentId: payment.id,
    pixQrCodeUrl: pix.encodedImage, // base64 image
    pixCopyPaste: pix.payload,
    expirationDate: pix.expirationDate || dueDate,
  };
}

// Create credit card payment
export async function createCardPayment(params: {
  customerId: string;
  value: number;
  description: string;
  externalReference: string;
  installmentCount?: number;
  card: {
    holderName: string;
    number: string;
    expiryMonth: string;
    expiryYear: string;
    ccv: string;
  };
  cardHolderInfo: {
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
    postalCode?: string;
    addressNumber?: string;
  };
}): Promise<{
  paymentId: string;
  status: string;
}> {
  const payment = await asaasFetch("/payments", {
    method: "POST",
    body: JSON.stringify({
      customer: params.customerId,
      billingType: "CREDIT_CARD",
      value: params.value,
      dueDate: new Date().toISOString().split("T")[0],
      description: params.description,
      externalReference: params.externalReference,
      installmentCount: params.installmentCount || 1,
      installmentValue: params.installmentCount
        ? +(params.value / params.installmentCount).toFixed(2)
        : params.value,
      creditCard: {
        holderName: params.card.holderName,
        number: params.card.number.replace(/\s/g, ""),
        expiryMonth: params.card.expiryMonth,
        expiryYear: "20" + params.card.expiryYear,
        ccv: params.card.ccv,
      },
      creditCardHolderInfo: {
        name: params.cardHolderInfo.name,
        email: params.cardHolderInfo.email,
        cpfCnpj: params.cardHolderInfo.cpfCnpj.replace(/\D/g, ""),
        phone: params.cardHolderInfo.phone.replace(/\D/g, ""),
        postalCode: params.cardHolderInfo.postalCode?.replace(/\D/g, "") || "00000000",
        addressNumber: params.cardHolderInfo.addressNumber || "0",
      },
    }),
  });

  return {
    paymentId: payment.id,
    status: payment.status,
  };
}

// Get webhook token from DB
export async function getWebhookToken(): Promise<string> {
  const config = await getAsaasConfig();
  return config.webhookToken;
}
