import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Users } from '../interfaces/users';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = 'auth_token_golend_trader';
  private apiUrl = environment.apiUrl; // Remplacez par votre URL API
  userInfo: Users | null = null;

  // Stocker le token dans le localStorage
  setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }
  constructor(private http: HttpClient) {}

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    // const token = this.getToken();
    const token = this.getInfoUser();
    if (!token) {
      return false; // Pas de token, donc non authentifié
    }

    // Vérifiez si le token est expiré
    const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
    if (token.exp && currentTime >= token.exp) {
      return false; // Le token a expiré
    }
    return !!token; // Retourne true si le token est présent
  }

  // Méthode pour obtenir les informations de l'utilisateur à partir du token
  getInfoUser(): any {
    const token = this.getToken();
    if (token) {
      try {
        this.userInfo = jwtDecode(token);
        // console.log(this.userInfo);
        return this.userInfo; // Décode le token et retourne les données
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
      }
    }
    return null; // Retourne null si pas de token
  }

  // Méthode pour se connecter
  login(user: Users): Observable<any> {
    // intercepter la réponse de l'API après la connexion
    return this.http.post(`${this.apiUrl}login`, user).pipe(
      tap((response: any) => {
        // Vérifier si le token est présent dans la réponse
        if (response && response.token) {
          this.setToken(response.token); // Stocker le token
        }
      })
    );
  }

  // Récupérer le token depuis le localStorage
  getToken(): string | null {
    const token = localStorage.getItem(this.token);
    // console.log('Token récupéré:', token); // Ajoutez ceci pour vérifier le token
    return token;
  }

  // Méthode pour s'inscrire
  register(user: Users): Observable<any> {
    return this.http.post(`${this.apiUrl}register`, user);
  }
}
