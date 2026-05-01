import PageLayout from '@components/common/PageLayout';
import InvoiceList from '@components/invoices/InvoiceList';

export default function App() {
  return (
    <PageLayout>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="mb-2">Invoices</h1>
          <p className="body-1">No invoices</p>
        </div>

        <div className="flex flex-1 mt-20">
          <InvoiceList />
        </div>
      </div>
    </PageLayout>
  );
}
