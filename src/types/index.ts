// Vehicle types
export interface BasicVehicleData {
  plate: string;
  brand: string;
  model: string;
  yearFab: number;
  yearModel: number;
  color: string;
  fuel: string;
  type: string;
  uf: string;
}

export interface FullVehicleData extends BasicVehicleData {
  owners: number;
  sinister: boolean;
  sinisterDetails?: SinisterDetail[];
  auction: boolean;
  auctionDetails?: AuctionDetail[];
  theft: boolean;
  theftDetails?: TheftDetail[];
  restrictions: Restriction[];
  liens: Lien[];
  debts: Debt[];
  recalls: Recall[];
  mileageHistory: MileageRecord[];
  fipePrice: number;
  fipeHistory: FipePriceRecord[];
}

export interface SinisterDetail {
  date: string;
  type: string;
  severity: string;
  description: string;
}

export interface AuctionDetail {
  date: string;
  auctioneer: string;
  condition: string;
}

export interface TheftDetail {
  date: string;
  policeStation: string;
  reportNumber: string;
  active: boolean;
}

export interface Restriction {
  type: string;
  description: string;
  date: string;
}

export interface Lien {
  institution: string;
  contract: string;
  startDate: string;
  status: string;
}

export interface Debt {
  type: string;
  description: string;
  value: number;
  dueDate: string;
}

export interface Recall {
  campaign: string;
  description: string;
  manufacturer: string;
  pending: boolean;
}

export interface MileageRecord {
  date: string;
  km: number;
  source: string;
}

export interface FipePriceRecord {
  month: string;
  price: number;
}

// Report types
export type ReportType = "basic" | "complete" | "premium";

export interface ReportData {
  vehicle: BasicVehicleData | FullVehicleData;
  score?: number;
  generatedAt: string;
  type: ReportType;
}

// Payment types
export type PaymentMethod = "pix" | "credit_card" | "debit_card" | "credits";

export interface PaymentRequest {
  plate: string;
  reportType: ReportType;
  method: PaymentMethod;
  installments?: number;
}

// User types
export type UserRole = "user" | "admin" | "partner";
