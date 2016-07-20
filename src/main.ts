import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { APP_ROUTER_PROVIDERS, DemoAppComponent, environment } from './live-demo';

if (environment.production) {
  enableProdMode();
}
bootstrap(DemoAppComponent, [APP_ROUTER_PROVIDERS, HTTP_PROVIDERS]);
