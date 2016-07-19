import { SkipSelf, HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';

import { ListComponent } from '../list.component';
import { RtBufferedListService } from '../../services/rt-buffered-list-service.service';

@Directive({
    selector: 'input[rtRowCount]'
})
export class RowCountDirective implements DoCheck {
    public bufferedListService: RtBufferedListService;
    private pagerDiffer: KeyValueDiffer;
    @HostBinding('value')
    private innerRowCount: number;
    private checkRowCountChanged = (item: any): void => {
        if (item.key === 'takeRowCountInternal' && item.currentValue !== this.innerRowCount) {
            this.innerRowCount = item.currentValue;
        }
    }
    constructor( @SkipSelf() listHost: ListComponent, differs: KeyValueDiffers) {
        if (!listHost.isBufferedList) {
            throw new Error('[rtRowCount] directive can be used only with buffered list services.');
        }
        this.bufferedListService = <RtBufferedListService>listHost.serviceInstance;
        this.innerRowCount = this.bufferedListService.pager.takeRowCount;
        this.pagerDiffer = differs.find([]).create(null);
    }
    @HostListener('keyup.enter')
    public onEnter(): void {
        this.innerRowCount = this.bufferedListService.pager.takeRowCount;
        this.bufferedListService.loadData();
    }

    @HostListener('input', ['$event.target.value'])
    public setRowCount(value: any): void {
        this.innerRowCount = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.bufferedListService.pager.takeRowCount = value;
        setTimeout(() => this.innerRowCount = this.bufferedListService.pager.takeRowCount);
    }

    @HostListener('blur')
    public restoreInputValue(value: any): void {
        this.innerRowCount = this.bufferedListService.pager.takeRowCount;
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.bufferedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkRowCountChanged);
        }
    }
}
