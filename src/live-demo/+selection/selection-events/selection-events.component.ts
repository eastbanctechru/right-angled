import { Component } from '@angular/core';

import { AirportsService } from '../../shared';
import { RtSelectionEvent } from 'right-angled';

@Component({
    selector: 'rt-demo-selection-events',
    templateUrl: 'selection-events.component.html'
})
export class SelectionEventsComponent {
    public countries: any;
    constructor(public airportsService: AirportsService) {
        this.countries = this.airportsService.getSomeCountries();
    }
    public onItemSelected(evt: RtSelectionEvent): void {
        alertify.log(`${evt.item} - selection handled by area`);
    }
    public onItemDeselected(evt: RtSelectionEvent): void {
        alertify.log(`${evt.item} - deselection handled by area`);
    }
}
