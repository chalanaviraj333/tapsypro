import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmodelPage } from './submodel.page';

const routes: Routes = [
  {
    path: '',
    component: SubmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmodelPageRoutingModule {}
