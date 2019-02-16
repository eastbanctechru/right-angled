import { OnDestroy, OnInit } from '@angular/core';
import { FiltersService } from 'e2e4';
export declare class RegisterAsFilterDirective implements OnInit, OnDestroy {
    filtersService: FiltersService;
    filterTarget: any;
    constructor(filtersService: FiltersService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
