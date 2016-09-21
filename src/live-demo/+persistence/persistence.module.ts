import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PersistenceComponent } from './persistence.component';

@NgModule({
    declarations: [PersistenceComponent],
    exports: [PersistenceComponent],
    imports: [CommonModule, SharedModule]
})
export class PersistenceModule {
}
