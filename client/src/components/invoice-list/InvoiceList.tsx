import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useInvoices } from '@/hooks/useInvoices';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import StatusBadge from '@/components/common/StatusBadge';
import ErrorView from '@/components/common/ErrorView';
import InvoiceListEmpty from './InvoiceListEmpty';
import InvoiceListSkeleton from './InvoiceListSkeleton';
import InvoiceForm from '@/components/common/InvoiceForm';
import iconArrowRight from '@/assets/icon-arrow-right.svg';
import iconArrowDown from '@/assets/icon-arrow-down.svg';
import { formatDate, formatCurrency } from '@/lib/formatters';
import type { InvoiceStatus } from '@shared/types/invoice';

function InvoiceListHeader({
  invoiceCountLabel,
  onNewInvoice,
  statusFilters,
  setStatusFilters,
}: {
  invoiceCountLabel: string;
  onNewInvoice: () => void;
  statusFilters: InvoiceStatus[];
  setStatusFilters: React.Dispatch<React.SetStateAction<InvoiceStatus[]>>;
}) {
  function toggleFilter(statusFilter: InvoiceStatus) {
    setStatusFilters((prev) => {
      if (prev.includes(statusFilter)) {
        return prev.filter((filter) => filter !== statusFilter);
      } else {
        return [...prev, statusFilter];
      }
    });
  }

  return (
    <header className="flex items-center justify-between">
      <div className="space-y-2">
        <h1>Invoices</h1>
        <p className="body-1">{invoiceCountLabel}</p>
      </div>

      <div className="flex gap-8">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <span className="body-1 font-bold">Filter by status</span>
            <img src={iconArrowDown} alt="" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes('draft')}
              onCheckedChange={() => toggleFilter('draft')}
            >
              Draft
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes('pending')}
              onCheckedChange={() => toggleFilter('pending')}
            >
              Pending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={statusFilters.includes('paid')}
              onCheckedChange={() => toggleFilter('paid')}
            >
              Paid
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="primary" size="lg" onClick={onNewInvoice}>
          + New Invoice
        </Button>
      </div>
    </header>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  return <section className="h-full flex flex-col gap-12">{children}</section>;
}

export default function InvoiceList() {
  const [statusFilters, setStatusFilters] = useState<InvoiceStatus[]>([]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const { data: invoices, isLoading, error, refetch } = useInvoices();

  const filteredInvoices = useMemo(() => {
    if (statusFilters.length > 0) {
      return invoices?.filter((invoice) =>
        statusFilters.includes(invoice.status),
      );
    }

    return invoices;
  }, [statusFilters, invoices]);

  const invoiceCount = invoices?.length || 0;
  const filteredInvoiceCount = filteredInvoices?.length || 0;

  function getInvoiceCountLabel(isLoading: boolean): string {
    if (isLoading) return 'Loading...';

    if (statusFilters.length > 0) {
      return `Displaying ${filteredInvoiceCount} out of ${invoiceCount} invoices`;
    }

    return invoiceCount > 0
      ? `There are ${invoiceCount} invoices`
      : 'No invoices';
  }

  const invoiceCountLabel = getInvoiceCountLabel(isLoading);

  function displayActiveStatusFilters() {
    if (statusFilters.length > 0) {
      return (
        <div className="flex items-center gap-2">
          <span className="body-1 font-bold">Filtered by status:</span>
          {statusFilters.map((filter) => (
            <div
              key={filter}
              className="border border-purple px-3 py-0.5 rounded-full"
            >
              <span className="text-xs font-bold capitalize">{filter}</span>
            </div>
          ))}
        </div>
      );
    }
  }

  if (error) {
    return (
      <PageLayout>
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
        <InvoiceListSkeleton />
      </PageLayout>
    );
  }

  if (filteredInvoiceCount === 0) {
    return (
      <PageLayout>
        <InvoiceListHeader
          invoiceCountLabel={invoiceCountLabel}
          onNewInvoice={() => setShowInvoiceForm(true)}
          statusFilters={statusFilters}
          setStatusFilters={setStatusFilters}
        />

        {displayActiveStatusFilters()}

        <div className="flex flex-1 items-center justify-center">
          {invoiceCount === 0 ? (
            <InvoiceListEmpty />
          ) : (
            <div className="text-center space-y-4">
              <p className="body-1">No invoices match your filters</p>
              <Button variant="secondary" onClick={() => setStatusFilters([])}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </PageLayout>
    );
  }

  return (
    <>
      {showInvoiceForm && (
        <InvoiceForm mode="create" onClose={() => setShowInvoiceForm(false)} />
      )}

      <PageLayout>
        <InvoiceListHeader
          invoiceCountLabel={invoiceCountLabel}
          onNewInvoice={() => setShowInvoiceForm(true)}
          statusFilters={statusFilters}
          setStatusFilters={setStatusFilters}
        />

        {displayActiveStatusFilters()}

        <ul className="space-y-4">
          {filteredInvoices?.map((invoice) => (
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
