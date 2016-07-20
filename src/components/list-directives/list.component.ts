import { SkipSelf, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { RtListService } from '../services/rt-list-service.service';
import { RtNullObjectInjectableObject, RtPagedPager, RtBufferedPager, RtRegularPager } from '../services/injectables';

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
        this.listService.destroyOnReload = value;
    }
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any>) {
        this.listService.fetchMethod = value;
    }
    constructor( @SkipSelf() public listService: RtListService, @SkipSelf() pagedPager: RtPagedPager, @SkipSelf() bufferedPager: RtBufferedPager, @SkipSelf() regularPager: RtRegularPager) {
        if (bufferedPager !== RtNullObjectInjectableObject.instance) {
            this.isBufferedList = true;
            this.listService.pager = bufferedPager;
        }
        if (pagedPager !== RtNullObjectInjectableObject.instance) {
            this.isPagedList = true;
            this.listService.pager = pagedPager;
        }
        if (regularPager !== RtNullObjectInjectableObject.instance) {
            this.isRegularList = true;
            this.listService.pager = regularPager;
        }
    }
    public ngOnInit(): void {
        this.listService.init();
        if (this.loadOnInit) {
            this.listService.loadData();
        }
    }
    public ngOnDestroy(): void {
        this.listService.dispose();
    }
}
