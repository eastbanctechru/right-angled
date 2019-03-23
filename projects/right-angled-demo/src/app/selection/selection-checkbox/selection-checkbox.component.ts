import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-selection-checkbox',
    styleUrls: ['selection-checkbox.component.scss'],
    templateUrl: 'selection-checkbox.component.html'
})
export class SelectionCheckboxComponent {
    public regions$: Observable<any[]>;
    constructor(public airportsService: AirportsService) {
        this.regions$ = this.airportsService.getRegionsWithCountriesAndAirports();
    }
}
