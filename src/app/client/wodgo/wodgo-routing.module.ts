import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WodgoPage } from './wodgo.page';

const routes: Routes = [
  {
    path: '',
    component: WodgoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WodgoPageRoutingModule {}
