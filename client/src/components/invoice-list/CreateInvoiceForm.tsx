export default function CreateInvoiceForm({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 left-[100px] bg-black/50 z-40"
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-[100px] h-full w-full max-w-[600px] bg-dark-light transform transition-transform duration-300 z-50`}
      >
        <div className="h-full overflow-y-auto p-12">
          <h1 className="mb-10">New Invoice</h1>
        </div>
      </div>
    </>
  );
}
