export default function InvoiceDetailsSkeleton() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between bg-navy rounded-lg px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-6 w-16 bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-16 bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-6 w-20 bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      <div className="space-y-10 bg-navy rounded-lg p-8">
        <div className="flex justify-between">
          <div className="space-y-3">
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          </div>

          <div className="space-y-2 text-right body-1">
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-[auto_auto_auto] gap-2">
          <div className="space-y-10">
            <div className="space-y-3">
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />

            <div className="space-y-2 body-1">
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>

        <div>
          <div className="space-y-8 bg-navy-light rounded-t-lg p-8">
            <div className="grid grid-cols-[2fr_auto_auto_auto] gap-10 body-1">
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            </div>

            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_auto_auto_auto] gap-10"
              >
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 bg-black rounded-b-lg p-8">
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
