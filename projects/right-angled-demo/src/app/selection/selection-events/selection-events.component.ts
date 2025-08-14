import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RTSelectionEvent } from 'right-angled';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';
import { AlertifyService } from '../../shared/alertify/alertify.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-selection-events',
    templateUrl: 'selection-events.component.html',
    standalone: false
})
export class SelectionEventsComponent {
    public countries$: Observable<any[]>;
    constructor(public airportsService: AirportsService) {
        this.countries$ = this.airportsService.getSomeCountries();
    }
    private alertify = inject(AlertifyService);

    public onItemSelected(evt: RTSelectionEvent): void {
        this.alertify.alert(`${evt.item.name} - selection handled by area`);
    }
    public onItemDeselected(evt: RTSelectionEvent): void {
        this.alertify.alert(`${evt.item.name} - deselection handled by area`);
    }
}
