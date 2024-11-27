import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Users } from 'src/app/core/interfaces/users';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-choisir-analyste',
  templateUrl: './choisir-analyste.page.html',
  styleUrls: ['./choisir-analyste.page.scss'],
})
export class ChoisirAnalystePage implements OnInit {
  analyst: Users[] = [];
  selectedArtists: Users[] = [];

  constructor(
    private navCtrl: NavController,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.loadAnalysts();
  }

  // Charger la liste des analystes
  private loadAnalysts() {
    this.globalService.getUserIsAnalyste().subscribe({
      next: (response) => {
        this.analyst = response.data || [];
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des analystes :', error);
      },
    });
  }

  // Vérifie si un artiste est sélectionné
  isArtistSelected(artist: Users): boolean {
    return this.selectedArtists.some((a) => a.id === artist.id);
  }

  // Ajouter ou retirer un artiste de la sélection
  toggleArtistSelection(artist: Users) {
    const isSelected = this.isArtistSelected(artist);

    if (isSelected) {
      // Si sélectionné, le désélectionner et unfollow
      this.selectedArtists = this.selectedArtists.filter(
        (a) => a.id !== artist.id
      );
      this.manageFollowState(artist, false); // Unfollow
    } else if (this.selectedArtists.length < 3) {
      // Si non sélectionné et < 3, le sélectionner et follow
      this.selectedArtists.push(artist);
      this.manageFollowState(artist, true); // Follow
    }
  }

  // Gérer le suivi ou le désabonnement d'un artiste
  private manageFollowState(artist: Users, follow: boolean) {
    const followAction = follow
      ? this.globalService.followUser(artist.id)
      : this.globalService.unfollowUser(artist.id);

    followAction.subscribe({
      next: () => {
        console.log(
          `${follow ? 'Followed' : 'Unfollowed'} l'analyste : ${artist.name}`
        );
      },
      error: (error) => {
        console.error(
          `Erreur lors de l'opération de ${
            follow ? 'suivi' : 'désabonnement'
          } :`,
          error
        );
      },
    });
  }

  // Passer l'étape sans sélection
  skipSelection() {
    this.navCtrl.navigateForward('/tabs/home');
  }

  // Confirmer la sélection
  confirmSelection() {
    console.log('Artistes sélectionnés :', this.selectedArtists);
    this.navCtrl.navigateForward('/tabs/home');
  }
}
