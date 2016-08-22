import { Component, Input, EventEmitter, Self } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListBase } from './list-base';
import { PagedPager } from 'e2e4';
import { RtListService } from '../list-service';
import { PAGED_LIST_PROVIDERS } from '../../providers';

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
    constructor(@Self() public listService: RtListService, @Self() pager: PagedPager) {
        super(listService, pager);
    }
}
