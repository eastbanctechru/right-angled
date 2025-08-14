import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';

import { SelectionAreaDirective } from 'right-angled';

import { AirportsService } from '../../shared';
import { Observable } from 'rxjs';
import { AlertifyService } from '../../shared/alertify/alertify.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-service-view-child',
    templateUrl: 'service-view-child.component.html',
    standalone: false
})
export class ServiceViewChildComponent {
    @ViewChild(SelectionAreaDirective, { static: true })
    public selectionArea: SelectionAreaDirective;
    public countries$: Observable<any[]>;

    private alertify = inject(AlertifyService);
    constructor(public airportsService: AirportsService) {
        this.countries$ = this.airportsService.getSomeCountries();
    }
    public displaySelectedItems(): void {
        this.alertify.alert(
            this.selectionArea.selectionService
                .getSelectedElements()
                .map((c: any) => c.name)
                .join(';')
        );
    }
}
