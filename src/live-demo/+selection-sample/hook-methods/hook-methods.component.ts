import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-hook-methods',
    templateUrl: 'hook-methods.component.html'
})
export class HooksMethodsComponent {
    public countries: any;
    constructor(public airportsService: AirportsService) {
        this.countries = this.airportsService.getCountries();
    }
}
