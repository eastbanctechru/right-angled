import {Directive, HostListener} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';
@Directive({
    selector: '[rt-to-first-page]'
})
export class RtToFirstPage {
    pagedListService: NgPagedListService;
    constructor(listHost: RtList) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-first-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
    }
    @HostListener('click')
    goToFirstPage(): void {
        this.pagedListService.goToFirstPage();
    }
}
