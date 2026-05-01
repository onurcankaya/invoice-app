import type {
  Invoice,
  CreateInvoiceDTO,
  UpdateInvoiceDTO,
} from '@shared/types/invoice';
import { apiClient, ApiError } from './client';
import type { AxiosError } from 'axios';

export const invoicesApi = {
  /** Get all invoices */
  async getAll(): Promise<Invoice[]> {
    try {
      const response = await apiClient.get<Invoice[]>('/api/invoices');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new ApiError(
        'Failed to fetch invoices',
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /** Get single invoice by ID */
  async getById(id: Invoice['id']): Promise<Invoice> {
    try {
      const response = await apiClient.get<Invoice>(`/api/invoices/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new ApiError(
        `Failed to fetch invoice ${id}`,
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /** Create new invoice */
  async create(data: CreateInvoiceDTO): Promise<Invoice> {
    try {
      const response = await apiClient.post<Invoice>('/api/invoices/', data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new ApiError(
        'Failed to create invoice',
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /** Update existing invoice */
  async update(id: Invoice['id'], data: UpdateInvoiceDTO): Promise<Invoice> {
    try {
      const response = await apiClient.patch<Invoice>(
        `/api/invoices/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new ApiError(
        `Failed to update invoice ${id}`,
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /** Mark invoice as paid */
  async markPaid(id: Invoice['id']): Promise<Invoice> {
    try {
      const response = await apiClient.patch<Invoice>(
        `/api/invoices/${id}/pay`,
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new ApiError(
        `Failed to mark invoice ${id} as paid`,
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },

  /** Delete invoice */
  async delete(id: Invoice['id']): Promise<void> {
    try {
      await apiClient.delete(`/api/invoices/${id}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new ApiError(
        `Failed to delete invoice ${id}`,
        axiosError.response?.status,
        axiosError.response?.data,
      );
    }
  },
};
