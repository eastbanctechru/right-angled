import { Component, OnInit } from '@angular/core';
import { filter, RtFiltersService, LIST_DIRECTIVES } from 'right-angled';
import { AirportsService } from '../data/airports.service';

@Component({
    directives: [LIST_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-demo-filter-area',
    templateUrl: 'filter-area.component.html'
})
export class FilterAreaComponent implements OnInit {
    @filter() public airportName: string = null;
    @filter('size') public selectedAirportSize: string = null;
    @filter('type') public selectedAirportType: string = null;
    public airportSizes: Promise<any> = null;
    public airportTypes: Promise<any> = null;
    constructor(public filtersService: RtFiltersService, private airportsService: AirportsService) {
        this.filtersService.registerFilterTarget(this);
    }
    public ngOnInit(): void {
        this.airportSizes = this.airportsService.getAirportSizes();
        this.airportTypes = this.airportsService.getAirportTypes();
    }
}
