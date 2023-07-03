import { RentalInterface } from 'interfaces/rental';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  rental?: RentalInterface[];
  user?: UserInterface;
  _count?: {
    rental?: number;
  };
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
