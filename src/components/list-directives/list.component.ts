import { Component, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListBase } from './list-base';

import { RtListService, RtRegularPager, REGULAR_LIST_PROVIDERS } from '../providers/index';

@Component({
    exportAs: 'rtList',
    providers: [REGULAR_LIST_PROVIDERS],
    selector: 'rt-list',
    template: `<ng-content></ng-content>`
})
export class ListComponent extends ListBase {
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor( public listService: RtListService, pager: RtRegularPager) {
        super(listService, pager);
    }
}
