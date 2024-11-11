import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  userType = 'investor';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      userType: ['investor', Validators.required],
    });
  }

  ngOnInit() {}

  register() {
    if (this.registerForm.valid) {
      // Handle registration logic here
      console.log(this.registerForm.value);
      this.router.navigate(['/login']);
    }
  }
  toggleUserType() {
    this.userType = this.userType === 'investor' ? 'analyst' : 'investor';
    this.registerForm.get('userType')?.setValue(this.userType);
  }
}
