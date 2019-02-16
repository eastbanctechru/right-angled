import { ModuleWithProviders } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

import { QuickTourRoutes } from './quick-tour/quick-tour.routes';

export const appRoutes: Routes = [
    { loadChildren: './filters/filters.module#FiltersModule', path: 'filters' },
    {
        loadChildren: './list-controls/list-controls.module#ListControlsModule',
        path: 'list-controls'
    },
    {
        loadChildren: './misc-directives/misc-directives.module#MiscDirectivesModule',
        path: 'misc-directives'
    },
    {
        loadChildren: './paging-and-statuses/paging-and-statuses.module#PagingAndStatusesModule',
        path: 'paging-and-statuses'
    },
    {
        loadChildren: './selection/selection.module#SelectionModule',
        path: 'selection'
    },
    {
        loadChildren: './persistence/persistence.module#PersistenceModule',
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
