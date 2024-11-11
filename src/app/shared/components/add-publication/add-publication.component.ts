import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss'],
})
export class AddPublicationComponent implements OnInit {
  postForm: FormGroup;
  previewImage: string | null = null;
  images = [
    { src: 'https://placehold.co/800x450', alt: 'Image 1' },
    { src: 'https://placehold.co/800x450', alt: 'Image 1' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [null],
    });
  }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }
  onSubmit() {
    if (this.postForm.valid) {
      // Logique de création de publication ici
      console.log(this.postForm.value);
      this.dismissModal();
    }
  }

  reset() {
    this.postForm.reset();
    this.previewImage = null;
  }
}
