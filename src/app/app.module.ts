import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { contactService } from './contactService';


import { FormComponent} from './form/form.component';
//import { AppRoutingModule } from './app-routing.module';
import { TableComponent } from './table/table.component';
import { AddContactComponent } from './AddContact/AddContact.component';
import { EditContactComponent } from './EditContact/EditContact.component';
import { EditAddressComponent } from './EditAddress/EditAddressComponent';
import { NgxPaginationModule } from 'ngx-pagination';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,

    FormComponent,
    TableComponent,
    EditContactComponent,
    AddContactComponent,
   EditAddressComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    //AppRoutingModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'table', pathMatch: 'full'},
      { path: 'table', component: TableComponent },
      { path: 'addaddress/:id', component: FormComponent },
      { path: 'addcontact', component: AddContactComponent },
      { path: 'editcontact/:id', component: EditContactComponent },
      { path: 'editaddress/:id', component: EditAddressComponent }
    ]),
    NoopAnimationsModule
  ],
  providers: [contactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
