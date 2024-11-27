import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Posts, Publications } from '../interfaces/publications';
import { Network } from '@capacitor/network';
import { PostImages } from '../interfaces/postimage';
import { LoadingController } from '@ionic/angular';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  BASE_URL = 'http://localhost:8000'; // URL de votre Laravel local
  posts: Publications[] = [];
  isConnected: Boolean = false;
  protected apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController
  ) {}

  logCurrentNetworkStatus = async () => {
    const status = await Network.getStatus();
    if (status.connected) {
      this.isConnected = true;
    } else {
      this.isConnected = false;
    }
    console.log('Network status:', status);
  };
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
  // Méthode pour récupérer les détails user par ID
  getUserPublications(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}publication/${userId}`);
  }
  // Méthode pour récupérer status et List d'un investor qui suit
  isFollowing(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}is-following/${userId}`);
  }
  // Methide pour afficher les analyst de son chois
  getUserIsAnalyste(): Observable<any> {
    return this.http.get(`${this.apiUrl}choose-analyst`);
  }

  decodeImages(images: string | PostImages[] | null): PostImages[] {
    if (!images) {
      return [];
    }

    if (Array.isArray(images)) {
      return images.map((image) => ({
        ...image,
        path: `${this.BASE_URL}${image.path.replace(/\\/g, '')}`,
      }));
    }

    try {
      const parsedImages = JSON.parse(images);
      return parsedImages.map((image: PostImages) => ({
        ...image,
        path: `${this.BASE_URL}${image.path.replace(/\\/g, '')}`,
      }));
    } catch (error) {
      console.error('Erreur lors du décodage des images :', error);
      return [];
    }
  }
  FilActualisation(): Observable<any> {
    return this.http.get(`${this.apiUrl}publication`);
  }

  async allPublication() {
    const loading = await this.loadingController.create({
      message: 'Chargement...',
      spinner: 'circular',
    });
    await loading.present();

    this.FilActualisation().subscribe({
      next: (data) => {
        this.posts = data.data; // Ajoute les publications à la liste
        console.log(this.posts); // Affiche la liste mise à jour
        loading.dismiss(); // Cache le loader après réception des données
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des publications', error);
        loading.dismiss(); // Cache le loader après réception des données
      },
      complete: () => {
        loading.dismiss(); // Cache le loader après réception des données
      },
    });
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

  // Méthode pour créer une publication en utilisant l'objet Publications dans mon service
  createPublication(data: FormData | Posts): Observable<any> {
    if (data instanceof FormData) {
      return this.http.post(`${this.apiUrl}publication`, data);
    } else {
      const formData = new FormData();
      formData.append('content', data.content);

      if (data.images) {
        data.images.forEach((img, index) => {
          formData.append(`image[${index}]`, img);
        });
      }
      console.log('Contenue de ', formData);

      return this.http.post(`${this.apiUrl}publication`, formData);
    }
  }
  search(query: string) {
    return this.http.get(`${this.apiUrl}search`, {
      params: { query }, // Envoie le paramètre dans la requête GET
    });
  }
}
