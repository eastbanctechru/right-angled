import { Component } from '@angular/core';
import { RTSelectionEvent } from 'right-angled';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-selection-events',
    templateUrl: 'selection-events.component.html'
})
export class SelectionEventsComponent {
    public countries: any[] = new Array<any>();
    constructor(public airportsService: AirportsService) {
        this.airportsService.getSomeCountries().subscribe(countries => (this.countries = countries));
    }

    public onItemSelected(evt: RTSelectionEvent): void {
        alertify.log(`${evt.item.name} - selection handled by area`);
    }
    public onItemDeselected(evt: RTSelectionEvent): void {
        alertify.log(`${evt.item.name} - deselection handled by area`);
    }
}
