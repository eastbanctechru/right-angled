import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BufferedListSampleRoutes } from '../+buffered-list-sample/buffered-list-sample.routes';
import { GroupingSampleRoutes } from '../+grouping-sample/grouping-sample.routes';
import { MasterDetailSampleRoutes } from '../+master-detail-sample/master-detail-sample.routes';
import { PagedListSampleRoutes } from '../+paged-list-sample/paged-list-sample.routes';
import { RegularListSampleRoutes } from '../+regular-list-sample/regular-list-sample.routes';

const appRoutes: Routes = [
    ...BufferedListSampleRoutes,
    ...GroupingSampleRoutes,
    ...MasterDetailSampleRoutes,
    ...PagedListSampleRoutes,
    ...RegularListSampleRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
