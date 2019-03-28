import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { AirportsService } from '../../../shared';
import { first, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-country-details',
    templateUrl: 'country-details.component.html'
})
export class CountryDetailsComponent {
    @Input() public country: any;
    public selected$ = new BehaviorSubject(false);
    public ready$ = new BehaviorSubject(true);
    public countryInfo: any = null;
    constructor(private airportsService: AirportsService) {}
    public onSelected(): void {
        this.selected$.next(true);
        this.ready$.next(false);
        this.airportsService
            .getCountryInfo(this.country.name)
            .pipe(
                first(),
                tap(() => this.ready$.next(true))
            )
            .subscribe(countryInfo => {
                this.countryInfo = countryInfo;
            });
    }
    public onDeselected(): void {
        this.selected$.next(false);
        this.countryInfo = null;
    }
}
