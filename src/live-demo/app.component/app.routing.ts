import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CombinedSampleRoutes } from '../+combined-sample/combined-sample.routes';
import { MiscDirectivesRoutes } from '../+misc-directives/misc-directives.routes';
import { SelectionRoutes } from '../+selection/selection.routes';

const appRoutes: Routes = [
    ...CombinedSampleRoutes,
    ...SelectionRoutes,
    ...MiscDirectivesRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
