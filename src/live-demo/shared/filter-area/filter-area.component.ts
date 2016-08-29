import { Component, OnInit } from '@angular/core';
import { filter } from 'right-angled';

import { AirportsService } from '../data/airports.service';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-filter-area',
    styleUrls: ['filter-area.component.css'],
    templateUrl: 'filter-area.component.html'
})
export class FilterAreaComponent implements OnInit {
    public useAdvancedFilters: boolean = false;
    @filter() public airportName: string = null;
    @filter('size') public selectedAirportSize: string = null;
    @filter('type') public selectedAirportType: string = null;
    public airportSizes: any;
    public airportTypes: any;
    constructor(private airportsService: AirportsService) {
    }
    public ngOnInit(): void {
        this.airportSizes = this.airportsService.getAirportSizeLookups();
        this.airportTypes = this.airportsService.getAirportTypeLookups();
    }
    public toggleAdvancedFilters(): void {
        this.useAdvancedFilters = !this.useAdvancedFilters;
    }
}
