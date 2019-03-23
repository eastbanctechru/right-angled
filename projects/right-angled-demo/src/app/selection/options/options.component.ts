import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsService } from '../../shared';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-options',
    templateUrl: 'options.component.html'
})
export class OptionsComponent {
    public horizontal = false;
    public multiple = true;
    public toggleOnly = false;
    public autoSelectFirst = false;
    public countries$: BehaviorSubject<any[]> = new BehaviorSubject([]);
    constructor(public airportsService: AirportsService) {
        this.reload();
    }
    public reload(): void {
        this.countries$.next([]);
        this.airportsService
            .getSomeCountries(8, 200)
            .pipe(first())
            .subscribe(countries => this.countries$.next(countries));
    }
}
