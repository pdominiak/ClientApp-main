import {  Component, EventEmitter, Output } from '@angular/core';
import { ContactModel } from 'src/app/Models/ContactModel';
import { Router } from '@angular/router';
import { contactService } from '../contactService';
import { Address } from 'src/app/Models/AddressModel';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  
})

export class TableComponent  {
  count: Number = 3;
  p: Number = 1;
  str = 'table';
  contacts: ContactModel[];
  @Output() nameEvent = new EventEmitter<string>();
  constructor(private contactServ: contactService, private router: Router
    ,private http: HttpClientModule) {
    this.contactServ.GetAllContactsAPI().subscribe((contacts: ContactModel[]) => {
      this.contacts = contacts
     
    });
   
  }
  //events
  myClickFunAdd(contact: ContactModel) {
    this.router.navigateByUrl('/addaddress/' + contact.contactID);
   
  } 
  myClickFunShow(contact: ContactModel) {
   
    if (document.getElementById('Contacts').children.length == this.contacts.length) {
      this.deployAddressData();

    } 
      var index = this.getAddressRowIndex(contact);
      
      document.getElementById('Contacts').children[index].setAttribute('style', 'display:n');
    
  }
  myClickFunHide(contact: ContactModel) {
    var index = this.getAddressRowIndex(contact);
   
    document.getElementById('Contacts').children[index].setAttribute('style', 'display:none');
  }
  delete(contact: ContactModel) {
    this.contactServ.deleteContact(contact)
      .subscribe(res => {
        alert("Employee Added successfully");
        this.TakeHome();
      }, err => {
        alert("Error Occured " + JSON.stringify(err));
      });
  }
  getAddressRowIndex(contact: ContactModel) {//returns index of an address assigned to a given contact
    var tempContacts = document.getElementById('Contacts').children;
    var counter = 0;
    while (counter < tempContacts.length) {
      if (tempContacts[counter].children.length > 2 && tempContacts[counter].children[2].innerHTML == contact.email) {
        return counter + 1;
      }
      ++counter;
    }
  }
  deployAddressData() {
    var tableBody = document.getElementById('Contacts');
    var counter = document.getElementById('Contacts').children.length-1;
    

    tableBody.appendChild(this.loadAddressesToDiv(this.contacts[counter]));
   
    while (counter > 0) {
      tableBody.insertBefore(this.loadAddressesToDiv(this.contacts[counter-1])
        , tableBody.children[counter]);
      --counter;
    }
  }
  loadAddressesToDiv(contact: ContactModel): HTMLDivElement {
   
    var div = document.createElement('div');
    var counter = 0;
    
    while (counter < contact.addresses.length) {

      
      div.append(this.getAddressDiv(contact.addresses[counter]));
      ++counter;
    }
    div.setAttribute('style', 'display:none');
    return div;
  }
  getAddressDiv(address: Address) {
    
    var div = document.createElement('div');
    var label = document.createElement('div');
    label.innerHTML = address['street'];
    label.innerHTML += ' ' + address['houseNumber'] + '/' + address['flatNumber'];
    div.append(label);
 
    label = document.createElement('div');
    label.innerHTML = address['postOfficeCode'] + ' ' + address['town'] + ' ';    
    label.innerHTML += address['country'];
    div.appendChild(label);
    var btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-danger');
    btn.innerHTML = "Usuń Adres";
   
    btn.onclick = () =>
      this.deleteAddress(address, div);
    div.appendChild(btn);
    btn = document.createElement('button');
    btn.setAttribute('class', 'btn btn-primary');
    btn.innerHTML = "Edytuj adres";
    
    btn.onclick = () => {
      
      this.router.navigateByUrl('/editaddress/' + address['addressID'])
    }
    div.appendChild(btn);
    return div;
  }
  TakeHome() {
    this.nameEvent.emit("ccc");
    this.router.navigateByUrl('/table');
    
  }
  deleteAddress(address: Address, div: HTMLDivElement) {
    
    this.contactServ.deleteAddress(address).subscribe(res => {
      
      
    }, err => {
      
    });
    div.remove();
  }
}
