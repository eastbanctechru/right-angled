// tslint:disable:max-classes-per-file
import { Inject, Injectable, OpaqueToken, Optional, SkipSelf } from '@angular/core';
import { AsyncSubscriber, BufferedPager, FiltersService, List, OperationStatus, PagedPager, SelectionEventsHelper, SortingsService, StateService } from 'e2e4';

import { RTSelectionService } from './selection/selection-service';

export const RTFilterTarget = new OpaqueToken('RTFilterTarget');

export class RTOperationStatus {
    public status: OperationStatus;
}
export abstract class RTStateService extends StateService { }

@Injectable()
export class RTList extends List {
    constructor(
        asyncSubscriber: AsyncSubscriber,
        @Optional() stateServices: RTStateService,
        @SkipSelf() @Optional() @Inject(RTFilterTarget) filterTarget: any,
        sortingsService: SortingsService,
        filtersService: FiltersService) {

        super(asyncSubscriber, stateServices, sortingsService, filtersService);
        filtersService.registerFilterTarget(...filterTarget);
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
