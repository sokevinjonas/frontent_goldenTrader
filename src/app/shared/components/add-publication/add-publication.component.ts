import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss'],
})
export class AddPublicationComponent implements OnInit {
  postForm: FormGroup;
  previewImage: string | null = null;

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
  handleImageUpload(event: Event) {
    // const target = event.target as HTMLInputElement;
    // if (target.files?.[0]) {
    //   this.previewImage = URL.createObjectURL(target.files[0]);
    // } else {
    //   this.previewImage = null;
    // }
  }
  openImagePicker() {
    // Logique pour ouvrir le sélecteur d'image ici
    // et définir la prévisualisation
    this.previewImage = 'https://placehold.co/150x150';
  }
  reset() {
    this.postForm.reset();
    this.previewImage = null;
  }
}
