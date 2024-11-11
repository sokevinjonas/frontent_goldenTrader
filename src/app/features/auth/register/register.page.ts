import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
      role: ['investor', Validators.required],
    });
  }

  ngOnInit() {}

  register() {
    if (this.registerForm.valid) {
      const user: Users = this.registerForm.value;
      this.authService.register(user).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription", error);
          // Gérer les erreurs (afficher un message d'erreur)
        },
      });
    }
  }
  toggleUserType() {
    this.userType = this.userType === 'investor' ? 'analyst' : 'investor';
    this.registerForm.get('userType')?.setValue(this.userType);
  }
}
