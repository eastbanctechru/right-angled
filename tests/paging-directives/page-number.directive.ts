import { RtList } from '../../src/core';
import { ListDirective } from '../../src/list-directives';
import { PageNumberDirective, PagedPagerComponent } from '../../src/paging-directives';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as Rx from 'rxjs';

@Component({
    template: `<div [rtList]="getData">
                    <rt-paged-pager>
                        <input rtPageNumber type="text" />
                    </rt-paged-pager>
                </div>`
})
class HostComponent {
    public getData(): any {
        return Rx.Observable.from([]);
    }
}
describe('rtPageNumber directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let pagerComponent: PagedPagerComponent;
    let pageNumberDirective: PageNumberDirective;
    let listService: RtList;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                ListDirective,
                PagedPagerComponent,
                PageNumberDirective
            ]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerComponent = <PagedPagerComponent>fixture.debugElement.query(By.css('rt-paged-pager')).componentInstance;
        listService = fixture.debugElement.children[0].injector.get(RtList);
        pageNumberDirective = fixture.debugElement.query(By.directive(PageNumberDirective)).injector.get(PageNumberDirective);
    });

    it('sets innerValue to pageNumber value on component init', () => {
        expect(pageNumberDirective.innerValue).toEqual(pagerComponent.pager.pageNumber);
    });
    it('overrides changeTrackingKey to pageNumberInternal', () => {
        expect(pageNumberDirective.changeTrackingKey).toEqual('pageNumberInternal');
    });

    it('sets innerValue to pageNumber on Enter key press', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageNumber = 3;
        expect(pageNumberDirective.innerValue).not.toEqual(pagerComponent.pager.pageNumber);
        fixture.debugElement.query(By.css('input')).triggerEventHandler('keyup.enter', null);
        expect(pageNumberDirective.innerValue).toEqual(pagerComponent.pager.pageNumber);
    });

    it('calls listService loadData method on Enter key press', () => {
        spyOn(listService, 'loadData');
        fixture.debugElement.query(By.css('input')).triggerEventHandler('keyup.enter', null);
        expect(listService.loadData).toHaveBeenCalled();
    });

    it('sets innerValue to pageNumber on change detection cycle', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageNumber = 3;
        expect(pageNumberDirective.innerValue).not.toEqual(pagerComponent.pager.pageNumber);
        fixture.detectChanges();
        expect(pageNumberDirective.innerValue).toEqual(pagerComponent.pager.pageNumber);
    });

    it('restores innerValue  value on element blur to pageNumber property value', () => {
        pagerComponent.pager.totalCount = 100;
        pageNumberDirective.innerValue = 5;
        expect(pageNumberDirective.innerValue).not.toEqual(pagerComponent.pager.pageNumber);
        fixture.debugElement.query(By.css('input')).triggerEventHandler('blur', null);
        expect(pageNumberDirective.innerValue).toEqual(pagerComponent.pager.pageNumber);
    });

    it('sets innerValue on input event if it incorrect value, but skips pageNumber property set', () => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: null } });
        expect(pageNumberDirective.innerValue).toEqual(null);
        expect(pagerComponent.pager.pageNumber).toEqual(1);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: undefined } });
        expect(pageNumberDirective.innerValue).toEqual(undefined);
        expect(pagerComponent.pager.pageNumber).toEqual(1);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '' } });
        expect(pageNumberDirective.innerValue).toEqual('');
        expect(pagerComponent.pager.pageNumber).toEqual(1);
    });

    it('sets pageNumber to raw input value and sets innerValue to processed value after render cycle', done => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '3' } });
        expect(pagerComponent.pager.pageNumber).toEqual(3);
        setTimeout(() => {
            expect(pageNumberDirective.innerValue).toEqual(pagerComponent.pager.pageNumber);
            done();
        }, 0);
    });
});
