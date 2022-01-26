import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http'
import { ContactModel } from './Models/ContactModel';
import { environment } from '../environments/environment';
import { Address } from './Models/AddressModel';
import { RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';

@Injectable()
export class contactService {
  contacts: ContactModel[];
  baseUrl: string;

  constructor(public http: HttpClient) {
    this.baseUrl = environment.localhosturl;
  }

  GetAllContactsAPI() {
    if (this.contacts == null) {
     
      return this.http.get(this.baseUrl + environment.apiEndPointGetContacts);
    }
    else return null;
  }
  GetAllAddressesAPI() {
    
    return this.http.get(environment.localhosturl+environment.apiEndPointGetAddresses);
  }
  SetContacts(contacts: ContactModel[]) {
    this.contacts = contacts;
  }
  GetAllContacts() {
    return this.contacts;   
  }
  AddAddressToDB(addressForm: NgForm, contactId: number) {
   
   

    const headers = new HttpHeaders().set('content-type', 'application/json');
    
    
   
    var data = {
      //Id: 1,
      Street: addressForm.controls['street'].value,
      HouseNumber: addressForm.controls['housenumber'].value,
      FlatNumber: addressForm.controls['flatnumber'].value,
      PostOfficeCode: addressForm.controls['postofficecode'].value,
      Town: addressForm.controls['town'].value,
      Country: addressForm.controls['country'].value,
      ContactID: contactId
    };
   
    return this.http.post<Address>(this.baseUrl+'api/addresses', data
      , { headers });
    
    
  }
  addContact(contactForm: NgForm) {
   
    const headers = new HttpHeaders().set('content-type', 'application/json');  
    var data = {
      FirstName: contactForm.controls['firstname'].value,
      LastName: contactForm.controls['lastname'].value,
      Email: contactForm.controls['email'].value,
      PhoneNumber: contactForm.controls['phonenumber'].value
      
    }
    
    return this.http.post < ContactModel>(this.baseUrl + 'api/contacts', data, { headers });

  }
  deleteContact(contact: ContactModel) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.delete<ContactModel>(this.baseUrl + 'api/contacts/'+contact.contactID);
  }
  deleteAddress(address: Address) {
    alert(JSON.stringify(address));
    return this.http.delete<Address>(this.baseUrl + 'api/addresses/' + address['addressID']);
  }
  editContact(contactForm: NgForm, contactID: number) {
    var data = {
      Id: contactID,
      FirstName: contactForm.controls['firstname'].value,
      LastName: contactForm.controls['lastname'].value,
      Email: contactForm.controls['email'].value,
      PhoneNumber: contactForm.controls['phonenumber'].value
    }
    return this.http.put(this.baseUrl + 'api/contacts/' + contactID, data);
  }
  editAddress(addressForm: NgForm, addressID: number) {
    
    var data = {
      Id: addressID,
      Street: addressForm.controls['street'].value,
      HouseNumber: addressForm.controls['housenumber'].value,
      FlatNumber: addressForm.controls['flatnumber'].value,
      PostOfficeCode: addressForm.controls['postofficecode'].value,
      Town: addressForm.controls['town'].value,
      Country: addressForm.controls['country'].value
    }
    
    return this.http.put(this.baseUrl + 'api/addresses/' + addressID, data);
  }
}
