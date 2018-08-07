// tslint:disable:max-classes-per-file
import { ListDirective, RTList, RTStateService } from '../../index';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersService, OperationStatus, SortDirection, SortingsService, SortParameter } from 'e2e4';
import { Observable } from 'rxjs';

@Component({
    template: `<div [rtList]="getData" [defaultSortings]="defaultSortings" [keepRecordsOnLoad]="keepRecordsOnLoad"
    (onListInit)="onListInit($event)" (afterListInit)="afterListInit($event)" (onLoadSucceed)="onLoadSucceed($event)" (onLoadFailed)="onLoadFailed()" (onLoadStarted)="onLoadStarted()"></div>`
})
class HostComponent {
    public failOnLoad: boolean = false;
    public keepRecordsOnLoad: boolean = false;
    public defaultSortings: SortParameter[] = [];
    public getData = (): any => {
        return Observable.create((observer: any) => {
            setTimeout(() => {
                if (this.failOnLoad) {
                    observer.error();
                } else {
                    observer.next([]);
                }
                observer.complete();
            }, 100);
        });
    };
    public afterListInit(): void {
        return;
    }
    public onListInit(): void {
        return;
    }
    public onLoadStarted(): void {
        return;
    }
    public onLoadSucceed(): void {
        return;
    }
    public onLoadFailed(): void {
        return;
    }
}
@Component({
    template: `<div [rtList]="getData" [loadOnInit]="false"></div>`
})
class NotLoadOnInitHostComponent {
    public getData(): void {
        return;
    }
}

class ListStub {}

class RTStateServiceStub extends RTStateService {
    public getState(): void {
        return;
    }
    public persistState(): void {
        return;
    }
}

class FiltersServiceStub {}
class SortingsServiceStub {}

describe('rtList directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let listService: RTList;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, NotLoadOnInitHostComponent, ListDirective],
            providers: [
                { provide: RTStateService, useClass: RTStateServiceStub },
                { provide: RTList, useClass: ListStub },
                { provide: FiltersService, useClass: FiltersServiceStub },
                { provide: SortingsService, useClass: SortingsServiceStub }
            ]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        listService = fixture.debugElement.children[0].injector.get(RTList);
    });

    it('Acts as DI root for list-related services', () => {
        const filtersService = fixture.debugElement.children[0].injector.get(FiltersService);
        const sortingsService = fixture.debugElement.children[0].injector.get(SortingsService);
        expect(listService instanceof ListStub).toBeFalsy();
        expect(filtersService instanceof FiltersServiceStub).toBeFalsy();
        expect(sortingsService instanceof SortingsServiceStub).toBeFalsy();
    });

    it('Sets listService.fetchMethod to passed parameter', () => {
        expect(listService.fetchMethod).toEqual(fixture.debugElement.componentInstance.getData);
    });

    it('Proxies utility methods to list service methods', () => {
        const listDirective = fixture.debugElement.children[0].injector.get(ListDirective);

        spyOn(listService, 'reloadData');
        expect(listService.reloadData).not.toHaveBeenCalled();
        listDirective.reloadData();
        expect(listService.reloadData).toHaveBeenCalled();

        spyOn(listService, 'loadData');
        expect(listService.loadData).not.toHaveBeenCalled();
        listDirective.loadData();
        expect(listService.loadData).toHaveBeenCalled();

        spyOn(listService, 'resetSettings');
        expect(listService.resetSettings).not.toHaveBeenCalled();
        listDirective.resetSettings();
        expect(listService.resetSettings).toHaveBeenCalled();

        spyOn(listService, 'cancelRequests');
        expect(listService.cancelRequests).not.toHaveBeenCalled();
        listDirective.cancelRequests();
        expect(listService.cancelRequests).toHaveBeenCalled();

        expect(listDirective.busy).toEqual(false);
        (listService as any).statusInternal = OperationStatus.Progress;
        expect(listDirective.busy).toEqual(true);
        (listService as any).statusInternal = OperationStatus.Done;
        expect(listDirective.busy).toEqual(false);

        expect(listDirective.ready).toEqual(true);
        (listService as any).statusInternal = OperationStatus.Progress;
        expect(listDirective.ready).toEqual(false);
        (listService as any).statusInternal = OperationStatus.Done;
        expect(listDirective.ready).toEqual(true);

        expect(listDirective.items).toEqual(listService.items);
    });

    it('Sets sortingsService.defaultSortings to passed input', () => {
        const sortingsService = fixture.debugElement.children[0].injector.get(SortingsService);
        expect(sortingsService.defaultSortings).toEqual(fixture.debugElement.componentInstance.defaultSortings);
        fixture.debugElement.componentInstance.defaultSortings = [{ direction: SortDirection.Asc, fieldName: 'field' }];
        fixture.detectChanges();
        expect(sortingsService.defaultSortings).toEqual(fixture.debugElement.componentInstance.defaultSortings);
    });

    it('Sets keepRecordsOnLoad to passed input', () => {
        expect(listService.keepRecordsOnLoad).toEqual(fixture.debugElement.componentInstance.keepRecordsOnLoad);
        fixture.debugElement.componentInstance.keepRecordsOnLoad = !fixture.debugElement.componentInstance
            .keepRecordsOnLoad;
        fixture.detectChanges();
        expect(listService.keepRecordsOnLoad).toEqual(fixture.debugElement.componentInstance.keepRecordsOnLoad);
    });

    it('Destroys listService on directive destroy', () => {
        expect(listService.destroyed).toEqual(false);
        fixture.destroy();
        expect(listService.destroyed).toEqual(true);
    });
    it('Inits listService after directive init', done => {
        expect(listService.inited).toEqual(false);
        fixture.whenStable().then(() => {
            expect(listService.inited).toEqual(true);
            done();
        });
    });
    it('Calls listService loadData after directive init', done => {
        spyOn(listService, 'loadData');
        expect(listService.loadData).not.toHaveBeenCalled();
        fixture.whenStable().then(() => {
            expect(listService.loadData).toHaveBeenCalled();
            done();
        });
    });
    it('Calls onListInit and afterListInit with listService instance after directive init', done => {
        spyOn(fixture.componentInstance, 'onListInit');
        spyOn(fixture.componentInstance, 'afterListInit');

        expect(fixture.componentInstance.onListInit).not.toHaveBeenCalled();
        expect(fixture.componentInstance.afterListInit).not.toHaveBeenCalled();
        fixture.whenStable().then(() => {
            expect(fixture.componentInstance.onListInit).toHaveBeenCalledWith(listService);
            expect(fixture.componentInstance.afterListInit).toHaveBeenCalledWith(listService);
            done();
        });
    });

    it('Calls onLoadStarted on data load', done => {
        fixture.whenStable().then(() => {
            const listDirective = fixture.debugElement.children[0].injector.get(ListDirective);
            spyOn(fixture.componentInstance, 'onLoadStarted');
            listDirective.loadData();
            fixture.detectChanges();
            expect(fixture.componentInstance.onLoadStarted).toHaveBeenCalled();
            done();
        });
    });
    it('Calls onLoadStarted on data reload', done => {
        fixture.whenStable().then(() => {
            const listDirective = fixture.debugElement.children[0].injector.get(ListDirective);
            spyOn(fixture.componentInstance, 'onLoadStarted');
            listDirective.reloadData();
            fixture.detectChanges();
            expect(fixture.componentInstance.onLoadStarted).toHaveBeenCalled();
            done();
        });
    });
    it('Calls onLoadSucceed after successful data load', done => {
        spyOn(fixture.componentInstance, 'onLoadSucceed');
        expect(fixture.componentInstance.onLoadSucceed).not.toHaveBeenCalled();
        fixture.whenStable().then(() => {
            expect(fixture.componentInstance.onLoadSucceed).toHaveBeenCalled();
            done();
        });
    });
    it('Calls onLoadFail after data loading failed', done => {
        spyOn(fixture.componentInstance, 'onLoadFailed');
        expect(fixture.componentInstance.onLoadFailed).not.toHaveBeenCalled();
        fixture.componentInstance.failOnLoad = true;
        fixture.whenStable().then(() => {
            expect(fixture.componentInstance.onLoadFailed).toHaveBeenCalled();
            done();
        });
    });
    it("Doesn't call listService loadData if 'loadOnInit' is false", done => {
        const notLoadFixture = TestBed.createComponent(NotLoadOnInitHostComponent);
        notLoadFixture.detectChanges();
        const notLoadListService = notLoadFixture.debugElement.children[0].injector.get(RTList);
        spyOn(notLoadListService, 'loadData');
        expect(notLoadListService.loadData).not.toHaveBeenCalled();
        notLoadFixture.whenStable().then(() => {
            expect(notLoadListService.loadData).not.toHaveBeenCalled();
            done();
        });
    });
});
