import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-custom-track-by',
    templateUrl: 'custom-track-by.component.html'
})
export class CustomTrackByComponent {
    public countries: Array<string> = [];
    constructor(public airportsService: AirportsService) {
        this.reload();
    }
    public convertToSelectable(countries: Array<string>): Array<any> {
        return countries.map(country => ({ name: country, selected: false }));
    }
    public reload(): void {
        this.countries = [];
        this.airportsService.getTop5Countries(700)
            .subscribe(countries => this.countries = this.convertToSelectable(countries));
    }
    public trackByName(index: number, country: any): string {
        return country.name;
    }
}
