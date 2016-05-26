import {Renderer, KeyValueDiffers, KeyValueDiffer, ElementRef, DoCheck, OnInit} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';

export abstract class GoToControlBase implements DoCheck, OnInit {
    pagerDiffer: KeyValueDiffer;
    pagedListService: NgPagedListService;
    protected innerDisabled: boolean = false;
    private nativeEl: any;
    private renderer: Renderer;
    private checkPagerChangedBinded: (item: any) => void;
    constructor(listHost: RtList, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-first-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.pagerDiffer = differs.find([]).create(null);
        this.checkPagerChangedBinded = this.checkPagerChanged.bind(this);
        this.nativeEl = elementRef.nativeElement;
        this.renderer = renderer;
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
            this.renderer.setElementClass(this.nativeEl, this.disabledCls, true);
        } else {
            this.renderer.setElementClass(this.nativeEl, this.disabledCls, false);
        }
    }
    abstract isDisabled(): boolean;
}
