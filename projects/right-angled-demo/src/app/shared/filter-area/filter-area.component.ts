import { Component, Input, OnInit } from '@angular/core';
import { filter, ListDirective } from 'right-angled';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-filter-area',
    templateUrl: 'filter-area.component.html'
})
export class FilterAreaComponent implements OnInit {
    @Input() public list: ListDirective = null;
    @filter() public airportName: string = null;
    @filter('airportSize') public selectedAirportSize: string = null;
    @filter('airportType') public selectedAirportType: string = null;
    public airportSizes: any;
    public airportTypes: any;
    constructor(private airportsService: AirportsService) {}
    public ngOnInit(): void {
        this.airportsService.getAirportSizeLookups().subscribe(sizes => (this.airportSizes = sizes));
        this.airportsService.getAirportTypeLookups().subscribe(types => (this.airportTypes = types));
    }
}
