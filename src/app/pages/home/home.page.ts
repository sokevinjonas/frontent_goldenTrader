import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plublications } from 'src/app/core/interfaces/publications';
import { GlobalService } from 'src/app/core/services/global.service';
import { AddPublicationComponent } from 'src/app/shared/components/add-publication/add-publication.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts: Plublications[] = [];
  currentUser = {
    name: 'Thomas',
    isNewUser: true,
  };
  constructor(
    private modalController: ModalController,
    protected serviceGLobal: GlobalService
  ) {}

  ngOnInit() {
    this.allPublication();
  }
  allPublication() {
    this.serviceGLobal.FilActualisation().subscribe({
      next: (data) => {
        this.posts = data.data;
        console.log(this.posts);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des publications', error);
      },
    });
  }

  follow(userId: number) {
    this.serviceGLobal.followUser(userId).subscribe({
      next: (response) => {
        console.log('Utilisateur suivi avec succès', response);
      },
      error: (error) => {
        console.error("Erreur lors du suivi de l'utilisateur", error);
      },
    });
  }

  unfollow(userId: number) {
    this.serviceGLobal.unfollowUser(userId).subscribe({
      next: (response) => {
        console.log('Arrêt du suivi avec succès', response);
      },
      error: (error) => {
        console.error(
          "Erreur lors de l'arrêt du suivi de l'utilisateur",
          error
        );
      },
    });
  }
  toggleFollow(post: Plublications) {
    const userId = post.user.id;

    if (post.isFollowed) {
      this.serviceGLobal.unfollowUser(userId).subscribe(
        () => {
          // Met à jour isFollowed pour tous les posts du même utilisateur
          this.posts.forEach((p) => {
            if (p.user.id === userId) {
              p.isFollowed = false;
            }
          });
          console.log(`Arrêt du suivi de l'utilisateur ${userId}`);
        },
        (error) => {
          console.error("Erreur lors du désuivi de l'utilisateur", error);
        }
      );
    } else {
      this.serviceGLobal.followUser(userId).subscribe(
        () => {
          // Met à jour isFollowed pour tous les posts du même utilisateur
          this.posts.forEach((p) => {
            if (p.user.id === userId) {
              p.isFollowed = true;
            }
          });
          console.log(`Utilisateur ${userId} suivi avec succès`);
        },
        (error) => {
          console.error("Erreur lors du suivi de l'utilisateur", error);
        }
      );
    }
  }

  async newPublication() {
    const modal = await this.modalController.create({
      component: AddPublicationComponent,
    });
    return await modal.present();
  }
}
