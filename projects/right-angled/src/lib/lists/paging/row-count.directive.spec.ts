import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { from } from 'rxjs';
import { BufferedPagerComponent, RowCountDirective, ListDirective } from '../lists.module';

@Component({
    template: `
        <div [rtList]="getData">
            <rt-buffered-pager>
                <input rtRowCount type="text" />
            </rt-buffered-pager>
        </div>
    `
})
class HostComponent {
    public getData(): any {
        return from([]);
    }
}
describe('rtRowCount directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let pagerComponent: BufferedPagerComponent;
    let rowCountDirective: RowCountDirective;
    let rowCountInput: HTMLInputElement;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, ListDirective, BufferedPagerComponent, RowCountDirective]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerComponent = fixture.debugElement.query(By.css('rt-buffered-pager')).componentInstance as BufferedPagerComponent;
        rowCountDirective = fixture.debugElement.query(By.directive(RowCountDirective)).injector.get(RowCountDirective);
        rowCountInput = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('sets input value to takeRowCount value on component init', () => {
        expect(rowCountInput.value).toEqual(pagerComponent.pager.takeRowCount + '');
    });

    it('proxies takeRowCount property to pager.takeRowCount', () => {
        expect(rowCountDirective.value).toEqual(pagerComponent.pager.takeRowCount);
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.takeRowCount = pagerComponent.pager.takeRowCount * 2;
        expect(rowCountDirective.value).toEqual(pagerComponent.pager.takeRowCount);
    });

    it('input value reflects `pager.takeRowCount` value', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.takeRowCount = 3;
        expect(rowCountInput.value).toEqual(pagerComponent.pager.takeRowCount + '');
    });

    it('restores input value on element blur to takeRowCount property value', () => {
        pagerComponent.pager.totalCount = 100;
        rowCountInput.value = '5';
        expect(rowCountInput.value).not.toEqual(pagerComponent.pager.takeRowCount + '');
        fixture.debugElement.query(By.css('input')).triggerEventHandler('blur', null);
        expect(rowCountInput.value).toEqual(pagerComponent.pager.takeRowCount + '');
    });

    it('sets input value if its incorrect value, but skips takeRowCount property set', () => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: null } });
        expect(rowCountInput.value).toEqual('');
        expect(pagerComponent.pager.takeRowCount).toEqual(pagerComponent.defaultRowCount);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: undefined } });
        expect(rowCountInput.value).toEqual('');
        expect(pagerComponent.pager.takeRowCount).toEqual(pagerComponent.defaultRowCount);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '' } });
        expect(rowCountInput.value).toEqual('');
        expect(pagerComponent.pager.takeRowCount).toEqual(pagerComponent.defaultRowCount);
    });

    it('sets takeRowCount to raw input value and sets innerValue to processed value after timeout', done => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '3b' } });
        expect(pagerComponent.pager.takeRowCount).toEqual(3);
        setTimeout(() => {
            expect(rowCountInput.value).toEqual(pagerComponent.pager.takeRowCount + '');
            done();
        }, 0);
    });
});
