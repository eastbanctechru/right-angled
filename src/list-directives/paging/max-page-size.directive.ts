import { Directive, Input, OnChanges, SimpleChange, SkipSelf } from '@angular/core';
import { PagedPager } from 'e2e4';

@Directive({
    selector: '[rtMaxPageSize]'
})
export class MaxPageSizeDirective implements OnChanges {
    @Input('rtMaxPageSize') public maxPageSize: number;
    constructor( @SkipSelf() private pager: PagedPager) {
    }
    public ngOnChanges(changes: { maxPageSize?: SimpleChange }): void {
        if (changes.maxPageSize) {
            this.pager.maxPageSize = changes.maxPageSize.currentValue * 1;
        }
    }
}
