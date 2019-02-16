import { Component } from '@angular/core';
import { RTList, RTStateService } from 'right-angled';

import { AirportsPagedListRequest, AirportsService, LocalStorageStateService, QueryStringStateService, SessionStorageStateService } from '../../shared';

@Component({
    providers: [
        {
            provide: RTStateService,
            useClass: LocalStorageStateService,
            multi: true
        },
        { provide: RTStateService, useClass: QueryStringStateService, multi: true },
        {
            provide: RTStateService,
            useClass: SessionStorageStateService,
            multi: true
        }
    ],
    selector: 'rt-demo-persistence-sample',
    templateUrl: 'persistence-sample.component.html'
})
export class PersistenceSampleComponent {
    constructor(private airportsService: AirportsService) {
        this.airportsService = airportsService;
    }
    public loadData = (requestParams: AirportsPagedListRequest): any => {
        return this.airportsService.getAirportsPagedList(requestParams);
    };
}
