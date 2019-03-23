import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { AirportsPagedListRequest, AirportsService, ListResponse } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-paging',
    templateUrl: 'use-paging.component.html'
})
export class UsePagingComponent {
    constructor(private airportsService: AirportsService) {}
    public getAirports = (request: AirportsPagedListRequest): Observable<ListResponse> => {
        return this.airportsService.getAirportsPagedList(request);
    };
}
