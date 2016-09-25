import { AfterViewInit, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { Pager, SortParameter } from 'e2e4';

import { RtListService } from '../list-service';

export abstract class ListBase implements OnChanges, OnDestroy, OnInit, AfterViewInit {
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
    public ngOnChanges(changes: { defaultSortings?: SimpleChange }): void {
        if (changes.defaultSortings) {
            this.listService.sortingsService.defaultSortings = changes.defaultSortings.currentValue;
        }
    }
}
