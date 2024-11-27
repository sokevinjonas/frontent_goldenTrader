import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoisirAnalystePage } from './choisir-analyste.page';

const routes: Routes = [
  {
    path: '',
    component: ChoisirAnalystePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoisirAnalystePageRoutingModule {}
