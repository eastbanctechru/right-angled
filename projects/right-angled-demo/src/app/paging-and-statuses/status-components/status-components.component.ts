import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ListDirective } from 'right-angled';
import { map } from 'rxjs/operators';

import { Airport, AirportsListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-status-components',
    templateUrl: 'status-components.component.html'
})
export class StatusComponentsComponent {
    @ViewChild(ListDirective) public listDirective: ListDirective;
    private raiseError = false;
    private returnNoData = false;
    constructor(private airportsService: AirportsService) {}
    public loadData = (requestParams: AirportsListRequest): any => {
        return this.airportsService.getAirportsList(requestParams).pipe(
            map((response: Airport[]) => {
                if (this.raiseError) {
                    this.raiseError = false;
                    throw new Error('Error!!!');
                }
                if (this.returnNoData) {
                    this.returnNoData = false;
                    return [];
                }
                return response;
            })
        );
    };
    public loadEmptyData(): void {
        this.returnNoData = true;
        this.listDirective.reloadData();
    }
    public raiseErrorOnLoad(): void {
        this.raiseError = true;
        this.listDirective.reloadData();
    }
}
