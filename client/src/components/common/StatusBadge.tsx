import type { InvoiceStatus } from '@shared/types/invoice';
import { cn } from '@/lib/utils';
import { capitalize } from '@/lib/capitalize';

type StatusBadgeProps = {
  status: InvoiceStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-md',
        status === 'draft' && 'bg-slate-light/10',
        status === 'pending' && 'bg-orange/10',
        status === 'paid' && 'bg-green/10',
      )}
    >
      <div
        className={cn(
          'w-2 h-2 rounded-full',
          status === 'draft' && 'bg-slate-light',
          status === 'pending' && 'bg-orange',
          status === 'paid' && 'bg-green',
        )}
      />
      <p
        className={cn(
          'body-1 text-center font-semibold',
          status === 'draft' && 'text-slate-light',
          status === 'pending' && 'text-orange',
          status === 'paid' && 'text-green',
        )}
      >
        {capitalize(status)}
      </p>
    </div>
  );
}
