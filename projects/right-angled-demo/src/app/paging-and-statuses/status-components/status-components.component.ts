import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ListDirective } from 'right-angled';
import { map } from 'rxjs/operators';

import { AirportsListRequest, AirportsService, ListResponse } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-status-components',
    templateUrl: 'status-components.component.html',
    standalone: false
})
export class StatusComponentsComponent {
    @ViewChild(ListDirective, { static: true }) public listDirective: ListDirective;
    private raiseError = false;
    private returnNoData = false;
    constructor(private airportsService: AirportsService) { }
    public loadData = (requestParams: AirportsListRequest) => {
        return this.airportsService.getAirportsList(requestParams).pipe(
            map(response => {
                if (this.raiseError) {
                    this.raiseError = false;
                    throw new Error('Error!!!');
                }
                if (this.returnNoData) {
                    this.returnNoData = false;
                    return ({ items: [], totalCount: 0 });
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
