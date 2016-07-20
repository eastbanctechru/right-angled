import { SkipSelf, Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';

import { RtBufferedListService } from '../services/rt-buffered-list-service.service';
import { RtPagedListService } from '../services/rt-paged-list-service.service';
import { RtRegularListService } from '../services/rt-regular-list-service.service';

@Component({
    selector: 'rt-list',
    template: `<ng-content></ng-content>`
})
export class ListComponent implements OnDestroy, OnInit {
    @Input() public loadOnInit: boolean = true;
    @Input() public set destroyOnReload(value: any) {
        this.serviceInstance.destroyOnReload = value;
    }
    @Input() public set fetchMethod(value: (requestParams: any) => Promise<any>) {
        this.serviceInstance.fetchMethod = value;
    }
    public serviceInstance: RtRegularListService | RtBufferedListService | RtPagedListService;
    public isBufferedList: boolean;
    public isPagedList: boolean;
    public isRegularList: boolean;
    constructor( @SkipSelf() @Optional() bufferedListService: RtBufferedListService, @SkipSelf() @Optional() pagedListService: RtPagedListService, @SkipSelf() @Optional() listService: RtRegularListService) {
        this.serviceInstance = listService || bufferedListService || pagedListService;
        this.isBufferedList = !!bufferedListService;
        this.isPagedList = !!pagedListService;
        this.isRegularList = !!listService;
    }
    public ngOnInit(): void {
        this.serviceInstance.init();
        if (this.loadOnInit && this.serviceInstance.inited) {
            this.serviceInstance.loadData();
        }
    }
    public ngOnDestroy(): void {
        this.serviceInstance.dispose();
    }
}
