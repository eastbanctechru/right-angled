import { RtList } from '../../src/core';
import { ListDirective } from '../../src/list-directives';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FiltersService, ProgressState, SortDirection, SortParameter, SortingsService } from 'e2e4';
import * as Rx from 'rxjs';

@Component({
    template: `<div [rtList]="getData" [defaultSortings]="defaultSortings" (onListInit)="onListInit($event)" (afterListInit)="afterListInit($event)"></div>`
})
class HostComponent {
    public defaultSortings: Array<SortParameter> = [];
    public getData(): any {
        return Rx.Observable.from([]);
    }
    public afterListInit(list: RtList): void {
        return;
    }
    public onListInit(list: RtList): void {
        return;
    }
}
@Component({
    template: `<div [rtList]="getData" [loadOnInit]="false"></div>`
})
class HostNotLoadOnInitComponent {
}

class ListStub {
}
class FiltersServiceStub {
}
class SortingsServiceStub {
}

describe('rtList directive', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                HostNotLoadOnInitComponent,
                ListDirective
            ],
            providers: [
                { provide: RtList, useClass: ListStub },
                { provide: FiltersService, useClass: FiltersServiceStub },
                { provide: SortingsService, useClass: SortingsServiceStub }
            ]
        });
    });

    it('Acts as DI root for list-related services', () => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        let listService = fixture.debugElement.children[0].injector.get(RtList);
        let filtersService = fixture.debugElement.children[0].injector.get(FiltersService);
        let sortingsService = fixture.debugElement.children[0].injector.get(SortingsService);
        expect(listService instanceof ListStub).toBeFalsy();
        expect(filtersService instanceof FiltersServiceStub).toBeFalsy();
        expect(sortingsService instanceof SortingsServiceStub).toBeFalsy();
    });

    it('Sets listService.fetchMethod to passed parameter', () => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        let listService = fixture.debugElement.children[0].injector.get(RtList);
        expect(listService.fetchMethod).toEqual(fixture.debugElement.componentInstance.getData);
    });

    it('Proxies utility methods to list service methods', () => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        let listService = fixture.debugElement.children[0].injector.get(RtList);
        let listDirective = fixture.debugElement.children[0].injector.get(ListDirective);

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
        listService.state = ProgressState.Progress;
        expect(listDirective.busy).toEqual(true);
        listService.state = ProgressState.Done;
        expect(listDirective.busy).toEqual(false);

        expect(listDirective.ready).toEqual(true);
        listService.state = ProgressState.Progress;
        expect(listDirective.ready).toEqual(false);
        listService.state = ProgressState.Done;
        expect(listDirective.ready).toEqual(true);

        expect(listDirective.items).toEqual(listService.items);
    });

    it('Sets sortingsService.defaultSortings to passed input', () => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        let sortingsService = fixture.debugElement.children[0].injector.get(SortingsService);
        expect(sortingsService.defaultSortings).toEqual(fixture.debugElement.componentInstance.defaultSortings);
        fixture.debugElement.componentInstance.defaultSortings = [{ direction: SortDirection.Asc, fieldName: 'field' }];
        fixture.detectChanges();
        expect(sortingsService.defaultSortings).toEqual(fixture.debugElement.componentInstance.defaultSortings);
    });

    it('Destroys listService on directive destroy', () => {
        let fixture = TestBed.createComponent(HostComponent);
        let listService = fixture.debugElement.children[0].injector.get(RtList);
        expect(listService.destroyed).toEqual(false);
        fixture.destroy();
        expect(listService.destroyed).toEqual(true);
    });
    it('Inits listService after directive init', done => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        let listService = fixture.debugElement.children[0].injector.get(RtList);
        expect(listService.inited).toEqual(false);
        fixture.whenStable().then(() => {
            expect(listService.inited).toEqual(true);
            done();
        });
    });
    it('Calls listService loadData after directive init', done => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        let listService = fixture.debugElement.children[0].injector.get(RtList);
        spyOn(listService, 'loadData');
        expect(listService.loadData).not.toHaveBeenCalled();
        fixture.whenStable().then(() => {
            expect(listService.loadData).toHaveBeenCalled();
            done();
        });
    });
    it('Doesn\'t call listService loadData if \'loadOnInit\' is false', done => {
        let fixture = TestBed.createComponent(HostNotLoadOnInitComponent);
        fixture.detectChanges();
        let listService = fixture.debugElement.children[0].injector.get(RtList);
        spyOn(listService, 'loadData');
        expect(listService.loadData).not.toHaveBeenCalled();
        fixture.whenStable().then(() => {
            expect(listService.loadData).not.toHaveBeenCalled();
            done();
        });
    });

    it('Calls onListInit and afterListInit with listService instance after directive init', done => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        let listService = fixture.debugElement.children[0].injector.get(RtList);

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
});
