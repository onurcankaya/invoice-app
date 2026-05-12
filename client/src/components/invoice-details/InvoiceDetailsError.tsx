import { Button } from '@components/ui/button';

type InvoiceDetailsErrorProps = {
  error: Error;
  onRetry?: () => void;
};

export default function InvoiceDetailsError({
  error,
  onRetry,
}: InvoiceDetailsErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4 border border-red rounded-lg">
      <h2>Error loading invoice details</h2>
      <p className="body-1">{error.message || 'Something went wrong'}</p>
      {onRetry && (
        <Button
          size="lg"
          variant="primary"
          onClick={onRetry}
          className="mt-2"
          aria-label="Retry loading invoice details"
        >
          Retry
        </Button>
      )}
    </div>
  );
}
