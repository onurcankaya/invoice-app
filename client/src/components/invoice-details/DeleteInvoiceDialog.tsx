import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import type { Invoice } from '@shared/types/invoice';

type DeleteInvoiceDialogProps = {
  invoice: Invoice;
  isDeleting: boolean;
  handleDelete: () => void;
  handleClose: () => void;
};

export default function DeleteInvoiceDialog({
  invoice,
  isDeleting,
  handleDelete,
  handleClose,
}: DeleteInvoiceDialogProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDeleting) handleClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isDeleting, handleClose]);

  return (
    <div
      onClick={handleClose}
      role="dialog"
      aria-labelledby="delete-invoice-dialog-title"
      aria-modal="true"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-navy rounded-lg p-8 max-w-md space-y-4"
      >
        <h2 id="delete-invoice-dialog-title">Confirm Deletion</h2>
        <p className="body-1">
          Are you sure you want to delete invoice <b>#{invoice.id}</b>? This
          action cannot be undone.
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            autoFocus
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
}
