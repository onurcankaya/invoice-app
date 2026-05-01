import { useInvoices } from '@/hooks/useInvoices';

export default function InvoiceList() {
  const { data, isLoading, error } = useInvoices();

  if (isLoading) return 'Loading...';
  if (error) return 'Error fetching invoices';

  return (
    <div>
      <h2 className="mb-4">Invoice list</h2>

      {data?.map((invoice) => (
        <div key={invoice.id} className="mb-4">
          <div>{invoice.id}</div>
          <div>{invoice.clientName}</div>
        </div>
      ))}
    </div>
  );
}
