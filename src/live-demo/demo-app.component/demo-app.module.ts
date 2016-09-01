import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RTModule } from 'right-angled';
import { RtLocalStoragePersistenceService, RtQueryStringStateService, RtSessionStoragePersistenceService, registerPersistenceService } from 'right-angled';

import { BufferedListSampleModule } from '../+buffered-list-sample/buffered-list-sample.module';
import { GroupingSampleModule } from '../+grouping-sample/grouping-sample.module';
import { MasterDetailSampleModule } from '../+master-detail-sample/master-detail-sample.module';
import { MiscDirectivesSampleModule } from '../+misc-directives-sample/misc-directives-sample.module';
import { PagedListSampleModule } from '../+paged-list-sample/paged-list-sample.module';
import { RegularListSampleModule } from '../+regular-list-sample/regular-list-sample.module';
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
  imports: [BrowserModule, HttpModule, FormsModule, RTModule, routing, MiscDirectivesSampleModule, PagedListSampleModule, BufferedListSampleModule, GroupingSampleModule, MasterDetailSampleModule, RegularListSampleModule, SelectionSampleModule, SharedModule]
})
export class AppModule { }
