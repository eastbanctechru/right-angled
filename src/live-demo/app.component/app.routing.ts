import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdditionalConfigurationRoutes } from '../+additional-configuration/additional-configuration.routes';
import { CombinedSampleRoutes } from '../+combined-sample/combined-sample.routes';
import { FiltersRoutes } from '../+filters/filters.routes';
import { ListControlsRoutes } from '../+list-controls/list-controls.routes';
import { MiscDirectivesRoutes } from '../+misc-directives/misc-directives.routes';
import { PagingAndStatesRoutes } from '../+paging-and-state/paging-and-state.routes';
import { PersistenceRoutes } from '../+persistence/persistence.routes';
import { SelectionRoutes } from '../+selection/selection.routes';
import { SortingsRoutes } from '../+sortings/sortings.routes';

const appRoutes: Routes = [
    ...AdditionalConfigurationRoutes,
    ...CombinedSampleRoutes,
    ...FiltersRoutes,
    ...ListControlsRoutes,
    ...SelectionRoutes,
    ...MiscDirectivesRoutes,
    ...PagingAndStatesRoutes,
    ...PersistenceRoutes,
    ...SortingsRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
