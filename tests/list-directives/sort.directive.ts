import { RtList, RtSortingsService } from '../../src/core';
import { SortDirective } from '../../src/list-directives';
import { ProgressState, SortingsService } from 'e2e4';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
    template: `<div rtSort="field"></div>`
})
class HostComponent {
}

class ListStub {
    public state: ProgressState = ProgressState.Initial;
    public ready: boolean = true;
    public reloadData(): void {
        return;
    }
}

describe('rt-list-state-... components', () => {
    let sortingsService: RtSortingsService;
    let listStub: ListStub = new ListStub();

    beforeEach(() => {
        sortingsService = new RtSortingsService();
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                SortDirective
            ],
            providers: [
                { provide: SortingsService, useValue: sortingsService },
                { provide: RtList, useValue: listStub }]
        });
    });

    it('Adds \'sortableClassName\' class to target element', () => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('div').classList).toContain(SortDirective.settings.sortableClassName);
    });

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

    it('Sets appropriate class names when sortings changes', () => {
        let fixture = TestBed.createComponent(HostComponent);

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
    it('Adds custom class names class to target element', () => {
        const customClassName = 'custom-class-name';
        const customAscClassName = 'custom-asc-class-name';
        const customDescClassName = 'custom-desc-class-name';
        SortDirective.settings.sortableClassName = customClassName;
        SortDirective.settings.sortAscClassName = customAscClassName;
        SortDirective.settings.sortDescClassName = customDescClassName;

        let fixture = TestBed.createComponent(HostComponent);
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('div').classList).toContain(customClassName);

        sortingsService.setSort('field', false);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('div').classList).toContain(customAscClassName);

        sortingsService.setSort('field', false);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('div').classList).toContain(customDescClassName);
    });

    it('Calls \'setSort\' method on click event', () => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        spyOn(sortingsService, 'setSort');
        fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: false });
        expect(sortingsService.setSort).toHaveBeenCalledWith('field', false);

        fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: true });
        expect(sortingsService.setSort).toHaveBeenCalledWith('field', true);
    });

    it('Calls \'setSort\' method with \'savePrevious\' flag on ctrl+click', () => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        spyOn(sortingsService, 'setSort');
        fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: true });
        expect(sortingsService.setSort).toHaveBeenCalledWith('field', true);
    });

    it('Calls \'listService.reloadData\' method  on click', () => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        spyOn(listStub, 'reloadData');
        fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: false });
        expect(listStub.reloadData).toHaveBeenCalled();

        fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: true });
        expect(listStub.reloadData).toHaveBeenCalled();
    });
    it('Doesn\'t call setSort and reloadData if list is not readu', () => {
        let fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        spyOn(listStub, 'reloadData');
        spyOn(sortingsService, 'setSort');
        listStub.ready = false;
        fixture.debugElement.children[0].triggerEventHandler('click', { ctrlKey: false });
        expect(listStub.reloadData).not.toHaveBeenCalled();
        expect(sortingsService.setSort).not.toHaveBeenCalled();
    });
});
