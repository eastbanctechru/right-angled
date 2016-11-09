import { RtList } from '../../src/core';
import { ListDirective } from '../../src/list-directives';
import { PagedPagerComponent } from '../../src/paging-directives';

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PagedPager } from 'e2e4';
import * as Rx from 'rxjs';

@Component({
    template: `<div [rtList]="getData">
                    <rt-paged-pager [minPageSize]="minPageSize" [maxPageSize]="maxPageSize" [defaultPageSize]="defaultPageSize"></rt-paged-pager>
                </div>`
})
class HostComponent {
    public minPageSize: number = 1;
    public maxPageSize: number = 1;
    public defaultPageSize: number = 1;
    public getData(): any {
        return Rx.Observable.from([]);
    }
}

class PagedPagerStub {
}

describe('rt-paged-pager component', () => {
    let fixture: ComponentFixture<HostComponent>;
    let pagerElement: DebugElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                ListDirective,
                PagedPagerComponent
            ],
            providers: [
                { provide: PagedPager, useClass: PagedPagerStub }
            ]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerElement = fixture.debugElement.query(By.css('rt-paged-pager'));

    });
    it('Acts as DI root for paged pager service', () => {
        let pagerService = pagerElement.injector.get(PagedPager);
        expect(pagerService instanceof PagedPagerStub).toBeFalsy();
    });

    it('Sets list service pager property to own service instance', () => {
        let pagerService = <PagedPager>pagerElement.injector.get(PagedPager);
        expect(pagerElement.injector.get(RtList).pager).toEqual(pagerService);
    });

    it('Sets pageSize to configured defaultPageSize on component init', () => {
        let pagerService = <PagedPager>pagerElement.injector.get(PagedPager);
        expect(pagerService.pageSize).toEqual(fixture.componentInstance.defaultPageSize);
    });

    it('Proxies config properties to pager service properties', () => {
        let pagerService = <PagedPager>pagerElement.injector.get(PagedPager);

        expect(fixture.componentInstance.minPageSize).toEqual(pagerService.minPageSize);
        fixture.componentInstance.minPageSize = fixture.componentInstance.minPageSize * 10;
        fixture.detectChanges();
        expect(pagerService.minPageSize).toEqual(fixture.componentInstance.minPageSize);

        expect(fixture.componentInstance.maxPageSize).toEqual(pagerService.maxPageSize);
        fixture.componentInstance.maxPageSize = fixture.componentInstance.maxPageSize * 10;
        fixture.detectChanges();
        expect(pagerService.maxPageSize).toEqual(fixture.componentInstance.maxPageSize);

        expect(fixture.componentInstance.defaultPageSize).toEqual(pagerService.defaultPageSize);
        fixture.componentInstance.defaultPageSize = fixture.componentInstance.defaultPageSize * 10;
        fixture.detectChanges();
        expect(pagerService.defaultPageSize).toEqual(fixture.componentInstance.defaultPageSize);

        pagerService.totalCount = 0;
        fixture.detectChanges();
        expect(pagerElement.componentInstance.canMoveForward).toEqual(false);
        expect(pagerService.canMoveForward).toEqual(false);

        pagerService.totalCount = 100;
        fixture.detectChanges();
        expect(pagerElement.componentInstance.canMoveForward).toEqual(true);
        expect(pagerService.canMoveForward).toEqual(true);

        pagerService.totalCount = 0;
        fixture.detectChanges();
        expect(pagerElement.componentInstance.canMoveBackward).toEqual(false);
        expect(pagerService.canMoveBackward).toEqual(false);

        pagerService.totalCount = 100;
        pagerService.pageNumber = 3;
        fixture.detectChanges();
        expect(pagerElement.componentInstance.canMoveBackward).toEqual(true);
        expect(pagerService.canMoveBackward).toEqual(true);

        fixture.componentInstance.defaultPageSize = fixture.componentInstance.defaultPageSize * 10;
        fixture.detectChanges();
        expect(pagerService.defaultPageSize).toEqual(fixture.componentInstance.defaultPageSize);
    });

    it('Calls loadData method of RtList on goToFirstPage methodCall if load is possible', () => {
        let pagerService = <PagedPager>pagerElement.injector.get(PagedPager);
        let listService = <RtList>pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        pagerService.pageNumber = 5;
        expect(pagerService.canMoveBackward).toEqual(true);
        (<PagedPagerComponent>pagerElement.componentInstance).goToFirstPage();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Doesn\'t call loadData method of RtList on goToFirstPage methodCall if load is not possible', () => {
        let pagerService = pagerElement.injector.get(PagedPager);
        let listService = pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canMoveBackward).toEqual(false);
        (<PagedPagerComponent>pagerElement.componentInstance).goToFirstPage();
        expect(listService.loadData).not.toHaveBeenCalled();
    });
    it('Calls loadData method of RtList on goToPreviousPage methodCall if load is possible', () => {
        let pagerService = <PagedPager>pagerElement.injector.get(PagedPager);
        let listService = <RtList>pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        pagerService.pageNumber = 5;
        expect(pagerService.canMoveBackward).toEqual(true);
        (<PagedPagerComponent>pagerElement.componentInstance).goToPreviousPage();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Doesn\'t call loadData method of RtList on goToPreviousPage methodCall if load is not possible', () => {
        let pagerService = pagerElement.injector.get(PagedPager);
        let listService = pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canMoveBackward).toEqual(false);
        (<PagedPagerComponent>pagerElement.componentInstance).goToPreviousPage();
        expect(listService.loadData).not.toHaveBeenCalled();
    });

    it('Calls loadData method of RtList on goToLastPage methodCall if load is possible', () => {
        let pagerService = <PagedPager>pagerElement.injector.get(PagedPager);
        let listService = <RtList>pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        expect(pagerService.canMoveForward).toEqual(true);
        (<PagedPagerComponent>pagerElement.componentInstance).goToLastPage();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Doesn\'t call loadData method of RtList on goToLastPage methodCall if load is not possible', () => {
        let pagerService = pagerElement.injector.get(PagedPager);
        let listService = pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canMoveForward).toEqual(false);
        (<PagedPagerComponent>pagerElement.componentInstance).goToLastPage();
        expect(listService.loadData).not.toHaveBeenCalled();
    });

    it('Calls loadData method of RtList on goToNextPage methodCall if load is possible', () => {
        let pagerService = <PagedPager>pagerElement.injector.get(PagedPager);
        let listService = <RtList>pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        expect(pagerService.canMoveForward).toEqual(true);
        (<PagedPagerComponent>pagerElement.componentInstance).goToNextPage();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Doesn\'t call loadData method of RtList on goToNextPage methodCall if load is not possible', () => {
        let pagerService = pagerElement.injector.get(PagedPager);
        let listService = pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canMoveForward).toEqual(false);
        (<PagedPagerComponent>pagerElement.componentInstance).goToNextPage();
        expect(listService.loadData).not.toHaveBeenCalled();
    });
});
