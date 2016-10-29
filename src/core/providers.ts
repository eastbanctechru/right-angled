import { Injectable } from '@angular/core';
import { BufferedPager, FiltersService, PagedPager, SelectionEventsHelper, SortingsService } from 'e2e4';

import { AsyncSubscriber } from './async-subscriber';
import { RtList } from './list';
import { RtSelectionService } from './selection/selection-service';

@Injectable()
export class RtPagedPager extends PagedPager { }

@Injectable()
export class RtBufferedPager extends BufferedPager { }

@Injectable()
export class RtSortingsService extends SortingsService { }

@Injectable()
export class RtFiltersService extends FiltersService { }

@Injectable()
export class RtSelectionEventsHelper extends SelectionEventsHelper {
    public preventEventsDefaults: boolean = true;
    public stopEventsPropagation: boolean = true;
    constructor(selectionService: RtSelectionService) {
        super(selectionService);
        this.multiple = true;
    }
}

export var LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtList,
    { provide: FiltersService, useClass: RtFiltersService },
    { provide: SortingsService, useClass: RtSortingsService }
];
