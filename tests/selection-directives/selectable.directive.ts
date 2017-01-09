import { RTSelectionEventsHelper, RTSelectionService } from '../../src/core/index';
import { SelectableDirective, SelectionAreaDirective } from '../../src/selection-directives/index';

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MouseButtons } from 'e2e4';

@Component({
    template: `<div rtSelectionArea>
    <div #selectable1 [rtSelectable]="selectable1" [(selected)]="firstElementSelected" ></div>
    <div #selectable2 [rtSelectable]="selectable2" [(selected)]="secondElementSelected" ></div>
    <div #selectable3 [rtSelectable]="selectable3" [(selected)]="thirdElementSelected" ></div>
    </div>`
})
class HostComponent {
    public firstElementSelected: boolean = false;
    public secondElementSelected: boolean = false;
    public thirdElementSelected: boolean = false;
}

describe('rtSelectable directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let selectionService: RTSelectionService;
    let selectionEventsHelper: RTSelectionEventsHelper;
    let selectableElements: DebugElement[];
    function getEventObject(): any {
        return { ctrlKey: true, preventDefault: () => { return; }, shiftKey: true, stopPropagation: () => { return; }, which: MouseButtons.Left };
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                SelectionAreaDirective,
                SelectableDirective
            ]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        selectionService = fixture.debugElement.children[0].injector.get(RTSelectionService);
        selectionEventsHelper = fixture.debugElement.children[0].injector.get(RTSelectionEventsHelper);
        selectableElements = [fixture.debugElement.children[0].children[0], fixture.debugElement.children[0].children[1], fixture.debugElement.children[0].children[2]];
    });

    it('Emits selectedChange event when "selected" property changed', () => {
        const spy = jasmine.createSpy('spy');
        (selectableElements[0].injector.get(SelectableDirective) as SelectableDirective)
            .selectedChange.subscribe(spy);

        selectionService.selectIndex(0, true);
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith(true);
    });

    it('Doesn\'t emits selectedChange event when "selected" setted to the same value', () => {
        const spy = jasmine.createSpy('spy');
        selectionService.selectIndex(0, true);
        fixture.detectChanges();

        (selectableElements[0].injector.get(SelectableDirective) as SelectableDirective)
            .selectedChange.subscribe(spy);

        selectionService.selectIndex(0, true);
        fixture.detectChanges();
        expect(spy).not.toHaveBeenCalled();
    });

    it('Handles selected=true by calling selectionService.selectIndex', (done) => {
        spyOn(selectionService, 'selectIndex');
        fixture.componentInstance.firstElementSelected = true;
        expect(selectionService.selectIndex).not.toHaveBeenCalled();
        fixture.detectChanges();
        expect(selectionService.selectIndex).not.toHaveBeenCalled();
        fixture.whenStable().then(() => {
            expect(selectionService.selectIndex).toHaveBeenCalledWith(0, selectionEventsHelper.multiple);
            done();
        });
    });

    it('Handles selected=false by calling selectionService.deselectIndex', (done) => {
        fixture.componentInstance.firstElementSelected = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            spyOn(selectionService, 'deselectIndex');
            fixture.componentInstance.firstElementSelected = false;
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(selectionService.deselectIndex).toHaveBeenCalledWith(0);
                done();
            });
        });
    });

    it('Handles mouseup event by calling selectionEventsHelper.mouseHandler', () => {
        spyOn(selectionEventsHelper, 'mouseHandler');
        selectableElements[0].triggerEventHandler('mouseup', { ctrlKey: true, shiftKey: true, which: MouseButtons.Left });
        expect(selectionEventsHelper.mouseHandler).toHaveBeenCalledWith(true, true, MouseButtons.Left, 0);
    });

    it('Sets selectedClassName property value as the element class when selection changed', () => {
        SelectableDirective.settings.selectedClassName = 'custom-class-name';
        selectableElements[0].triggerEventHandler('mouseup', { ctrlKey: false, shiftKey: false, which: MouseButtons.Left });
        expect(selectableElements[0].nativeElement.classList).toContain(SelectableDirective.settings.selectedClassName);
        selectableElements[0].triggerEventHandler('mouseup', { ctrlKey: false, shiftKey: false, which: MouseButtons.Left });
        expect(selectableElements[0].nativeElement.classList).not.toContain(SelectableDirective.settings.selectedClassName);
    });

    it('Doesn\'t touch element classes if selectedClassName has falsy value', () => {
        SelectableDirective.settings.selectedClassName = '';
        expect(selectableElements[0].nativeElement.classList.value).toEqual('');
        selectableElements[0].triggerEventHandler('mouseup', { ctrlKey: false, shiftKey: false, which: MouseButtons.Left });
        expect(selectableElements[0].nativeElement.classList.value).toEqual('');
        selectableElements[0].triggerEventHandler('mouseup', { ctrlKey: false, shiftKey: false, which: MouseButtons.Left });
        expect(selectableElements[0].nativeElement.classList.value).toEqual('');
    });

    it('Calls event \'preventDefault\' method if \'preventEventsDefaults\' option specified and selection handler returns true', () => {
        selectionEventsHelper.preventEventsDefaults = true;
        fixture.detectChanges();
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(true);
        spyOn(event, 'preventDefault');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('Doesn\'t call event \'preventDefault\' method if \'preventEventsDefaults\' option specified and selection handler returns false', () => {
        selectionEventsHelper.preventEventsDefaults = true;
        fixture.detectChanges();
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(false);
        spyOn(event, 'preventDefault');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('Calls event \'stopPropagation\' method if \'stopEventsPropagation\' option specified and selection handler returns true', () => {
        selectionEventsHelper.stopEventsPropagation = true;
        fixture.detectChanges();
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(true);
        spyOn(event, 'stopPropagation');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('Doesn\'t call event \'stopPropagation\' method if \'stopEventsPropagation\' option specified and selection handler returns false', () => {
        selectionEventsHelper.stopEventsPropagation = true;
        fixture.detectChanges();
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(false);
        spyOn(event, 'stopPropagation');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(event.stopPropagation).not.toHaveBeenCalled();
    });

    it('Calls \'clearWindowSelection\' method if selection handler returns true', () => {
        const selectable = selectableElements[0].injector.get(SelectableDirective);
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(true);
        spyOn(selectable, 'clearWindowSelection');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(selectable.clearWindowSelection).toHaveBeenCalled();
    });

    it('Doesn\'t call \'clearWindowSelection\' method if selection handler returns false', () => {
        const selectable = selectableElements[0].injector.get(SelectableDirective);
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(false);
        spyOn(selectable, 'clearWindowSelection');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(selectable.clearWindowSelection).not.toHaveBeenCalled();
    });
});
