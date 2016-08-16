import { Component, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListBase } from './list-base';

import { RtListService, RtPagedPager, PAGED_LIST_PROVIDERS } from '../providers/index';

@Component({
    exportAs: 'rtList',
    providers: [PAGED_LIST_PROVIDERS],
    selector: 'rt-paged-list',
    template: `<ng-content></ng-content>`
})
export class PagedListComponent extends ListBase {
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor(public listService: RtListService, pager: RtPagedPager) {
        super(listService, pager);
    }
}
