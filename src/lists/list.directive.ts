import {
    AfterViewInit,
    Directive,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    Self,
    SimpleChange
} from '@angular/core';
import { ListRequest, ListResponse, SortingsService, SortParameter } from 'e2e4';
import { Observable, Subscription } from 'rxjs';
import { LIST_PROVIDERS, RTList } from './providers/list';

@Directive({
    exportAs: 'rtList',
    providers: [LIST_PROVIDERS],
    selector: '[rtList]'
})
export class ListDirective implements OnChanges, OnDestroy, AfterViewInit {
    @Output() public onListInit: EventEmitter<RTList> = new EventEmitter<RTList>(false);
    @Output() public afterListInit: EventEmitter<RTList> = new EventEmitter<RTList>(false);
    @Output()
    public onLoadSucceed: EventEmitter<ListResponse<any> | any[]> = new EventEmitter<ListResponse<any> | any[]>();
    @Output() public onLoadFailed: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onLoadStarted: EventEmitter<void> = new EventEmitter<void>();
    @Input() public defaultSortings: SortParameter[];
    @Input() public loadOnInit: boolean = true;
    @Input() public keepRecordsOnLoad: boolean = false;
    @Input('rtList')
    public set fetchMethod(
        value: (
            requestParams: ListRequest
        ) => Promise<ListResponse<any>> | Observable<ListResponse<any>> | EventEmitter<ListResponse<any>>
    ) {
        this.listService.fetchMethod = value;
    }

    private successSubscription: Subscription;
    private failSubscription: Subscription;
    private loadStartedSubscription: Subscription;

    constructor(@Self() public listService: RTList, @Self() private sortingsService: SortingsService) {
        this.successSubscription = listService.onLoadSucceed.subscribe((response: ListResponse<any> | any[]) => {
            this.onLoadSucceed.emit(response);
        });
        this.failSubscription = listService.onLoadFailed.subscribe(() => {
            this.onLoadFailed.emit();
        });
        this.loadStartedSubscription = listService.onLoadStarted.subscribe(() => {
            this.onLoadStarted.emit();
        });
    }
    public ngAfterViewInit(): void {
        // We call init in ngAfterViewInit to:
        // 1. allow all child controls to be applied to markup and regiter themself in filtersService
        // 2. give ability to all child controls to apply their default values
        // 3. overwrite theese default values by values passed via persistence services
        // 4. execute all ngAfterViewInit for custom services registration (setTimeout)
        setTimeout(() => {
            this.onListInit.emit(this.listService);
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
