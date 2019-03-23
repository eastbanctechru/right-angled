import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-selected-two-way',
    templateUrl: 'selected-two-way.component.html'
})
export class SelectedTwoWayComponent {
    public countries$: Observable<any[]>;
    constructor(public airportsService: AirportsService) {
        this.countries$ = this.airportsService.getSomeCountries().pipe(
            map(countries =>
                countries.map(country => ({
                    name: country.name,
                    selected: false
                }))
            )
        );
    }
}
