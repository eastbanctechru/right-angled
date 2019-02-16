import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BufferedPager } from 'e2e4';
import { from } from 'rxjs';
import { RTList, ListDirective, BufferedPagerComponent } from '../lists.module';

@Component({
    template: `
        <div [rtList]="getData">
            <rt-buffered-pager [minRowCount]="minRowCount" [maxRowCount]="maxRowCount" [defaultRowCount]="defaultRowCount"></rt-buffered-pager>
        </div>
    `
})
class HostComponent {
    public minRowCount = 1;
    public maxRowCount = 1;
    public defaultRowCount = 1;
    public getData(): any {
        return from([]);
    }
}

class BufferedPagerStub {}

describe('rt-buffered-pager component', () => {
    let fixture: ComponentFixture<HostComponent>;
    let pagerElement: DebugElement;
    let pagerService: BufferedPager;
    let listService: RTList;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, ListDirective, BufferedPagerComponent],
            providers: [{ provide: BufferedPager, useClass: BufferedPagerStub }]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerElement = fixture.debugElement.query(By.css('rt-buffered-pager'));
        pagerService = pagerElement.injector.get(BufferedPager);
        listService = pagerElement.injector.get(RTList);
    });
    it('Acts as DI root for buffered pager service', () => {
        expect(pagerService instanceof BufferedPagerStub).toBeFalsy();
    });

    it('Sets list service pager property to own service instance', () => {
        expect(pagerElement.injector.get(RTList).pager).toEqual(pagerService);
    });

    it('Sets takeRowCount to configured defaultRowCount on component init', () => {
        expect(pagerService.takeRowCount).toEqual(fixture.componentInstance.defaultRowCount);
    });

    it('Proxies config properties to pager service properties', () => {
        expect(fixture.componentInstance.minRowCount).toEqual(pagerService.minRowCount);
        fixture.componentInstance.minRowCount = fixture.componentInstance.minRowCount * 10;
        fixture.detectChanges();
        expect(pagerService.minRowCount).toEqual(fixture.componentInstance.minRowCount);

        expect(fixture.componentInstance.maxRowCount).toEqual(pagerService.maxRowCount);
        fixture.componentInstance.maxRowCount = fixture.componentInstance.maxRowCount * 10;
        fixture.detectChanges();
        expect(pagerService.maxRowCount).toEqual(fixture.componentInstance.maxRowCount);

        expect(fixture.componentInstance.defaultRowCount).toEqual(pagerService.defaultRowCount);
        fixture.componentInstance.defaultRowCount = fixture.componentInstance.defaultRowCount * 10;
        fixture.detectChanges();
        expect(pagerService.defaultRowCount).toEqual(fixture.componentInstance.defaultRowCount);

        expect(pagerElement.componentInstance.canLoadMore).toEqual(false);
        pagerService.totalCount = 100;
        fixture.detectChanges();
        expect(pagerElement.componentInstance.canLoadMore).toEqual(true);
    });
    it('Calls loadData method of RTList on loadMore methodCall if load is possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        expect(pagerService.canLoadMore).toEqual(true);
        (pagerElement.componentInstance as BufferedPagerComponent).loadMore();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Does not call loadData method of RTList on loadMore methodCall if load is not possible', () => {
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canLoadMore).toEqual(false);
        (pagerElement.componentInstance as BufferedPagerComponent).loadMore();
        expect(listService.loadData).not.toHaveBeenCalled();
    });
});
