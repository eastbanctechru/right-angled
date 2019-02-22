import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RTSelectionService, RTSelectionEventsHelper, SelectionAreaDirective, SelectionCheckboxForDirective } from './selection.module';

@Component({
    template: `
        <div rtSelectionArea>
            <input type="checkbox" #selectable1 [rtSelectionCheckboxFor]="selectable1" [(selected)]="firstElementSelected" />
            <input type="checkbox" #selectable2 [rtSelectionCheckboxFor]="selectable2" [(selected)]="secondElementSelected" />
            <input type="checkbox" #selectable3 [rtSelectionCheckboxFor]="selectable3" [(selected)]="thirdElementSelected" />
        </div>
    `
})
class HostComponent {
    public firstElementSelected = false;
    public secondElementSelected = false;
    public thirdElementSelected = false;
}

describe('rtSelectionCheckboxFor directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let selectionService: RTSelectionService;
    let selectionEventsHelper: RTSelectionEventsHelper;
    let selectionCheckboxes: DebugElement[];
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, SelectionAreaDirective, SelectionCheckboxForDirective]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        selectionService = fixture.debugElement.children[0].injector.get(RTSelectionService);
        selectionEventsHelper = fixture.debugElement.children[0].injector.get(RTSelectionEventsHelper);
        selectionCheckboxes = [
            fixture.debugElement.children[0].children[0],
            fixture.debugElement.children[0].children[1],
            fixture.debugElement.children[0].children[2]
        ];
    });

    it('Handles change event by calling selectionService.selectIndex with savePrevious flag if checkbox is checked', () => {
        spyOn(selectionService, 'selectIndex');
        selectionCheckboxes[0].triggerEventHandler('change', { target: { checked: true } });
        expect(selectionService.selectIndex).toHaveBeenCalledWith(0, true);
        selectionCheckboxes[1].triggerEventHandler('change', { target: { checked: true } });
        expect(selectionService.selectIndex).toHaveBeenCalledWith(1, true);
    });

    it('Handles change event by calling selectionService.deselectIndex if checkbox is unchecked', () => {
        spyOn(selectionService, 'deselectIndex');
        selectionCheckboxes[0].triggerEventHandler('change', { target: { checked: false } });
        expect(selectionService.deselectIndex).toHaveBeenCalledWith(0);
        selectionCheckboxes[1].triggerEventHandler('change', { target: { checked: false } });
        expect(selectionService.deselectIndex).toHaveBeenCalledWith(1);
    });

    it('Emits selectedChange event when checkbox selection changed', () => {
        const spy = jasmine.createSpy('spy');
        selectionCheckboxes[0].injector.get(SelectionCheckboxForDirective).selectedChange.subscribe(spy);

        selectionService.selectIndex(0, true);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(true);
    });

    it('Does not emits selectedChange event when checkbox selection setted to the same value', () => {
        const spy = jasmine.createSpy('spy');
        selectionService.selectIndex(0, true);
        fixture.detectChanges();

        selectionCheckboxes[0].injector.get(SelectionCheckboxForDirective).selectedChange.subscribe(spy);

        selectionService.selectIndex(0, true);
        fixture.detectChanges();
        expect(spy).not.toHaveBeenCalled();
    });

    it('Handles selected=true by calling selectionService.selectIndex', () => {
        spyOn(selectionService, 'selectIndex');
        fixture.componentInstance.firstElementSelected = true;
        expect(selectionService.selectIndex).not.toHaveBeenCalled();
        fixture.detectChanges();
        expect(selectionService.selectIndex).toHaveBeenCalledWith(0, selectionEventsHelper.multiple);
    });

    it('Handles selected=false by calling selectionService.deselectIndex', async () => {
        fixture.componentInstance.firstElementSelected = true;
        fixture.detectChanges();
        await fixture.whenStable();
        spyOn(selectionService, 'deselectIndex');
        fixture.componentInstance.firstElementSelected = false;
        fixture.detectChanges();
        expect(selectionService.deselectIndex).toHaveBeenCalledWith(0);
    });

    it('Detects selection service selection changes and sets "checked" flag to appropriate value', () => {
        expect(selectionCheckboxes[0].nativeElement.checked).toEqual(false);
        expect(selectionCheckboxes[1].nativeElement.checked).toEqual(false);
        expect(selectionCheckboxes[2].nativeElement.checked).toEqual(false);
        selectionService.selectAll();
        expect(selectionCheckboxes[0].nativeElement.checked).toEqual(false);
        expect(selectionCheckboxes[1].nativeElement.checked).toEqual(false);
        expect(selectionCheckboxes[2].nativeElement.checked).toEqual(false);
        fixture.detectChanges();
        expect(selectionCheckboxes[0].nativeElement.checked).toEqual(true);
        expect(selectionCheckboxes[1].nativeElement.checked).toEqual(true);
        expect(selectionCheckboxes[2].nativeElement.checked).toEqual(true);
    });
});
