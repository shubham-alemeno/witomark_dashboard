import { apiClient } from './apiClient';
import {
  LoginRequest,
  LoginResponse,
  PrinterApiResponse,
  MapStatsResponse,
  MapScansResponse,
} from './types';

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  console.log('Hello');
  const response = await apiClient.post('/api/auth/login/', data);
  console.log('SignIn:', response);
  return response.data;
};

export const getAllPrinters = async (
  page = 1,
  limit = 10
): Promise<PrinterApiResponse> => {
  const response = await apiClient.get(
    `/api/printers/?page=${page}&limit=${limit}`
  );
  return response.data;
};

// Dashboard API Methods
export const getMapStats = async (
  timeRange: string = '30d',
  companyId?: string
): Promise<MapStatsResponse> => {
  const params = new URLSearchParams();
  params.append('time_range', timeRange);
  if (companyId) {
    params.append('company_id', companyId);
  }

  const response = await apiClient.get(
    `/api/fingerprints/map/stats/?${params.toString()}`
  );
  return response.data;
};

export const getMapScans = async (
  timeRange: string = '30d',
  authenticationResult?: string,
  search?: string,
  sortBy: string = 'latest',
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

  if (timeRange !== 'custom') {
    params.append('time_range', timeRange);
  }
  if (startDate) params.append('start_date', startDate);
  if (endDate) params.append('end_date', endDate);
  if (authenticationResult)
    params.append('authentication_result', authenticationResult);
  if (search) params.append('search', search);
  params.append('sort_by', sortBy);
  if (status) params.append('status', status);
  if (version) params.append('version', version);
  params.append('has_location', hasLocation.toString());
  params.append('page', page.toString());
  params.append('page_size', pageSize.toString());
  if (companyId) params.append('company_id', companyId);

  const response = await apiClient.get(
    `/api/fingerprints/map/scans/?${params.toString()}`
  );
  return response.data;
};
