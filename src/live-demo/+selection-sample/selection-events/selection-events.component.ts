import { Component } from '@angular/core';

import { AirportsService } from '../../shared';
import { RtSelectionEvent } from 'right-angled';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-selection-events',
    templateUrl: 'selection-events.component.html'
})
export class SelectionEventsComponent {
    public regions: any;
    public selectionActivityLog: Array<string> = new Array<string>();
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getRegions()
            .map(this.convertToSelectable, this)
            .share();
    }
    public convertToSelectable(regions: Array<string>): Array<any> {
        return regions.map(region => ({ name: region, selected: false }));
    }
    public onItemSelected(evt: RtSelectionEvent): void {
        this.selectionActivityLog.unshift(`${evt.item.name} - selected`);
    }
    public onItemDeselected(evt: RtSelectionEvent): void {
        this.selectionActivityLog.unshift(`${evt.item.name} - deselected`);
    }
    public onItemSelectionChanged(evt: RtSelectionEvent): void {
        this.selectionActivityLog.unshift(`${evt.item.name} - selected state changed to ${evt.item.selected}`);
    }
}
