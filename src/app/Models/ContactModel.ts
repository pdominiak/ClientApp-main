import {  Address } from './AddressModel';
export class ContactModel  {
  contactID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addresses: Address[];
  
}
