import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MiscDirectivesSampleComponent } from './misc-directives-sample.component';

@NgModule({
    declarations: [MiscDirectivesSampleComponent],
    exports: [MiscDirectivesSampleComponent],
    imports: [CommonModule]
})
export class MiscDirectivesSampleModule { }
