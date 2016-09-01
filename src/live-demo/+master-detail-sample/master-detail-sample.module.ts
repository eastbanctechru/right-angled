import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MasterDetailSampleComponent } from './master-detail-sample.component';

@NgModule({
    declarations: [MasterDetailSampleComponent],
    exports: [MasterDetailSampleComponent],
    imports: [CommonModule, SharedModule]
})
export class MasterDetailSampleModule { }
