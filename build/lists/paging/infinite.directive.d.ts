import { ElementRef, OnChanges, OnDestroy, Renderer2, SimpleChange } from '@angular/core';
import { BufferedPager } from 'e2e4';
import { RTList } from '../providers/list';
export declare class InfiniteDirective implements OnDestroy, OnChanges {
    private elementRef;
    private bufferedPager;
    private list;
    private renderer;
    targetElement: HTMLElement;
    scrollListener: any;
    constructor(elementRef: ElementRef, bufferedPager: BufferedPager, list: RTList, renderer: Renderer2);
    ngOnChanges(changes: {
        targetElement?: SimpleChange;
    }): void;
    ngOnDestroy(): void;
}
