import { ModuleWithProviders } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

import { QuickTourRoutes } from './quick-tour/quick-tour.routes';

export const appRoutes: Routes = [
    { loadChildren: () => import('./filters/filters.module').then(m => m.FiltersModule), path: 'filters' },
    {
        loadChildren: () => import('./list-controls/list-controls.module').then(m => m.ListControlsModule),
        path: 'list-controls'
    },
    {
        loadChildren: () => import('./misc-directives/misc-directives.module').then(m => m.MiscDirectivesModule),
        path: 'misc-directives'
    },
    {
        loadChildren: () => import('./paging-and-statuses/paging-and-statuses.module').then(m => m.PagingAndStatusesModule),
        path: 'paging-and-statuses'
    },
    {
        loadChildren: () => import('./selection/selection.module').then(m => m.SelectionModule),
        path: 'selection'
    },
    {
        loadChildren: () => import('./persistence/persistence.module').then(m => m.PersistenceModule),
        path: 'persistence'
    },
    ...QuickTourRoutes,
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    preloadingStrategy: NoPreloading,
    scrollPositionRestoration: 'enabled'
});
