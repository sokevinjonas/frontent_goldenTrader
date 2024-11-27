import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Users } from 'src/app/core/interfaces/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  userType = 'investor';
  serverErrors: any = {}; // Pour stocker les erreurs du serveur

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(1)],
      ],
      role: ['investor', Validators.required],
    });
  }

  ngOnInit() {}

  async register() {
    if (this.registerForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Inscription en cours...',
        spinner: 'circular',
      });
      await loading.present();
      const user: Users = this.registerForm.value;
      this.authService.register(user).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']);
          loading.dismiss();
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription", error);
          console.log('Status', error.status);

          if (error.status === 400) {
            // Afficher les erreurs côté serveur pour chaque champ
            // this.serverErrors = error.error;
            this.serverErrors = error.error.errors;
            this.setFormErrors();
          }
          loading.dismiss();
        },
      });
    }
  }

  // Fonction pour mettre à jour les erreurs dans le formulaire
  setFormErrors() {
    Object.keys(this.serverErrors).forEach((key) => {
      const control = this.registerForm.get(key);
      if (control) {
        control.setErrors({ serverError: this.serverErrors[key] });
      }
    });
  }

  toggleUserType() {
    this.userType = this.userType === 'investor' ? 'analyst' : 'investor';
    this.registerForm.get('role')?.setValue(this.userType);
  }
}
