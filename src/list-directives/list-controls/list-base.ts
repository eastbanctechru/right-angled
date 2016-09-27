import { AfterViewInit, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { Pager, SortParameter } from 'e2e4';

import { RtListService } from '../list-service';

export abstract class ListBase implements OnChanges, OnDestroy, AfterViewInit {
    public get items(): Array<any> {
        return this.listService.items;
    }
    public loadOnInit: boolean = true;
    public defaultSortings: Array<SortParameter>;

    public reloadData(): void {
        this.listService.reloadData();
    }
    constructor(public listService: RtListService, public pager: Pager) {
        this.listService.pager = pager;
    }
    public ngAfterViewInit(): void {
        // We call init in ngAfterViewInit to:
        // 1. allow all child controls to be applied to markup and regiter themself in filtersService
        // 2. give ability to all child controls to apply their default values
        // 3. overwrite these default values by passed via persistence services
        this.listService.init();
        if (this.loadOnInit) {
            this.listService.loadData();
        }
    }
    public ngOnDestroy(): void {
        this.listService.destroy();
    }
    public ngOnChanges(changes: { defaultSortings?: SimpleChange }): void {
        if (changes.defaultSortings) {
            this.listService.sortingsService.defaultSortings = changes.defaultSortings.currentValue;
        }
    }
}
