import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Publications } from 'src/app/core/interfaces/publications';
import { Users } from 'src/app/core/interfaces/users';
import { GlobalService } from 'src/app/core/services/global.service';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  userID!: number;
  posts: Publications[] = [];
  user?: Users;
  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private route: ActivatedRoute,
    protected serviceGlobal: GlobalService
  ) {}

  async ngOnInit() {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de route
    this.userID = Number(this.route.snapshot.paramMap.get('userID'));
    await this.loadData();
  }

  async loadData() {
    const loading = await this.loadingController.create({
      message: 'Chargement...',
      spinner: 'circular',
    });
    await loading.present();
    this.serviceGlobal.getUserPublications(this.userID).subscribe({
      next: (data) => {
        this.posts = data.data.publications;
        this.user = data.data.user;
        console.log('Données de la publication:', this.posts);
        console.log('Utilisateur:', this.user);
        loading.dismiss();
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Erreur lors du chargement du profil',
          duration: 2000,
          color: 'danger',
          position: 'bottom',
        });
        loading.dismiss();
        return toast;
      },
    });
  }
}
