import { HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';

import { RtListService, RtPagedPager, RtNullObjectInjectable } from '../../providers/index';

@Directive({
    selector: 'input[rtPageSize]'
})
export class PageSizeDirective implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    @HostBinding('value')
    public innerPageSize: number;

    constructor( private listService: RtListService, private pager: RtPagedPager, differs: KeyValueDiffers) {
        if (pager === RtNullObjectInjectable.instance) {
            throw new Error('[rtPageSize] directive can be used only with paged list provider.');
        }
        this.innerPageSize = this.pager.pageSize;
        this.pagerDiffer = differs.find([]).create(null);
    }

    @HostListener('keyup.enter')
    public onEnter(): void {
        this.innerPageSize = this.pager.pageSize;
        this.listService.loadData();
    }

    @HostListener('input', ['$event.target.value'])
    public setPageSize(value: any): void {
        this.innerPageSize = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.pager.pageSize = value;
        setTimeout(() => this.innerPageSize = this.pager.pageSize);
    }

    @HostListener('blur')
    public restoreInputValue(value: any): void {
        this.innerPageSize = this.pager.pageSize;
    }

    private checkPageSizeChanged = (item: any): void => {
        if (item.key === 'pageSizeInternal' && item.currentValue !== this.innerPageSize) {
            this.innerPageSize = item.currentValue;
        }
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPageSizeChanged);
        }
    }
}
