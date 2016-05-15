import {Directive, HostListener, HostBinding, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';
@Directive({
    selector: '[rt-to-first-page]'
})
export class RtToFirstPage implements DoCheck, OnInit {
    pagerDiffer: KeyValueDiffer;
    pagedListService: NgPagedListService;
    innerDisabled: boolean = false;
    private checkPageNumberChangedBinded: (item: any) => void;
    constructor(listHost: RtList, differs: KeyValueDiffers) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-first-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.pagerDiffer = differs.find([]).create(null);
        this.checkPageNumberChangedBinded = this.checkPageNumberChanged.bind(this);
    }
    @HostListener('click')
    goToFirstPage(): void {
        this.pagedListService.goToFirstPage();
    }

    @HostBinding('attr.disabled')
    get disabled(): boolean {
        return this.innerDisabled;
    }
    checkPageNumberChanged(item: any): void {
        if (item.key === 'pageNumberInternal') {
            this.innerDisabled = this.pagedListService.pager.pageNumber === 1;
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
        this.innerDisabled = this.pagedListService.pager.pageNumber === 1;
    }
}
