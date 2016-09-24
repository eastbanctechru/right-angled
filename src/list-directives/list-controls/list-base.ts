import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Pager } from 'e2e4';

import { RtListService } from '../list-service';

export abstract class ListBase implements OnDestroy, OnInit, AfterViewInit {
    public get items(): Array<any> {
        return this.listService.items;
    }
    public loadOnInit: boolean = true;
    public reloadData(): void {
        this.listService.reloadData();
    }
    constructor(public listService: RtListService, public pager: Pager) {
        this.listService.pager = pager;
    }
    public ngOnInit(): void {
        this.listService.init();
    }
    public ngAfterViewInit(): void {
        if (this.loadOnInit) {
            this.listService.loadData();
        }
    }
    public ngOnDestroy(): void {
        this.listService.destroy();
    }
}
