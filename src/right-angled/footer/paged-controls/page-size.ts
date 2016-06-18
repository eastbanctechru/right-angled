import {HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck} from '@angular/core';
import {RtListComponent} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';

@Directive({
    /* tslint:disable:directive-selector-prefix */
    selector: 'input[rt-page-size]'
    /* tslint:ensable:directive-selector-prefix */
})
export class RtPageSizeDirective implements DoCheck {
    pagedListService: NgPagedListService;
    private pagerDiffer: KeyValueDiffer;
    constructor(listHost: RtListComponent, differs: KeyValueDiffers) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-page-size] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.innerPageSize = this.pagedListService.pager.pageSize;
        this.pagerDiffer = differs.find([]).create(null);
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

    checkPageSizeChanged = (item: any): void => {
        if (item.key === 'pageSizeInternal' && item.currentValue !== this.innerPageSize) {
            this.innerPageSize = item.currentValue;
        }
    }
    ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pagedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPageSizeChanged);
        }
    }
}
