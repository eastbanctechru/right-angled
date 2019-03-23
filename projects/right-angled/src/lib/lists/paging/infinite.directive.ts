import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChange } from '@angular/core';
import { RTList } from '../providers/list';
import { RTBufferedPager } from '../providers/buffered-pager';

@Directive({
    selector: '[rtInfinite]'
})
export class InfiniteDirective implements OnDestroy, OnChanges {
    @Input('rtInfinite') public targetElement: HTMLElement;
    public scrollListener: any;
    constructor(private elementRef: ElementRef, private bufferedPager: RTBufferedPager, private list: RTList, private renderer: Renderer2) {}
    public ngOnChanges(changes: { targetElement?: SimpleChange }): void {
        if (this.scrollListener) {
            this.scrollListener();
        }
        if (changes.targetElement && changes.targetElement.currentValue) {
            this.scrollListener = this.renderer.listen(this.targetElement, 'scroll', () => {
                if (this.list.busy || false === this.bufferedPager.canLoadMore) {
                    return;
                }

                const targetTop = this.targetElement.getBoundingClientRect().top;
                const targetHeight = this.targetElement.clientHeight;
                const elementPosition = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect().top;
                if (targetTop + targetHeight >= elementPosition) {
                    this.list.loadData();
                }
            });
        } else {
            this.scrollListener = this.renderer.listen('window', 'scroll', () => {
                if (this.list.busy || false === this.bufferedPager.canLoadMore) {
                    return;
                }
                const windowHeight = document.documentElement.clientHeight;
                const elementPosition = (this.elementRef.nativeElement as HTMLElement).getBoundingClientRect().top;
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
