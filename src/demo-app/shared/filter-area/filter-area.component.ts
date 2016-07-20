import { Component } from '@angular/core';
import { filter, RtFiltersService, LIST_DIRECTIVES } from 'right-angled';

@Component({
    directives: [LIST_DIRECTIVES],
    moduleId: module.id,
    selector: 'rt-demo-filter-area',
    templateUrl: 'filter-area.component.html'
})
export class FilterAreaComponent {
    @filter() public airportName: string = null;
    public items: Array<any> = new Array<any>();
    constructor(public filtersService: RtFiltersService) {
        this.filtersService.registerFilterTarget(this);
    }
}
