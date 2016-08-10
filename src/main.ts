import { enableProdMode } from '@angular/core';
import { environment } from './live-demo/environment';
import { AppModule } from './live-demo/demo-app.component/demo-app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
