import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-custom-track-by',
    templateUrl: 'custom-track-by.component.html'
})
export class CustomTrackByComponent {
    public countries: any = [];
    constructor(public airportsService: AirportsService) {
        this.reload();
    }
    public reload(): void {
        this.countries = [];
        this.airportsService.getSomeCountries(5, 700).subscribe(countries => (this.countries = countries));
    }
    public trackByName(index: number, country: any): string {
        return country.name;
    }
}
