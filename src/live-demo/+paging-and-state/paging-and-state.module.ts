import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PagingAndStateComponent } from './paging-and-state.component';

@NgModule({
    declarations: [PagingAndStateComponent],
    exports: [PagingAndStateComponent],
    imports: [CommonModule, SharedModule]
})
export class PagingAndStateModule {
}
