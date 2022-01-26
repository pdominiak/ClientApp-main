import { Component, EventEmitter, Output } from '@angular/core';
import { ContactModel } from 'src/app/Models/ContactModel';

import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { contactService } from '../contactService';
import { Address } from '../Models/AddressModel';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent{
  title = 'table'
  
  contacts: ContactModel[];
  contact: ContactModel;
  @Output() nameEvent = new EventEmitter<string>();
  objtemp: Address;
  constructor(private router: Router, private contactService: contactService) {
    this.contactService.GetAllContactsAPI().subscribe((contacts: ContactModel[]) => {
      this.contacts = contacts;
      
      var id = Number(this.router.url.replace('/addaddress/', ''));
      this.contact = contacts.find(x=>x.contactID == id);
      
    });
    
   
   
  }
  addAddress(addressForm: NgForm) {
   
    this.contactService.AddAddressToDB(addressForm, this.contact.contactID)
      .subscribe(res => {
        alert("Employee Added successfully");
        this.TakeHome();
      }, err => {
        alert("Error Occured " + JSON.stringify(err));
      }  );

    
  }
  TakeHome() {
    this.nameEvent.emit("ccc");
    this.router.navigateByUrl('/table');
  }
  
}
