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

export interface Product {
  id: number;
  company_name: string;
  product_name: string;
  product_sku: string;
  status: string;
  qr_fingerprints_count: number;
  created_at: string; // ISO date string
}

export interface ProductApiResponse {
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
  product_name: string;
  product_image_url: string;
  product_image_preview: string;
  product_details: {
    origin: string;
    weight: string;
  };
  product_description: string;
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
