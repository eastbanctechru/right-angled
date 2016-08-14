import { OnDestroy, OnInit } from '@angular/core';

import { Pager } from 'e2e4';
import { RtListService } from '../providers/index';

export abstract class ListBase implements OnDestroy, OnInit {
    public get items(): Array<any> {
        return this.listService.items;
    }
    public loadOnInit: boolean = true;
    constructor(public listService: RtListService, pager: Pager) {
        this.listService.pager = pager;
    }
    public ngOnInit(): void {
        this.listService.init();
        if (this.loadOnInit) {
            setTimeout(() => {
                this.listService.loadData();
            }, 0);
        }
    }
    public ngOnDestroy(): void {
        this.listService.destroy();
    }
}
