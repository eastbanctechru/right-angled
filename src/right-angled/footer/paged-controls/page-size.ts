import { HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { RtListComponent } from '../../lists/list';
import { NgPagedListService } from '../../bootstrap/ngPagedListService';

@Directive({
    selector: 'input[rt-page-size]'
})
export class RtPageSizeDirective implements DoCheck {
    private pagedListService: NgPagedListService;
    private pagerDiffer: KeyValueDiffer;
    @HostBinding('value')
    public innerPageSize: number;

    constructor(listHost: RtListComponent, differs: KeyValueDiffers) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-page-size] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
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
        if (item.key === '_pageSize' && item.currentValue !== this.innerPageSize) {
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
