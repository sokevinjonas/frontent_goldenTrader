import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  subscription: {
    type: string;
    remainingDays: number;
  };
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    offlineMode: boolean;
  };
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: UserProfile = {
    name: 'Marie Dubois',
    email: 'marie.dubois@exemple.com',
    phone: '06 12 34 56 78',
    subscription: {
      type: 'Premium',
      remainingDays: 45,
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      offlineMode: true,
    },
  };

  isEditing = false;

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  async toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Simule la sauvegarde
      const alert = await this.alertController.create({
        header: 'Succès',
        message: 'Vos modifications ont été enregistrées',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async confirmReset() {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: "Êtes-vous sûr de vouloir réinitialiser l'application ?",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Confirmer',
          handler: () => {
            console.log('Application réinitialisée');
          },
        },
      ],
    });
    await alert.present();
  }

  logout() {
    console.log('Déconnexion...');
    // Ici vous pouvez ajouter la logique de déconnexion
  }

  manageSubscription() {
    console.log("Redirection vers la gestion d'abonnement...");
    // Ici vous pouvez ajouter la logique de redirection
  }
}
