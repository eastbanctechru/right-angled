import { Routes } from '@angular/router';

import { PagedListSampleComponent }   from './paged-list-sample.component';

export const PagedListSampleRoutes: Routes = [
    {
        path: '',
        pathMatch : 'full',
        redirectTo: '/paged-list'
    },
    {
        component: PagedListSampleComponent,
        path: 'paged-list'
    }
];
