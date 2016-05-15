import {Directive, HostListener, HostBinding, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit} from '@angular/core';
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

    constructor(listHost: RtList, differs: KeyValueDiffers) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-next-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.pagerDiffer = differs.find([]).create(null);
        this.checkPagerChangedBinded = this.checkPagerChanged.bind(this);
    }
    @HostListener('click')
    goToNextPage(): void {
        this.pagedListService.goToNextPage();
    }
    @HostBinding('attr.disabled')
    get disabled(): boolean {
        return this.innerDisabled;
    }
    checkPagerChanged(item: any): void {
        if (item.key === 'pageNumberInternal' || item.key === 'pageSizeInternal' || item.key === 'totalCount') {
            this.innerDisabled = this.pagedListService.pager.pageNumber === this.pagedListService.pager.pageCount;
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
        this.innerDisabled = this.pagedListService.pager.pageNumber === this.pagedListService.pager.pageCount;
    }

}
