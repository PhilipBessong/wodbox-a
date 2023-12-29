import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WodinfoPage } from './wodinfo.page';

const routes: Routes = [
  {
    path: '',
    component: WodinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WodinfoPageRoutingModule {}
