import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-basic-usage',
    templateUrl: 'basic-usage.component.html'
})
export class BasicUsageComponent {
    public countries: any;
    constructor(public airportsService: AirportsService) {
        this.countries = this.airportsService.get5Countries()
            .map(countries => countries.map(country => ({ name: country, selected: false })))
            .share();
    }
}
