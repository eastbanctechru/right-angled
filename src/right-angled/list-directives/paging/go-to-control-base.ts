import { Renderer, KeyValueDiffers, KeyValueDiffer, ElementRef, DoCheck, OnInit } from '@angular/core';

import { ListComponent } from '../list.component';
import { RtPagedListService } from '../../services/rt-paged-list-service.service';

export abstract class GoToControlBase implements DoCheck, OnInit {
    private pagerDiffer: KeyValueDiffer;
    protected pagedListService: RtPagedListService;
    protected innerDisabled: boolean = false;
    private nativeEl: any;
    public disabledCls: string;
    constructor(private renderer: Renderer, listHost: ListComponent, differs: KeyValueDiffers, elementRef: ElementRef) {
        if (!listHost.isPagedList) {
            throw new Error('[rtGoToFirstPage] directive can be used only with paged list services.');
        }
        this.pagedListService = <RtPagedListService>listHost.serviceInstance;
        this.pagerDiffer = differs.find([]).create(null);
        this.nativeEl = elementRef.nativeElement;
    }

    public get disabled(): boolean {
        return this.innerDisabled;
    }
    protected checkPagerChanged = (item: any): void => {
        if (item.key === 'pageNumberInternal') {
            this.setDisabledState();
        }
    }
    public ngDoCheck(): void {
        let pagerDiff = this.pagerDiffer.diff(this.pagedListService.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanged);
        }
    }
    public ngOnInit(): void {
        this.setDisabledState();
    }
    protected setDisabledState(): void {
        this.innerDisabled = this.isDisabled();
        if (this.innerDisabled) {
            this.renderer.setElementClass(this.nativeEl, this.disabledCls, true);
        } else {
            this.renderer.setElementClass(this.nativeEl, this.disabledCls, false);
        }
    }
    public abstract isDisabled(): boolean;
}
