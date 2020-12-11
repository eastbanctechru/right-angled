import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RTList, SortDirective } from './lists.module';
import { OperationStatus } from '../core/operation-status';
import { RTSortingsService } from './providers/sortings.service';

@Component({
    template: `
        <div rtSort="field" [disableSort]="disableSort"></div>
        <div rtSort="anotherField"></div>
    `
})
class HostComponent {
    public disableSort = false;
}

class ListStub {
    public status: OperationStatus = OperationStatus.Initial;
    public ready = true;
    public reloadData(): void {
        return;
    }
}

describe('rtSort directive', () => {
    let sortingsService: RTSortingsService;
    const listStub: ListStub = new ListStub();

    beforeEach(() => {
        listStub.ready = true;
        SortDirective.settings.sortableClassName = 'rt-sortable';
        SortDirective.settings.sortAscClassName = 'rt-sort-asc';
        SortDirective.settings.sortDescClassName = 'rt-sort-desc';

        sortingsService = new RTSortingsService();
        TestBed.configureTestingModule({
            declarations: [HostComponent, SortDirective],
            providers: [{ provide: RTSortingsService, useValue: sortingsService }, { provide: RTList, useValue: listStub }]
        });
    });
    describe('css manipulations', () => {
        it('Adds appropriate sort class name to target element if same sort identity is in list of sortings', () => {
            sortingsService.setSort('field', false);
            let fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList).toContain(SortDirective.settings.sortAscClassName);

            sortingsService.setSort('field', false);
            fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList).toContain(SortDirective.settings.sortDescClassName);
        });
        it('Adds custom class names class to target element', () => {
            const customClassName = 'custom-class-name';
            const customAscClassName = 'custom-asc-class-name';
            const customDescClassName = 'custom-desc-class-name';
            SortDirective.settings.sortableClassName = customClassName;
            SortDirective.settings.sortAscClassName = customAscClassName;
            SortDirective.settings.sortDescClassName = customDescClassName;

            const fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList).toContain(customClassName);

            sortingsService.setSort('field', false);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList).toContain(customAscClassName);

            sortingsService.setSort('field', false);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList).toContain(customDescClassName);
        });
        it('Does not touch element classes if "sortableClassName" has falsy value', () => {
            SortDirective.settings.sortableClassName = '';
            const fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList.value).toEqual('');
        });

        it('Does not touch element classes if "sortAscClassName" has falsy value', () => {
            SortDirective.settings.sortAscClassName = '';
            SortDirective.settings.sortableClassName = 'sortable';
            const fixture = TestBed.createComponent(HostComponent);
            sortingsService.setSort('field', false);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelectorAll('div')[0].classList.value).toEqual(SortDirective.settings.sortableClassName);

            sortingsService.setSort('anotherField', false);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelectorAll('div')[1].classList.value).toEqual(SortDirective.settings.sortableClassName);
        });
        it('Adds "sortableClassName" class to target element', () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList).toContain(SortDirective.settings.sortableClassName);
        });

        it('Sets appropriate class names when sortings changes', () => {
            const fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();

            sortingsService.setSort('field', false);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList).toContain(SortDirective.settings.sortAscClassName);

            sortingsService.setSort('field', false);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList).toContain(SortDirective.settings.sortDescClassName);

            sortingsService.setSort('anotherField', false);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('div').classList).not.toContain(SortDirective.settings.sortDescClassName);
            expect(fixture.nativeElement.querySelector('div').classList).not.toContain(SortDirective.settings.sortAscClassName);
        });
    });
    describe('interaction with list', () => {
        let fixture: ComponentFixture<HostComponent>;
        beforeEach(() => {
            fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
        });

        it('Call "removeSort" when sort is disabled', () => {
            spyOn(sortingsService, 'removeSort');
            fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: false });
            expect(sortingsService.sortings[0].fieldName).toEqual('field');
            fixture.componentInstance.disableSort = true;
            fixture.detectChanges();
            expect(sortingsService.removeSort).toHaveBeenCalledWith('field');
        });
        it('Does not call "setSort" if sort is disabled', () => {
            spyOn(sortingsService, 'setSort');

            fixture.componentInstance.disableSort = true;
            fixture.detectChanges();

            fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: false });
            expect(sortingsService.setSort).not.toHaveBeenCalled();
        });
        it('Calls "setSort" method on click event', () => {
            spyOn(sortingsService, 'setSort');
            fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: false });
            expect(sortingsService.setSort).toHaveBeenCalledWith('field', false, undefined);

            fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: true });
            expect(sortingsService.setSort).toHaveBeenCalledWith('field', true, undefined);
        });

        it('Calls "setSort" method with "savePrevious" flag on ctrl+click', () => {
            spyOn(sortingsService, 'setSort');
            fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: true });
            expect(sortingsService.setSort).toHaveBeenCalledWith('field', true, undefined);
        });

        it('Calls "listService.reloadData" method  on click', () => {
            spyOn(listStub, 'reloadData');
            fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: false });
            expect(listStub.reloadData).toHaveBeenCalled();

            fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: true });
            expect(listStub.reloadData).toHaveBeenCalled();
        });
        it('Does not call setSort and reloadData if list is not ready', () => {
            spyOn(listStub, 'reloadData');
            spyOn(sortingsService, 'setSort');
            listStub.ready = false;
            fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: false });
            expect(listStub.reloadData).not.toHaveBeenCalled();
            expect(sortingsService.setSort).not.toHaveBeenCalled();
        });
    });
});
