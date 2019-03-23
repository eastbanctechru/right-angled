import { Directive, KeyValueDiffers, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RTPagedPager } from '../providers/paged-pager';
import { Subscription } from 'rxjs';

@Directive({
    selector: 'input[rtPageNumber]'
})
export class PageNumberDirective implements OnInit, OnDestroy {
    @HostBinding('value') public innerValue: string | number;
    pageNumberSubscription: Subscription;
    public get value(): number {
        return this.pager.pageNumber;
    }
    public set value(value: number) {
        this.pager.pageNumber = value;
    }
    constructor(private pager: RTPagedPager) {
        this.pageNumberSubscription = this.pager.pageNumber$.subscribe(value => {
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
        this.pageNumberSubscription.unsubscribe();
    }
}
