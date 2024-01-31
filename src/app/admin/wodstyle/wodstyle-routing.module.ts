import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WodstylePage } from './wodstyle.page';

const routes: Routes = [
  {
    path: '',
    component: WodstylePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WodstylePageRoutingModule {}
