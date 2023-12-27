import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChomePage } from './chome.page';

const routes: Routes = [
  {
    path: '',
    component: ChomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChomePageRoutingModule {}
