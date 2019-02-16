import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-selected-ref',
    templateUrl: 'selected-ref.component.html'
})
export class SelectedRefComponent {
    public countries: any[] = new Array<any>();
    constructor(public airportsService: AirportsService) {
        this.airportsService.getSomeCountries().subscribe(countries => (this.countries = countries));
    }
}
