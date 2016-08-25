import { AfterViewInit, OnDestroy } from '@angular/core';
import { Pager } from 'e2e4';
import { Subject } from 'rxjs/Subject';

import { RtListService } from '../list-service';

export abstract class ListBase implements OnDestroy, AfterViewInit {
    public get items(): Array<any> {
        return this.listService.items;
    }
    public get itemsStream(): Subject<Array<any>> {
        return this.listService.itemsStream;
    }
    public loadOnInit: boolean = true;
    constructor(public listService: RtListService, pager: Pager) {
        this.listService.pager = pager;
    }
    public ngAfterViewInit(): void {
        this.listService.init();
        if (this.loadOnInit) {
            this.listService.loadData();
        }
    }
    public ngOnDestroy(): void {
        this.listService.destroy();
    }
}
