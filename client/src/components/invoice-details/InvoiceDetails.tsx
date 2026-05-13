import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useInvoice,
  useDeleteInvoice,
  useMarkInvoicePaid,
} from '@/hooks/useInvoices';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/common/StatusBadge';
import ErrorView from '@/components/common/ErrorView';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import PageLayout from './PageLayout';
import InvoiceDetailsSkeleton from './InvoiceDetailsSkeleton';
import { formatDate, formatCurrency } from '@/lib/formatters';

export default function InvoiceDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const [showDeleteInvoiceDialog, setShowDeleteInvoiceDialog] = useState(false);
  const [deleteInvoiceError, setDeleteInvoiceError] = useState<Error | null>(
    null,
  );

  const [showMarkInvoicePaidDialog, setShowMarkInvoicePaidDialog] =
    useState(false);
  const [markInvoicePaidError, setMarkInvoicePaidError] =
    useState<Error | null>(null);

  const {
    data: invoice,
    isLoading,
    error,
    refetch,
  } = useInvoice(params.id || '');

  const { mutate: deleteInvoice, isPending: isDeleting } = useDeleteInvoice();
  const { mutate: markInvoicePaid, isPending: isMarkingInvoicePaid } =
    useMarkInvoicePaid();

  function handleDeleteInvoice() {
    if (!invoice) return;

    deleteInvoice(invoice.id, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        console.error('Failed to delete invoice:', error);
        setDeleteInvoiceError(
          error instanceof Error
            ? error
            : new Error('Failed to delete invoice'),
        );
        setShowDeleteInvoiceDialog(false);
      },
    });
  }

  function handleMarkInvoicePaid() {
    if (!invoice) return;

    markInvoicePaid(invoice.id, {
      onSuccess: () => {
        setShowMarkInvoicePaidDialog(false);
      },
      onError: (error) => {
        console.error('Failed to mark invoice paid:', error);
        setMarkInvoicePaidError(
          error instanceof Error
            ? error
            : new Error('Failed to mark invoice paid'),
        );
        setShowMarkInvoicePaidDialog(false);
      },
    });
  }

  if (error) {
    return (
      <PageLayout>
        <ErrorView
          title="Error loading invoice details"
          error={error}
          onRetry={refetch}
          buttonLabel="Retry loading invoice details"
        />
      </PageLayout>
    );
  }

  if (isLoading) {
    return (
      <PageLayout>
        <InvoiceDetailsSkeleton />
      </PageLayout>
    );
  }

  if (!invoice) {
    return (
      <PageLayout>
        <ErrorView
          title="Error loading invoice details"
          error={new Error('Invoice not found')}
          onRetry={refetch}
          buttonLabel="Retry loading invoice details"
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {deleteInvoiceError && (
        <div className="bg-red/10 border border-red rounded-lg p-4 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-red font-bold">Failed to delete invoice</h3>
            <p className="body-1">{deleteInvoiceError.message}</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => setDeleteInvoiceError(null)}
          >
            Dismiss
          </Button>
        </div>
      )}

      {markInvoicePaidError && (
        <div className="bg-red/10 border border-red rounded-lg p-4 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-red font-bold">Failed to mark invoice paid</h3>
            <p className="body-1">{markInvoicePaidError.message}</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => setMarkInvoicePaidError(null)}
          >
            Dismiss
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between bg-navy rounded-lg px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="body-1">Status</span>
          <StatusBadge status={invoice.status} />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary">Edit</Button>

          <Button
            variant="destructive"
            onClick={() => setShowDeleteInvoiceDialog(true)}
            disabled={isDeleting || isMarkingInvoicePaid}
          >
            Delete
          </Button>

          {showDeleteInvoiceDialog && (
            <ConfirmDialog
              title="Confirm Deletion"
              description={`Are you sure you want to delete invoice #${invoice.id}? 
              This action cannot be undone.`}
              confirmLabel="Delete"
              confirmVariant="destructive"
              isPending={isDeleting}
              pendingLabel="Deleting..."
              onConfirm={handleDeleteInvoice}
              onCancel={() => setShowDeleteInvoiceDialog(false)}
            />
          )}

          <Button
            variant="primary"
            onClick={() => setShowMarkInvoicePaidDialog(true)}
            disabled={
              isDeleting || isMarkingInvoicePaid || invoice.status === 'paid'
            }
          >
            Mark as Paid
          </Button>

          {showMarkInvoicePaidDialog && (
            <ConfirmDialog
              title="Mark Invoice Paid"
              description={`Are you sure you want to mark invoice #${invoice.id} as paid?`}
              confirmLabel="Mark as paid"
              confirmVariant="primary"
              isPending={isMarkingInvoicePaid}
              pendingLabel="Updating..."
              onConfirm={handleMarkInvoicePaid}
              onCancel={() => setShowMarkInvoicePaidDialog(false)}
            />
          )}
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
    </PageLayout>
  );
}
