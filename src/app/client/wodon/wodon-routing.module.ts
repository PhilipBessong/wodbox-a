import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WodonPage } from './wodon.page';

const routes: Routes = [
  {
    path: '',
    component: WodonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WodonPageRoutingModule {}
