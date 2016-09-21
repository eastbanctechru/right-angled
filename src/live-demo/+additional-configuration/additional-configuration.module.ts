import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdditionalConfigurationComponent } from './additional-configuration.component';

@NgModule({
    declarations: [AdditionalConfigurationComponent],
    exports: [AdditionalConfigurationComponent],
    imports: [CommonModule, SharedModule]
})
export class AdditionalConfigurationModule {
}
