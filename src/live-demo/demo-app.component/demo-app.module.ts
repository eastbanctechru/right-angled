import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RTModule } from 'right-angled';
import { RtLocalStoragePersistenceService, RtQueryStringStateService, RtSessionStoragePersistenceService, registerPersistenceService } from 'right-angled';

import { CombinedSampleModule } from '../+combined-sample/combined-sample.module';
import { MiscDirectivesSampleModule } from '../+misc-directives-sample/misc-directives-sample.module';
import { SelectionSampleModule } from '../+selection-sample/selection-sample.module';
import { SharedModule } from '../shared/shared.module';

import { DemoAppComponent }  from './demo-app.component';
import { routing }        from './demo-app.routing';

registerPersistenceService({multi: true, useClass: RtQueryStringStateService});
registerPersistenceService({multi: true, useClass: RtSessionStoragePersistenceService});
registerPersistenceService({multi: true, useClass: RtLocalStoragePersistenceService});

@NgModule({
  bootstrap: [DemoAppComponent],
  declarations: [DemoAppComponent],
  imports: [BrowserModule, HttpModule, FormsModule, RTModule, routing, CombinedSampleModule, MiscDirectivesSampleModule, SelectionSampleModule, SharedModule]
})
export class AppModule { }
