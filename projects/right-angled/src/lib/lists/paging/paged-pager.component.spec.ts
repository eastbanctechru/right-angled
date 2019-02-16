import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PagedPager } from 'e2e4';
import { from } from 'rxjs';
import { RTList, ListDirective, PagedPagerComponent } from '../lists.module';

@Component({
    template: `
        <div [rtList]="getData">
            <rt-paged-pager [minPageSize]="minPageSize" [maxPageSize]="maxPageSize" [defaultPageSize]="defaultPageSize"></rt-paged-pager>
        </div>
    `
})
class HostComponent {
    public minPageSize = 1;
    public maxPageSize = 1;
    public defaultPageSize = 1;
    public getData(): any {
        return from([]);
    }
}

class PagedPagerStub {}

describe('rt-paged-pager component', () => {
    let fixture: ComponentFixture<HostComponent>;
    let pagerElement: DebugElement;
    let pagerService: PagedPager;
    let listService: RTList;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, ListDirective, PagedPagerComponent],
            providers: [{ provide: PagedPager, useClass: PagedPagerStub }]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerElement = fixture.debugElement.query(By.css('rt-paged-pager'));
        pagerService = pagerElement.injector.get(PagedPager);
        listService = pagerElement.injector.get(RTList);
    });
    it('Acts as DI root for paged pager service', () => {
        expect(pagerService instanceof PagedPagerStub).toBeFalsy();
    });

    it('Sets list service pager property to own service instance', () => {
        expect(pagerElement.injector.get(RTList).pager).toEqual(pagerService);
    });

    it('Sets pageSize to configured defaultPageSize on component init', () => {
        expect(pagerService.pageSize).toEqual(fixture.componentInstance.defaultPageSize);
    });

    it('Proxies config properties to pager service properties', () => {
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

    it('Calls loadData method of RTList on loadData method call', () => {
        spyOn(listService, 'loadData');
        (pagerElement.componentInstance as PagedPagerComponent).loadData();
        expect(listService.loadData).toHaveBeenCalled();
    });

    it('Calls loadData method of RTList on goToFirstPage methodCall if load is possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        pagerService.pageNumber = 5;
        expect(pagerService.canMoveBackward).toEqual(true);
        (pagerElement.componentInstance as PagedPagerComponent).goToFirstPage();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Does not call loadData method of RTList on goToFirstPage methodCall if load is not possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canMoveBackward).toEqual(false);
        (pagerElement.componentInstance as PagedPagerComponent).goToFirstPage();
        expect(listService.loadData).not.toHaveBeenCalled();
    });
    it('Calls loadData method of RTList on goToPreviousPage methodCall if load is possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        pagerService.pageNumber = 5;
        expect(pagerService.canMoveBackward).toEqual(true);
        (pagerElement.componentInstance as PagedPagerComponent).goToPreviousPage();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Does not call loadData method of RTList on goToPreviousPage methodCall if load is not possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canMoveBackward).toEqual(false);
        (pagerElement.componentInstance as PagedPagerComponent).goToPreviousPage();
        expect(listService.loadData).not.toHaveBeenCalled();
    });

    it('Calls loadData method of RTList on goToLastPage methodCall if load is possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        expect(pagerService.canMoveForward).toEqual(true);
        (pagerElement.componentInstance as PagedPagerComponent).goToLastPage();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Does not call loadData method of RTList on goToLastPage methodCall if load is not possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canMoveForward).toEqual(false);
        (pagerElement.componentInstance as PagedPagerComponent).goToLastPage();
        expect(listService.loadData).not.toHaveBeenCalled();
    });

    it('Calls loadData method of RTList on goToNextPage methodCall if load is possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        expect(pagerService.canMoveForward).toEqual(true);
        (pagerElement.componentInstance as PagedPagerComponent).goToNextPage();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Does not call loadData method of RTList on goToNextPage methodCall if load is not possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canMoveForward).toEqual(false);
        (pagerElement.componentInstance as PagedPagerComponent).goToNextPage();
        expect(listService.loadData).not.toHaveBeenCalled();
    });
});
