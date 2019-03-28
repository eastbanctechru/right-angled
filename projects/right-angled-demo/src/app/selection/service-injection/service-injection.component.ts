import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-service-injection',
    templateUrl: 'service-injection.component.html'
})
export class ServiceInjectionComponent {
    public countries$: Observable<any[]>;
    constructor(public airportsService: AirportsService) {
        this.countries$ = this.airportsService.getSomeCountries();
    }
}
