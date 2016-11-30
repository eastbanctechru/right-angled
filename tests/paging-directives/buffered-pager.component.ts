// tslint:disable:max-classes-per-file
import { RtList } from '../../src/core';
import { ListDirective } from '../../src/list-directives';
import { BufferedPagerComponent } from '../../src/paging-directives';

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BufferedPager } from 'e2e4';
import * as Rx from 'rxjs';

@Component({
    template: `<div [rtList]="getData">
                    <rt-buffered-pager [minRowCount]="minRowCount" [maxRowCount]="maxRowCount" [defaultRowCount]="defaultRowCount"></rt-buffered-pager>
                </div>`
})
class HostComponent {
    public minRowCount: number = 1;
    public maxRowCount: number = 1;
    public defaultRowCount: number = 1;
    public getData(): any {
        return Rx.Observable.from([]);
    }
}

class BufferedPagerStub {
}

describe('rt-buffered-pager component', () => {
    let fixture: ComponentFixture<HostComponent>;
    let pagerElement: DebugElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                ListDirective,
                BufferedPagerComponent
            ],
            providers: [
                { provide: BufferedPager, useClass: BufferedPagerStub }
            ]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerElement = fixture.debugElement.query(By.css('rt-buffered-pager'));

    });
    it('Acts as DI root for buffered pager service', () => {
        let pagerService = pagerElement.injector.get(BufferedPager);
        expect(pagerService instanceof BufferedPagerStub).toBeFalsy();
    });

    it('Sets list service pager property to own service instance', () => {
        let pagerService = pagerElement.injector.get(BufferedPager);
        expect(pagerElement.injector.get(RtList).pager).toEqual(pagerService);
    });

    it('Sets takeRowCount to configured defaultRowCount on component init', () => {
        let pagerService = <BufferedPager>pagerElement.injector.get(BufferedPager);
        expect(pagerService.takeRowCount).toEqual(fixture.componentInstance.defaultRowCount);
    });

    it('Proxies config properties to pager service properties', () => {
        let pagerService = <BufferedPager>pagerElement.injector.get(BufferedPager);

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
    it('Calls loadData method of RtList on loadMore methodCall if load is possible', () => {
        let pagerService = <BufferedPager>pagerElement.injector.get(BufferedPager);
        let listService = <RtList>pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 100;
        expect(pagerService.canLoadMore).toEqual(true);
        (<BufferedPagerComponent>pagerElement.componentInstance).loadMore();
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('Doesn\'t call loadData method of RtList on loadMore methodCall if load is not possible', () => {
        let pagerService = <BufferedPager>pagerElement.injector.get(BufferedPager);
        let listService = <RtList>pagerElement.injector.get(RtList);
        spyOn(listService, 'loadData');
        pagerService.totalCount = 0;
        expect(pagerService.canLoadMore).toEqual(false);
        (<BufferedPagerComponent>pagerElement.componentInstance).loadMore();
        expect(listService.loadData).not.toHaveBeenCalled();
    });
});
