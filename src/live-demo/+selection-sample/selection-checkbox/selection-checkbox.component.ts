import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-selection-checkbox',
    styleUrls: ['selection-checkbox.component.css'],
    templateUrl: 'selection-checkbox.component.html'
})
export class SelectionCheckboxComponent {
    public regions: any;
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getRegionsWithCountriesAndAirports();
    }
}
