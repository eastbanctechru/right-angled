import {Directive, HostListener, HostBinding, KeyValueDiffers, KeyValueDiffer, Input, ElementRef, DoCheck, OnInit} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';
@Directive({
    selector: '[rt-to-prev-page]'
})
export class RtToPrevPage implements DoCheck, OnInit {
    pagerDiffer: KeyValueDiffer;
    pagedListService: NgPagedListService;
    innerDisabled: boolean = false;
    elementRef: ElementRef;
    private checkPageNumberChangedBinded: (item: any) => void;

    constructor(listHost: RtList, differs: KeyValueDiffers, elementRef: ElementRef) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-prev-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.pagerDiffer = differs.find([]).create(null);
        this.checkPageNumberChangedBinded = this.checkPageNumberChanged.bind(this);
        this.elementRef = elementRef;
    }
    @HostListener('click')
    goToPrevPage(): void {
        this.pagedListService.goToPreviousPage();
    }

    @Input('rt-disabled-cls')
    disabledCls: string;

    @HostBinding('attr.disabled')
    get disabled(): boolean {
        return this.innerDisabled;
    }
    checkPageNumberChanged(item: any): void {
        if (item.key === 'pageNumberInternal') {
            this.setDisabledState();
        }
    }
    ngOnDestroy(): void {
        delete this.checkPageNumberChangedBinded;
    }
    ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pagedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPageNumberChangedBinded);
        }
    }
    ngOnInit(): void {
        this.setDisabledState();
    }
    setDisabledState(): void {
        this.innerDisabled = this.pagedListService.pager.pageNumber === 1;
        if (this.innerDisabled) {
            this.elementRef.nativeElement.classList.add(this.disabledCls);
        } else {
            this.elementRef.nativeElement.classList.remove(this.disabledCls);
        }
    }
}
