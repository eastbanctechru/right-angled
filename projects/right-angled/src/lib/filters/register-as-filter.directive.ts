import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { RTFiltersService } from './filters.service';
@Directive({
    selector: '[rtRegisterAsFilter]'
})
export class RegisterAsFilterDirective implements OnInit, OnDestroy {
    @Input('rtRegisterAsFilter') public filterTarget: any;
    constructor(public filtersService: RTFiltersService) {}
    public ngOnInit(): void {
        this.filtersService.registerFilterTarget(this.filterTarget);
    }
    public ngOnDestroy(): void {
        this.filtersService.removeFilterTarget(this.filterTarget);
    }
}
