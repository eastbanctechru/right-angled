// tslint:disable:max-classes-per-file
import { Injectable, Optional } from '@angular/core';
import { AsyncSubscriber, BufferedPager, FiltersService, List, OperationStatus, PagedPager, SelectionEventsHelper, SortingsService, StateService } from 'e2e4';

import { RtSelectionService } from './selection/selection-service';

export class RtOperationStatus {
    public status: OperationStatus;
}
export abstract class RtStateService extends StateService { }

@Injectable()
export class RtList extends List {
    constructor(
        asyncSubscriber: AsyncSubscriber,
        @Optional() stateServices: RtStateService,
        sortingsService: SortingsService,
        filtersService: FiltersService) {
        super(asyncSubscriber, stateServices, sortingsService, filtersService);
    }
};

@Injectable()
export class RtPagedPager extends PagedPager { }

@Injectable()
export class RtBufferedPager extends BufferedPager { }

@Injectable()
export class RtSortingsService extends SortingsService { }

@Injectable()
export class RtFiltersService extends FiltersService {
    constructor() {
        super();
    }
}

@Injectable()
export class RtSelectionEventsHelper extends SelectionEventsHelper {
    public preventEventsDefaults: boolean = true;
    public stopEventsPropagation: boolean = true;
    constructor(selectionService: RtSelectionService) {
        super(selectionService);
        this.multiple = true;
    }
}

export let LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtList,
    { provide: FiltersService, useClass: RtFiltersService },
    { provide: RtOperationStatus, useExisting: RtList },
    { provide: SortingsService, useClass: RtSortingsService }
];
