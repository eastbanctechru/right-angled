import { RouterConfig, provideRouter } from '@angular/router';

import { BufferedListSampleRoutes } from './+buffered-list-sample/buffered-list-sample.routes';
import { GroupingSampleRoutes } from './+grouping-sample/grouping-sample.routes';
import { MasterDetailSampleRoutes } from './+master-detail-sample/master-detail-sample.routes';
import { PagedListSampleRoutes } from './+paged-list-sample/paged-list-sample.routes';
import { RegularListSampleRoutes } from './+regular-list-sample/regular-list-sample.routes';

const appRoutes: RouterConfig = [
    ...BufferedListSampleRoutes,
    ...GroupingSampleRoutes,
    ...MasterDetailSampleRoutes,
    ...PagedListSampleRoutes,
    ...RegularListSampleRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(appRoutes)
];
