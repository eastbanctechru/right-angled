import { Injectable } from '@angular/core';
import { BufferedPager, FiltersService, PagedPager, RegularPager, SortingsService } from 'e2e4';

@Injectable()
class RtPagedPager extends PagedPager { }

@Injectable()
class RtBufferedPager extends BufferedPager { }

@Injectable()
class RtRegularPager extends RegularPager { }

@Injectable()
class RtSortingsService extends SortingsService { }

@Injectable()
class RtFiltersService extends FiltersService { }

import { AsyncSubscriber } from './core/async-subscriber';
import { RtListService } from './core/list-service';
import { RtPersistenceService } from './core/persistence/persistence-service';

export var PAGED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    { provide: BufferedPager, useValue: null },
    { provide: RegularPager, useValue: null },
    { provide: PagedPager, useClass: RtPagedPager },
    { provide: FiltersService, useClass: RtFiltersService },
    { provide: SortingsService, useClass: RtSortingsService }
];

export var BUFFERED_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    { provide: BufferedPager, useClass: RtBufferedPager },
    { provide: RegularPager, useValue: null },
    { provide: PagedPager, useValue: null },
    { provide: FiltersService, useClass: RtFiltersService },
    { provide: SortingsService, useClass: RtSortingsService }
];

export var REGULAR_LIST_PROVIDERS: any[] = [
    AsyncSubscriber,
    RtListService,
    { provide: BufferedPager, useValue: null },
    { provide: RegularPager, useClass: RtRegularPager },
    { provide: PagedPager, useValue: null },
    { provide: FiltersService, useClass: RtFiltersService },
    { provide: SortingsService, useClass: RtSortingsService }
];

export function registerPersistenceService({useClass, useValue, useExisting, useFactory, deps, multi}: {
    useClass?: any;
    useValue?: any;
    useExisting?: any;
    useFactory?: Function;
    deps?: Object[];
    multi?: boolean;
}): void {

    REGULAR_LIST_PROVIDERS.push({
        provide: RtPersistenceService,
        useClass,
        useValue,
        useExisting,
        useFactory,
        deps,
        multi
    });
    BUFFERED_LIST_PROVIDERS.push({
        provide: RtPersistenceService,
        useClass,
        useValue,
        useExisting,
        useFactory,
        deps,
        multi
    });
    PAGED_LIST_PROVIDERS.push({
        provide: RtPersistenceService,
        useClass,
        useValue,
        useExisting,
        useFactory,
        deps,
        multi
    });
}
