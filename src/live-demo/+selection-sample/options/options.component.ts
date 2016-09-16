import { Component } from '@angular/core';

import { AirportsService } from '../../shared';

@Component({
    selector: 'rt-demo-options',
    templateUrl: 'options.component.html'
})
export class OptionsComponent {
    public horizontal: boolean = false;
    public multiple: boolean = true;
    public toggleOnly: boolean = false;
    public autoSelectFirst: boolean = false;
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
}
