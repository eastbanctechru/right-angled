import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-select-all',
    styleUrls: ['select-all.component.css'],
    templateUrl: 'select-all.component.html'
})
export class SelectAllComponent {
    public regions: any;
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getRegionsWithCountriesAndAirports();
    }
}
