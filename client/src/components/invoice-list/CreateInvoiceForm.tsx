import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Select } from '@components/ui/select';
import { useCreateInvoice } from '@/hooks/useInvoices';
import iconDelete from '@/assets/icon-delete.svg';
import { formatCurrency } from '@/lib/formatters';
import {
  createInvoiceSchema,
  type CreateInvoiceFormData,
} from '@/lib/schemas/invoice';

type CreateInvoiceFormProps = {
  onClose: () => void;
};

const defaultValues = {
  senderAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  clientName: '',
  clientEmail: '',
  clientAddress: {
    street: '',
    city: '',
    postCode: '',
    country: '',
  },
  createdAt: new Date().toISOString().split('T')[0],
  paymentTerms: 30,
  description: '',
  items: [{ name: '', quantity: 1, price: 0 }],
};

export default function CreateInvoiceForm({ onClose }: CreateInvoiceFormProps) {
  const [createInvoiceError, setCreateInvoiceError] = useState<Error | null>(
    null,
  );

  const navigate = useNavigate();
  const { mutate: createInvoice, isPending: isCreating } = useCreateInvoice();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateInvoiceFormData>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues,
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = useWatch({
    control,
    name: 'items',
  });

  function calculateItemTotal(index: number): number {
    const item = watchedItems?.[index];

    if (!item) return 0;
    return (item.quantity || 0) * (item.price || 0);
  }

  function onSaveAsDraft() {
    const formData = control._formValues;
    submitInvoice(formData, 'draft');
  }

  function onSaveAndSend(data: CreateInvoiceFormData) {
    submitInvoice(data, 'pending');
  }

  function submitInvoice(
    data: CreateInvoiceFormData | Partial<CreateInvoiceFormData>,
    status: 'pending' | 'draft',
  ) {
    const creationDate = new Date(
      data.createdAt || new Date().toISOString().split('T')[0],
    );
    const paymentDueDate = new Date(creationDate);
    paymentDueDate.setDate(
      creationDate.getDate() +
        (data.paymentTerms || defaultValues.paymentTerms),
    );

    const items = (data.items || []).map((item) => ({
      name: item.name || '',
      quantity: item.quantity || 0,
      price: item.price || 0,
      total: (item.price || 0) * (item.quantity || 0),
    }));

    const total = data.items?.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    }, 0);

    const createInvoicePayload = {
      createdAt: data.createdAt || defaultValues.createdAt,
      paymentDue: paymentDueDate.toISOString().split('T')[0],
      description: data.description || defaultValues.description,
      clientName: data.clientName || defaultValues.clientName,
      clientEmail: data.clientEmail || defaultValues.clientEmail,
      clientAddress: data.clientAddress || defaultValues.clientAddress,
      senderAddress: data.senderAddress || defaultValues.senderAddress,
      items: items || defaultValues.items,
      status,
      total,
    };

    createInvoice(createInvoicePayload, {
      onSuccess: () => {
        onClose();
        navigate('/');
      },
      onError: (error) => {
        console.error('Failed to create invoice:', error);
        setCreateInvoiceError(
          error instanceof Error
            ? error
            : new Error('Failed to create invoice'),
        );
      },
    });
  }

  return (
    <>
      <div
        className="fixed inset-0 left-[100px] bg-black/50 z-40"
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-[100px] h-full w-full max-w-[550px] bg-dark-light transform transition-transform duration-300 z-50`}
      >
        <form
          className="h-full flex flex-col"
          onSubmit={handleSubmit(onSaveAndSend)}
        >
          <div className="flex-1 overflow-y-auto p-10 pb-[160px] space-y-10">
            <h1>New Invoice</h1>

            {createInvoiceError && (
              <div className="bg-red/10 border border-red rounded-lg p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-red font-bold">
                    Failed to create invoice
                  </h3>
                  <p className="body-1">{createInvoiceError.message}</p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setCreateInvoiceError(null)}
                >
                  Dismiss
                </Button>
              </div>
            )}

            {/* Bill Form Section */}
            <div className="space-y-6">
              <h4 className="text-purple">Bill From</h4>

              <Input
                id="senderStreet"
                label="Street Address"
                {...register('senderAddress.street')}
                error={errors.senderAddress?.street?.message}
              />

              <div className="grid grid-cols-3 gap-6">
                <Input
                  id="senderCity"
                  label="City"
                  {...register('senderAddress.city')}
                  error={errors.senderAddress?.city?.message}
                />
                <Input
                  id="senderPostCode"
                  label="Post Code"
                  {...register('senderAddress.postCode')}
                  error={errors.senderAddress?.postCode?.message}
                />
                <Input
                  id="senderCountry"
                  label="Country"
                  {...register('senderAddress.country')}
                  error={errors.senderAddress?.country?.message}
                />
              </div>
            </div>

            {/* Bill To Section */}
            <div className="space-y-6">
              <h4 className="text-purple">Bill To</h4>

              <Input
                id="clientName"
                label="Client's Name"
                {...register('clientName')}
                error={errors.clientName?.message}
              />

              <Input
                id="clientEmail"
                label="Client's Email"
                placeholder="e.g. email@example.com"
                {...register('clientEmail')}
                error={errors.clientEmail?.message}
              />

              <Input
                id="clientStreet"
                label="Street Address"
                {...register('clientAddress.street')}
                error={errors.clientAddress?.street?.message}
              />

              <div className="grid grid-cols-3 gap-6">
                <Input
                  id="clientCity"
                  label="City"
                  {...register('clientAddress.city')}
                  error={errors.clientAddress?.city?.message}
                />
                <Input
                  id="clientPostCode"
                  label="Post Code"
                  {...register('clientAddress.postCode')}
                  error={errors.clientAddress?.postCode?.message}
                />
                <Input
                  id="clientCountry"
                  label="Country"
                  {...register('clientAddress.country')}
                  error={errors.clientAddress?.country?.message}
                />
              </div>
            </div>

            {/* Invoice Details Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Input
                  id="createdAt"
                  label="Invoice Date"
                  type="date"
                  {...register('createdAt')}
                  error={errors.createdAt?.message}
                />
                <Select
                  id="paymentTerms"
                  label="Payment Terms"
                  {...register('paymentTerms', { valueAsNumber: true })}
                  error={errors.paymentTerms?.message}
                >
                  <option value={1}>Net 1 Day</option>
                  <option value={7}>Net 7 Days</option>
                  <option value={14}>Net 14 Days</option>
                  <option defaultValue={30} value={30}>
                    Net 30 Days
                  </option>
                </Select>
              </div>

              <Input
                id="description"
                label="Project Description"
                placeholder="e.g. Graphic Design Service"
                {...register('description')}
                error={errors.description?.message}
              />
            </div>

            {/* Item List Section */}
            <div className="space-y-6">
              <h2 className="text-slate">Item List</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-[140px_70px_100px_70px_60px] gap-4 items-start">
                  <span className="body-1 text-left">Item Name</span>
                  <span className="body-1 text-left">Qty.</span>
                  <span className="body-1 text-left">Price</span>
                  <span className="body-1 text-left">Total</span>
                  <div />
                </div>

                {itemFields.map((field, index) => {
                  const itemErrors = errors.items?.[index];

                  return (
                    <div
                      key={field.id}
                      className="grid grid-cols-[140px_70px_100px_70px_60px] gap-4 items-start"
                    >
                      <Input
                        id={`items.${index}.name`}
                        {...register(`items.${index}.name`)}
                        error={itemErrors?.name?.message}
                      />
                      <Input
                        id={`items.${index}.quantity`}
                        type="number"
                        {...register(`items.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                        error={itemErrors?.quantity?.message}
                      />
                      <Input
                        id={`items.${index}.price`}
                        type="number"
                        {...register(`items.${index}.price`, {
                          valueAsNumber: true,
                        })}
                        error={itemErrors?.price?.message}
                      />

                      <div className="flex items-start justify-start h-full w-full px-2 py-4">
                        <h4>{formatCurrency(calculateItemTotal(index))}</h4>
                      </div>

                      <div className="flex items-start justify-start h-full w-full">
                        <Button
                          type="button"
                          variant="ghost"
                          disabled={itemFields.length === 1 || isCreating}
                          onClick={() => removeItem(index)}
                        >
                          <img src={iconDelete} alt="Delete item" />
                        </Button>
                      </div>
                    </div>
                  );
                })}

                <Button
                  type="button"
                  variant="secondary"
                  className="w-full text-center"
                  disabled={isCreating}
                  onClick={() =>
                    appendItem({ name: '', quantity: 1, price: 0 })
                  }
                >
                  + Add New Item
                </Button>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="w-full flex items-center justify-between fixed left-0 bottom-0 px-10 py-6 bg-navy rounded-tr-2xl z-60">
              <Button
                type="button"
                variant="light"
                onClick={onClose}
                disabled={isCreating}
              >
                Discard
              </Button>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isCreating}
                  onClick={onSaveAsDraft}
                >
                  Save as Draft
                </Button>
                <Button type="submit" variant="primary" disabled={isCreating}>
                  {isCreating ? 'Saving...' : 'Save & Send'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
