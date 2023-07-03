import { RentalInterface } from 'interfaces/rental';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  tool_name: string;
  status: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  rental?: RentalInterface[];
  company?: CompanyInterface;
  _count?: {
    rental?: number;
  };
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  tool_name?: string;
  status?: string;
  company_id?: string;
}
