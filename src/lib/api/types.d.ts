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
