// tslint:disable:max-classes-per-file
import { EventEmitter, Inject, Injectable, InjectionToken, Optional, SkipSelf } from '@angular/core';
import { AsyncSubscriber, BufferedPager, FiltersService, List, OperationStatus, PagedPager, SelectionEventsHelper, SortingsService, StateService } from 'e2e4';
import { Observable } from 'rxjs/Observable';

import { RTSelectionService } from './selection/selection-service';

export const RTFilterTarget = new InjectionToken('RTFilterTarget');

export class RTOperationStatus {
    public status: OperationStatus;
}
export abstract class RTStateService extends StateService { }

@Injectable()
export class RTList extends List {
    private filterTargets: Array<object> = [];
    constructor(
        asyncSubscriber: AsyncSubscriber,
        @Optional() stateServices: RTStateService,
        @SkipSelf() @Optional() @Inject(RTFilterTarget) filterTargets: any,
        sortingsService: SortingsService,
        filtersService: FiltersService) {

        super(asyncSubscriber, stateServices, sortingsService, filtersService);
        if (filterTargets != null) {
            if (Array.isArray(filterTargets)) {
                this.filterTargets.push(...filterTargets);
            } else {
                this.filterTargets.push(filterTargets);
            }
        }
    }
    public loadData(): Observable<any> | Promise<any> | EventEmitter<any>  {
        return super.loadData();
    }
    public reloadData(): Observable<any> | Promise<any> | EventEmitter<any> {
        return super.reloadData();
    }
    public init(): void {
        this.filtersService.registerFilterTarget(...this.filterTargets);
        super.init();
    }
};

@Injectable()
export class RTPagedPager extends PagedPager { }

@Injectable()
export class RTBufferedPager extends BufferedPager { }

@Injectable()
export class RTSortingsService extends SortingsService { }

@Injectable()
export class RTFiltersService extends FiltersService {
    constructor() {
        super();
    }
}

@Injectable()
export class RTSelectionEventsHelper extends SelectionEventsHelper {
    public preventEventsDefaults: boolean = true;
    public stopEventsPropagation: boolean = true;
    constructor(selectionService: RTSelectionService) {
        super(selectionService);
        this.multiple = true;
    }
}

export let LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RTList,
    { provide: FiltersService, useClass: RTFiltersService },
    { provide: RTOperationStatus, useExisting: RTList },
    { provide: SortingsService, useClass: RTSortingsService }
];
