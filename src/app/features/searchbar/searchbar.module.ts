import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchbarPageRoutingModule } from './searchbar-routing.module';

import { SearchbarPage } from './searchbar.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchbarPageRoutingModule,
    SharedModule,
  ],
  declarations: [SearchbarPage],
})
export class SearchbarPageModule {}
