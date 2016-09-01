import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BufferedListSampleComponent } from './buffered-list-sample.component';

@NgModule({
    declarations: [BufferedListSampleComponent],
    exports: [BufferedListSampleComponent],
    imports: [CommonModule, SharedModule]
})
export class BufferedListSampleModule { }
