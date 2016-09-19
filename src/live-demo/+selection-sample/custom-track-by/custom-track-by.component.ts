import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-custom-track-by',
    templateUrl: 'custom-track-by.component.html'
})
export class CustomTrackByComponent {
    public countries: Array<any> = [];
    constructor(public airportsService: AirportsService) {
        this.reload();
    }
    public reload(): void {
        this.countries = [];
        this.airportsService
            .get5Countries(700)
            .subscribe(countries => this.countries = countries.map(country => ({ name: country, selected: false })));
    }
    public trackByName(index: number, country: any): string {
        return country.name;
    }
}
