import { apiClient } from "./apiClient";
import {
  CreateProductRequest,
  LoginRequest,
  LoginResponse,
  PrinterApiResponse,
  ProductApiResponse,
  ProductsFilter,
  CreateProductResponse
} from "./types";

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post("/api/auth/login/", data);
  return response.data;
};

export const getAllPrinters = async (page = 1, limit = 10): Promise<PrinterApiResponse> => {
  const response = await apiClient.get(`/api/printers/?page=${page}&limit=${limit}`);
  return response.data;
};

export const getAllProducts = async (page = 1, limit = 10): Promise<ProductApiResponse> => {
  const response = await apiClient.get(`/api/products/products/?page=${page}`);
  return response.data;
};

export const getAllProductsQuery = async (args?: ProductsFilter, page = 1, limit = 10): Promise<ProductApiResponse> => {
  const response = await apiClient.get(`/api/products/products/?status=${args.status}&search=${args.search}`);
  return response.data;
};

export const createProduct = async (data: CreateProductRequest): Promise<CreateProductResponse> => {
  const response = await apiClient.post("/api/products/products/", data);
  return response.data;
};
