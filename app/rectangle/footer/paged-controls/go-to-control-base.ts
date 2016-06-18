import {Renderer, KeyValueDiffers, KeyValueDiffer, ElementRef, DoCheck, OnInit} from '@angular/core';
import {RtListComponent} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';

export abstract class GoToControlBase implements DoCheck, OnInit {
    pagerDiffer: KeyValueDiffer;
    pagedListService: NgPagedListService;
    protected innerDisabled: boolean = false;
    private nativeEl: any;
    private renderer: Renderer;
    constructor(listHost: RtListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-first-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.pagerDiffer = differs.find([]).create(null);
        this.nativeEl = elementRef.nativeElement;
        this.renderer = renderer;
    }

    disabledCls: string;

    get disabled(): boolean {
        return this.innerDisabled;
    }
    checkPagerChanged = (item: any): void => {
        if (item.key === 'pageNumberInternal') {
            this.setDisabledState();
        }
    }
    ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pagedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanged);
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
