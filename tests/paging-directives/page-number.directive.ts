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
                        <input rtPageNumber type="text" class="form-control" maxlength="4" />
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

    it('sets innerPageNumber to pageNumber value on component init', () => {
        expect(pageNumberDirective.innerPageNumber).toEqual(pagerComponent.pager.pageNumber);
    });

    it('sets innerPageNumber to pageNumber on Enter key press', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageNumber = 3;
        expect(pageNumberDirective.innerPageNumber).not.toEqual(pagerComponent.pager.pageNumber);
        fixture.debugElement.query(By.css('input')).triggerEventHandler('keyup.enter', null);
        expect(pageNumberDirective.innerPageNumber).toEqual(pagerComponent.pager.pageNumber);
    });
    it('calls listService loadData method on Enter key press', () => {
        spyOn(listService, 'loadData');
        fixture.debugElement.query(By.css('input')).triggerEventHandler('keyup.enter', null);
        expect(listService.loadData).toHaveBeenCalled();
    });
    it('sets innerPageNumber to pageNumber on change detection cycle', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageNumber = 3;
        expect(pageNumberDirective.innerPageNumber).not.toEqual(pagerComponent.pager.pageNumber);
        fixture.detectChanges();
        expect(pageNumberDirective.innerPageNumber).toEqual(pagerComponent.pager.pageNumber);
    });
    it('restores innerPageNumber  value on element blur to pageNumber property value', () => {
        pagerComponent.pager.totalCount = 100;
        pageNumberDirective.innerPageNumber = 5;
        expect(pageNumberDirective.innerPageNumber).not.toEqual(pagerComponent.pager.pageNumber);
        fixture.debugElement.query(By.css('input')).triggerEventHandler('blur', null);
        expect(pageNumberDirective.innerPageNumber).toEqual(pagerComponent.pager.pageNumber);
    });

    it('sets innerPageNumber on input event if it incorrect value, but skips pageNumber property set', () => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: null } });
        expect(pageNumberDirective.innerPageNumber).toEqual(null);
        expect(pagerComponent.pager.pageNumber).toEqual(1);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: undefined } });
        expect(pageNumberDirective.innerPageNumber).toEqual(undefined);
        expect(pagerComponent.pager.pageNumber).toEqual(1);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '' } });
        expect(pageNumberDirective.innerPageNumber).toEqual('');
        expect(pagerComponent.pager.pageNumber).toEqual(1);
    });

    it('sets pageNumber to raw input value and sets innerPageNumber to processed value after render cycle', () => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '3' } });
        expect(pagerComponent.pager.pageNumber).toEqual(3);
        fixture.whenStable().then(() => {
            expect(pageNumberDirective.innerPageNumber).toEqual(pagerComponent.pager.pageNumber);
        });
    });
});
