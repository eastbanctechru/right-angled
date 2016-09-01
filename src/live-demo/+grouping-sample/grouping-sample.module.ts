import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GroupingSampleComponent } from './grouping-sample.component';

@NgModule({
    declarations: [GroupingSampleComponent],
    exports: [GroupingSampleComponent],
    imports: [CommonModule, SharedModule]
})
export class GroupingSampleModule { }
