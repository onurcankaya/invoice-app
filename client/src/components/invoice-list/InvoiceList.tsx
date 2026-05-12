import { Link } from 'react-router-dom';
import { useInvoices } from '@/hooks/useInvoices';
import StatusBadge from '@/components/common/StatusBadge';
import arrowRight from '@/assets/icon-arrow-right.svg';
import InvoiceListEmpty from './InvoiceListEmpty';
import InvoiceListSkeleton from './InvoiceListSkeleton';
import InvoiceListError from './InvoiceListError';
import { formatDate, formatCurrency } from '@/lib/formatters';

export default function InvoiceList() {
  const { data: invoices, isLoading, error, refetch } = useInvoices();

  const invoiceCount = invoices?.length || 0;

  const invoiceCountLabel =
    invoiceCount > 0 ? `There are ${invoiceCount} invoices` : 'No invoices';

  return (
    <section className="h-full flex flex-col gap-12">
      <header>
        <h1 className="mb-2">Invoices</h1>
        <p className="body-1">{invoiceCountLabel}</p>
      </header>

      {error ? (
        <InvoiceListError error={error} onRetry={refetch} />
      ) : isLoading ? (
        <InvoiceListSkeleton />
      ) : invoiceCount === 0 ? (
        <div className="flex flex-1 items-center">
          <InvoiceListEmpty />
        </div>
      ) : (
        <ul className="space-y-4">
          {invoices?.map((invoice) => (
            <li key={invoice.id}>
              <Link
                to={`/invoices/${invoice.id}`}
                className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] items-center gap-10 bg-navy rounded-lg px-6 py-5"
              >
                <p className="body-1 text-left">
                  #<span className="font-bold">{invoice.id}</span>
                </p>
                <p className="body-1 text-left">
                  Due {formatDate(invoice.paymentDue)}
                </p>
                <p className="body-1 text-left">{invoice.clientName}</p>
                <h3 className="text-right">{formatCurrency(invoice.total)}</h3>
                <StatusBadge status={invoice.status} />
                <img src={arrowRight} alt="" className="inline" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
