import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsPagedListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-infinite-sample',
    templateUrl: 'infinite-sample.component.html'
})
export class InfiniteSampleComponent {
    constructor(private airportsService: AirportsService) {}
    public loadData = (requestParams: AirportsPagedListRequest): any => {
        return this.airportsService.getAirportsListChunk(requestParams);
    };
}
