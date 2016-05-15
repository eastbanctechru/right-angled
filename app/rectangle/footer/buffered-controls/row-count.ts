import {HostBinding, HostListener, Directive, KeyValueDiffers, KeyValueDiffer, DoCheck, OnDestroy} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgBufferedListService} from '../../bootstrap/ngBufferedListService';

@Directive({
    selector: 'input[rt-row-count]'
})
export class RtTakeRowCount implements DoCheck, OnDestroy {
    bufferedListService: NgBufferedListService;
    private pagerDiffer: KeyValueDiffer;
    private checkRowCountChangedBinded: (item: any) => void;
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        if (!listHost.isBufferedList) {
            throw new Error('[rt-row-count] directive can be used only with buffered list services.');
        }
        this.bufferedListService = <NgBufferedListService>listHost.serviceInstance;
        this.innerRowCount = this.bufferedListService.pager.takeRowCount;
        this.pagerDiffer = differs.find([]).create(null);
        this.checkRowCountChangedBinded = this.checkRowCountChange.bind(this);
    }
    @HostBinding('value')
    innerRowCount: number;
    @HostListener('keyup.enter')
    onEnter(): void {
        this.innerRowCount = this.bufferedListService.pager.takeRowCount;
        this.bufferedListService.loadData();
    }

    @HostListener('input', ['$event.target.value'])
    setRowCount(value: any): void {
        this.innerRowCount = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.bufferedListService.pager.takeRowCount = value;
        setTimeout(() => this.innerRowCount = this.bufferedListService.pager.takeRowCount);
    }

    @HostListener('blur')
    restoreInputValue(value: any): void {
        this.innerRowCount = this.bufferedListService.pager.takeRowCount;
    }

    checkRowCountChange(item: any): void {
        if (item.key === 'takeRowCountInternal' && item.currentValue !== this.innerRowCount) {
            this.innerRowCount = item.currentValue;
        }
    }
    ngOnDestroy(): void {
        delete this.checkRowCountChangedBinded;
    }
    ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.bufferedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkRowCountChangedBinded);
        }
    }
}
