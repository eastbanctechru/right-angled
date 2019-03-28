import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsPagedListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-register-as-filter-sample',
    templateUrl: 'register-as-filter-sample.component.html'
})
export class RegisterAsFilterSampleComponent {
    constructor(private airportsService: AirportsService) {}
    public loadData = (requestParams: AirportsPagedListRequest): any => {
        return this.airportsService.getAirportsPagedList(requestParams);
    };
}
