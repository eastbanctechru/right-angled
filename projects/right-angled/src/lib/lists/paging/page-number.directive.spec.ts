import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { from } from 'rxjs';
import { PagedPagerComponent, PageNumberDirective, ListDirective } from '../lists.module';

@Component({
    template: `
        <div [rtList]="getData">
            <rt-paged-pager>
                <input rtPageNumber type="text" />
            </rt-paged-pager>
        </div>
    `
})
class HostComponent {
    public getData(): any {
        return from([]);
    }
}
describe('rtPageNumber directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let pagerComponent: PagedPagerComponent;
    let pageNumberDirective: PageNumberDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, ListDirective, PagedPagerComponent, PageNumberDirective]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerComponent = fixture.debugElement.query(By.css('rt-paged-pager')).componentInstance as PagedPagerComponent;
        pageNumberDirective = fixture.debugElement.query(By.directive(PageNumberDirective)).injector.get(PageNumberDirective);
    });

    it('sets innerValue to pageNumber value on component init', () => {
        expect(pageNumberDirective.innerValue).toEqual(pagerComponent.pager.pageNumber);
    });
    it('overrides changeTrackingKey to pageNumberInternal', () => {
        expect(pageNumberDirective.changeTrackingKey).toEqual('pageNumberInternal');
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

    it('gets and sets PagedPager.pageNumber via "value" property', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageNumber = 3;
        expect(pageNumberDirective.value).toEqual(3);
        pageNumberDirective.value = 1;
        expect(pagerComponent.pager.pageNumber).toEqual(1);
    });
});
