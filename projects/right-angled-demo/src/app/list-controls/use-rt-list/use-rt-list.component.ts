import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AirportsPagedListRequest, AirportsService, ListResponse } from '../../shared';

@Component({
    selector: 'rt-demo-use-rt-list',
    templateUrl: 'use-rt-list.component.html'
})
export class UseRTListComponent {
    constructor(private airportsService: AirportsService) {}
    public getAirports = (request: AirportsPagedListRequest): Observable<ListResponse> => {
        return this.airportsService.getAirportsPagedList(request);
    };
}
