import { Directive, Input, OnChanges, OnInit, SimpleChange, SkipSelf } from '@angular/core';
import { PagedPager } from 'e2e4';

@Directive({
    selector: '[rtDefaultPageSize]'
})
export class DefaultPageSizeDirective implements OnChanges, OnInit {
    @Input('rtDefaultPageSize') public defaultPageSize: number;
    constructor( @SkipSelf() private pager: PagedPager) {
    }
    public ngOnInit(): void {
        this.pager.pageSize = this.defaultPageSize * 1;
    }
    public ngOnChanges(changes: { defaultPageSize?: SimpleChange }): void {
        if (changes.defaultPageSize) {
            this.pager.defaultPageSize = changes.defaultPageSize.currentValue * 1;
        }
    }
}
