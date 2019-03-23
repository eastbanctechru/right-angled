import { Directive, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RTPagedPager } from '../providers/paged-pager';
import { Subscription } from 'rxjs';

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: 'input[rtPageSize]'
})
export class PageSizeDirective implements OnInit, OnDestroy {
    pageSizeSubscription: Subscription;
    public get value(): number {
        return this.pager.pageSize;
    }
    public set value(value: number) {
        this.pager.pageSize = value;
    }
    @HostBinding('value') public innerValue: string | number;
    constructor(public pager: RTPagedPager) {
        this.pageSizeSubscription = this.pager.pageSize$.subscribe(value => {
            if (value !== this.innerValue) {
                this.innerValue = value;
            }
        });
    }
    @HostListener('input', ['$event.target.value'])
    public setPageSize(value: any): void {
        this.innerValue = value;
        if (value === null || value === undefined || value === '') {
            return;
        }
        this.value = value;
        setTimeout(() => (this.innerValue = this.value), 0);
    }
    @HostListener('blur')
    public restoreInputValue(): void {
        this.innerValue = this.value;
    }
    public ngOnInit(): void {
        this.restoreInputValue();
    }
    public ngOnDestroy(): void {
        this.pageSizeSubscription.unsubscribe();
    }
}
