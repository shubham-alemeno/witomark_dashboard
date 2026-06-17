// ============================================================
// Auth
// ============================================================
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginUserData {
  id: number;
  company_id: string; // NOTE: backend sends the company *name* here, e.g. "Wildsoil Organics / DEMO COMPANY"
  username: string;
  role: string;
  email: string;
  company_logo: string | null;
}

export interface Subscription {
  subscription_plan: string;
  subscription_status: boolean;
  plan_expiry_date: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  user_data: LoginUserData;
  subscription: Subscription;
}

// ============================================================
// Profile (sidebar) — composed locally from the stored login response.
// ============================================================
export interface UserProfile {
  username: string;
  company_name: string;
  company_logo: string | null;
  plan: string;
}

// ============================================================
// Shared
// ============================================================
export interface Paginated<T> {
  count: number;
  page: number;
  page_size: number;
  total_pages: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
  // Products endpoint extras:
  total_count?: number;
  current_count?: number;
}

export interface DashboardFilters {
  duration?: string; // "7days" | "30days" | "90days" | "custom"
  startDate?: string; // yyyy-MM-dd
  endDate?: string; // yyyy-MM-dd
  search?: string;
  sort?: string; // "latest" | "oldest"
  result?: string; // "all" | "genuine" | "tampered"
  page?: number;
  page_size?: number;
}

export interface ListFilters {
  search?: string;
  sort?: string;
  status?: string;
  page?: number;
  page_size?: number;
}

// ============================================================
// Dashboard
// ============================================================
export interface DashboardStats {
  total_scans: number;
  genuine_scans: number;
  tampered_scans: number;
  duration: string;
}

export interface Scan {
  type: string; // "qr" | "dm"
  scan_id: string;
  product_name: string | null;
  result: string; // "genuine" | "tampered" | "blurred" | ...
  scan_time: string;
  location: string | null; // Google Maps URL, e.g. https://www.google.com/maps?q=18.6,77.8
}

// ============================================================
// My Witomarks
// ============================================================
export interface Witomark {
  type: string;
  fingerprint_id: string;
  linked_product: string | null;
  linked_product_id: number | null;
  linked_printer: string | null;
  linked_printer_code: string | null;
  status: string;
  download_count: number;
  created_at: string;
}

// ============================================================
// My Products
// ============================================================
export interface MyProduct {
  id: number;
  product_id: string;
  company_name: string;
  product_name: string;
  product_sku: string | null;
  images: string[];
  product_description: string;
  status: string;
  qr_fingerprints_count: number;
  created_at: string;
}

// ============================================================
// My Printers
// ============================================================
export interface MyPrinter {
  type: string;
  printer_id: string;
  printer_name: string;
  created_at: string;
}

export interface PrintersResponse {
  count: number;
  results: MyPrinter[];
}

// ============================================================
// Map view
// ============================================================
export interface ScanLocation {
  reference_id: string;
  latitude: number;
  longitude: number;
  maps_url: string;
  result: string;
  scanned_at: string;
}

export interface ScanLocationsResponse {
  count: number;
  results: ScanLocation[];
}
