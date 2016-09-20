import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-service-injection',
    templateUrl: 'service-injection.component.html'
})
export class ServiceInjectionComponent {
    public countries: any;
    constructor(public airportsService: AirportsService) {
        this.countries = this.airportsService.getSomeCountries()
            .map(countries => countries.map(country => ({ name: country, selected: false })))
            .share();
    }
}
