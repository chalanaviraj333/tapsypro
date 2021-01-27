import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmodelPageRoutingModule } from './submodel-routing.module';

import { SubmodelPage } from './submodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmodelPageRoutingModule
  ],
  declarations: [SubmodelPage]
})
export class SubmodelPageModule {}
