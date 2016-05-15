import {KeyValueDiffers, KeyValueDiffer, ElementRef, DoCheck, OnInit} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';

export abstract class GoToControlBase implements DoCheck, OnInit {
    pagerDiffer: KeyValueDiffer;
    pagedListService: NgPagedListService;
    protected innerDisabled: boolean = false;
    elementRef: ElementRef;
    private checkPagerChangedBinded: (item: any) => void;
    constructor(listHost: RtList, differs: KeyValueDiffers, elementRef: ElementRef) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-first-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.pagerDiffer = differs.find([]).create(null);
        this.checkPagerChangedBinded = this.checkPagerChanged.bind(this);
        this.elementRef = elementRef;
    }

    disabledCls: string;

    get disabled(): boolean {
        return this.innerDisabled;
    }
    checkPagerChanged(item: any): void {
        if (item.key === 'pageNumberInternal') {
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
        this.innerDisabled = this.isDisabled();
        if (this.innerDisabled) {
            this.elementRef.nativeElement.classList.add(this.disabledCls);
        } else {
            this.elementRef.nativeElement.classList.remove(this.disabledCls);
        }
    }
    abstract isDisabled(): boolean;
}
