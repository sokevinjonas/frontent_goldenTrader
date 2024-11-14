import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.page.html',
  styleUrls: ['./searchbar.page.scss'],
})
export class SearchbarPage implements OnInit {
  @ViewChild('searchbar', { static: false }) searchbar!: IonSearchbar;
  constructor(private router: Router) {}

  ngOnInit() {}
  comeBack() {
    this.router.navigate(['/tabs/home']);
  }
  ionViewDidEnter() {
    // Assure le focus automatique sur la barre de recherche
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 200); // Utilise un léger délai pour assurer le chargement de la page
  }
}
