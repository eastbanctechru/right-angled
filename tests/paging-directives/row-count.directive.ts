import { RTList } from '../../src/core/index';
import { ListDirective } from '../../src/list-directives/index';
import { BufferedPagerComponent, RowCountDirective } from '../../src/paging-directives/index';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as Rx from 'rxjs';

@Component({
    template: `<div [rtList]="getData">
                    <rt-buffered-pager>
                        <input rtRowCount type="text" />
                    </rt-buffered-pager>
                </div>`
})
class HostComponent {
    public getData(): any {
        return Rx.Observable.from([]);
    }
}
describe('rtRowCount directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let pagerComponent: BufferedPagerComponent;
    let rowCountDirective: RowCountDirective;
    let listService: RTList;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                ListDirective,
                BufferedPagerComponent,
                RowCountDirective
            ]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        pagerComponent = fixture.debugElement.query(By.css('rt-buffered-pager')).componentInstance as BufferedPagerComponent;
        listService = fixture.debugElement.children[0].injector.get(RTList);
        rowCountDirective = fixture.debugElement.query(By.directive(RowCountDirective)).injector.get(RowCountDirective);
    });

    it('sets innerValue to takeRowCount value on component init', () => {
        expect(rowCountDirective.innerValue).toEqual(pagerComponent.pager.takeRowCount);
    });

    it('overrides changeTrackingKey to takeRowCountInternal', () => {
        expect(rowCountDirective.changeTrackingKey).toEqual('takeRowCountInternal');
    });

    it('proxies takeRowCount property to pager.takeRowCount', () => {
        expect(rowCountDirective.value).toEqual(pagerComponent.pager.takeRowCount);
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.takeRowCount = pagerComponent.pager.takeRowCount * 2;
        expect(rowCountDirective.value).toEqual(pagerComponent.pager.takeRowCount);
    });

    it('sets innerValue to takeRowCount on change detection cycle', () => {
        pagerComponent.pager.totalCount = 100;
        pagerComponent.pager.takeRowCount = 3;
        expect(rowCountDirective.innerValue).not.toEqual(pagerComponent.pager.takeRowCount);
        fixture.detectChanges();
        expect(rowCountDirective.innerValue).toEqual(pagerComponent.pager.takeRowCount);
    });

    it('restores innerValue value on element blur to takeRowCount property value', () => {
        pagerComponent.pager.totalCount = 100;
        rowCountDirective.innerValue = 5;
        expect(rowCountDirective.innerValue).not.toEqual(pagerComponent.pager.takeRowCount);
        fixture.debugElement.query(By.css('input')).triggerEventHandler('blur', null);
        expect(rowCountDirective.innerValue).toEqual(pagerComponent.pager.takeRowCount);
    });

    it('sets innerValue on input event if it incorrect value, but skips takeRowCount property set', () => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: null } });
        expect(rowCountDirective.innerValue).toEqual(null);
        expect(pagerComponent.pager.takeRowCount).toEqual(pagerComponent.defaultRowCount);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: undefined } });
        expect(rowCountDirective.innerValue).toEqual(undefined);
        expect(pagerComponent.pager.takeRowCount).toEqual(pagerComponent.defaultRowCount);

        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '' } });
        expect(rowCountDirective.innerValue).toEqual('');
        expect(pagerComponent.pager.takeRowCount).toEqual(pagerComponent.defaultRowCount);
    });

    it('sets takeRowCount to raw input value and sets innerValue to processed value after timeout', (done) => {
        pagerComponent.pager.totalCount = 100;
        fixture.debugElement.query(By.css('input')).triggerEventHandler('input', { target: { value: '3b' } });
        expect(pagerComponent.pager.takeRowCount).toEqual(3);
        setTimeout(() => {
            expect(rowCountDirective.innerValue).toEqual(pagerComponent.pager.takeRowCount);
            done();
        }, 0);
    });
});
