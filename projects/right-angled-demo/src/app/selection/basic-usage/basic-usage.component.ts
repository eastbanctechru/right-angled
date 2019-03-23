import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-basic-usage',
    templateUrl: 'basic-usage.component.html'
})
export class BasicUsageComponent {
    public countries$: Observable<any[]>;
    constructor(public airportsService: AirportsService) {
        this.countries$ = this.airportsService.getSomeCountries();
    }
}
