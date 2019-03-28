import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AirportsService } from '../../shared';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-custom-track-by',
    templateUrl: 'custom-track-by.component.html'
})
export class CustomTrackByComponent {
    public countries$: BehaviorSubject<any[]> = new BehaviorSubject([]);
    constructor(public airportsService: AirportsService) {
        this.reload();
    }
    public reload(): void {
        this.countries$.next([]);
        this.airportsService
            .getSomeCountries(5, 700)
            .pipe(first())
            .subscribe(countries => this.countries$.next(countries));
    }
    public trackByName(_: number, country: any): string {
        return country.name;
    }
}
