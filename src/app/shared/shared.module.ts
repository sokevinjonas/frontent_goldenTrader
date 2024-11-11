import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddPublicationComponent } from './components/add-publication/add-publication.component';

@NgModule({
  declarations: [AddPublicationComponent],
  imports: [CommonModule, IonicModule],
  exports: [AddPublicationComponent], // Exportez tous les composants partagés
})
export class SharedModule {}
