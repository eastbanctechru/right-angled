import {Directive, HostListener} from '@angular/core';
import {RtList} from '../../lists/list';
import {NgPagedListService} from '../../bootstrap/ngPagedListService';
@Directive({
    selector: '[rt-to-next-page]'
})
export class RtToNextPage {
    pagedListService: NgPagedListService;
    constructor(listHost: RtList) {
        if (!listHost.isPagedList) {
            throw new Error('[rt-to-next-page] directive can be used only with paged list services.');
        }
        this.pagedListService = <NgPagedListService>listHost.serviceInstance;
    }
    @HostListener('click')
    goToNextPage(): void {
        this.pagedListService.goToNextPage();
    }
}
