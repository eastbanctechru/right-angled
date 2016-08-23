import { SkipSelf, Component, KeyValueDiffers, KeyValueDiffer, DoCheck } from '@angular/core';
import { BufferedPager, PagedPager, RegularPager, ProgressState } from 'e2e4';

import { ListStateComponent } from './list-state-component';
import { RtListService } from '../list-service';

@Component({
    selector: 'rt-list-state-no-data',
    template: `<ng-content *ngIf="isVisible"></ng-content>`
})
export class ListStateNoDataComponent extends ListStateComponent implements DoCheck {
    private pagerDiffer: KeyValueDiffer;
    private pager: PagedPager | BufferedPager | RegularPager;
    constructor( @SkipSelf() pagedPager: PagedPager, @SkipSelf() bufferedPager: BufferedPager, @SkipSelf() regularPager: RegularPager, @SkipSelf() listService: RtListService, differs: KeyValueDiffers) {
        super(listService, differs, ProgressState.Done);
        this.pagerDiffer = differs.find([]).create(null);
        this.pager = pagedPager || bufferedPager || regularPager;
    }
    public ngDoCheck(): void {
        super.ngDoCheck();
        let pagerDiff = this.pagerDiffer.diff(this.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkLoadedCountChanges);
        }
    }
    private checkLoadedCountChanges = (item: any): void => {
        if (item.key === 'loadedCount') {
            this.setVisibility();
        }
    }
    protected setVisibility(): void {
        this.isVisible = this.listService.state === ProgressState.Done && this.pager.loadedCount === 0;
    }
}
