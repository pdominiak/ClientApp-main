import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { contactService } from '../contactService';
import { Address } from '../Models/AddressModel';

@Component({
  selector: 'app-EditAddress',
  templateUrl: './EditAddressComponent.html'

})
export class EditAddressComponent {
  address: Address;
  constructor(private contactService: contactService, private http: HttpClientModule,
    private router: Router) {

    this.contactService.GetAllAddressesAPI().subscribe((addresses: Address[]) => {


      var id = Number(this.router.url.replace('/editaddress/', ''));  
      this.address = addresses.find(x => x['addressID'] == id);
      alert(JSON.stringify(addresses))
    });
    
  }
  editAddress(addressForm: NgForm) {
   
    this.contactService.editAddress(addressForm, this.address['addressID'])
      .subscribe(res => {
        alert("Contact edited successfully");
        this.router.navigateByUrl('/table');
      }, err => {
        alert("Error Occured " + JSON.stringify(err));
      });
  }
}
