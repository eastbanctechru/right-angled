import { RouterConfig, provideRouter } from '@angular/router';
import { PagedListSampleComponent } from './paged-list-sample/paged-list-sample.component';
import { BufferedListSampleComponent } from './buffered-list-sample/buffered-list-sample.component';
import { RegularListSampleComponent } from './regular-list-sample/regular-list-sample.component';
import { MasterDetailSampleComponent } from './master-detail-sample/master-detail-sample.component';
import { GroupingSampleComponent } from './grouping-sample/grouping-sample.component';

const routes: RouterConfig = [
    {
        path: '',
        redirectTo: '/paged-list',
        terminal: true
    },
    {
        component: PagedListSampleComponent,
        path: 'paged-list'
    },
    {
        component: BufferedListSampleComponent,
        path: 'buffered-list'
    },
    {
        component: RegularListSampleComponent,
        path: 'regular-list'
    },
    {
        component: MasterDetailSampleComponent,
        path: 'master-detail'
    },
    {
        component: GroupingSampleComponent,
        path: 'grouping'
    }
];
export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
