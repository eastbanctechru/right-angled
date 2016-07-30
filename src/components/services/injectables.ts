import { AbstractLifetime, PagedPager, BufferedPager, RegularPager, SortingsService, FiltersService } from 'e2e4';
import { Injectable } from '@angular/core';

@Injectable()
export class RtPagedPager extends PagedPager {
    public tryMoveToFirstPage(): boolean {
        if (this.pageNumber > 1) {
            this.pageNumber = 1;
            return true;
        }
    }
    public tryMoveToPreviousPage(): boolean {
        if (this.pageNumber > 1) {
            this.pageNumber -= 1;
            return true;
        }
    }
    public tryMoveToNextPage(): boolean {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber += 1;
            return true;
        }
    }
    public tryMoveToLastPage(): boolean {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber = this.pageCount;
            return true;
        }
    }
}
@Injectable()
export class RtBufferedPager extends BufferedPager { }
@Injectable()
export class RtRegularPager extends RegularPager { }
@Injectable()
export class RtSortingsService extends SortingsService { }
@Injectable()
export class RtFiltersService extends FiltersService { }
@Injectable()
export class RtListLifetimeInfo extends AbstractLifetime { }
