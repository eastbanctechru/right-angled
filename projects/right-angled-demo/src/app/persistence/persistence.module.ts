import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { PersistenceSampleComponent } from './persistence-sample/persistence-sample.component';
import { PersistenceComponent } from './persistence.component';
import { PersistenceRoutes } from './persistence.routes';

@NgModule({
    declarations: [PersistenceComponent, PersistenceSampleComponent],
    exports: [PersistenceComponent, PersistenceSampleComponent],
    imports: [CommonModule, RouterModule.forChild(PersistenceRoutes), SharedModule]
})
export class PersistenceModule {}
