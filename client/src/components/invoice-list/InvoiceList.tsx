import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInvoices } from '@/hooks/useInvoices';
import { IconButton } from '@/components/ui/icon-button';
import StatusBadge from '@/components/common/StatusBadge';
import ErrorView from '@/components/common/ErrorView';
import InvoiceListEmpty from './InvoiceListEmpty';
import InvoiceListSkeleton from './InvoiceListSkeleton';
import CreateInvoiceForm from './CreateInvoiceForm';
import iconArrowRight from '@/assets/icon-arrow-right.svg';
import iconPlus from '@/assets/icon-plus.svg';
import { formatDate, formatCurrency } from '@/lib/formatters';

function InvoiceListHeader({
  invoiceCountLabel,
  onNewInvoice,
}: {
  invoiceCountLabel: string;
  onNewInvoice: () => void;
}) {
  return (
    <header className="flex items-center justify-between">
      <div className="space-y-2">
        <h1>Invoices</h1>
        <p className="body-1">{invoiceCountLabel}</p>
      </div>

      <IconButton
        variant="primary"
        size="lg"
        icon={iconPlus}
        onClick={onNewInvoice}
      >
        New Invoice
      </IconButton>
    </header>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return <section className="h-full flex flex-col gap-12">{children}</section>;
}

export default function InvoiceList() {
  const [showCreateInvoiceFrom, setShowCreateInvoiceForm] = useState(false);
  const { data: invoices, isLoading, error, refetch } = useInvoices();

  const invoiceCount = invoices?.length || 0;

  function getInvoiceCountLabel(isLoading: boolean, count: number): string {
    if (isLoading) return 'Loading...';

    return count > 0 ? `There are ${count} invoices` : 'No invoices';
  }

  const invoiceCountLabel = getInvoiceCountLabel(isLoading, invoiceCount);

  if (error) {
    return (
      <PageLayout>
        <InvoiceListHeader
          invoiceCountLabel={invoiceCountLabel}
          onNewInvoice={() => setShowCreateInvoiceForm(true)}
        />
        <ErrorView
          title="Error loading invoices"
          error={error}
          onRetry={refetch}
          buttonLabel="Retry loading invoices"
        />
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout>
        <InvoiceListHeader
          invoiceCountLabel={invoiceCountLabel}
          onNewInvoice={() => setShowCreateInvoiceForm(true)}
        />
        <InvoiceListSkeleton />
      </PageLayout>
    );
  }

  if (invoiceCount === 0) {
    return (
      <PageLayout>
        <InvoiceListHeader
          invoiceCountLabel={invoiceCountLabel}
          onNewInvoice={() => setShowCreateInvoiceForm(true)}
        />
        <div className="flex flex-1 items-center">
          <InvoiceListEmpty />
        </div>
      </PageLayout>
    );
  }

  return (
    <>
      {showCreateInvoiceFrom && (
        <CreateInvoiceForm onClose={() => setShowCreateInvoiceForm(false)} />
      )}

      <PageLayout>
        <InvoiceListHeader
          invoiceCountLabel={invoiceCountLabel}
          onNewInvoice={() => setShowCreateInvoiceForm(true)}
        />

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
                <img src={iconArrowRight} alt="" className="inline" />
              </Link>
            </li>
          ))}
        </ul>
      </PageLayout>
    </>
  );
}
