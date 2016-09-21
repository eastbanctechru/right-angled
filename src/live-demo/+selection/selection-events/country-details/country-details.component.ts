import { Component, Input } from '@angular/core';

import { AirportsService } from '../../../shared';

@Component({
    selector: 'rt-demo-country-details',
    templateUrl: 'country-details.component.html'
})
export class CountryDetailsComponent {
    @Input() public country: string;
    @Input() public index: string;
    public selected: boolean = false;
    public countryInfo: any = null;
    constructor(private airportsService: AirportsService) {
    }
    public onSelected(): void {
        this.selected = true;
        this.countryInfo = this.airportsService.getCountryInfo(this.country);
    }
    public onDeselected(): void {
        this.selected = false;
        this.countryInfo = null;
    }
}
