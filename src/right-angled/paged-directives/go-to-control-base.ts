import { Renderer, KeyValueDiffers, KeyValueDiffer, ElementRef, DoCheck, OnInit } from '@angular/core';
import { RtListComponent } from '../list-components/list.component';
import { NgPagedListService } from '../bootstrap/ng-paged-list-service.service';

export abstract class GoToControlBase implements DoCheck, OnInit {
    private pagerDiffer: KeyValueDiffer;
    protected pagedListService: NgPagedListService;
    protected innerDisabled: boolean = false;
    private nativeEl: any;
    private renderer: Renderer;
    public disabledCls: string;
    constructor(listHost: RtListComponent, differs: KeyValueDiffers, elementRef: ElementRef, renderer: Renderer) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-first-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
        this.pagerDiffer = differs.find([]).create(null);
        this.nativeEl = elementRef.nativeElement;
        this.renderer = renderer;
    }

    public get disabled(): boolean {
        return this.innerDisabled;
    }
    protected checkPagerChanged = (item: any): void => {
        if (item.key === '_pageNumber') {
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
