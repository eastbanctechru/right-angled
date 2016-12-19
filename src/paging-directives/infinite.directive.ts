import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer, SimpleChange } from '@angular/core';
import { BufferedPager } from 'e2e4';

import { RTList } from '../core/index';

@Directive({
    selector: '[rtInfinite]'
})
export class InfiniteDirective implements OnDestroy, OnChanges {
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtInfinite') public targetElement: HTMLElement;
    public scrollListener: any;
    constructor(private elementRef: ElementRef, private bufferedPager: BufferedPager, private list: RTList, private renderer: Renderer) {
    }
    public ngOnChanges(changes: { targetElement?: SimpleChange }): void {
        if (this.scrollListener) {
            this.scrollListener();
        }
        if (changes.targetElement && changes.targetElement.currentValue) {
            this.scrollListener = this.renderer.listen(this.targetElement, 'scroll', () => {
                if (this.list.busy || false === this.bufferedPager.canLoadMore) {
                    return;
                }
                let targetTop = this.targetElement.getBoundingClientRect().top;
                let targetHeight = this.targetElement.clientHeight;
                let elementPosition = (<HTMLElement>this.elementRef.nativeElement).getBoundingClientRect().top;
                if (targetTop + targetHeight >= elementPosition) {
                    this.list.loadData();
                }
            });
        } else {
            this.scrollListener = this.renderer.listenGlobal('window', 'scroll', () => {
                if (this.list.busy || false === this.bufferedPager.canLoadMore) {
                    return;
                }
                let windowHeight = document.documentElement.clientHeight;
                let elementPosition = (<HTMLElement>this.elementRef.nativeElement).getBoundingClientRect().top;
                if (elementPosition - windowHeight <= 0) {
                    this.list.loadData();
                }
            });
        }
    }
    public ngOnDestroy(): void {
        this.scrollListener();
    }
}
