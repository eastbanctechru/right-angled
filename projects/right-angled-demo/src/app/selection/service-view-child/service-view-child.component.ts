import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { SelectionAreaDirective } from 'right-angled';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-service-view-child',
    templateUrl: 'service-view-child.component.html'
})
export class ServiceViewChildComponent {
    @ViewChild(SelectionAreaDirective, { static: true })
    public selectionArea: SelectionAreaDirective;
    public countries$: Observable<any[]>;
    constructor(public airportsService: AirportsService) {
        this.countries$ = this.airportsService.getSomeCountries();
    }
    public displaySelectedItems(): void {
        alertify.alert(
            this.selectionArea.selectionService
                .getSelectedElements()
                .map((c: any) => c.name)
                .join(';')
        );
    }
}
