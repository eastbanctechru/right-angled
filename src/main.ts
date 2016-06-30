import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { APP_ROUTER_PROVIDERS, DemoAppComponent, environment } from './app/';

if (environment.production) {
  enableProdMode();
}
bootstrap(DemoAppComponent, [APP_ROUTER_PROVIDERS]);
