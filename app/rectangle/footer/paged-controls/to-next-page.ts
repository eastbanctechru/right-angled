import {Directive, HostListener, HostBinding, KeyValueDiffers, KeyValueDiffer, Input, ElementRef, DoCheck, OnInit} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';
@Directive({
    selector: '[rt-to-next-page]'
})
export class RtToNextPage implements DoCheck, OnInit {
    pagerDiffer: KeyValueDiffer;
    pagedListService: NgPagedListService;
    innerDisabled: boolean = false;
    private checkPagerChangedBinded: (item: any) => void;
    elementRef: ElementRef;
    constructor(listHost: RtList, differs: KeyValueDiffers, elementRef: ElementRef) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-next-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.pagerDiffer = differs.find([]).create(null);
        this.checkPagerChangedBinded = this.checkPagerChanged.bind(this);
        this.elementRef = elementRef;
    }
    @HostListener('click')
    goToNextPage(): void {
        this.pagedListService.goToNextPage();
    }

    @Input('rt-disabled-cls')
    disabledCls: string;


    @HostBinding('attr.disabled')
    get disabled(): boolean {
        return this.innerDisabled;
    }
    checkPagerChanged(item: any): void {
        if (item.key === 'pageNumberInternal' || item.key === 'pageSizeInternal' || item.key === 'totalCount') {
            this.setDisabledState();
        }
    }
    ngOnDestroy(): void {
        delete this.checkPagerChangedBinded;
    }
    ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pagedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChangedBinded);
        }
    }
    ngOnInit(): void {
        this.setDisabledState();
    }
    setDisabledState(): void {
        this.innerDisabled = this.pagedListService.pager.pageNumber === this.pagedListService.pager.pageCount;
        if (this.innerDisabled) {
            this.elementRef.nativeElement.classList.add(this.disabledCls);
        } else {
            this.elementRef.nativeElement.classList.remove(this.disabledCls);
        }
    }
}
