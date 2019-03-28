import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsPagedListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-reusable-paged-sample',
    templateUrl: 'reusable-paged-sample.component.html'
})
export class ReusablePagedListSampleComponent {
    constructor(private airportsService: AirportsService) {}
    public loadData = (requestParams: AirportsPagedListRequest): any => {
        return this.airportsService.getAirportsPagedList(requestParams);
    };
}
