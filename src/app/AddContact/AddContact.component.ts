import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { contactService } from 'src/app/contactService'
import { ContactModel } from 'src/app/Models/ContactModel'

@Component({
  selector: 'app-AddContact',
  templateUrl: './AddContact.component.html',
 styleUrls: ['./AddContact.component.css']
})

export class AddContactComponent{
  title = 'table'
  contacts: ContactModel[]
  @Output() nameEvent = new EventEmitter<string>();
  constructor(private router: Router, private contactService: contactService) {
    this.contactService.GetAllContactsAPI().subscribe((contacts: ContactModel[]) => {
      this.contacts = contacts
    });
  }
  addContact(contactForm: NgForm) {
   
   if(contactForm.valid)
    this.contactService.addContact(contactForm)
      .subscribe(res => {
        alert("Contact Added successfully");
        this.TakeHome();
      }, err => {
        alert("Error Occured " + JSON.stringify(err));
      });


  }
  TakeHome() {
    this.nameEvent.emit("ccc");
    this.router.navigateByUrl('/table');
  }


}
