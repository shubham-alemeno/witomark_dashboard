import { apiClient } from "./apiClient";
import {
  DashboardFilters,
  DashboardStats,
  ListFilters,
  LoginRequest,
  LoginResponse,
  LoginUserData,
  MyPrinter,
  MyProduct,
  Paginated,
  PrintersResponse,
  Scan,
  ScanLocation,
  ScanLocationsResponse,
  Subscription,
  UserProfile,
  Witomark
} from "./types";

// ============================================================
// Auth
// ============================================================
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/api/auth/login/", data);
  return response.data;
};

// ============================================================
// Profile — composed from the login response cached in localStorage
// (login stores `user` and `subscription`). No network call.
// ============================================================
export const getProfile = async (): Promise<UserProfile> => {
  const user: LoginUserData | null = JSON.parse(localStorage.getItem("user") || "null");
  const subscription: Subscription | null = JSON.parse(localStorage.getItem("subscription") || "null");

  return {
    username: user?.username ?? "",
    company_name: user?.company_id ?? "",
    company_logo: user?.company_logo ?? null,
    plan: subscription?.subscription_plan ? `${subscription.subscription_plan} Plan` : ""
  };
};

// ============================================================
// Helpers
// ============================================================
const DURATION_MAP: Record<string, string> = {
  "7days": "7d",
  "30days": "30d",
  "90days": "90d",
  custom: "custom"
};

const buildDurationParams = (params: URLSearchParams, filters: DashboardFilters) => {
  const duration = DURATION_MAP[filters.duration || "30days"] || "30d";
  params.set("duration", duration);
  if (duration === "custom" && filters.startDate && filters.endDate) {
    params.set("date_from", filters.startDate);
    params.set("date_to", filters.endDate);
  }
};

// ============================================================
// Dashboard
// ============================================================
export const getDashboardStats = async (filters: DashboardFilters = {}): Promise<DashboardStats> => {
  const params = new URLSearchParams();
  buildDurationParams(params, filters);
  const response = await apiClient.get(`/api/company/dashboard/stats/?${params.toString()}`);
  return response.data;
};

export const getScans = async (filters: DashboardFilters = {}): Promise<Paginated<Scan>> => {
  const params = new URLSearchParams();
  buildDurationParams(params, filters);
  if (filters.search) params.set("search", filters.search);
  if (filters.sort === "oldest") params.set("sort", "oldest");
  if (filters.result && filters.result !== "all") params.set("result", filters.result);
  params.set("page", String(filters.page ?? 1));
  params.set("page_size", String(filters.page_size ?? 20));

  const response = await apiClient.get(`/api/company/dashboard/scan-data/?${params.toString()}`);
  return response.data;
};

// ============================================================
// Map view
// ============================================================
export const getScanLocations = async (filters: DashboardFilters = {}): Promise<ScanLocation[]> => {
  const params = new URLSearchParams();
  buildDurationParams(params, filters);
  if (filters.result && filters.result !== "all") params.set("result", filters.result);
  const response = await apiClient.get<ScanLocationsResponse>(
    `/api/company/qr-scan-locations/?${params.toString()}`
  );
  return response.data.results;
};

// ============================================================
// My Witomarks
// ============================================================
export const getWitomarks = async (filters: ListFilters = {}): Promise<Paginated<Witomark>> => {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.status && filters.status !== "All") params.set("status", filters.status);
  params.set("page", String(filters.page ?? 1));
  params.set("page_size", String(filters.page_size ?? 20));

  const response = await apiClient.get(`/api/fingerprints/witomarks/?${params.toString()}`);
  return response.data;
};

// ============================================================
// My Products
// ============================================================
const PRODUCT_SORT_MAP: Record<string, string> = {
  latest: "newest",
  oldest: "oldest",
  "name-asc": "a-z",
  "name-desc": "z-a"
};

export const getProducts = async (filters: ListFilters = {}): Promise<Paginated<MyProduct>> => {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.sort) params.set("sort", PRODUCT_SORT_MAP[filters.sort] || "newest");
  if (filters.status && filters.status !== "All") params.set("status", filters.status);
  params.set("page", String(filters.page ?? 1));
  params.set("page_size", String(filters.page_size ?? 20));

  const response = await apiClient.get(`/api/products/products/?${params.toString()}`);
  return response.data;
};

// ============================================================
// My Printers
// ============================================================
export const getPrinters = async (): Promise<MyPrinter[]> => {
  const response = await apiClient.get<PrintersResponse>("/api/company/my-printers/");
  return response.data.results;
};
