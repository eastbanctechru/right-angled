import { Directive, OnInit, OnDestroy, Input } from '@angular/core';
import { RtFiltersService } from  '../providers/index';

@Directive({
    selector: '[rtRegisterAsFilter]'
})
export class RegisterAsFilterDirective implements OnInit, OnDestroy {
    @Input('rtRegisterAsFilter') public filterTarget: any;
    constructor(public filtersService: RtFiltersService) {
    }
    public ngOnInit(): void {
        this.filtersService.registerFilterTarget(this.filterTarget);
    }
    public ngOnDestroy(): void {
        this.filtersService.removeFilterTarget(this.filterTarget);
    }
}
