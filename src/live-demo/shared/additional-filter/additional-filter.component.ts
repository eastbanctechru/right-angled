import { Component, OnInit } from '@angular/core';
import { filter } from 'right-angled';
import { AirportsService } from '../data/airports.service';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-additional-filter',
    styleUrls: ['../filter-area/filter-area.component.css'],
    templateUrl: 'additional-filter.component.html'
})
export class AdditionalFilterComponent implements OnInit {
    @filter('regionName') public selectedRegion: string = null;
    @filter('countryName') public selectedCountry: string = null;
    @filter('cityName') public selectedCity: string = null;
    public countries: any;
    public cities: any;
    public regions: any;
    constructor(private airportsService: AirportsService) {
    }
    public ngOnInit(): void {
        this.regions = this.airportsService.getRegions();
        this.countries = this.airportsService.getCountries(this.selectedRegion);
        this.cities = this.airportsService.getCities(this.selectedCountry);
    }
    public onRegionChanged(newValue: string): void {
        this.selectedRegion = newValue;
        this.countries = this.airportsService.getCountries(this.selectedRegion);
    }
    public onCountryChanged(newValue: string): void {
        this.selectedCountry = newValue;
        this.cities = this.airportsService.getCities(this.selectedCountry);
    }
}
