import { RTSelectionEventsHelper, RTSelectionService } from '../../src/core';
import { SelectionAreaDirective, SelectionCheckboxForDirective } from '../../src/selection-directives';

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
    template: `<div rtSelectionArea>
    <input type="checkbox" #selectable1 [rtSelectionCheckboxFor]="selectable1"/>
    <input type="checkbox" #selectable2 [rtSelectionCheckboxFor]="selectable2"/>
    <input type="checkbox" #selectable3 [rtSelectionCheckboxFor]="selectable3"/>
    </div>`
})
class HostComponent {
}

describe('rtSelectionCheckboxFor directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let selectionService: RTSelectionService;
    let selectionEventsHelper: RTSelectionEventsHelper;
    let selectionCheckboxes: DebugElement[];
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                SelectionAreaDirective,
                SelectionCheckboxForDirective
            ]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        selectionService = fixture.debugElement.children[0].injector.get(RTSelectionService);
        selectionEventsHelper = fixture.debugElement.children[0].injector.get(RTSelectionEventsHelper);
        selectionCheckboxes = [fixture.debugElement.children[0].children[0], fixture.debugElement.children[0].children[1], fixture.debugElement.children[0].children[2]];
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

    it('Detects selection service selection changes and sets \'checked\' flag to appropriate value', () => {
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
