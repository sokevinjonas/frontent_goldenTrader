import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  protected apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  // Méthode pour récupérer la liste des publications
  FilActualisation(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}publication`);
  }

  // Méthode pour suivre un utilisateur
  followUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}follow/${userId}`;
    return this.http.post(url, {});
  }

  // Méthode pour arrêter de suivre un utilisateur
  unfollowUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}unfollow/${userId}`;
    return this.http.delete(url);
  }
  // Méthode pour calculer le temps écoulé
  getTimeAgo(dateString: string): string {
    const now = new Date();
    const notificationDate = new Date(dateString);
    const seconds = Math.floor(
      (now.getTime() - notificationDate.getTime()) / 1000
    );

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return ` Il y a ${seconds} seconde${seconds > 1 ? 's' : ''} `;
    } else if (minutes < 60) {
      return ` Il y a ${minutes} minute${minutes > 1 ? 's' : ''} `;
    } else if (hours < 24) {
      return ` Il y a ${hours} heure${hours > 1 ? 's' : ''} `;
    } else {
      return `Il y a ${days} jour${days > 1 ? 's' : ''} `;
    }
  }
}
