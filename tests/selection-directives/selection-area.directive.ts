import { RtSelectionEventsHelper, RtSelectionService } from '../../src/core';
import { SelectableDirective, SelectionAreaDirective } from '../../src/selection-directives';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyCodes } from 'e2e4';

@Component({
    template: `<div rtSelectionArea 
    [preventEventsDefaults]="preventEventsDefaults"
    [stopEventsPropagation]="stopEventsPropagation"
    [horizontal]="horizontal"
    [multiple]="multiple"
    [toggleOnly]="toggleOnly"
    [autoSelectFirst]="autoSelectFirst"
    [trackBy]="trackBy"
    >
    <div #selectable1 [rtSelectable]="selectable1"></div>
    <div #selectable2 [rtSelectable]="selectable2"></div>
    <div #selectable3 [rtSelectable]="selectable3"></div>
    </div>`
})
class HostComponent {
    public preventEventsDefaults: boolean = false;
    public stopEventsPropagation: boolean = false;
    public horizontal: boolean = false;
    public multiple: boolean = true;
    public toggleOnly: boolean = false;
    public autoSelectFirst: boolean = false;
    public trackBy: (index: number, item: any) => any = (index: number, item: any) => item;
}

class SelectionServiceStub {
}
class SelectionEventsHelperStub {
}

describe('rtSelectionArea directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let selectionService: RtSelectionService;
    let selectionEventsHelper: RtSelectionEventsHelper;
    let selectionAreaDirective: SelectionAreaDirective;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                SelectionAreaDirective,
                SelectableDirective
            ],
            providers: [
                { provide: RtSelectionService, useClass: SelectionServiceStub },
                { provide: RtSelectionEventsHelper, useClass: SelectionEventsHelperStub }
            ]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        selectionService = fixture.debugElement.children[0].injector.get(RtSelectionService);
        selectionEventsHelper = fixture.debugElement.children[0].injector.get(RtSelectionEventsHelper);
        selectionAreaDirective = <SelectionAreaDirective>fixture.debugElement.children[0].injector.get(SelectionAreaDirective);
    });

    it('Acts as DI root for selection-related services', () => {
        expect(selectionService instanceof SelectionServiceStub).toBeFalsy();
        expect(selectionEventsHelper instanceof SelectionEventsHelperStub).toBeFalsy();
    });

    it('Proxies inputs to selection service properties', () => {
        expect(fixture.componentInstance.autoSelectFirst).toEqual(selectionAreaDirective.autoSelectFirst);
        fixture.componentInstance.autoSelectFirst = !fixture.componentInstance.autoSelectFirst;
        expect(fixture.componentInstance.autoSelectFirst).not.toEqual(selectionAreaDirective.autoSelectFirst);
        fixture.detectChanges();
        expect(fixture.componentInstance.autoSelectFirst).toEqual(selectionAreaDirective.autoSelectFirst);

        expect(fixture.componentInstance.horizontal).toEqual(selectionEventsHelper.horizontal);
        fixture.componentInstance.horizontal = !fixture.componentInstance.horizontal;
        expect(fixture.componentInstance.horizontal).not.toEqual(selectionEventsHelper.horizontal);
        fixture.detectChanges();
        expect(fixture.componentInstance.horizontal).toEqual(selectionEventsHelper.horizontal);

        expect(fixture.componentInstance.multiple).toEqual(selectionEventsHelper.multiple);
        fixture.componentInstance.multiple = !fixture.componentInstance.multiple;
        expect(fixture.componentInstance.multiple).not.toEqual(selectionEventsHelper.multiple);
        fixture.detectChanges();
        expect(fixture.componentInstance.multiple).toEqual(selectionEventsHelper.multiple);

        expect(fixture.componentInstance.preventEventsDefaults).toEqual(selectionEventsHelper.preventEventsDefaults);
        fixture.componentInstance.preventEventsDefaults = !fixture.componentInstance.preventEventsDefaults;
        expect(fixture.componentInstance.preventEventsDefaults).not.toEqual(selectionEventsHelper.preventEventsDefaults);
        fixture.detectChanges();
        expect(fixture.componentInstance.preventEventsDefaults).toEqual(selectionEventsHelper.preventEventsDefaults);

        expect(fixture.componentInstance.stopEventsPropagation).toEqual(selectionEventsHelper.stopEventsPropagation);
        fixture.componentInstance.stopEventsPropagation = !fixture.componentInstance.stopEventsPropagation;
        expect(fixture.componentInstance.stopEventsPropagation).not.toEqual(selectionEventsHelper.stopEventsPropagation);
        fixture.detectChanges();
        expect(fixture.componentInstance.stopEventsPropagation).toEqual(selectionEventsHelper.stopEventsPropagation);

        expect(fixture.componentInstance.toggleOnly).toEqual(selectionEventsHelper.toggleOnly);
        fixture.componentInstance.toggleOnly = !fixture.componentInstance.toggleOnly;
        expect(fixture.componentInstance.toggleOnly).not.toEqual(selectionEventsHelper.toggleOnly);
        fixture.detectChanges();
        expect(fixture.componentInstance.toggleOnly).toEqual(selectionEventsHelper.toggleOnly);

        expect(fixture.componentInstance.trackBy).toEqual(selectionService.trackByFn);
        fixture.componentInstance.trackBy = (index: number, item: any) => index;
        expect(fixture.componentInstance.trackBy).not.toEqual(selectionService.trackByFn);
        fixture.detectChanges();
        expect(fixture.componentInstance.trackBy).toEqual(selectionService.trackByFn);
    });

    it('Handles keydown event by calling selectionEventsHelper.keyboardHandler', () => {
        spyOn(selectionEventsHelper, 'keyboardHandler');
        fixture.debugElement.children[0].triggerEventHandler('keydown', { ctrlKey: true, keyCode: KeyCodes.ArrowDown, shiftKey: true });
        expect(selectionEventsHelper.keyboardHandler).toHaveBeenCalledWith(true, true, KeyCodes.ArrowDown);
    });

    it('Calls event \'preventDefault\' method if \'preventEventsDefaults\' option specified and selection handler returns true', () => {
        fixture.componentInstance.preventEventsDefaults = true;
        fixture.detectChanges();
        let event = { ctrlKey: true, keyCode: KeyCodes.ArrowDown, preventDefault: () => { return; }, shiftKey: true };
        spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(true);
        spyOn(event, 'preventDefault');
        fixture.debugElement.children[0].triggerEventHandler('keydown', event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('Doesn\'t call event \'preventDefault\' method if \'preventEventsDefaults\' option specified and selection handler returns false', () => {
        fixture.componentInstance.preventEventsDefaults = true;
        fixture.detectChanges();
        let event = { ctrlKey: true, keyCode: KeyCodes.ArrowDown, preventDefault: () => { return; }, shiftKey: true };
        spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(false);
        spyOn(event, 'preventDefault');
        fixture.debugElement.children[0].triggerEventHandler('keydown', event);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('Calls event \'stopPropagation\' method if \'stopEventsPropagation\' option specified and selection handler returns true', () => {
        fixture.componentInstance.stopEventsPropagation = true;
        fixture.detectChanges();
        let event = { ctrlKey: true, keyCode: KeyCodes.ArrowDown, preventDefault: () => { return; }, shiftKey: true, stopPropagation: () => { return; } };
        spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(true);
        spyOn(event, 'stopPropagation');
        fixture.debugElement.children[0].triggerEventHandler('keydown', event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('Doesn\'t call event \'stopPropagation\' method if \'stopEventsPropagation\' option specified and selection handler returns false', () => {
        fixture.componentInstance.stopEventsPropagation = true;
        fixture.detectChanges();
        let event = { ctrlKey: true, keyCode: KeyCodes.ArrowDown, preventDefault: () => { return; }, shiftKey: true, stopPropagation: () => { return; } };
        spyOn(selectionEventsHelper, 'keyboardHandler').and.returnValue(false);
        spyOn(event, 'stopPropagation');
        fixture.debugElement.children[0].triggerEventHandler('keydown', event);
        expect(event.stopPropagation).not.toHaveBeenCalled();
    });

    it('Throws error if specified trackBy input is not a function', () => {
        fixture.componentInstance.trackBy = <any>5;
        expect(() => fixture.detectChanges()).toThrowError('Error in ./HostComponent class HostComponent - inline template:7:4 caused by: trackBy parameter value must be a function');
    });

    it('Selects first item on change tracking cycle if autoSelectFirst is true and nothings selected', () => {
        expect(fixture.componentInstance.autoSelectFirst).toEqual(false);
        fixture.componentInstance.autoSelectFirst = true;
        fixture.detectChanges();
        expect(selectionService.getSelectedIndexes()).toEqual([0]);
    });

    it('Doesn\'t change selection on change tracking cycle if autoSelectFirst is true but something already selected', () => {
        expect(fixture.componentInstance.autoSelectFirst).toEqual(false);
        selectionService.selectAll();
        fixture.componentInstance.autoSelectFirst = true;
        fixture.detectChanges();
        expect(selectionService.getSelectedIndexes()).toEqual([0, 1, 2]);
    });

    it('Trims selection to first selected element on change tracking cycle if multiple setted to false', () => {
        expect(fixture.componentInstance.multiple).toEqual(true);
        selectionService.selectIndex(1);
        selectionService.selectIndex(2, true);
        expect(selectionService.getSelectedIndexes()).toEqual([1, 2]);
        fixture.componentInstance.multiple = false;
        fixture.detectChanges();
        expect(selectionService.getSelectedIndexes()).toEqual([1]);
    });

    it('Doesn\'t change selection on change tracking cycle if multiple setted to false and single element is selected', () => {
        expect(fixture.componentInstance.multiple).toEqual(true);
        selectionService.selectIndex(1);
        fixture.componentInstance.multiple = false;
        fixture.detectChanges();
        expect(selectionService.getSelectedIndexes()).toEqual([1]);
    });

    it('Deselects items on destroy', () => {
        spyOn(selectionService, 'deselectAll');
        fixture.destroy();
        expect(selectionService.deselectAll).toHaveBeenCalled();
    });

    it('Destroys selectionService on destroy', () => {
        spyOn(selectionService, 'destroy');
        fixture.destroy();
        expect(selectionService.destroy).toHaveBeenCalled();
    });
});
