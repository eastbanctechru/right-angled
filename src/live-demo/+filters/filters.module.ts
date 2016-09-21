import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FiltersComponent } from './filters.component';

@NgModule({
    declarations: [FiltersComponent],
    exports: [FiltersComponent],
    imports: [CommonModule, SharedModule]
})
export class FiltersModule {
}
