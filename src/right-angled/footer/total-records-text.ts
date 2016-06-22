import {Component, Input, KeyValueDiffers, KeyValueDiffer, DoCheck, OnInit} from '@angular/core';
import {NgPagedListService} from '../bootstrap/ngPagedListService';
import {RtListComponent} from '../lists/list';
import {ProgressState} from 'e2e4';
import {Defaults} from '../defaults';

@Component({
    selector: 'rt-total-records-text',
    template: `<template *ngIf="isVisible"
            [ngTemplateOutlet]="templateLink"
            [ngOutletContext]="{pager: listHost.serviceInstance.pager}">
        </template>`
})
export class RtTotalRecordsTextComponent implements DoCheck, OnInit {
    listDiffer: KeyValueDiffer;
    pagerDiffer: KeyValueDiffer;
    @Input('templateLink') templateLink;
    isVisible: boolean;
    listHost: RtListComponent;
    constructor(listHost: RtListComponent, differs: KeyValueDiffers) {
        this.listDiffer = differs.find([]).create(null);
        this.pagerDiffer = differs.find([]).create(null);
        this.listHost = listHost;
    }
    ngOnInit(): void {
        this.setVisibility();
    }
    ngDoCheck(): void {
        let listDiff = this.listDiffer.diff(this.listHost.serviceInstance);
        if (listDiff) {
            listDiff.forEachChangedItem(this.checkListChanges);
        }
        let pagerDiff = this.pagerDiffer.diff(this.listHost.serviceInstance.pager);
        if (pagerDiff) {
            pagerDiff.forEachChangedItem(this.checkPagerChanges);
        }
    }
    checkListChanges = (item: any): void => {
        if (item.key === 'state') {
            this.setVisibility();
        }
    }
    checkPagerChanges = (item: any): void => {
        if (item.key === 'totalCount') {
            this.setVisibility();
        }
    }
    setVisibility(): void {
        this.isVisible = this.listHost.serviceInstance.state === ProgressState.Done && this.listHost.serviceInstance.pager.totalCount !== 0;
    }
}
