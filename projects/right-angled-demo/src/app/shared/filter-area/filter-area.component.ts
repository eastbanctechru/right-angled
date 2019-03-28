import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { filter, ListDirective } from 'right-angled';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';
import { LookupItem } from '../data/lookup-item';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-filter-area',
    templateUrl: 'filter-area.component.html'
})
export class FilterAreaComponent {
    @Input() public list: ListDirective = null;
    @filter() public airportName: string = null;
    @filter('airportSize') public selectedAirportSize: string = null;
    @filter('airportType') public selectedAirportType: string = null;
    public airportSizes$: Observable<LookupItem[]>;
    public airportTypes$: Observable<LookupItem[]>;
    constructor(private airportsService: AirportsService) {
        this.airportSizes$ = this.airportsService.getAirportSizeLookups();
        this.airportTypes$ = this.airportsService.getAirportTypeLookups();
    }
}
