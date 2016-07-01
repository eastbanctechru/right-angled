import { Component } from '@angular/core';
import { AirportsService } from '../shared/airportsService';
import { filter, RIGHTANGLED_DIRECTIVES, RIGHTANGLED_PROVIDERS, NgBufferedListService } from '../../right-angled/index';
import { SHARED_DIRECTIVES } from '../shared/index';

@Component({
    directives: [RIGHTANGLED_DIRECTIVES, SHARED_DIRECTIVES],
    moduleId: module.id,
    providers: [AirportsService, NgBufferedListService, RIGHTANGLED_PROVIDERS],
    templateUrl: 'buffered-list-sample.component.html'
})
export class BufferedListSampleComponent {
    @filter()
    public airportName: string = null;
    public airportsService: AirportsService;
    public ngBufferedListService: NgBufferedListService;
    public items: Array<any> = new Array<any>();
    constructor(airportsService: AirportsService, ngBufferedListService: NgBufferedListService) {
        this.airportsService = airportsService;
        this.ngBufferedListService = ngBufferedListService.wrap(this, this.loadData);
    }
    public loadData = (requestParams: any): Promise<any> => {
        return this.airportsService.getAirportsBuffered(requestParams).then((result: any) => {
            this.items.push(...result.items);
            return result;
        });
    };
}
