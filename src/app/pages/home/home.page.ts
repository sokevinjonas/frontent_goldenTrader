import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plublications } from 'src/app/core/interfaces/publications';
import { Users } from 'src/app/core/interfaces/users';
import { GlobalService } from 'src/app/core/services/global.service';
import { AddPublicationComponent } from 'src/app/shared/components/add-publication/add-publication.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user?: Users;
  constructor(
    private modalController: ModalController,
    protected serviceGLobal: GlobalService
  ) {}

  ngOnInit() {
    this.serviceGLobal.allPublication();
  }
  async newPublication() {
    const modal = await this.modalController.create({
      component: AddPublicationComponent,
    });
    return await modal.present();
  }
}
