import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmomPage } from './emom.page';

const routes: Routes = [
  {
    path: '',
    component: EmomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmomPageRoutingModule {}
