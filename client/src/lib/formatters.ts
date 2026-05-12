import { format, parseISO, isValid } from 'date-fns';
import { DEFAULT_CURRENCY } from '@/lib/constants';

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);

    if (!isValid(date)) {
      console.error('Invalid date:', dateString);
      return dateString;
    }

    return format(date, 'd MMM yyyy');
  } catch (error) {
    console.error('Date formatting error:', error, dateString);
    return dateString;
  }
}

export function formatCurrency(amount: number): string {
  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: DEFAULT_CURRENCY,
    }).format(amount);
  } catch (error) {
    console.error(
      'Currency formatting error:',
      error,
      amount,
      DEFAULT_CURRENCY,
    );
    return `${DEFAULT_CURRENCY} ${amount}`;
  }
}
