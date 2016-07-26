import { SkipSelf, Component, Input, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RtListService, RtNullObjectInjectable, RtPagedPager, RtBufferedPager, RtRegularPager } from '../services/index';

@Component({
    selector: 'rt-list',
    template: `<ng-content></ng-content>`
})
export class ListComponent implements OnDestroy, OnInit {
    public isBufferedList: boolean;
    public isPagedList: boolean;
    public isRegularList: boolean;

    @Input() public loadOnInit: boolean = true;
    @Input() public set destroyOnReload(value: any) {
        this.listService.destroyOnReloadTarget = value;
    }
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any> | Observable<any> | EventEmitter<any>) {
        this.listService.fetchMethod = value;
    }
    constructor( @SkipSelf() public listService: RtListService, @SkipSelf() pagedPager: RtPagedPager, @SkipSelf() bufferedPager: RtBufferedPager, @SkipSelf() regularPager: RtRegularPager) {
        if (bufferedPager !== RtNullObjectInjectable.instance) {
            this.isBufferedList = true;
            this.listService.pager = bufferedPager;
        }
        if (pagedPager !== RtNullObjectInjectable.instance) {
            this.isPagedList = true;
            this.listService.pager = pagedPager;
        }
        if (regularPager !== RtNullObjectInjectable.instance) {
            this.isRegularList = true;
            this.listService.pager = regularPager;
        }
    }
    public ngOnInit(): void {
        this.listService.init();
        if (this.loadOnInit) {
            // run this via setTimeout since this call changes destroyOnReload value and we get error if call this directly in init phase
            setTimeout(() => {
                this.listService.loadData();
            }, 0);
        }
    }
    public ngOnDestroy(): void {
        this.listService.dispose();
    }
}
