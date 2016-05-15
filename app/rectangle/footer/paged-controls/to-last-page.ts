import {Directive, HostListener} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';
@Directive({
    selector: '[rt-to-last-page]'
})
export class RtToLastPage {
    pagedListService: NgPagedListService;
    constructor(listHost: RtList) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-last-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
    }
    @HostListener('click')
    goToLastPage(): void {
        this.pagedListService.goToLastPage();
    }
}
