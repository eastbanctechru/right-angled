import {HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';

@Directive({
    selector: 'input[rt-page-number]'
})
export class RtPageNumber implements DoCheck, OnDestroy {
    pagedListService: NgPagedListService;
    private pagerDiffer: KeyValueDiffer;
    private checkPageNumberChangedBinded: (item: any) => void;
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-page-number] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.innerPageNumber = this.pagedListService.pager.pageNumber;
        this.pagerDiffer = differs.find([]).create(null);
        this.checkPageNumberChangedBinded = this.checkPageNumberChanged.bind(this);
    }
    @HostBinding('value')
    innerPageNumber: number;

    @HostListener('keyup.enter')
    onEnter(): void {
        this.innerPageNumber = this.pagedListService.pager.pageNumber;
        this.pagedListService.loadData();
    }

    @HostListener('input', ['$event.target.value'])
    setPageSize(value: any): void {
        this.innerPageNumber = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.pagedListService.pager.pageNumber = value;
        setTimeout(() => this.innerPageNumber = this.pagedListService.pager.pageNumber);
    }

    @HostListener('blur')
    restoreInputValue(value: any): void {
        this.innerPageNumber = this.pagedListService.pager.pageNumber;
    }

    checkPageNumberChanged(item: any): void {
        if (item.key === 'pageNumberInternal' && item.currentValue !== this.innerPageNumber) {
            this.innerPageNumber = item.currentValue;
        }
    }
    ngOnDestroy(): void {
        delete this.checkPageNumberChangedBinded;
    }
    ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pagedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPageNumberChangedBinded);
        }
    }
}
