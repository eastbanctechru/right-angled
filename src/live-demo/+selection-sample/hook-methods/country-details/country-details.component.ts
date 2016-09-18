import { Component, Input } from '@angular/core';

import { AirportsService } from '../../../shared';
import { OnDeselected, OnSelected } from 'right-angled';

@Component({
    selector: 'rt-demo-country-details',
    styleUrls: ['country-details.component.scss'],
    templateUrl: 'country-details.component.html'
})
export class CountryDetailsComponent implements OnSelected, OnDeselected {
    @Input() public country: string;
    @Input() public index: string;
    public selected: boolean = false;
    public countryInfo: any = null;
    constructor(private airportsService: AirportsService) {
    }
    public rtOnSelected(): void {
        this.selected = true;
        this.airportsService.getCountryInfo(this.country);
    }
    public rtOnDeselected(): void {
        this.selected = false;
        this.countryInfo = null;
    }
}
