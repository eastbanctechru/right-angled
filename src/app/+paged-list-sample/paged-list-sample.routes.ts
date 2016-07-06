import { RouterConfig } from '@angular/router';

import { PagedListSampleComponent }   from './paged-list-sample.component';

export const PagedListSampleRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: '/paged-list',
        terminal: true
    },
    {
        component: PagedListSampleComponent,
        path: 'paged-list'
    }
];
