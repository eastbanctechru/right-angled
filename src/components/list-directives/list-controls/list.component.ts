import { Component, Input, EventEmitter, Self } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListBase } from './list-base';
import { RegularPager } from 'e2e4';
import { RtListService } from '../list-service';
import { REGULAR_LIST_PROVIDERS } from '../../providers';

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
    constructor( @Self() public listService: RtListService, @Self() pager: RegularPager) {
        super(listService, pager);
    }
}
