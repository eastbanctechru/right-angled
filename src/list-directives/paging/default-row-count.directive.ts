import { Directive, Input, OnChanges, OnInit, SimpleChange, SkipSelf } from '@angular/core';
import { BufferedPager } from 'e2e4';

@Directive({
    selector: '[rtDefaultRowCount]'
})
export class DefaultRowCountDirective implements OnChanges, OnInit {
    @Input('rtDefaultRowCount') public defaultRowCount: number;
    constructor( @SkipSelf() private pager: BufferedPager) {
    }
    public ngOnInit(): void {
        this.pager.takeRowCount = this.defaultRowCount * 1;
    }
    public ngOnChanges(changes: { defaultRowCount?: SimpleChange }): void {
        if (changes.defaultRowCount) {
            this.pager.defaultRowCount = changes.defaultRowCount.currentValue * 1;
        }
    }
}
