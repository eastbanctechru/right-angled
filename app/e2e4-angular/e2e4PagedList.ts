import {Component, Input, OnChanges} from 'angular2/core';
import {NgPagedListService} from './ngPagedListService';

@Component({
    providers: [NgPagedListService],
    selector: 'e2e4-paged-list',
    template: `<ng-content></ng-content>`
})
export class E2E4PagedList implements OnChanges {
    @Input() dataReadDelegate: (requestParameters: any) => Promise<any>;
    @Input('listService') inputListService: NgPagedListService;
    @Input() items: Array<any>;
    injectedPagedListService: NgPagedListService;
    constructor(ngPagedListService: NgPagedListService) {
        this.injectedPagedListService = ngPagedListService;
    }
    ngOnChanges(changes: any): void {
        this.injectedPagedListService.normalizedService = changes.inputListService ? changes.inputListService.currentValue : this.injectedPagedListService;
        if (changes.dataReadDelegate) {
            this.injectedPagedListService.normalizedService.dataReadDelegate = changes.dataReadDelegate.currentValue;
        }
        if (changes.items) {
            this.injectedPagedListService.normalizedService.items = changes.items.currentValue;
        }
    }
}
