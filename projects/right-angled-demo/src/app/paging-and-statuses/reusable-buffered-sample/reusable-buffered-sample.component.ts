import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsPagedListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-reusable-buffered-sample',
    templateUrl: 'reusable-buffered-sample.component.html'
})
export class ReusableBufferedListSampleComponent {
    constructor(private airportsService: AirportsService) {}
    public loadData = (requestParams: AirportsPagedListRequest): any => {
        return this.airportsService.getAirportsPagedList(requestParams);
    };
}
