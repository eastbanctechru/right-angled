import {Directive, HostListener} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';
@Directive({
    selector: '[rt-to-prev-page]'
})
export class RtToPrevPage {
    pagedListService: NgPagedListService;
    constructor(listHost: RtList) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-prev-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
    }
    @HostListener('click')
    goToPrevPage(): void {
        this.pagedListService.goToPreviousPage();
    }
}
