import { SkipSelf, Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';

import { NgBufferedListService } from '../services/ng-buffered-list-service.service';
import { NgPagedListService } from '../services/ng-paged-list-service.service';
import { NgListService } from '../services/ng-list-service.service';

@Component({
    selector: 'rt-list',
    template: `<ng-content></ng-content>`
})
export class ListComponent implements OnDestroy, OnInit {
    @Input() public loadOnInit: boolean = true;
    public serviceInstance: NgListService | NgBufferedListService | NgPagedListService;
    public isBufferedList: boolean;
    public isPagedList: boolean;
    public isRegularList: boolean;
    constructor( @SkipSelf() @Optional() bufferedListService: NgBufferedListService, @SkipSelf() @Optional() pagedListService: NgPagedListService, @SkipSelf() @Optional() listService: NgListService) {
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
