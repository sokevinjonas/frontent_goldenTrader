import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoisirAnalystePageRoutingModule } from './choisir-analyste-routing.module';

import { ChoisirAnalystePage } from './choisir-analyste.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoisirAnalystePageRoutingModule
  ],
  declarations: [ChoisirAnalystePage]
})
export class ChoisirAnalystePageModule {}
