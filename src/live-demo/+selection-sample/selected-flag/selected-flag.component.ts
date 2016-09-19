import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-selected-flag',
    templateUrl: 'selected-flag.component.html'
})
export class SelectedFlagComponent {
    public countries: any;
    constructor(public airportsService: AirportsService) {
        this.countries = this.airportsService.get5Countries()
            .map(this.convertToSelectable)
            .share();
    }
    public convertToSelectable(countries: Array<string>): Array<any> {
        return countries.map(country => ({ name: country, selected: false }));
    }
}
