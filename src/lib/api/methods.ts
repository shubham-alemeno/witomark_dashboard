import { apiClient } from "./apiClient";
import { LoginRequest, LoginResponse, PrinterApiResponse } from "./types";

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    console.log("Hello");
    const response = await apiClient.post("/api/auth/login/", data);
    console.log("SignIn:", response);
    return response.data;
};

export const getAllPrinters = async (page = 1, limit = 10): Promise<PrinterApiResponse> => {
    const response = await apiClient.get(`/api/printers/?page=${page}&limit=${limit}`);
    return response.data;
};
