// tslint:disable:no-implicit-dependencies
import { ListDirective, PagedPagerComponent, PageSizeDirective } from '../../index';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { from } from 'rxjs';

@Component({
    template: `<div [rtList]="getData">
                    <rt-paged-pager>
                        <input rtPageSize type="text" />
                    </rt-paged-pager>
                </div>`
})
class HostComponent {
    public getData(): any {
        return from([]);
    }
}
describe('rtPageSize directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let pagerComponent: PagedPagerComponent;
    let pageSizeDirective: PageSizeDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, ListDirective, PagedPagerComponent, PageSizeDirective]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerComponent = fixture.debugElement.query(By.css('rt-paged-pager')).componentInstance as PagedPagerComponent;
        pageSizeDirective = fixture.debugElement.query(By.directive(PageSizeDirective)).injector.get(PageSizeDirective);
    });

    it('sets innerValue to pageSize value on component init', () => {
        expect(pageSizeDirective.innerValue).toEqual(pagerComponent.pager.pageSize);
    });

    it('overrides changeTrackingKey to pageSizeInternal', () => {
        expect(pageSizeDirective.changeTrackingKey).toEqual('pageSizeInternal');
    });

    it('proxies pageSize property to pager.pageSize', () => {
        expect(pageSizeDirective.value).toEqual(pagerComponent.pager.pageSize);
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageSize = pagerComponent.pager.pageSize * 2;
        expect(pageSizeDirective.value).toEqual(pagerComponent.pager.pageSize);
    });

    it('sets innerValue to pageSize on change detection cycle', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageSize = 3;
        expect(pageSizeDirective.innerValue).not.toEqual(pagerComponent.pager.pageSize);
        fixture.detectChanges();
        expect(pageSizeDirective.innerValue).toEqual(pagerComponent.pager.pageSize);
    });

    it('restores innerValue  value on element blur to pageSize property value', () => {
        pagerComponent.pager.totalCount = 100;
        pageSizeDirective.innerValue = 5;
        expect(pageSizeDirective.innerValue).not.toEqual(pagerComponent.pager.pageSize);
        fixture.debugElement.query(By.css('input')).triggerEventHandler('blur', null);
        expect(pageSizeDirective.innerValue).toEqual(pagerComponent.pager.pageSize);
    });

    it('sets innerValue on input event if it incorrect value, but skips pageSize property set', () => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: null } });
        expect(pageSizeDirective.innerValue).toEqual(null);
        expect(pagerComponent.pager.pageSize).toEqual(pagerComponent.defaultPageSize);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: undefined } });
        expect(pageSizeDirective.innerValue).toEqual(undefined);
        expect(pagerComponent.pager.pageSize).toEqual(pagerComponent.defaultPageSize);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '' } });
        expect(pageSizeDirective.innerValue).toEqual('');
        expect(pagerComponent.pager.pageSize).toEqual(pagerComponent.defaultPageSize);
    });

    it('sets pageSize to raw input value and sets innerValue to processed value after render cycle', done => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '3' } });
        expect(pagerComponent.pager.pageSize).toEqual(3);
        setTimeout(() => {
            expect(pageSizeDirective.innerValue).toEqual(pagerComponent.pager.pageSize);
            done();
        }, 0);
    });

    it('gets and sets PagedPager.pageSize via "value" property', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageSize = 3;
        expect(pageSizeDirective.value).toEqual(3);
        pageSizeDirective.value = 1;
        expect(pagerComponent.pager.pageSize).toEqual(1);
    });
});
