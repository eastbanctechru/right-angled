import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { from } from 'rxjs';
import { PagedPagerComponent, PageSizeDirective, ListDirective } from '../lists.module';

@Component({
    template: `
        <div [rtList]="getData">
            <rt-paged-pager>
                <input rtPageSize type="text" />
            </rt-paged-pager>
        </div>
    `
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
    let pageSizeInput: HTMLInputElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, ListDirective, PagedPagerComponent, PageSizeDirective]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerComponent = fixture.debugElement.query(By.css('rt-paged-pager')).componentInstance as PagedPagerComponent;
        pageSizeDirective = fixture.debugElement.query(By.directive(PageSizeDirective)).injector.get(PageSizeDirective);
        pageSizeInput = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('sets input value to pageSize value on component init', () => {
        expect(pageSizeInput.value).toEqual(pagerComponent.pager.pageSize + '');
    });

    it('proxies pageSize property to pager.pageSize', () => {
        expect(pageSizeDirective.value).toEqual(pagerComponent.pager.pageSize);
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageSize = pagerComponent.pager.pageSize * 2;
        expect(pageSizeDirective.value).toEqual(pagerComponent.pager.pageSize);
    });

    it('sets input value to pageSize', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageSize = 3;
        expect(pageSizeInput.value).toEqual(pagerComponent.pager.pageSize + '');
    });

    it('restores input value to pageSize property on element blur', () => {
        pagerComponent.pager.totalCount = 100;
        pageSizeInput.value = '5';
        expect(pageSizeInput.value).not.toEqual(pagerComponent.pager.pageSize + '');
        fixture.debugElement.query(By.css('input')).triggerEventHandler('blur', null);
        expect(pageSizeInput.value).toEqual(pagerComponent.pager.pageSize + '');
    });

    it('skips pageSize property set if input value is incorrect', () => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: null } });
        expect(pageSizeInput.value).toEqual('');
        expect(pagerComponent.pager.pageSize).toEqual(pagerComponent.defaultPageSize);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: undefined } });
        expect(pageSizeInput.value).toEqual('');
        expect(pagerComponent.pager.pageSize).toEqual(pagerComponent.defaultPageSize);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '' } });
        expect(pageSizeInput.value).toEqual('');
        expect(pagerComponent.pager.pageSize).toEqual(pagerComponent.defaultPageSize);
    });

    it('sets pageSize to raw input value and sets input value to processed value after render cycle', done => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '3' } });
        expect(pagerComponent.pager.pageSize).toEqual(3);
        setTimeout(() => {
            expect(pageSizeInput.value).toEqual(pagerComponent.pager.pageSize + '');
            done();
        }, 0);
    });

    it('gets and sets RTPagedPager.pageSize via "value" property', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageSize = 3;
        expect(pageSizeDirective.value).toEqual(3);
        pageSizeDirective.value = 1;
        expect(pagerComponent.pager.pageSize).toEqual(1);
    });
});
