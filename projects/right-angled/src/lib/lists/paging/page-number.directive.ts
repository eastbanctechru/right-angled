import { Directive, HostListener, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { RTPagedPager } from '../providers/paged-pager';
import { Subscription } from 'rxjs';

@Directive({
    selector: 'input[rtPageNumber]'
})
export class PageNumberDirective implements OnInit, OnDestroy {
    pageNumberSubscription: Subscription;
    public get value(): number {
        return this.pager.pageNumber;
    }
    public set value(value: number) {
        this.pager.pageNumber = value;
    }
    constructor(private pager: RTPagedPager, private elementRef: ElementRef, private renderer: Renderer2) {}

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
        this.pageNumberSubscription = this.pager.pageNumber$.subscribe(() => {
            this.synchronizeInputValue();
        });
        this.synchronizeInputValue();
    }
    public ngOnDestroy(): void {
        this.pageNumberSubscription.unsubscribe();
    }
}
