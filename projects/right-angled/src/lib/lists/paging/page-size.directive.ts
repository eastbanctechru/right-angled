import { Directive, HostListener, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { RTPagedPager } from '../providers/paged-pager';
import { Subscription } from 'rxjs';

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: 'input[rtPageSize]',
})
export class PageSizeDirective implements OnInit, OnDestroy {
    pageSizeSubscription: Subscription;
    public get value(): number {
        return this.pager.pageSize;
    }
    public set value(value: number) {
        this.pager.pageSize = value;
    }
    constructor(public pager: RTPagedPager, private elementRef: ElementRef, private renderer: Renderer2) {}
    @HostListener('input', ['$event.target.value'])
    public setPageSize(value: any): void {
        // Return on empty values to give ability to clear input before entering new value
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
        this.pageSizeSubscription = this.pager.pageSize$.subscribe(() => {
            this.synchronizeInputValue();
        });
        this.synchronizeInputValue();
    }
    public ngOnDestroy(): void {
        this.pageSizeSubscription.unsubscribe();
    }
}
