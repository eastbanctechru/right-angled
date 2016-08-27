import { Component, EventEmitter, Input, Self } from '@angular/core';
import { PagedPager } from 'e2e4';
import { Observable } from 'rxjs/Observable';

import { PAGED_LIST_PROVIDERS } from '../../providers';
import { RtListService } from '..//list-service';
import { ListBase } from './list-base';

@Component({
    exportAs: 'rtList',
    moduleId: module.id,
    providers: [PAGED_LIST_PROVIDERS],
    selector: 'rt-paged-list',
    template: `<ng-content></ng-content>`
})
export class PagedListComponent extends ListBase {
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor(@Self() public listService: RtListService, @Self() pager: PagedPager) {
        super(listService, pager);
    }
}
