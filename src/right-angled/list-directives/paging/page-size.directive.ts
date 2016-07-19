import { HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';

import { ListComponent } from '../list.component';
import { RtPagedListService } from '../../services/rt-paged-list-service.service';

@Directive({
    selector: 'input[rtPageSize]'
})
export class PageSizeDirective implements DoCheck {
    private pagedListService: RtPagedListService;
    private pagerDiffer: KeyValueDiffer;
    @HostBinding('value')
    public innerPageSize: number;

    constructor(listHost: ListComponent, differs: KeyValueDiffers) {
        if (!listHost.isPagedList) {
            throw new Error('[rtPageSize] directive can be used only with paged list services.');
        }
        this.pagedListService = <RtPagedListService>listHost.serviceInstance;
        this.innerPageSize = this.pagedListService.pager.pageSize;
        this.pagerDiffer = differs.find([]).create(null);
    }

    @HostListener('keyup.enter')
    public onEnter(): void {
        this.innerPageSize = this.pagedListService.pager.pageSize;
        this.pagedListService.loadData();
    }

    @HostListener('input', ['$event.target.value'])
    public setPageSize(value: any): void {
        this.innerPageSize = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.pagedListService.pager.pageSize = value;
        setTimeout(() => this.innerPageSize = this.pagedListService.pager.pageSize);
    }

    @HostListener('blur')
    public restoreInputValue(value: any): void {
        this.innerPageSize = this.pagedListService.pager.pageSize;
    }

    private checkPageSizeChanged = (item: any): void => {
        if (item.key === 'pageSizeInternal' && item.currentValue !== this.innerPageSize) {
            this.innerPageSize = item.currentValue;
        }
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pagedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPageSizeChanged);
        }
    }
}
