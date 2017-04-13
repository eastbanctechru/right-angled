import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { FiltersService } from 'e2e4';

@Directive({
    selector: '[rtRegisterAsFilter]'
})
export class RegisterAsFilterDirective implements OnInit, OnDestroy {
    /* tslint:disable-next-line:no-input-rename */
    @Input('rtRegisterAsFilter') public filterTarget: any;
    constructor(public filtersService: FiltersService) {
    }
    public ngOnInit(): void {
        this.filtersService.registerFilterTarget(this.filterTarget);
    }
    public ngOnDestroy(): void {
        this.filtersService.removeFilterTarget(this.filterTarget);
    }
}
