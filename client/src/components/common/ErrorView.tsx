import { Button } from '@components/ui/button';

type ErrorViewProps = {
  title: string;
  error: Error;
  onRetry?: () => void;
  buttonLabel?: string;
};

export default function ErrorView({
  title,
  error,
  onRetry,
  buttonLabel,
}: ErrorViewProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4 bg-red/10 border border-red rounded-lg">
      <h2>{title}</h2>
      <p className="body-1">{error.message || 'Something went wrong'}</p>
      {onRetry && (
        <Button
          size="lg"
          variant="primary"
          onClick={onRetry}
          className="mt-2"
          aria-label={buttonLabel}
        >
          {buttonLabel || 'Retry'}
        </Button>
      )}
    </div>
  );
}
