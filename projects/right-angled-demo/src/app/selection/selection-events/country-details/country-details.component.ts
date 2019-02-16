import { Component, Input } from '@angular/core';

import { AirportsService } from '../../../shared';

@Component({
    selector: 'rt-demo-country-details',
    templateUrl: 'country-details.component.html'
})
export class CountryDetailsComponent {
    @Input() public country: any;
    public selected = false;
    public loading = false;
    public countryInfo: any = null;
    constructor(private airportsService: AirportsService) {}
    public onSelected(): void {
        this.selected = true;
        this.loading = true;
        this.airportsService.getCountryInfo(this.country.name).subscribe(countryInfo => {
            this.countryInfo = countryInfo;
            this.loading = false;
        });
    }
    public onDeselected(): void {
        this.selected = false;
        this.countryInfo = null;
    }
}
