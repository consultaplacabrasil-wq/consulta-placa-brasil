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
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "partner"]);
export const reportTypeEnum = pgEnum("report_type", [
  "basic",
  "complete",
  "premium",
]);
export const paymentMethodEnum = pgEnum("payment_method", [
  "pix",
  "credit_card",
  "debit_card",
  "credits",
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
  "scheduled",
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

// Payments (declared before report_requests due to FK reference)
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
  creditsUsed: integer("credits_used").default(0),
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

// Transactions
export const transactions = pgTable("transactions", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  referenceId: text("reference_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Credits
export const credits = pgTable(
  "credits",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    balance: integer("balance").default(0).notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("credits_user_idx").on(table.userId)]
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
    seoTitle: varchar("seo_title", { length: 70 }),
    seoDescription: varchar("seo_description", { length: 160 }),
    seoKeyword: varchar("seo_keyword", { length: 100 }),
    publishedAt: timestamp("published_at"),
    viewCount: integer("view_count").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("blog_posts_slug_idx").on(table.slug),
    index("blog_posts_category_idx").on(table.categoryId),
    index("blog_posts_status_idx").on(table.status),
  ]
);

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
