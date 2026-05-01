import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { invoicesApi } from '@/api/invoices';
import type {
  Invoice,
  CreateInvoiceDTO,
  UpdateInvoiceDTO,
} from '@shared/types/invoice';

const QUERY_KEY = 'invoices';

/**
 * Hook to fetch all invoices
 */
export function useInvoices() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: invoicesApi.getAll,
  });
}

/**
 * Hook to fetch a single invoice by ID
 */
export function useInvoice(id: Invoice['id']) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => invoicesApi.getById(id),
    enabled: !!id, // Only fetch if ID exists
  });
}

/**
 * Hook to create a new invoice
 */
export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInvoiceDTO) => invoicesApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch invoice list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

/**
 * Hook to update an existing invoice
 */
export function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: Invoice['id']; data: UpdateInvoiceDTO }) =>
      invoicesApi.update(id, data),
    onSuccess: (updatedInvoice) => {
      // Invalidate invoice list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      // Update single invoice cache
      queryClient.setQueryData([QUERY_KEY, updatedInvoice.id], updatedInvoice);
    },
  });
}

/**
 * Hook to mark an invoice as paid
 */
export function useMarkInvoicePaid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Invoice['id']) => invoicesApi.markPaid(id),
    onSuccess: (updatedInvoice) => {
      // Invalidate invoice list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      // Update single invoice cache
      queryClient.setQueryData([QUERY_KEY, updatedInvoice.id], updatedInvoice);
    },
  });
}

/**
 * Hook to delete an invoice
 */
export function useDeleteInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Invoice['id']) => invoicesApi.delete(id),
    // Invalidate invoice list
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}
