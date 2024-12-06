export interface QuotationFormData {
  name: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  payment_type: 'cash' | 'loan';
  down_payment: number;
  tenure: number;
  old_vehicle_details: string;
  exchange_vehicle: 'yes' | 'no';
} 