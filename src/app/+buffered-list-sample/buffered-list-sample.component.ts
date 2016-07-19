import { Component } from '@angular/core';
import { disposeOnReload, filter, BUFFERED_LIST_DIRECTIVES, BUFFERED_LIST_PROVIDERS, NgBufferedListService } from '../../right-angled';
import { SHARED_DIRECTIVES, AirportsService } from '../shared';

@Component({
    directives: [BUFFERED_LIST_DIRECTIVES, SHARED_DIRECTIVES],
    moduleId: module.id,
    providers: [BUFFERED_LIST_PROVIDERS],
    templateUrl: 'buffered-list-sample.component.html'
})
export class BufferedListSampleComponent {
    @filter() public airportName: string = null;
    public airportsService: AirportsService;
    public ngBufferedListService: NgBufferedListService;
    @disposeOnReload() public items: Array<any> = new Array<any>();
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
