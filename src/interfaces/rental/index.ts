import { CustomerInterface } from 'interfaces/customer';
import { InventoryInterface } from 'interfaces/inventory';
import { GetQueryInterface } from 'interfaces';

export interface RentalInterface {
  id?: string;
  customer_id: string;
  inventory_id: string;
  rental_date: any;
  return_date?: any;
  created_at?: any;
  updated_at?: any;

  customer?: CustomerInterface;
  inventory?: InventoryInterface;
  _count?: {};
}

export interface RentalGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  inventory_id?: string;
}
