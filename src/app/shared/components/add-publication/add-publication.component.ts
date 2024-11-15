import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  ModalController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/auth.service';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss'],
})
export class AddPublicationComponent implements OnInit {
  postForm: FormGroup;
  images: Array<{ src: string; file: File | Blob }> = [];
  isLoading = false;
  maxImages = 2; // Maximum nombre d'images autorisées

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private globalService: GlobalService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    protected authService: AuthService
  ) {
    this.postForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit() {
    this.authService.getInfoUser();
  }

  // Sélectionner des images depuis la galerie
  async selectImages() {
    try {
      if (this.images.length >= this.maxImages) {
        await this.showToast(
          'Maximum ' + this.maxImages + ' images autorisées'
        );
        return;
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      const blob = await this.dataUrlToBlob(image.dataUrl!);
      const fileName = new Date().getTime() + '.jpg';
      const file = new File([blob], fileName, { type: 'image/jpeg' });

      this.images.push({
        src: image.dataUrl!,
        file: file,
      });
    } catch (error) {
      console.error("Erreur lors de la sélection de l'image:", error);
      await this.showToast("Erreur lors de la sélection de l'image");
    }
  }

  // Convertir DataURL en Blob
  private async dataUrlToBlob(dataUrl: string): Promise<Blob> {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  // Supprimer une image
  removeImage(index: number) {
    this.images.splice(index, 1);
  }

  // Fermer le modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // Afficher un toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'dark',
    });
    await toast.present();
  }

  // Afficher le loader
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Publication en cours...',
      spinner: 'crescent',
    });
    await loading.present();
    return loading;
  }

  // Soumettre le formulaire
  async onSubmit() {
    if (this.postForm.valid) {
      try {
        const loading = await this.showLoading();

        const formData = new FormData();
        formData.append('content', this.postForm.get('content')?.value);

        // Ajouter les images au formData
        this.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image.file);
        });

        // Envoyer la requête
        this.globalService.createPublication(formData).subscribe(
          async () => {
            await loading.dismiss();
            await this.showToast('Publication créée avec succès');
            this.dismissModal();
          },
          async (error) => {
            await loading.dismiss();
            console.error(
              'Erreur lors de la création de la publication:',
              error
            );
            await this.showToast(
              'Erreur lors de la création de la publication'
            );
          }
        );
      } catch (error) {
        console.error('Erreur:', error);
        await this.showToast('Une erreur est survenue');
      }
    } else {
      await this.showToast('Veuillez remplir tous les champs requis');
    }
  }

  // Réinitialiser le formulaire
  reset() {
    this.postForm.reset();
    this.images = [];
  }

  // Vérifier si le formulaire est valide
  get isValid(): boolean {
    return (
      this.postForm.valid &&
      (this.postForm.get('content')?.value.trim() !== '' ||
        this.images.length > 0)
    );
  }
}
