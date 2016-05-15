import {HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';

@Directive({
    selector: 'input[rt-page-size]'
})
export class RtPageSize implements DoCheck, OnDestroy {
    pagedListService: NgPagedListService;
    private pagerDiffer: KeyValueDiffer;
    private checkPageSizeChangedBinded: (item: any) => void;
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-page-size] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.innerPageSize = this.pagedListService.pager.pageSize;
        this.pagerDiffer = differs.find([]).create(null);
        this.checkPageSizeChangedBinded = this.checkPageSizeChanged.bind(this);
    }
    @HostBinding('value')
    innerPageSize: number;

    @HostListener('keyup.enter')
    onEnter(): void {
        this.innerPageSize = this.pagedListService.pager.pageSize;
        this.pagedListService.loadData();
    }

    @HostListener('input', ['$event.target.value'])
    setPageSize(value: any): void {
        this.innerPageSize = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.pagedListService.pager.pageSize = value;
        setTimeout(() => this.innerPageSize = this.pagedListService.pager.pageSize);
    }

    @HostListener('blur')
    restoreInputValue(value: any): void {
        this.innerPageSize = this.pagedListService.pager.pageSize;
    }

    checkPageSizeChanged(item: any): void {
        if (item.key === 'pageSizeInternal' && item.currentValue !== this.innerPageSize) {
            this.innerPageSize = item.currentValue;
        }
    }
    ngOnDestroy(): void {
        delete this.checkPageSizeChangedBinded;
    }
    ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pagedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPageSizeChangedBinded);
        }
    }
}
