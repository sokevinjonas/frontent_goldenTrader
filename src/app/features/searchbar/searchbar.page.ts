import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { Publications } from 'src/app/core/interfaces/publications';
import { GlobalService } from 'src/app/core/services/global.service';
import { MockDataService } from 'src/app/core/services/mock-data.service';

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

  constructor(
    private router: Router,
    private mockDataService: MockDataService,
    protected globalService: GlobalService
  ) {}

  ngOnInit() {
    // Charger l'historique des recherches depuis le service
    this.searchHistory = this.mockDataService.getSearchHistory();
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
    if (this.searchTerm.trim()) {
      this.isLoading = true;
      // Ajouter le terme à l'historique
      this.mockDataService.addToSearchHistory(this.searchTerm);

      /// Appeler le service global pour la recherche
      this.globalService.search(this.searchTerm).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.searchResults = response.data; // Stocke les résultats
            console.log('Stocke les résultats', this.searchResults);
          } else {
            console.warn('Aucun résultat trouvé.');
          }
          this.isLoading = false;
          this.showHistory = false;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche:', error);
          this.isLoading = false;
        },
      });
    }
  }

  // Revenir à la page précédente
  comeBack() {
    if (this.searchTerm.trim()) {
      const confirmLeave = confirm(
        'Voulez-vous vraiment quitter la recherche ?'
      );
      if (!confirmLeave) return;
    }
    this.searchTerm = '';
    this.showHistory = false;
    this.router.navigate(['tabs/home']);
  }

  // Mettre le focus sur la barre de recherche après le chargement de la page
  ionViewDidEnter() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 200);
  }
}
