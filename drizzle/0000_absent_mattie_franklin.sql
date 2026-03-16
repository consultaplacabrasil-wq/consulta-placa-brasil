CREATE TYPE "public"."payment_method" AS ENUM('pix', 'credit_card', 'debit_card');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'confirmed', 'received', 'overdue', 'refunded', 'chargeback', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('draft', 'published', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('basic', 'complete', 'premium');--> statement-breakpoint
CREATE TYPE "public"."request_status" AS ENUM('pending_payment', 'processing', 'completed', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin', 'editor');--> statement-breakpoint
CREATE TABLE "admin_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"admin_id" text NOT NULL,
	"action" varchar(100) NOT NULL,
	"entity" varchar(50) NOT NULL,
	"entity_id" text,
	"details" jsonb,
	"ip_address" varchar(45),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"endpoint" varchar(255) NOT NULL,
	"method" varchar(10) NOT NULL,
	"status_code" integer,
	"response_time_ms" integer,
	"request_body" jsonb,
	"error" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(300) NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"featured_image" text,
	"category_id" text,
	"tags" text[],
	"author" varchar(100),
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"seo_title" varchar(70),
	"seo_description" varchar(160),
	"seo_canonical" text,
	"seo_robots" varchar(50) DEFAULT 'index, follow',
	"seo_keyword" varchar(100),
	"og_title" varchar(100),
	"og_description" varchar(200),
	"og_image" text,
	"og_url" text,
	"published_at" timestamp,
	"view_count" integer DEFAULT 0,
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_redirects" (
	"id" text PRIMARY KEY NOT NULL,
	"old_slug" varchar(300) NOT NULL,
	"new_slug" varchar(300) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consulta_types" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"original_price" numeric(10, 2),
	"benefits" jsonb DEFAULT '[]'::jsonb,
	"popular" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"status" varchar(20) DEFAULT 'novo' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coupons" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(50) NOT NULL,
	"discount_percent" integer NOT NULL,
	"active" boolean DEFAULT true,
	"usage_count" integer DEFAULT 0,
	"max_usage" integer,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faq_page_seo" (
	"id" text PRIMARY KEY NOT NULL,
	"seo_title" varchar(70),
	"seo_description" varchar(160),
	"seo_canonical" text,
	"seo_robots" varchar(50) DEFAULT 'index, follow',
	"og_title" varchar(100),
	"og_description" varchar(200),
	"og_image" text,
	"og_url" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" text PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"sort_order" integer DEFAULT 0,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lgpd_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"cpf" varchar(18) NOT NULL,
	"request_type" varchar(50) NOT NULL,
	"details" text,
	"status" varchar(20) DEFAULT 'pendente' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "links_internos" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"anchors" text[] NOT NULL,
	"ativo" boolean DEFAULT true,
	"peso" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" text PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'pendente' NOT NULL,
	"confirm_token" text,
	"confirmed_at" timestamp,
	"unsubscribed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "noticias" (
	"id" text PRIMARY KEY NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"slug" varchar(300) NOT NULL,
	"resumo" text NOT NULL,
	"conteudo" text NOT NULL,
	"categoria" varchar(50) NOT NULL,
	"tags" text[],
	"status" "post_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"view_count" integer DEFAULT 0,
	"origem_url_original" text,
	"gerado_por_ia" boolean DEFAULT true,
	"seo_title" varchar(70),
	"seo_description" varchar(160),
	"seo_canonical" text,
	"imagem_url" text,
	"imagem_alt" varchar(255),
	"cta_exibir" boolean DEFAULT true,
	"cta_texto" text DEFAULT 'Vai comprar um veículo? Consulte a placa antes!',
	"cta_link" text DEFAULT 'https://consultaplacabrasil.com/',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "noticias_config" (
	"id" text PRIMARY KEY NOT NULL,
	"categoria" varchar(50) NOT NULL,
	"categoria_label" varchar(100) NOT NULL,
	"ativa" boolean DEFAULT true,
	"limite_diario" integer DEFAULT 10,
	"feed_url" text NOT NULL,
	"feed_urls" text[],
	"auto_publish" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pacotes" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"original_price" numeric(10, 2),
	"popular" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"sort_order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pages" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(300) NOT NULL,
	"content" text NOT NULL,
	"seo_title" varchar(70),
	"seo_description" varchar(160),
	"seo_canonical" text,
	"seo_robots" varchar(50) DEFAULT 'index, follow',
	"og_title" varchar(100),
	"og_description" varchar(200),
	"og_image" text,
	"og_url" text,
	"published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"asaas_id" varchar(100),
	"amount" numeric(10, 2) NOT NULL,
	"method" "payment_method" NOT NULL,
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"installments" integer DEFAULT 1,
	"external_ref" varchar(100),
	"coupon_id" text,
	"discount_amount" numeric(10, 2),
	"paid_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "report_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plate" varchar(10) NOT NULL,
	"report_type" "report_type" NOT NULL,
	"status" "request_status" DEFAULT 'pending_payment' NOT NULL,
	"payment_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" text PRIMARY KEY NOT NULL,
	"request_id" text NOT NULL,
	"plate" varchar(10) NOT NULL,
	"type" "report_type" NOT NULL,
	"data" jsonb NOT NULL,
	"pdf_url" text,
	"score" integer,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"key" varchar(100) NOT NULL,
	"value" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tool_suggestions" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" varchar(100),
	"email" varchar(255),
	"ferramentas" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text,
	"cpf_cnpj" varchar(18),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"avatar_url" text,
	"email_verified" boolean DEFAULT false,
	"asaas_customer_id" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicle_alerts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plate" varchar(10) NOT NULL,
	"alert_type" varchar(50) NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_checked_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "vehicles" (
	"id" text PRIMARY KEY NOT NULL,
	"plate" varchar(10) NOT NULL,
	"brand" varchar(100),
	"model" varchar(200),
	"year_fab" integer,
	"year_model" integer,
	"color" varchar(50),
	"fuel" varchar(50),
	"type" varchar(50),
	"uf" varchar(2),
	"data" jsonb,
	"last_queried_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "admin_logs" ADD CONSTRAINT "admin_logs_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_requests" ADD CONSTRAINT "report_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report_requests" ADD CONSTRAINT "report_requests_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_request_id_report_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."report_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicle_alerts" ADD CONSTRAINT "vehicle_alerts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "admin_logs_admin_idx" ON "admin_logs" USING btree ("admin_id");--> statement-breakpoint
CREATE INDEX "admin_logs_entity_idx" ON "admin_logs" USING btree ("entity");--> statement-breakpoint
CREATE INDEX "api_logs_endpoint_idx" ON "api_logs" USING btree ("endpoint");--> statement-breakpoint
CREATE INDEX "api_logs_created_at_idx" ON "api_logs" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_categories_slug_idx" ON "blog_categories" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_posts_category_idx" ON "blog_posts" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "blog_posts_status_idx" ON "blog_posts" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "blog_redirects_old_slug_idx" ON "blog_redirects" USING btree ("old_slug");--> statement-breakpoint
CREATE UNIQUE INDEX "coupons_code_idx" ON "coupons" USING btree ("code");--> statement-breakpoint
CREATE INDEX "links_internos_ativo_idx" ON "links_internos" USING btree ("ativo");--> statement-breakpoint
CREATE UNIQUE INDEX "newsletter_email_idx" ON "newsletter_subscribers" USING btree ("email");--> statement-breakpoint
CREATE INDEX "newsletter_status_idx" ON "newsletter_subscribers" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "noticias_slug_idx" ON "noticias" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "noticias_categoria_idx" ON "noticias" USING btree ("categoria");--> statement-breakpoint
CREATE INDEX "noticias_status_idx" ON "noticias" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "noticias_config_categoria_idx" ON "noticias_config" USING btree ("categoria");--> statement-breakpoint
CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "payments_user_idx" ON "payments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "payments_asaas_idx" ON "payments" USING btree ("asaas_id");--> statement-breakpoint
CREATE INDEX "reports_plate_idx" ON "reports" USING btree ("plate");--> statement-breakpoint
CREATE INDEX "reports_request_idx" ON "reports" USING btree ("request_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_cpf_cnpj_idx" ON "users" USING btree ("cpf_cnpj");--> statement-breakpoint
CREATE INDEX "vehicle_alerts_user_plate_idx" ON "vehicle_alerts" USING btree ("user_id","plate");--> statement-breakpoint
CREATE UNIQUE INDEX "vehicles_plate_idx" ON "vehicles" USING btree ("plate");