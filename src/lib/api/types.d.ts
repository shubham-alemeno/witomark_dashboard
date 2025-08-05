export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  user_data: {
    id: number;
    company_id: number | null;
    username: string;
    role: string;
    email: string;
  };
}

export interface Printer {
  id: number;
  printer_name: string;
  printer_code: string;
  grid_size: number;
  fingerprint_version: string;
  line_density: number;
  created_at: string;
  updated_at: string;
  company: number;
  pre_processing_preset: string | null;
  authentication_model: string | null;
}

export interface PrinterApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Printer[];
}

// Dashboard API Types
export interface MapStatsResponse {
  total_scans: number;
  authentic_scans: number;
  forged_scans: number;
  processing_scans: number;
  scans_with_location: number;
  success_rate: number;
  top_products: Array<{
    qr_fingerprint__product_name: string;
    count: number;
  }>;
}

export interface ScanResult {
  status: string;
  value: number;
  text: string;
}

export interface MapScanData {
  scan_id: string;
  product_name: string;
  scan_time: string;
  latitude: number;
  longitude: number;
  location: string;
  qr_serial_number: string;
  result: ScanResult;
  company_name: string;
}

export interface MapScansResponse {
  pagination: { total: number };
  data: MapScanData[];
  metadata: {
    total_count: number;
    filters_applied: {
      time_range: string;
      authentication_result: string | null;
      search: string | null;
      sort_by: string;
      status: string | null;
      version: string | null;
      has_location: string;
    };
  };
}

export interface Product {
  id: number;
  product_id: string;
  company_name: string;
  product_name: string;
  product_sku: string;
  status: string;
  qr_fingerprints_count: number;
  created_at: string; // ISO date string
}

export interface ProductApiResponse {
  total_count: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export interface ProductsFilter {
  status?: string;
  sort?: string;
  search?: string;
}

export interface CreateProductRequest {
  product_name: string;
}

export interface ProductResponse {
  id: number;
  company: number;
  company_name: string;
  company_code: string;
  product_id: string;
  product_name: string;
  product_image: string;
  product_image_preview: string;
  product_details: {
    origin: string;
    weight: string;
  };
  product_description: string;
  qr_fingerprints: Fingerprint[];
  product_sku: string;
  status: string;
  qr_fingerprints_count: number;
  total_scans: number;
  authentic_scans: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

export interface UpdateProductRequest {
  product_name?: string;
  product_description?: string;
  product_image?: File | null;
  status?: string;
}

export interface BulkQRCreateRequest {
  printer: number;
  count: number;
}

export interface QRFilters {
  search?: string;
  sort?: string;
  status?: string;
}

export interface Fingerprint {
  id: number;
  fingerprint_id: string;
  serial_number: number;
  company_name: string;
  product_name: string;
  printer_name: string;
  status: string;
  version: string;
  download_count: number;
  created_at: string;
}

export interface ListQRResponse {
  total_count: number;
  qr_generation_limit: number;
  current_count: number;
  next: string | null;
  previous: string | null;
  results: Fingerprint[];
}

export interface ProductDetails {
  origin: string;
}

export interface Product {
  id: number;
  company_name: string;
  product_name: string;
  product_sku: string;
  product_image: string;
  product_image_preview: string;
  product_details: ProductDetails;
  product_description: string;
  status: string;
  created_at: string;
}

export interface QRDetailsResponse {
  id: number;
  fingerprint_id: string;
  serial_number: number;
  company: number;
  company_name: string;
  printer: number;
  printer_name: string;
  product?: Product;
  fingerprint_seed: string;
  grid_size: number;
  line_density: number;
  version: string;
  fingerprint_url: string;
  status: string;
  pre_processing_preset: string | null;
  authentication_model: string | null;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface UpdateQRRequest {
  status?: string;
  product?: number;
}
