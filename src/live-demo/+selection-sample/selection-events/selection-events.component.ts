import { Component } from '@angular/core';

import { AirportsService } from '../../shared';
import { RtSelectionEvent } from 'right-angled';

@Component({
    selector: 'rt-demo-selection-events',
    templateUrl: 'selection-events.component.html'
})
export class SelectionEventsComponent {
    public regions: any;
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getRegions()
            .map(this.convertToSelectable, this)
            .share();
    }
    public convertToSelectable(regions: Array<string>): Array<any> {
        return regions.map(region => ({ name: region, selected: false }));
    }
    public onItemSelected(evt: RtSelectionEvent): void {
        alertify.log(`${evt.item.name} - selection handled by item`);
    }
    public onItemDeselected(evt: RtSelectionEvent): void {
        alertify.log(`${evt.item.name} - deselection handled by item`);
    }
    public onItemSelectedArea(evt: RtSelectionEvent): void {
        alertify.log(`${evt.item.name} - selection handled by area`);
    }
    public onItemDeselectedArea(evt: RtSelectionEvent): void {
        alertify.log(`${evt.item.name} - deselection handled by area`);
    }
}
