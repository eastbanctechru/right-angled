import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RegularListSampleComponent } from './regular-list-sample.component';

@NgModule({
    declarations: [RegularListSampleComponent],
    exports: [RegularListSampleComponent],
    imports: [CommonModule, SharedModule]
})
export class RegularListSampleModule { }
