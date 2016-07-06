import { Component } from '@angular/core';
import { AirportsService } from '../shared/airports.service';
import { filter, RIGHTANGLED_DIRECTIVES, RIGHTANGLED_PROVIDERS, NgPagedListService } from '../../right-angled/index';
import { SHARED_DIRECTIVES } from '../shared/index';

@Component({
    directives: [RIGHTANGLED_DIRECTIVES, SHARED_DIRECTIVES],
    moduleId: module.id,
    providers: [AirportsService, NgPagedListService, RIGHTANGLED_PROVIDERS],
    templateUrl: 'paged-list-sample.component.html'
})
export class PagedListSampleComponent {
    @filter()
    public airportName: string;
    public airportsService: AirportsService;
    public ngPagedListService: NgPagedListService;
    public items: Array<any> = new Array<any>();

    constructor(airportsService: AirportsService, ngPagedListService: NgPagedListService) {
        this.airportsService = airportsService;
        this.ngPagedListService = ngPagedListService.wrap(this, this.loadData);
    }
    public loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsPaged(requestParams).then((result: any) => {
            this.items = result.items;
            return result;
        });
    };
}
