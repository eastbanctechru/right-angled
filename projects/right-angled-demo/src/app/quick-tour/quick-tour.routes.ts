import { Routes } from '@angular/router';

import { QuickTourComponent } from './quick-tour.component';

export const QuickTourRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'quick-tour'
    },
    {
        component: QuickTourComponent,
        path: 'quick-tour'
    }
];
