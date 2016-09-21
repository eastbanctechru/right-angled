import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RTModule } from 'right-angled';
import { RtLocalStoragePersistenceService, RtQueryStringStateService, RtSessionStoragePersistenceService, registerPersistenceService } from 'right-angled';

import { CombinedSampleModule } from '../+combined-sample/combined-sample.module';
import { MiscDirectivesModule } from '../+misc-directives/misc-directives.module';
import { SelectionModule } from '../+selection/selection.module';
import { SharedModule } from '../shared/shared.module';

import { DemoAppComponent }  from './app.component';
import { routing }        from './app.routing';

registerPersistenceService({multi: true, useClass: RtQueryStringStateService});
registerPersistenceService({multi: true, useClass: RtSessionStoragePersistenceService});
registerPersistenceService({multi: true, useClass: RtLocalStoragePersistenceService});

@NgModule({
  bootstrap: [DemoAppComponent],
  declarations: [DemoAppComponent],
  imports: [BrowserModule, HttpModule, FormsModule, RTModule, routing, CombinedSampleModule, MiscDirectivesModule, SelectionModule, SharedModule]
})
export class AppModule { }
