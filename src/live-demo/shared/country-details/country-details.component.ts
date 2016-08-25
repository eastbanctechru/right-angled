import { Component, Input, OnInit } from '@angular/core';

import { AirportsService } from '../data/airports.service';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-country-details',
    styleUrls: ['country-details.component.css'],
    templateUrl: 'country-details.component.html'
})
export class CountryDetailsComponent implements OnInit {
    @Input() public countryName: string;
    public countryInfo: any;
    constructor(private airportsService: AirportsService) {
    }
    public ngOnInit(): void {
        this.countryInfo = this.airportsService.getCountryInfo(this.countryName);
    }
}
