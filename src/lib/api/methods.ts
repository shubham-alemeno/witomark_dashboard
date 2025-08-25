import { apiClient } from "./apiClient";
import {
  LoginRequest,
  LoginResponse,
  MapStatsResponse,
  MapScansResponse,
  CreateProductRequest,
  ProductApiResponse,
  ProductResponse,
  UpdateProductRequest,
  BulkQRCreateRequest,
  ListQRResponse,
  QRDetailsResponse,
  UpdateQRRequest,
  BulkDownloadPayload,
  Printer
} from "./types";

// Dashboard API Methods
export const getMapStats = async (
  timeRange: string = "30d",
  companyId?: string,
  startDate?: string,
  endDate?: string
): Promise<MapStatsResponse> => {
  const params = new URLSearchParams();

  if (timeRange) {
    params.append("time_range", timeRange);
  }
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);
  if (companyId) {
    params.append("company_id", companyId);
  }

  const response = await apiClient.get(`/api/fingerprints/map/stats/?${params.toString()}`);
  return response.data;
};

export const getMapScans = async (
  timeRange: string = "30d",
  authenticationResult?: string,
  search?: string,
  sortBy: string = "latest",
  status?: string,
  version?: string,
  hasLocation: boolean = true,
  page: number = 1,
  pageSize: number = 100,
  companyId?: string,
  startDate?: string,
  endDate?: string
): Promise<MapScansResponse> => {
  const params = new URLSearchParams();

  if (timeRange) {
    params.append("time_range", timeRange);
  }
  if (startDate) params.append("start_date", startDate);
  if (endDate) params.append("end_date", endDate);
  if (authenticationResult) params.append("authentication_result", authenticationResult);
  if (search) params.append("search", search);
  params.append("sort_by", sortBy);
  if (status) params.append("status", status);
  if (version) params.append("version", version);
  params.append("has_location", hasLocation.toString());
  params.append("page", page.toString());
  params.append("page_size", pageSize.toString());
  if (companyId) params.append("company_id", companyId);

  const response = await apiClient.get(`/api/fingerprints/map/scans/?${params.toString()}`);
  console.log(response.data);
  return response.data;
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/api/auth/login/", data);
  return response.data;
};

export const getAllPrinters = async (page = 1, limit = 10): Promise<Printer[]> => {
  const response = await apiClient.get(`/api/printers/?all=true`);
  console.log(response);
  return response.data;
};

export const listProducts = async (
  {
    page,
    page_size,
    status,
    search,
    sort,
    all
  }: {
    page?: number;
    page_size?: number;
    status?: string;
    search?: string;
    sort?: string;
    all?: boolean;
  } = { status: "", search: "", sort: "" }
): Promise<ProductApiResponse> => {
  const response = await apiClient.get(
    `/api/products/products/?page_size=${page_size}&page=${page}&status=${status}&search=${search}&sort=${sort}&all=${all}`
  );
  return response.data;
};

export const createProduct = async (data: CreateProductRequest): Promise<ProductResponse> => {
  const response = await apiClient.post("/api/products/products/", data);
  return response.data;
};

export const getProduct = async (id: string): Promise<ProductResponse> => {
  const response = await apiClient.get(`/api/products/products/${id}/`);
  return response.data;
};

export const updateProduct = async (id: string, data: UpdateProductRequest) => {
  const formData = new FormData();

  if (data.product_name) formData.append("product_name", data.product_name);

  if (data.product_description) formData.append("product_description", data.product_description);

  if (data.status) formData.append("status", data.status);

  if (data.product_image) formData.append("product_image", data.product_image);

  const response = await apiClient.patch(`/api/products/products/${id}/`, formData, {
    headers: {
      // Let Axios/browser set the correct Content-Type with boundary
      "Content-Type": "multipart/form-data"
    }
  });

  return response;
};

export const deleteProduct = async (id: string) => {
  await apiClient.delete(`/api/products/products/${id}/`);
};

export const createQR = async (data: BulkQRCreateRequest) => {
  const response = await apiClient.post(`/api/fingerprints/qr_fingerprints/bulk_create/`, data);
  return response;
};

export const getQR = async (id: string): Promise<QRDetailsResponse> => {
  const response = await apiClient.get(`/api/fingerprints/qr_fingerprints/${id}/`);
  return response.data;
};

export const listQRs = async (
  {
    page,
    page_size,
    status,
    search,
    sort,
    all
  }: {
    page?: number;
    page_size?: number;
    status?: string;
    search?: string;
    sort?: string;
    all?: boolean;
  } = { status: "", search: "", sort: "" }
): Promise<ListQRResponse> => {
  const response = await apiClient.get(
    `/api/fingerprints/qr_fingerprints/?page_size=${page_size}&page=${page}&status=${status}&search=${search}&sort=${sort}&all=${all}`
  );
  return response.data;
};

export const updateQR = async (id: string, args?: UpdateQRRequest) => {
  const response = await apiClient.patch(`/api/fingerprints/qr_fingerprints/${id}/`, args);
  return response;
};

export const downloadQR = async (id: string, format: string) => {
  const response = await apiClient.get(
    `/api/fingerprints/download-fingerprint/?fingerprint_id=${id}&file_format=${format}`
  );
  return response.data;
};

export const bulkUpdate = async (data: Record<number, { product?: number; status?: string }>) => {
  const transformedArray = Object.entries(data).map(([idStr, value]) => {
    const id = Number(idStr);

    const transformed: { id: number; product?: number; status?: string } = { id };

    if ("product" in value) {
      transformed.product = value.product === -1 ? null : value.product;
    }

    if ("status" in value) {
      transformed.status = value.status;
    }

    return transformed;
  });
  // console.log(transformedArray);

  await apiClient.patch(`/api/fingerprints/qr_fingerprints/bulk_update/`, { updates: transformedArray });
};

export const bulkDownload = async (data: BulkDownloadPayload) => {
  const response = await apiClient.get(
    `/api/fingerprints/bulk-download/serial/?from_serial=${data.from}&to_serial=${data.to}&file_format=${data.file_format}`
  );
  console.log(response);
  return response.data;
};
