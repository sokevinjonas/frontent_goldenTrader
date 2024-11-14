import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalService } from '../../../core/services/global.service';
import { Users } from 'src/app/core/interfaces/users';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-follow-button-component',
  templateUrl: './follow-button-component.html',
  styleUrls: ['./follow-button-component.scss'],
})
export class FollowButtonComponent implements OnInit {
  @Input() user!: Users;
  @Output() followStatusChanged = new EventEmitter<void>();

  constructor(
    private serviceGlobal: GlobalService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.checkFollowStatusAndList();
  }

  // Méthode pour vérifier l'état du suivi et récupérer la liste des utilisateurs suivis
  checkFollowStatusAndList() {
    this.serviceGlobal.checkFollowStatusAndList().subscribe(
      (response) => {
        this.user.isFollowed = response.data.isFollowed;
        console.log('Utilisateurs suivis :', response.data.followedUsers);
      },
      (error) => {
        console.error(
          "Erreur lors de la récupération de l'état de suivi",
          error
        );
      }
    );
  }

  async toggleFollow() {
    const loading = await this.loadingController.create({
      message: 'Mise à jour...',
      spinner: 'circular',
    });
    await loading.present();

    const userId = this.user.id;
    const isCurrentlyFollowed = this.user.isFollowed;

    const followAction = isCurrentlyFollowed
      ? this.serviceGlobal.unfollowUser(userId)
      : this.serviceGlobal.followUser(userId);

    followAction
      .subscribe(
        async () => {
          // Inverse l'état du suivi
          this.user.isFollowed = !isCurrentlyFollowed;
          this.followStatusChanged.emit();

          const toast = await this.toastController.create({
            message: this.user.isFollowed
              ? 'Vous suivez maintenant cet utilisateur'
              : 'Vous ne suivez plus cet utilisateur',
            duration: 2000,
            color: 'success',
            position: 'bottom',
          });
          toast.present();
        },
        (error) => {
          console.error("Erreur lors de l'opération de suivi", error);
        }
      )
      .add(() => {
        loading.dismiss();
      });
  }
}
