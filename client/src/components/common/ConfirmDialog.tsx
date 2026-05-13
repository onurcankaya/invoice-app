import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

type ConfirmDialogProps = {
  title: string;
  description: string;
  confirmLabel: string;
  confirmVariant: 'destructive' | 'primary';
  isPending: boolean;
  pendingLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  title,
  description,
  confirmLabel,
  confirmVariant,
  isPending,
  pendingLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isPending) onCancel();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPending, onCancel]);

  return (
    <div
      onClick={onCancel}
      role="dialog"
      aria-labelledby="dialog-title"
      aria-modal="true"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[500px] bg-navy rounded-lg p-8 max-w-md space-y-8"
      >
        <div className="space-y-4">
          <h2 id="dialog-title">{title}</h2>
          <p className="body-1">{description}</p>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>

          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isPending}
            autoFocus
          >
            {isPending ? pendingLabel : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
