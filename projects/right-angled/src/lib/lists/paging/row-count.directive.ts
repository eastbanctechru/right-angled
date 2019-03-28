import { Directive, HostListener, HostBinding, DoCheck, OnInit, OnDestroy } from '@angular/core';
import { RTBufferedPager } from '../providers/buffered-pager';
import { Subscription } from 'rxjs';

@Directive({
    selector: 'input[rtRowCount]'
})
export class RowCountDirective implements OnInit, OnDestroy {
    @HostBinding('value') public innerValue: string | number;
    takeRowCountSubscription: Subscription;
    public get value(): number {
        return this.pager.takeRowCount;
    }
    public set value(value: number) {
        this.pager.takeRowCount = value;
    }
    constructor(public pager: RTBufferedPager) {
        this.takeRowCountSubscription = this.pager.takeRowCount$.subscribe(value => {
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
        this.takeRowCountSubscription.unsubscribe();
    }
}
