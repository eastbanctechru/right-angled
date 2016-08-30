import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RTModule } from 'right-angled';
import { RtLocalStoragePersistenceService, RtQueryStringStateService, RtSessionStoragePersistenceService, registerPersistenceService } from 'right-angled';

import { BufferedListSampleComponent } from '../+buffered-list-sample/buffered-list-sample.component';
import { GroupingSampleComponent } from '../+grouping-sample/grouping-sample.component';
import { MasterDetailSampleComponent } from '../+master-detail-sample/master-detail-sample.component';
import { MiscDirectivesSampleComponent } from '../+misc-directives-sample/misc-directives-sample.component';
import { PagedListSampleComponent } from '../+paged-list-sample/paged-list-sample.component';
import { RegularListSampleComponent } from '../+regular-list-sample/regular-list-sample.component';
import { SelectionSampleComponent } from '../+selection-sample/selection-sample.component';
import { DemoAppComponent }  from './demo-app.component';
import { routing }        from './demo-app.routing';

registerPersistenceService({multi: true, useClass: RtQueryStringStateService});
registerPersistenceService({multi: true, useClass: RtSessionStoragePersistenceService});
registerPersistenceService({multi: true, useClass: RtLocalStoragePersistenceService});

@NgModule({
  bootstrap: [DemoAppComponent],
  declarations: [DemoAppComponent, BufferedListSampleComponent, GroupingSampleComponent, MasterDetailSampleComponent, PagedListSampleComponent, RegularListSampleComponent, SelectionSampleComponent, MiscDirectivesSampleComponent],
  imports: [BrowserModule, HttpModule, FormsModule, RTModule, routing]
})
export class AppModule { }
