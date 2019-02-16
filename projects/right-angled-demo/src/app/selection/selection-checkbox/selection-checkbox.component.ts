import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-selection-checkbox',
    styleUrls: ['selection-checkbox.component.scss'],
    templateUrl: 'selection-checkbox.component.html'
})
export class SelectionCheckboxComponent {
    public regions: any;
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getRegionsWithCountriesAndAirports();
    }
}
