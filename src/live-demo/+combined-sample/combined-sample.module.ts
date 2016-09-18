import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CombinedSampleComponent } from './combined-sample.component';
import { ListSampleComponent } from './list-sample/list-sample.component';

@NgModule({
    declarations: [CombinedSampleComponent, ListSampleComponent],
    exports: [CombinedSampleComponent, ListSampleComponent],
    imports: [CommonModule, SharedModule]
})
export class CombinedSampleModule {
}
