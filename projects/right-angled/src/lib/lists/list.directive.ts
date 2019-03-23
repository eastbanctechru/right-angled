import { AfterViewInit, Directive, EventEmitter, Input, OnChanges, OnDestroy, Output, Self, SimpleChange } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LIST_PROVIDERS, RTList } from './providers/list';
import { ListResponse } from '../core/list-response';
import { SortParameter } from '../core/sort-parameter';
import { ListRequest } from '../core/list-request';
import { RTSortingsService } from './providers/sortings.service';

@Directive({
    exportAs: 'rtList',
    providers: [LIST_PROVIDERS],
    selector: '[rtList]'
})
export class ListDirective implements OnChanges, OnDestroy, AfterViewInit {
    @Output()
    public readonly listInit: EventEmitter<RTList> = new EventEmitter<RTList>(false);
    @Output()
    public readonly afterListInit: EventEmitter<RTList> = new EventEmitter<RTList>(false);
    @Output()
    public readonly loadSucceed: EventEmitter<ListResponse<any> | any[]> = new EventEmitter<ListResponse<any> | any[]>();
    @Output()
    public readonly loadFailed: EventEmitter<any> = new EventEmitter<any>();
    @Output()
    public readonly loadStarted: EventEmitter<void> = new EventEmitter<void>();
    @Input()
    public defaultSortings: SortParameter[];
    @Input()
    public loadOnInit = true;
    @Input()
    public keepRecordsOnLoad = false;
    public items$: Observable<any[]>;
    public busy$: Observable<boolean>;
    public ready$: Observable<boolean>;
    @Input('rtList')
    public set fetchMethod(
        value: (requestParams: ListRequest) => Promise<ListResponse<any>> | Observable<ListResponse<any>> | EventEmitter<ListResponse<any>>
    ) {
        this.listService.fetchMethod = value;
    }

    private successSubscription: Subscription;
    private failSubscription: Subscription;
    private loadStartedSubscription: Subscription;

    constructor(@Self() public listService: RTList, @Self() public sortingsService: RTSortingsService) {
        this.successSubscription = listService.loadSucceed.subscribe((response: ListResponse<any> | any[]) => {
            this.loadSucceed.emit(response);
        });
        this.failSubscription = listService.loadFailed.subscribe(() => {
            this.loadFailed.emit();
        });
        this.loadStartedSubscription = listService.loadStarted.subscribe(() => {
            this.loadStarted.emit();
        });
        this.items$ = this.listService.items$;
        this.busy$ = this.listService.busy$;
        this.ready$ = this.listService.ready$;
    }
    public ngAfterViewInit(): void {
        // We call init in ngAfterViewInit to:
        // 1. allow all child controls to be applied to markup and regiter themself in filtersService
        // 2. give ability to all child controls to apply their default values
        // 3. overwrite theese default values by values passed via persistence services
        // 4. execute all ngAfterViewInit for custom services registration (setTimeout)
        setTimeout(() => {
            this.listInit.emit(this.listService);
            this.listService.init();
            this.afterListInit.emit(this.listService);
            if (this.loadOnInit) {
                this.listService.loadData();
            }
        }, 0);
    }
    public ngOnDestroy(): void {
        this.listService.destroy();
        this.successSubscription.unsubscribe();
        this.failSubscription.unsubscribe();
        this.loadStartedSubscription.unsubscribe();
    }
    public ngOnChanges(changes: { keepRecordsOnLoad?: SimpleChange; defaultSortings?: SimpleChange }): void {
        if (changes.defaultSortings) {
            this.sortingsService.defaultSortings = changes.defaultSortings.currentValue;
        }
        if (changes.keepRecordsOnLoad) {
            this.listService.keepRecordsOnLoad = changes.keepRecordsOnLoad.currentValue;
        }
    }
    public reloadData(): Observable<any> | Promise<any> | EventEmitter<any> {
        return this.listService.reloadData();
    }
    public loadData(): Observable<any> | Promise<any> | EventEmitter<any> {
        return this.listService.loadData();
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
