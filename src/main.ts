import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';
import { enableProdMode } from '@angular/core';
// Call the element loader before the bootstrapModule/bootstrapApplication call
defineCustomElements(window);
if (environment) {
  enableProdMode();
}
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
