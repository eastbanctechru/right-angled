import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DemoAppComponent }  from './demo-app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { RTListModule, RTSelectionModule, RTMiscModule } from 'right-angled';

import { routing }        from './demo-app.routing';

import { BufferedListSampleComponent } from '../+buffered-list-sample/buffered-list-sample.component';
import { GroupingSampleComponent } from '../+grouping-sample/grouping-sample.component';
import { MasterDetailSampleComponent } from '../+master-detail-sample/master-detail-sample.component';
import { PagedListSampleComponent } from '../+paged-list-sample/paged-list-sample.component';
import { RegularListSampleComponent } from '../+regular-list-sample/regular-list-sample.component';

@NgModule({
  bootstrap: [DemoAppComponent],
  declarations: [DemoAppComponent, BufferedListSampleComponent, GroupingSampleComponent, MasterDetailSampleComponent, PagedListSampleComponent, RegularListSampleComponent],
  imports: [BrowserModule, HttpModule, FormsModule, RTListModule, RTSelectionModule, RTMiscModule, routing]
})
export class AppModule { }
