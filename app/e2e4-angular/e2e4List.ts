import {Component, Input, OnChanges} from 'angular2/core';
import {NgListService} from './ngListService';

@Component({
    providers: [NgListService],
    selector: 'e2e4-list',
    template: `<ng-content></ng-content>`
})
export class E2E4List implements OnChanges {
    @Input() dataReadDelegate: (requestParameters: any) => Promise<any>;
    @Input('listService') inputListService: NgListService;
    @Input() items: Array<any>;
    injectedListService: NgListService;
    constructor(ngListService: NgListService) {
        this.injectedListService = ngListService;
    }
    ngOnChanges(changes: any): void {
        this.injectedListService.normalizedService = changes.inputListService ? changes.inputListService.currentValue : this.injectedListService;
        if (changes.dataReadDelegate) {
            this.injectedListService.normalizedService.dataReadDelegate = changes.dataReadDelegate.currentValue;
        }
        if (changes.items) {
            this.injectedListService.normalizedService.items = changes.items.currentValue;
        }
    }
}
