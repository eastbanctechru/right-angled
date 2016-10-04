import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, Self, SimpleChange } from '@angular/core';
import { ListRequest, ListResponse, SortParameter } from 'e2e4';
import { Observable } from 'rxjs/Observable';

import { LIST_PROVIDERS } from '../../providers';
import { RtListService } from '../list-service';

@Component({
    exportAs: 'rtList',
    providers: [LIST_PROVIDERS],
    selector: 'rt-list',
    template: `<ng-content></ng-content>`
})
export class ListComponent implements OnChanges, OnDestroy, AfterViewInit {
    @Output() public onServiceInit: EventEmitter<RtListService> = new EventEmitter<RtListService>(false);
    @Input() public defaultSortings: Array<SortParameter>;
    @Input() public loadOnInit: boolean = true;
    @Input() public set fetchMethod(value: (requestParams: ListRequest) => Promise<ListResponse<any>> | Observable<ListResponse<any>> | EventEmitter<ListResponse<any>>) {
        this.listService.fetchMethod = value;
    }
    constructor( @Self() public listService: RtListService) {
    }
    public get items(): Array<any> {
        return this.listService.items;
    }
    public reloadData(): void {
        this.listService.reloadData();
    }
    public ngAfterViewInit(): void {
        // We call init in ngAfterViewInit to:
        // 1. allow all child controls to be applied to markup and regiter themself in filtersService
        // 2. give ability to all child controls to apply their default values
        // 3. overwrite these default values by passed via persistence services
        this.onServiceInit.next(this.listService);
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
