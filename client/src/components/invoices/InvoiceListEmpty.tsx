import illustrationEmpty from '@/assets/illustration-empty.svg';

export default function InvoiceListEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-between gap-10">
      <div>
        <img src={illustrationEmpty} alt="empty list illustration" />
      </div>

      <div className="space-y-4">
        <h2 className="text-center">There is nothing here</h2>
        <p className="body-2 text-center">
          Create an invoice by clicking the <br /> <b>New Invoice</b> button to
          get started
        </p>
      </div>
    </div>
  );
}
