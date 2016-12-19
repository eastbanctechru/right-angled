import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer } from '@angular/core';
import { BufferedPager } from 'e2e4';

import { RTList } from '../core/index';

@Directive({
    selector: '[rtInfinite]'
})
export class InfiniteDirective implements OnInit, OnDestroy {
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtInfinite') public targetElement: HTMLElement;
    private scrollListener: any;
    constructor(private elementRef: ElementRef, private bufferedPager: BufferedPager, private list: RTList, private renderer: Renderer) {
    }
    public ngOnInit(): void {
        if (this.targetElement) {
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
        if (this.scrollListener) {
            this.scrollListener();
        }
    }
}
