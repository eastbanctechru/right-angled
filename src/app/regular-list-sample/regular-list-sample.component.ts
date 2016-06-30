import { Component } from '@angular/core';
import { AirportsService } from '../shared/airportsService';
import { filter, RECTANGLE_DIRECTIVES, NgListService } from '../../right-angled/index';
import { SHARED_DIRECTIVES } from '../shared/index';

@Component({
    directives: [RECTANGLE_DIRECTIVES, SHARED_DIRECTIVES],
    moduleId: module.id,
    providers: [AirportsService, NgListService],
    templateUrl: 'regular-list-sample.component.html'
})
export class RegularListSampleComponent {
    @filter()
    public airportName: string;
    public airportsService: AirportsService;
    public ngListService: NgListService;
    public items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngListService: NgListService) {
        this.airportsService = airportsService;
        this.ngListService = ngListService.wrap(this, this.loadData);
    }
    public loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsRegular(requestParams).then((result: any) => {
            this.items = result.items;
            return result;
        });
    };
}
