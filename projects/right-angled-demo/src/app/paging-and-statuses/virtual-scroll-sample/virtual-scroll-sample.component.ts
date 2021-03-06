import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsPagedListRequest, AirportsService } from '../../shared';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-virtual-scroll-sample',
    templateUrl: 'virtual-scroll-sample.component.html'
})
export class VirtualScrollSampleComponent {
    constructor(private airportsService: AirportsService) {}
    public loadData = (requestParams: AirportsPagedListRequest): any => {
        return this.airportsService.getAirportsList(requestParams, 600, 100);
    };
}
