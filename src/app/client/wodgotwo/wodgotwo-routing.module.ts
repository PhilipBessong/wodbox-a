import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WodgotwoPage } from './wodgotwo.page';

const routes: Routes = [
  {
    path: '',
    component: WodgotwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WodgotwoPageRoutingModule {}
