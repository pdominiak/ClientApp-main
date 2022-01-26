import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
import { contactService } from 'src/app/contactService'
import { ContactModel } from 'src/app/Models/ContactModel'

@Component({
  selector: 'app-EditContact',
  templateUrl: './EditContact.component.html'
  // styleUrls: ['./AddContact.component.css']
})
export class EditContactComponent {
  contact: ContactModel;
  email: string;
  constructor(private router: Router, private contactService: contactService) {
    this.contactService.GetAllContactsAPI().subscribe((contacts: ContactModel[]) => {
      

      var id = Number(this.router.url.replace('/editcontact/', ''));
      this.contact = contacts.find(x => x.contactID == id);
      this.email = this.contact.email
    });
  }
  editContact(contactForm: NgForm) {
    this.contactService.editContact(contactForm, this.contact.contactID)
      .subscribe(res => {
        alert("Contact Added successfully");
        this.router.navigateByUrl('/table');
      }, err => {
        alert("Error Occured " + JSON.stringify(err));
      });
  }
}
