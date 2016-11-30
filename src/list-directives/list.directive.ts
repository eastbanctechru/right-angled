import { AfterViewInit, Directive, EventEmitter, Input, OnChanges, OnDestroy, Output, Self, SimpleChange } from '@angular/core';
import { ListRequest, ListResponse, SortingsService, SortParameter } from 'e2e4';
import { Observable } from 'rxjs/Observable';

import { LIST_PROVIDERS, RtList } from '../core';

@Directive({
    exportAs: 'rtList',
    providers: [LIST_PROVIDERS],
    selector: '[rtList]'
})
export class ListDirective implements OnChanges, OnDestroy, AfterViewInit {
    @Output() public onListInit: EventEmitter<RtList> = new EventEmitter<RtList>(false);
    @Output() public afterListInit: EventEmitter<RtList> = new EventEmitter<RtList>(false);
    @Input() public defaultSortings: SortParameter[];
    @Input() public loadOnInit: boolean = true;
    @Input('rtList') public set fetchMethod(value: (requestParams: ListRequest) => Promise<ListResponse<any>> | Observable<ListResponse<any>> | EventEmitter<ListResponse<any>>) {
        this.listService.fetchMethod = value;
    }
    constructor( @Self() public listService: RtList, @Self() private sortingsService: SortingsService) {
    }
    public ngAfterViewInit(): void {
        // We call init in ngAfterViewInit to:
        // 1. allow all child controls to be applied to markup and regiter themself in filtersService
        // 2. give ability to all child controls to apply their default values
        // 3. overwrite theese default values by values passed via persistence services
        // 4. execute all ngAfterViewInit for custom services registration (setTimeout)
        setTimeout(() => {
            this.onListInit.next(this.listService);
            this.listService.init();
            this.afterListInit.next(this.listService);
            if (this.loadOnInit) {
                this.listService.loadData();
            }
        }, 0);
    }
    public ngOnDestroy(): void {
        this.listService.destroy();
    }
    public ngOnChanges(changes: { defaultSortings?: SimpleChange }): void {
        if (changes.defaultSortings) {
            this.sortingsService.defaultSortings = changes.defaultSortings.currentValue;
        }
    }
    public reloadData(): void {
        this.listService.reloadData();
    }
    public loadData(): void {
        this.listService.loadData();
    }
    public resetSettings(): void {
        this.listService.resetSettings();
    }
    public cancelRequests(): void {
        this.listService.cancelRequests();
    }
    public get items(): any[] {
        return this.listService.items;
    }
    public get busy(): boolean {
        return this.listService.busy;
    }
    public get ready(): boolean {
        return this.listService.ready;
    }
}
