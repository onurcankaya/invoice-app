export default function InvoiceListSkeleton() {
  return (
    <ul className="space-y-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <li key={index}>
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] items-center gap-10 bg-navy rounded-lg px-6 py-5">
            {/* ID */}
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />

            {/* Due date */}
            <div className="h-4 w-28 bg-gray-700 rounded animate-pulse" />

            {/* Client name */}
            <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />

            {/* Total */}
            <div className="h-6 w-24 bg-gray-700 rounded animate-pulse ml-auto" />

            {/* Status badge */}
            <div className="h-8 w-full bg-gray-700 rounded animate-pulse" />

            {/* Arrow */}
            <div className="h-4 w-4 bg-gray-700 rounded animate-pulse" />
          </div>
        </li>
      ))}
    </ul>
  );
}
