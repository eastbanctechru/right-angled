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
    let pageNumberInput: HTMLInputElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, ListDirective, PagedPagerComponent, PageNumberDirective]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerComponent = fixture.debugElement.query(By.css('rt-paged-pager')).componentInstance as PagedPagerComponent;
        pageNumberDirective = fixture.debugElement.query(By.directive(PageNumberDirective)).injector.get(PageNumberDirective);
        pageNumberInput = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('sets input value to pageNumber value on component init', () => {
        expect(pageNumberInput.value).toEqual(pagerComponent.pager.pageNumber + '');
    });

    it('sets input value to pageNumber', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageNumber = 3;
        expect(pageNumberInput.value).toEqual(pagerComponent.pager.pageNumber + '');
    });

    it('restores input value  on element blur to pageNumber property value', () => {
        pagerComponent.pager.totalCount = 100;
        pageNumberInput.value = '5';
        expect(pageNumberInput.value).not.toEqual(pagerComponent.pager.pageNumber + '');
        fixture.debugElement.query(By.css('input')).triggerEventHandler('blur', null);
        expect(pageNumberInput.value).toEqual(pagerComponent.pager.pageNumber + '');
    });

    it('skips pageNumber property set if input value is incorrect', () => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: null } });
        expect(pageNumberInput.value).toEqual('');
        expect(pagerComponent.pager.pageNumber).toEqual(1);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: undefined } });
        expect(pageNumberInput.value).toEqual('');
        expect(pagerComponent.pager.pageNumber).toEqual(1);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '' } });
        expect(pageNumberInput.value).toEqual('');
        expect(pagerComponent.pager.pageNumber).toEqual(1);
    });

    it('sets pageNumber to raw input value and sets input value to processed value after render cycle', done => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '3' } });
        expect(pagerComponent.pager.pageNumber).toEqual(3);
        setTimeout(() => {
            expect(pageNumberInput.value).toEqual(pagerComponent.pager.pageNumber + '');
            done();
        }, 0);
    });

    it('gets and sets RTPagedPager.pageNumber via "value" property', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.pageNumber = 3;
        expect(pageNumberDirective.value).toEqual(3);
        pageNumberDirective.value = 1;
        expect(pagerComponent.pager.pageNumber).toEqual(1);
    });
});
