import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-basic-usage',
    templateUrl: 'basic-usage.component.html'
})
export class BasicUsageComponent {
    public regions: any;
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getSelectableRegions();
    }
}
