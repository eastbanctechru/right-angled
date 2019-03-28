import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RTSelectionEvent } from 'right-angled';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-selection-events',
    templateUrl: 'selection-events.component.html'
})
export class SelectionEventsComponent {
    public countries$: Observable<any[]>;
    constructor(public airportsService: AirportsService) {
        this.countries$ = this.airportsService.getSomeCountries();
    }

    public onItemSelected(evt: RTSelectionEvent): void {
        alertify.log(`${evt.item.name} - selection handled by area`);
    }
    public onItemDeselected(evt: RTSelectionEvent): void {
        alertify.log(`${evt.item.name} - deselection handled by area`);
    }
}
