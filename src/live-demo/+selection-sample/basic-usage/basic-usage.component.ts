import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SHARED_DIRECTIVES } from '../../shared';

import { AirportsService } from '../../shared';

@Component({
    directives: [SHARED_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-demo-basic-usage',
    templateUrl: 'basic-usage.component.html'
})
export class BasicUsageComponent {
    public regions: Observable<any>;
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getSelectableRegions();
    }
}