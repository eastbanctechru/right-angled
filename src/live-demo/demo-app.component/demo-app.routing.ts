import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CombinedSampleRoutes } from '../+combined-sample/combined-sample.routes';
import { MiscDirectivesSampleRoutes } from '../+misc-directives-sample/misc-directives-sample.routes';
import { SelectionSampleRoutes } from '../+selection-sample/selection-sample.routes';

const appRoutes: Routes = [
    ...CombinedSampleRoutes,
    ...SelectionSampleRoutes,
    ...MiscDirectivesSampleRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
