import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RTFiltersModule, RTListModule, RTMiscModule, RTSelectionModule } from 'right-angled';
import { RtLocalStoragePersistenceService, RtQueryStringStateService, RtSessionStoragePersistenceService, registerPersistenceService } from 'right-angled';

import { BufferedListSampleComponent } from '../+buffered-list-sample/buffered-list-sample.component';
import { GroupingSampleComponent } from '../+grouping-sample/grouping-sample.component';
import { MasterDetailSampleComponent } from '../+master-detail-sample/master-detail-sample.component';
import { PagedListSampleComponent } from '../+paged-list-sample/paged-list-sample.component';
import { RegularListSampleComponent } from '../+regular-list-sample/regular-list-sample.component';
import { DemoAppComponent }  from './demo-app.component';
import { routing }        from './demo-app.routing';

registerPersistenceService({multi: true, useClass: RtQueryStringStateService});
registerPersistenceService({multi: true, useClass: RtSessionStoragePersistenceService});
registerPersistenceService({multi: true, useClass: RtLocalStoragePersistenceService});

@NgModule({
  bootstrap: [DemoAppComponent],
  declarations: [DemoAppComponent, BufferedListSampleComponent, GroupingSampleComponent, MasterDetailSampleComponent, PagedListSampleComponent, RegularListSampleComponent],
  imports: [BrowserModule, HttpModule, FormsModule, RTListModule, RTSelectionModule, RTMiscModule, RTFiltersModule, routing]
})
export class AppModule { }
