import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Posts, Publications } from '../interfaces/publications';
import { Network } from '@capacitor/network';
import { PostImages } from '../interfaces/postimage';
import { LoadingController } from '@ionic/angular';

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
  // Méthode pour récupérer les détails user par ID
  getUserPublications(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}publication/${userId}`);
  }
  // Méthode pour récupérer status et List d'un investor qui suit
  checkFollowStatusAndList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}check-follow`);
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

  async allPublication() {
    const loading = await this.loadingController.create({
      message: 'Chargement...',
      spinner: 'circular',
    });
    await loading.present();
    this.FilActualisation().subscribe({
      next: (data) => {
        this.posts = data.data;
        console.log(this.posts);
        loading.dismiss();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des publications', error);
        loading.dismiss();
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
}
