export type InvoiceStatus = "draft" | "pending" | "paid";

export type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

export type Invoice = {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: Array<InvoiceItem>;
  total: number;
};

export type CreateInvoiceDTO = {
  clientName?: string;
  clientEmail?: string;
  clientAddress?: Address;
  senderAddress?: Address;
  description?: string;
  paymentDue: string;
  createdAt: string;
  items?: InvoiceItem[];
  total?: number;
  status: "draft" | "pending";
};

export type UpdateInvoiceDTO = Omit<Invoice, "id">;
