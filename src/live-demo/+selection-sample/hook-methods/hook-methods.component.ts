import { Component } from '@angular/core';

import { AirportsService } from '../../shared';
import { OnDeselected, OnSelected, OnSelectionChanged } from 'right-angled';

@Component({
    selector: 'rt-demo-hook-methods',
    templateUrl: 'hook-methods.component.html'
})
export class HooksMethodsComponent {
    public regions: any;
    public selectionActivityLog: Array<string> = new Array<string>();
    constructor(public airportsService: AirportsService) {
        this.regions = this.airportsService.getRegions()
            .map(this.convertToRegionWithSelectionHooks, this)
            .share();
    }
    public convertToRegionWithSelectionHooks(regions: Array<string>): Array<any> {
        return regions.map(region => new RegionWithSelectionHooks(region, this.selectionActivityLog));
    }
}
export class RegionWithSelectionHooks implements OnSelected, OnDeselected, OnSelectionChanged {
    public selected: boolean = false;
    constructor(public name: string, private selectionActivityLog: Array<string>) {
        this.name = name;
    }
    public rtOnSelected(): void {
        this.selectionActivityLog.unshift(`${this.name} - selected`);
    }
    public rtOnDeselected(): void {
        this.selectionActivityLog.unshift(`${this.name} - deselected`);
    }
    public rtOnSelectionChanged(selected: boolean): void {
        this.selectionActivityLog.unshift(`${this.name} - selected state changed to ${selected}`);
    }
}
