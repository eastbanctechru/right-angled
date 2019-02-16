import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { SharedModule } from '../shared/shared.module';
import { InfiniteSampleComponent } from './infinite-sample/infinite-sample.component';
import { PagingAndStatusesComponent } from './paging-and-statuses.component';
import { PagingAndStatusesRoutes } from './paging-and-statuses.routes';
import { ReusableBufferedListSampleComponent } from './reusable-buffered-sample/reusable-buffered-sample.component';
import { ReusablePagedListSampleComponent } from './reusable-paged-sample/reusable-paged-sample.component';
import { StatusComponentsComponent } from './status-components/status-components.component';
import { VirtualScrollSampleComponent } from './virtual-scroll-sample/virtual-scroll-sample.component';

@NgModule({
    declarations: [
        InfiniteSampleComponent,
        VirtualScrollSampleComponent,
        ReusableBufferedListSampleComponent,
        ReusablePagedListSampleComponent,
        PagingAndStatusesComponent,
        StatusComponentsComponent
    ],
    exports: [
        InfiniteSampleComponent,
        VirtualScrollSampleComponent,
        ReusableBufferedListSampleComponent,
        ReusablePagedListSampleComponent,
        PagingAndStatusesComponent,
        StatusComponentsComponent
    ],
    imports: [CommonModule, RouterModule.forChild(PagingAndStatusesRoutes), SharedModule, ScrollingModule]
})
export class PagingAndStatusesModule {}
