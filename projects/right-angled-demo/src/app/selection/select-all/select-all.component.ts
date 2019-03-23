import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-select-all',
    templateUrl: 'select-all.component.html'
})
export class SelectAllComponent {
    public regions$: Observable<any[]>;
    constructor(public airportsService: AirportsService) {
        this.regions$ = this.airportsService.getRegionsWithCountriesAndAirports();
    }
}
