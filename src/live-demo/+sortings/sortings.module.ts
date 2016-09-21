import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SortingsComponent } from './sortings.component';

@NgModule({
    declarations: [SortingsComponent],
    exports: [SortingsComponent],
    imports: [CommonModule, SharedModule]
})
export class SortingsModule {
}
