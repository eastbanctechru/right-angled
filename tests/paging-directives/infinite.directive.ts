// tslint:disable:max-classes-per-file
// tslint:disable:no-implicit-dependencies
import { InfiniteDirective, RTList } from '../../index';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BufferedPager } from 'e2e4';

@Component({
    template: `
            <div #listHost [style.height]="listHostReference?'200px':'auto'"  [style.overflow]="listHostReference?'auto':'inherit'">
                <div>
                    <div *ngFor="let item of items" style="padding: 200px;">
                        {{ item }}
                    </div>
                    <div [rtInfinite]="listHostReference">
                    </div>
                </div>
            </div>`
})
class ComponentWithHostComponent {
    @ViewChild('listHost')
    public listHost: ElementRef;
    public listHostReference: HTMLElement = null;
    public items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}

class BufferedPagerStub {
    public canLoadMore: boolean = true;
}
class ListStub {
    public busy: boolean = false;
    public loadData(): void {
        return;
    }
}

describe('infinite directive', () => {
    let fixture: ComponentFixture<ComponentWithHostComponent>;
    let hostElement: HTMLElement;
    let rtList: ListStub;
    let pager: BufferedPagerStub;
    let loadDataSpy: jasmine.Spy;
    const scrollMaxValue = 4000;
    const scrollTo = (target: HTMLElement | Window, scrollToNumber: number) => {
        if (target instanceof Window) {
            target.scrollTo(0, scrollToNumber);
        } else {
            target.scrollTop = scrollToNumber;
        }
        const event = new UIEvent('scroll');
        target.dispatchEvent(event);
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ComponentWithHostComponent, InfiniteDirective],
            providers: [
                { provide: BufferedPager, useClass: BufferedPagerStub },
                { provide: RTList, useClass: ListStub }
            ]
        });
        fixture = TestBed.createComponent(ComponentWithHostComponent);
        fixture.detectChanges();
        hostElement = fixture.debugElement.children[0].nativeElement;
        rtList = fixture.debugElement.injector.get(RTList);
        pager = fixture.debugElement.injector.get(BufferedPager);
        loadDataSpy = spyOn(rtList, 'loadData');
    });
    it('Doesn\'t call "loadData" method when list is busy in global mode', () => {
        rtList.busy = true;
        pager.canLoadMore = true;
        scrollTo(window, scrollMaxValue);
        expect(loadDataSpy).not.toHaveBeenCalled();
    });

    it('Doesn\'t call "loadData" method when list is busy', () => {
        rtList.busy = true;
        pager.canLoadMore = true;
        fixture.componentInstance.listHostReference = fixture.componentInstance.listHost.nativeElement;
        fixture.detectChanges();
        scrollTo(hostElement, scrollMaxValue);
        expect(loadDataSpy).not.toHaveBeenCalled();
    });

    it('Doesn\'t call "loadData" method when pager.canLoadMore is false in global mode', () => {
        rtList.busy = false;
        pager.canLoadMore = false;
        scrollTo(window, scrollMaxValue);
        expect(loadDataSpy).not.toHaveBeenCalled();
    });
    it('Doesn\'t call "loadData" method when pager.canLoadMore is false', () => {
        rtList.busy = false;
        pager.canLoadMore = false;
        fixture.componentInstance.listHostReference = fixture.componentInstance.listHost.nativeElement;
        fixture.detectChanges();
        scrollTo(hostElement, scrollMaxValue);
        expect(loadDataSpy).not.toHaveBeenCalled();
    });

    it('Doesn\'t call "loadData" method when scroll doesn\'t rich element in global mode', () => {
        rtList.busy = false;
        pager.canLoadMore = true;
        scrollTo(window, 200);
        expect(loadDataSpy).not.toHaveBeenCalled();
    });

    it('Doesn\'t call "loadData" method when scroll doesn\'t rich element', () => {
        rtList.busy = false;
        pager.canLoadMore = true;
        fixture.componentInstance.listHostReference = fixture.componentInstance.listHost.nativeElement;
        fixture.detectChanges();
        scrollTo(hostElement, 200);
        expect(loadDataSpy).not.toHaveBeenCalled();
    });

    it('Calls "loadData" method when scrolled to bottom and services are ready to load data in global mode', () => {
        rtList.busy = false;
        pager.canLoadMore = true;
        scrollTo(window, scrollMaxValue);
        expect(loadDataSpy).toHaveBeenCalledTimes(1);
    });

    it('Calls "loadData" method when scrolled to bottom and services are ready to load data', () => {
        rtList.busy = false;
        pager.canLoadMore = true;
        fixture.componentInstance.listHostReference = fixture.componentInstance.listHost.nativeElement;
        fixture.detectChanges();
        scrollTo(hostElement, scrollMaxValue);
        expect(loadDataSpy).toHaveBeenCalledTimes(1);
    });

    it('Destroys "scrollListener" on directive destroy', () => {
        const targetDirective = fixture.debugElement
            .query(By.directive(InfiniteDirective))
            .injector.get(InfiniteDirective);
        spyOn(targetDirective, 'scrollListener');
        fixture.destroy();
        expect(targetDirective.scrollListener).toHaveBeenCalledTimes(1);
    });
});
