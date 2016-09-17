import { Component } from '@angular/core';

import { AirportsService } from '../../shared';
import { OnDeselected, OnSelected, OnSelectionChanged } from 'right-angled';

@Component({
    selector: 'rt-demo-hook-methods',
    templateUrl: 'hook-methods.component.html'
})
export class HooksMethodsComponent {
    public regions: any;
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getRegions()
            .map(this.convertToRegionWithSelectionHooks, this)
            .share();
    }
    public convertToRegionWithSelectionHooks(regions: Array<string>): Array<any> {
        return regions.map(region => new RegionWithSelectionHooks(region));
    }
}
export class RegionWithSelectionHooks implements OnSelected, OnDeselected, OnSelectionChanged {
    public selected: boolean = false;
    constructor(public name: string) {
        this.name = name;
    }
    public rtOnSelected(): void {
        alertify.log(`${this.name} - selected`);
    }
    public rtOnDeselected(): void {
        alertify.log(`${this.name} - deselected`);
    }
    public rtOnSelectionChanged(selected: boolean): void {
        alertify.log(`${this.name} - selected state changed to ${selected}`);
    }
}
