import { Directive, Input, OnChanges, SimpleChange, SkipSelf } from '@angular/core';
import { PagedPager } from 'e2e4';

@Directive({
    selector: '[rtDefaultPageSize]'
})
export class DefaultPageSizeDirective implements OnChanges {
    @Input('rtDefaultPageSize') public defaultPageSize: number;
    constructor( @SkipSelf() private pager: PagedPager) {
    }
    public ngOnChanges(changes: { defaultPageSize?: SimpleChange }): void {
        if (changes.defaultPageSize) {
            this.pager.defaultPageSize = changes.defaultPageSize.currentValue * 1;
        }
    }
}
