import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CoerceSampleComponent } from './coerce-sample/coerce-sample.component';
import { DefaultValueSampleComponent } from './default-value-sample/default-value-sample.component';
import { EmptyIsNullSampleComponent } from './empty-is-null-sample/empty-is-null-sample.component';
import { FiltersSampleComponent } from './filters-sample/filters-sample.component';
import { FiltersComponent } from './filters.component';
import { FiltersRoutes } from './filters.routes';
import { IgnoreOnAutoMapSampleComponent } from './ignore-on-auto-map-sample/ignore-on-auto-map-sample.component';
import { OmitIfNullSampleComponent } from './omit-if-null-or-undefined-sample/omit-if-null-or-undefined-sample.component';
import { ParameterNameSampleComponent } from './parameter-name-sample/parameter-name-sample.component';
import { RegisterAsFilterSampleComponent } from './register-as-filter-sample/register-as-filter-sample.component';

@NgModule({
    declarations: [
        FiltersComponent,
        FiltersSampleComponent,
        CoerceSampleComponent,
        DefaultValueSampleComponent,
        EmptyIsNullSampleComponent,
        IgnoreOnAutoMapSampleComponent,
        OmitIfNullSampleComponent,
        ParameterNameSampleComponent,
        RegisterAsFilterSampleComponent
    ],
    exports: [
        FiltersComponent,
        FiltersSampleComponent,
        CoerceSampleComponent,
        DefaultValueSampleComponent,
        EmptyIsNullSampleComponent,
        IgnoreOnAutoMapSampleComponent,
        OmitIfNullSampleComponent,
        ParameterNameSampleComponent,
        RegisterAsFilterSampleComponent
    ],
    imports: [CommonModule, SharedModule, RouterModule.forChild(FiltersRoutes)]
})
export class FiltersModule {}
