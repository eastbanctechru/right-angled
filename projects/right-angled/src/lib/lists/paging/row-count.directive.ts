import { Directive, HostListener, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { RTBufferedPager } from '../providers/buffered-pager';
import { Subscription } from 'rxjs';

@Directive({
    selector: 'input[rtRowCount]'
})
export class RowCountDirective implements OnInit, OnDestroy {
    takeRowCountSubscription: Subscription;
    public get value(): number {
        return this.pager.takeRowCount;
    }
    public set value(value: number) {
        this.pager.takeRowCount = value;
    }
    constructor(public pager: RTBufferedPager, private elementRef: ElementRef, private renderer: Renderer2) {}
    @HostListener('input', ['$event.target.value'])
    public setPageSize(value: any): void {
        // Return on empty values to give ability to clear input and enter new value
        if (value === null || value === undefined || value === '') {
            this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
            return;
        }
        this.value = value;
        this.synchronizeInputValue();
    }
    @HostListener('blur')
    public synchronizeInputValue(): void {
        this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.value + '');
    }
    public ngOnInit(): void {
        this.takeRowCountSubscription = this.pager.takeRowCount$.subscribe(() => {
            this.synchronizeInputValue();
        });
        this.synchronizeInputValue();
    }
    public ngOnDestroy(): void {
        this.takeRowCountSubscription.unsubscribe();
    }
}
