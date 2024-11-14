import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AddPublicationComponent } from './components/add-publication/add-publication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FollowButtonComponent } from './components/follow-button-component/follow-button.component';

@NgModule({
  declarations: [AddPublicationComponent, FollowButtonComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [AddPublicationComponent, FollowButtonComponent], // Exportez tous les composants partagés
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
