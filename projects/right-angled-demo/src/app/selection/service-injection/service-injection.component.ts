import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-service-injection',
    templateUrl: 'service-injection.component.html'
})
export class ServiceInjectionComponent {
    public countries: any[] = new Array<any>();
    constructor(public airportsService: AirportsService) {
        this.airportsService.getSomeCountries().subscribe(countries => (this.countries = countries));
    }
}
