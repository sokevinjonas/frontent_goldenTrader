import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router); // Injectez le Router

  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    router.navigate(['/login']);
    return false;
  }
};
