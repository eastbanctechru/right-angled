import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-custom-track-by',
    templateUrl: 'custom-track-by.component.html'
})
export class CustomTrackByComponent {
    public regions: Array<string> = [];
    constructor(public airportsService: AirportsService) {
        this.reload();
    }
    public convertToSelectable(regions: Array<string>): Array<any> {
        return regions.map(region => ({ name: region, selected: false }));
    }
    public reload(): void {
        this.regions = [];
        this.airportsService.getRegions(700)
            .subscribe(regions => this.regions = this.convertToSelectable(regions));
    }
    public trackByName(index: number, region: any): string {
        return region.name;
    }
}
