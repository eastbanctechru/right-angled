import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-options',
    templateUrl: 'options.component.html'
})
export class OptionsComponent {
    public horizontal: boolean = true;
    public multiple: boolean = true;
    public toggleOnly: boolean = false;
    public autoSelectFirst: boolean = false;
    public countries: Array<any> = [];
    constructor(public airportsService: AirportsService) {
        this.reload();
    }
    public reload(): void {
        this.countries = [];
        this.airportsService.get5Countries(700)
            .subscribe(countries => this.countries = countries.map(country => ({ name: country, selected: false })));
    }
}
