import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmrapPage } from './amrap.page';

const routes: Routes = [
  {
    path: '',
    component: AmrapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmrapPageRoutingModule {}
