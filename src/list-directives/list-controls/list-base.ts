import { AfterViewInit, OnDestroy } from '@angular/core';
import { Pager } from 'e2e4';

import { RtListService } from '../list-service';

export abstract class ListBase implements OnDestroy, AfterViewInit {
    public get items(): Array<any> {
        return this.listService.items;
    }
    public loadOnInit: boolean = true;
    public reloadData(): void {
        this.listService.reloadData();
    }
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
