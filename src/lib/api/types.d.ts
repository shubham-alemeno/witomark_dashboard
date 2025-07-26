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
