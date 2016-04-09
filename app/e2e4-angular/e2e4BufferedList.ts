import {Component, Input, OnChanges} from 'angular2/core';
import {NgBufferedListService} from './ngBufferedListService';

@Component({
    providers: [NgBufferedListService],
    selector: 'e2e4-buffered-list',
    template: `<ng-content></ng-content>`
})
export class E2E4BufferedList implements OnChanges {
    @Input() dataReadDelegate: (requestParameters: any) => Promise<any>;
    @Input('listService') inputListService: NgBufferedListService;
    @Input() items: Array<any>;
    injectedBufferedListService: NgBufferedListService;
    constructor(ngBufferedListService: NgBufferedListService) {
        this.injectedBufferedListService = ngBufferedListService;
    }
    ngOnChanges(changes: any): void {
        this.injectedBufferedListService.normalizedService = changes.inputListService ?
            changes.inputListService.currentValue : this.injectedBufferedListService;
        if (changes.dataReadDelegate) {
            this.injectedBufferedListService.normalizedService.dataReadDelegate = changes.dataReadDelegate.currentValue;
        }
        if (changes.items) {
            this.injectedBufferedListService.normalizedService.items = changes.items.currentValue;
        }
    }
}
