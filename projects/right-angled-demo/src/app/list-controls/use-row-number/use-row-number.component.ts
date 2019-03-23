import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { AirportsPagedListRequest, AirportsService, ListResponse } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-use-row-number',
    templateUrl: 'use-row-number.component.html'
})
export class UseRowNumberComponent {
    constructor(private airportsService: AirportsService) {}
    public getAirports = (request: AirportsPagedListRequest): Observable<ListResponse> => {
        return this.airportsService.getAirportsPagedList(request);
    };
}
