import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddcardetailsPage } from './addcardetails.page';

const routes: Routes = [
  {
    path: '',
    component: AddcardetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddcardetailsPageRoutingModule {}
