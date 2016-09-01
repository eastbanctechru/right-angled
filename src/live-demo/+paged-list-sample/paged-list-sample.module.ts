import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PagedListSampleComponent } from './paged-list-sample.component';

@NgModule({
    declarations: [PagedListSampleComponent],
    exports: [PagedListSampleComponent],
    imports: [CommonModule, SharedModule]
})
export class PagedListSampleModule { }
