import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-select-all',
    templateUrl: 'select-all.component.html'
})
export class SelectAllComponent {
    public regions: any;
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getRegionsWithCountriesAndAirports();
    }
}
