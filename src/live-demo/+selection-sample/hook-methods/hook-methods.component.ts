import { Component } from '@angular/core';

import { AirportsService } from '../../shared';
import { CountryWithHooks } from './country-with-hooks';

@Component({
    selector: 'rt-demo-hook-methods',
    templateUrl: 'hook-methods.component.html'
})
export class HooksMethodsComponent {
    public countries: any;
    constructor(public airportsService: AirportsService) {
        this.countries = this.airportsService.get5Countries()
            .map(countries => countries.map(country => new CountryWithHooks(country)))
            .share();
    }
}
