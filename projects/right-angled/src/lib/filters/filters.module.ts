import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterAsFilterDirective } from './register-as-filter.directive';

@NgModule({
    declarations: [RegisterAsFilterDirective],
    exports: [RegisterAsFilterDirective],
    imports: [CommonModule]
})
export class RTFiltersModule {}
export { RegisterAsFilterDirective } from './register-as-filter.directive';
export { RTFiltersService } from './filters.service';
export { filter, DefaultFilterConfig } from './filter.annotation';
