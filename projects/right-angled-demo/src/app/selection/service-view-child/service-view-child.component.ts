import { Component, ViewChild } from '@angular/core';

import { SelectionAreaDirective } from 'right-angled';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-service-view-child',
    templateUrl: 'service-view-child.component.html'
})
export class ServiceViewChildComponent {
    @ViewChild(SelectionAreaDirective)
    public selectionArea: SelectionAreaDirective;
    public countries: any[] = new Array<any>();
    constructor(public airportsService: AirportsService) {
        this.airportsService.getSomeCountries().subscribe(countries => (this.countries = countries));
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
