import { Component } from '@angular/core';

import { AirportsService } from '../../shared';
import { OnDeselected, OnSelected, OnSelectionChanged } from 'right-angled';

@Component({
    selector: 'rt-demo-hook-methods',
    templateUrl: 'hook-methods.component.html'
})
export class HooksMethodsComponent {
    public countries: any;
    constructor(public airportsService: AirportsService) {
        this.countries = this.airportsService.getTop5Countries()
            .map(this.convertToCountryWithSelectionHooks, this)
            .share();
    }
    public convertToCountryWithSelectionHooks(countries: Array<string>): Array<any> {
        return countries.map(country => new CountryWithSelectionHooks(country));
    }
}
export class CountryWithSelectionHooks implements OnSelected, OnDeselected, OnSelectionChanged {
    public selected: boolean = false;
    constructor(public name: string) {
        this.name = name;
    }
    public rtOnSelected(): void {
        alertify.log(`${this.name} - selected`);
    }
    public rtOnDeselected(): void {
        alertify.log(`${this.name} - deselected`);
    }
    public rtOnSelectionChanged(selected: boolean): void {
        alertify.log(`${this.name} - selected state changed to ${selected}`);
    }
}
