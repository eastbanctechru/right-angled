import { Routes } from '@angular/router';

import { CombinedSampleComponent } from './combined-sample.component';

export const CombinedSampleRoutes: Routes = [
    {
        component: CombinedSampleComponent,
        path: ''
    },
    {
        component: CombinedSampleComponent,
        path: 'combined'
    }
];
