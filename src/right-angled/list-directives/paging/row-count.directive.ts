import { SkipSelf, HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';

import { RtListService } from '../../services/rt-list-service.service';
import { RtNullObjectInjectableObject, RtBufferedPager } from '../../services/injectables';

@Directive({
    selector: 'input[rtRowCount]'
})
export class RowCountDirective implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    @HostBinding('value')
    private innerRowCount: number;
    private checkRowCountChanged = (item: any): void => {
        if (item.key === 'takeRowCountInternal' && item.currentValue !== this.innerRowCount) {
            this.innerRowCount = item.currentValue;
        }
    }
    constructor( @SkipSelf() private listService: RtListService, @SkipSelf() private pager: RtBufferedPager, differs: KeyValueDiffers) {
        if (pager === RtNullObjectInjectableObject.instance) {
            throw new Error('[rtRowCount] directive can be used only with buffered list services.');
        }
        this.innerRowCount = pager.takeRowCount;
        this.pagerDiffer = differs.find([]).create(null);
    }
    @HostListener('keyup.enter')
    public onEnter(): void {
        this.innerRowCount = this.pager.takeRowCount;
        this.listService.loadData();
    }

    @HostListener('input', ['$event.target.value'])
    public setRowCount(value: any): void {
        this.innerRowCount = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.pager.takeRowCount = value;
        setTimeout(() => this.innerRowCount = this.pager.takeRowCount);
    }

    @HostListener('blur')
    public restoreInputValue(value: any): void {
        this.innerRowCount = this.pager.takeRowCount;
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkRowCountChanged);
        }
    }
}
