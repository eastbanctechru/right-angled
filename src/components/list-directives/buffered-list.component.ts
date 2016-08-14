import { SkipSelf, Component, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ListBase } from './list-base';

import { RtListService, RtBufferedPager } from '../providers/index';

@Component({
    exportAs: 'rtList',
    selector: 'rt-buffered-list',
    template: `<ng-content></ng-content>`
})
export class BufferedListComponent extends ListBase {

    public get items(): Array<any> {
        return this.listService.items;
    }
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor( @SkipSelf() public listService: RtListService, @SkipSelf() pager: RtBufferedPager) {
        super(listService, pager);
    }
}
