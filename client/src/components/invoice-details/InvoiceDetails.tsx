import { useParams, Link } from 'react-router-dom';
import { useInvoice } from '@/hooks/useInvoices';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/common/StatusBadge';
import InvoiceDetailsSkeleton from './InvoiceDetailsSkeleton';
import InvoiceDetailsError from './InvoiceDetailsError';
import iconArrowLeft from '@/assets/icon-arrow-left.svg';
import { formatDate, formatCurrency } from '@/lib/formatters';

export default function InvoiceDetails() {
  const params = useParams();

  const {
    data: invoice,
    isLoading,
    error,
    refetch,
  } = useInvoice(params.id || '');

  return (
    <section className="space-y-6">
      <Link to="/" className="h-6 flex items-center gap-4">
        <img src={iconArrowLeft} alt="" />
        <span className="body-1 font-bold">Go back</span>
      </Link>

      {error ? (
        <InvoiceDetailsError error={error} onRetry={refetch} />
      ) : isLoading ? (
        <InvoiceDetailsSkeleton />
      ) : !invoice ? (
        <InvoiceDetailsError error={new Error('Invoice not found')} />
      ) : (
        <>
          <div className="flex items-center justify-between bg-navy rounded-lg px-6 py-4">
            <div className="flex items-center gap-4">
              <span className="body-1">Status</span>
              <StatusBadge status={invoice.status} />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="secondary">Edit</Button>
              <Button variant="destructive">Delete</Button>
              <Button variant="primary">Mark as Paid</Button>
            </div>
          </div>

          <div className="space-y-10 bg-navy rounded-lg p-8">
            <div className="flex justify-between">
              <div className="space-y-3">
                <h3>
                  <span className="text-slate">#</span>
                  {invoice.id}
                </h3>
                <p className="body-1">{invoice.description}</p>
              </div>

              <div className="space-y-2 text-right body-1">
                <p>{invoice.senderAddress.street}</p>
                <p>{invoice.senderAddress.city}</p>
                <p>{invoice.senderAddress.postCode}</p>
                <p>{invoice.senderAddress.country}</p>
              </div>
            </div>

            <div className="grid grid-cols-[auto_auto_auto] gap-2">
              <div className="space-y-10">
                <div className="space-y-3">
                  <p className="body-1">Invoice Date</p>
                  <h3>{formatDate(invoice.createdAt)}</h3>
                </div>

                <div className="space-y-3">
                  <p className="body-1">Payment Due</p>
                  <h3>{formatDate(invoice.paymentDue)}</h3>
                </div>
              </div>

              <div className="space-y-3">
                <p className="body-1">Bill To</p>
                <h3>{invoice.clientName}</h3>

                <div className="space-y-2 body-1">
                  <p>{invoice.clientAddress.street}</p>
                  <p>{invoice.clientAddress.city}</p>
                  <p>{invoice.clientAddress.postCode}</p>
                  <p>{invoice.clientAddress.country}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="body-1">Sent To</p>
                <h3>{invoice.clientEmail}</h3>
              </div>
            </div>

            <div>
              <div className="space-y-8 bg-navy-light rounded-t-lg p-8">
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 body-1">
                  <p className="text-left">Item Name</p>
                  <p className="text-center">QTY.</p>
                  <p className="text-right">Price</p>
                  <p className="text-right">Total</p>
                </div>

                {invoice.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2"
                  >
                    <h4 className="text-left">{item.name}</h4>
                    <h4 className="text-center">{item.quantity}</h4>
                    <h4 className="text-right">{formatCurrency(item.price)}</h4>
                    <h4 className="text-right">{formatCurrency(item.total)}</h4>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-2 bg-black rounded-b-lg p-8">
                <p className="body-1 text-left">Amount Due</p>
                <h2>{formatCurrency(invoice.total)}</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
