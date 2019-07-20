import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListComponent } from './list/list.component';
import { HttpService } from '../shared/http.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ReactiveFormsModule } from '@angular/forms';

import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'

import { AvatarModule } from 'ngx-avatar';
import {NgxMaskModule} from 'ngx-mask';
import { CurrencyMaskModule } from "ngx-currency-mask";
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {TagInputModule} from 'ngx-chips'
@NgModule({
  declarations: [ListComponent, CreateComponent, UpdateComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    
    HttpClientModule,
    ReactiveFormsModule,
    AvatarModule,
    CurrencyMaskModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    TagInputModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [HttpService,HttpClient,ToastrService],
})
export class EmployeeModule { }
