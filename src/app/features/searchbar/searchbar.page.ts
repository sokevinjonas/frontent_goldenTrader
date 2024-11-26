import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { Publications } from 'src/app/core/interfaces/publications';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.page.html',
  styleUrls: ['./searchbar.page.scss'],
})
export class SearchbarPage implements OnInit {
  @ViewChild('searchbar', { static: false }) searchbar!: IonSearchbar;
  searchHistory: string[] = [];
  searchResults: Publications[] = [];
  showHistory = false;
  searchTerm = '';
  isLoading = false;

  constructor(private router: Router, protected globalService: GlobalService) {}

  ngOnInit() {
    this.loadSearchHistory();
  }

  // Charger l'historique depuis le localStorage
  private loadSearchHistory() {
    const storedHistory = localStorage.getItem('searchHistory');
    this.searchHistory = storedHistory ? JSON.parse(storedHistory) : [];
  }

  deletesearchHistory() {
    localStorage.removeItem('searchHistory');
    this.loadSearchHistory();
  }

  // Ajouter un terme à l'historique
  private addToSearchHistory(term: string) {
    if (!this.searchHistory.includes(term)) {
      this.searchHistory.unshift(term); // Ajouter au début
      if (this.searchHistory.length > 6) {
        this.searchHistory.pop(); // Limiter à 6 éléments
      }
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
  }

  // Quand la barre de recherche reçoit le focus
  onSearchFocus() {
    this.showHistory = true;
  }

  // Sélectionner un terme dans l'historique
  selectSearchTerm(term: string) {
    this.searchTerm = term;
    this.searchbar.value = term;
    this.showHistory = false;
    this.performSearch();
  }

  // Effectuer une recherche
  performSearch() {
    if (this.searchTerm.trim().length === 0) {
      this.clearSearchResults(); // Effacer les résultats et afficher l'historique
      return;
    }

    if (this.searchTerm.length > 3) {
      this.isLoading = true;

      this.globalService.search(this.searchTerm).subscribe({
        next: (response: any) => {
          this.isLoading = false;

          if (response.success && response.data.length > 0) {
            this.searchResults = response.data;
            this.addToSearchHistory(this.searchTerm);
            this.showHistory = false;
          } else {
            this.clearSearchResults(); // Aucun résultat trouvé
          }
        },
        error: (error) => {
          this.clearSearchResults(); // En cas d'erreur, afficher l'historique
          console.error('Erreur lors de la recherche:', error);
        },
      });
    } else {
      this.clearSearchResults(); // Terme trop court, afficher l'historique
    }
  }

  // Effacer les résultats et afficher l'historique
  private clearSearchResults() {
    this.searchResults = [];
    this.loadSearchHistory();
    this.showHistory = true;
    this.isLoading = false;
  }

  // Revenir à la page précédente
  comeBack() {
    this.searchTerm = '';
    this.clearSearchResults();
    this.router.navigate(['tabs/home']);
  }

  // Mettre le focus sur la barre de recherche après le chargement de la page
  ionViewDidEnter() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 200);
  }
}
