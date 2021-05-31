import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IbdPage } from './ibd.page';

const routes: Routes = [
  {
    path: '',
    component: IbdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IbdPageRoutingModule {}
