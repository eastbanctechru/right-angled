import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-selected-two-way',
    templateUrl: 'selected-two-way.component.html'
})
export class SelectedTwoWayComponent {
    public countries: any[] = new Array<any>();
    constructor(public airportsService: AirportsService) {
        this.airportsService.getSomeCountries().subscribe(
            countries =>
                (this.countries = countries.map(country => ({
                    name: country.name,
                    selected: false
                })))
        );
    }
}
