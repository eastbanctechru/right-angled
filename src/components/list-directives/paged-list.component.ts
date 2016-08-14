import { SkipSelf, Component, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListBase } from './list-base';

import { RtListService, RtPagedPager } from '../providers/index';

@Component({
    exportAs: 'rtList',
    selector: 'rt-paged-list',
    template: `<ng-content></ng-content>`
})
export class PagedListComponent extends ListBase {

    public get items(): Array<any> {
        return this.listService.items;
    }
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor( @SkipSelf() public listService: RtListService, @SkipSelf() pager: RtPagedPager) {
        super(listService, pager);
    }
}
