import { apiClient } from "./apiClient";
import {
  CreateProductRequest,
  LoginRequest,
  LoginResponse,
  PrinterApiResponse,
  ProductApiResponse,
  ProductsFilter,
  ProductResponse,
  UpdateProductRequest
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

export const createProduct = async (data: CreateProductRequest): Promise<ProductResponse> => {
  const response = await apiClient.post("/api/products/products/", data);
  return response.data;
};

export const getProduct = async (id: string): Promise<ProductResponse> => {
  const response = await apiClient.get(`/api/products/products/${id}/`);
  return response.data;
};

export const updateProduct = async (id: string, data: UpdateProductRequest) => {
  const response = await apiClient.patch(`/api/products/products/${id}/`, data);
  return response;
};

export const deleteProduct = async (id: string) => {
  await apiClient.delete(`/api/products/products/${id}/`);
};
