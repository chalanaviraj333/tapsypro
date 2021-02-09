import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddcardetailsPageRoutingModule } from './addcardetails-routing.module';

import { AddcardetailsPage } from './addcardetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddcardetailsPageRoutingModule
  ],
  declarations: [AddcardetailsPage]
})
export class AddcardetailsPageModule {}
