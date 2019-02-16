import { NgModule } from '@angular/core';
import { RTModule } from 'right-angled';

import { AppComponent } from './app.component';

import { StateServiceFactory } from './state-service-factory';
import { StateServiceImplementation } from './state-service-implementation';
import { stateServiceSingleton } from './state-service-singleton';

RTModule.registerStateService({ multi: true, useClass: StateServiceImplementation });
RTModule.registerStateService({ multi: true, useFactory: StateServiceFactory });
RTModule.registerStateService({ multi: true, useValue: stateServiceSingleton });

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [RTModule]
})
export class AppModule { }
