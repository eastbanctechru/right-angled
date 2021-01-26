import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RTSelectionService, RTSelectionEventsHelper, SelectionAreaDirective, SelectableDirective } from './selection.module';
import { MouseButtons } from './providers/selection-events-helper';

@Component({
    template: `
        <div rtSelectionArea>
            <div #selectable1 [rtSelectable]="selectable1" [(selected)]="firstElementSelected"></div>
            <div #selectable2 [rtSelectable]="selectable2" [(selected)]="secondElementSelected"></div>
            <div #selectable3 [rtSelectable]="selectable3" [(selected)]="thirdElementSelected"></div>
        </div>
    `
})
class HostComponent {
    public firstElementSelected = false;
    public secondElementSelected = false;
    public thirdElementSelected = false;
}

describe('rtSelectable directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let selectionService: RTSelectionService;
    let selectionEventsHelper: RTSelectionEventsHelper;
    let selectableElements: DebugElement[];
    function getEventObject(): Partial<MouseEvent> {
        return {
            ctrlKey: true,
            preventDefault: () => {
                return;
            },
            shiftKey: true,
            stopPropagation: () => {
                return;
            },
            which: MouseButtons.Left
        };
    }
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [HostComponent, SelectionAreaDirective, SelectableDirective]
            });
            fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
            selectionService = fixture.debugElement.children[0].injector.get(RTSelectionService);
            selectionEventsHelper = fixture.debugElement.children[0].injector.get(RTSelectionEventsHelper);
            selectableElements = [
                fixture.debugElement.children[0].children[0],
                fixture.debugElement.children[0].children[1],
                fixture.debugElement.children[0].children[2]
            ];
        })
    );

    it('emits `selectedChange` event when `selected` property changed', () => {
        let eventRaised = false;
        selectableElements[0].injector.get(SelectableDirective).selectedChange.subscribe(() => (eventRaised = true));

        selectionService.selectIndex(0, true);
        fixture.detectChanges();

        expect(eventRaised).toBe(true);
    });

    it('doesn`t emit `selectedChange` event when `selected` setted to the same value', () => {
        selectionService.selectIndex(0, true);
        fixture.detectChanges();
        let eventRaised = false;
        selectableElements[0].injector.get(SelectableDirective).selectedChange.subscribe(() => (eventRaised = true));

        selectionService.selectIndex(0, true);
        fixture.detectChanges();

        expect(eventRaised).toBe(false);
    });

    it('selects first element if `firstElementSelected` input is `true`', () => {
        fixture.componentInstance.firstElementSelected = true;
        expect(selectionService.isIndexSelected(0)).toBe(false);

        fixture.detectChanges();

        expect(selectionService.isIndexSelected(0)).toBe(true);
    });

    it('deselects first element if `firstElementSelected` input changed to `false` from `true`', async () => {
        fixture.componentInstance.firstElementSelected = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(selectionService.isIndexSelected(0)).toBe(true);

        fixture.componentInstance.firstElementSelected = false;
        fixture.detectChanges();
        expect(selectionService.isIndexSelected(0)).toBe(false);
    });

    it('handles `mouseup` event by calling `selectionEventsHelper.mouseHandler`', () => {
        spyOn(selectionEventsHelper, 'mouseHandler');
        selectableElements[0].triggerEventHandler('mouseup', {
            ctrlKey: true,
            shiftKey: true,
            which: MouseButtons.Left
        });
        expect(selectionEventsHelper.mouseHandler).toHaveBeenCalledWith(true, true, MouseButtons.Left, 0);
    });

    it('sets `selectedClassName` value as the element class when selection changed', () => {
        SelectableDirective.settings.selectedClassName = 'custom-class-name';
        selectableElements[0].triggerEventHandler('mouseup', {
            ctrlKey: false,
            shiftKey: false,
            which: MouseButtons.Left
        });
        expect(selectableElements[0].nativeElement.classList).toContain(SelectableDirective.settings.selectedClassName);

        selectableElements[0].triggerEventHandler('mouseup', {
            ctrlKey: false,
            shiftKey: false,
            which: MouseButtons.Left
        });
        expect(selectableElements[0].nativeElement.classList).not.toContain(SelectableDirective.settings.selectedClassName);
    });

    it('does not touch element classes if `selectedClassName` has falsy value', () => {
        SelectableDirective.settings.selectedClassName = '';
        expect(selectableElements[0].nativeElement.classList.value).toEqual('');
        selectableElements[0].triggerEventHandler('mouseup', {
            ctrlKey: false,
            shiftKey: false,
            which: MouseButtons.Left
        });
        expect(selectableElements[0].nativeElement.classList.value).toEqual('');
        selectableElements[0].triggerEventHandler('mouseup', {
            ctrlKey: false,
            shiftKey: false,
            which: MouseButtons.Left
        });
        expect(selectableElements[0].nativeElement.classList.value).toEqual('');
    });

    it('calls event `preventDefault` method if `preventEventsDefaults` option is specified and selection handler returns `true`', () => {
        selectionEventsHelper.preventEventsDefaults = true;
        fixture.detectChanges();
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(true);
        spyOn(event, 'preventDefault');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('does not call event `preventDefault` method if `preventEventsDefaults` option specified and selection handler returns false', () => {
        selectionEventsHelper.preventEventsDefaults = true;
        fixture.detectChanges();
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(false);
        spyOn(event, 'preventDefault');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('calls event `stopPropagation` method if `stopEventsPropagation` option specified and selection handler returns true', () => {
        selectionEventsHelper.stopEventsPropagation = true;
        fixture.detectChanges();
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(true);
        spyOn(event, 'stopPropagation');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('does not call event `stopPropagation` method if `stopEventsPropagation` option specified and selection handler returns false', () => {
        selectionEventsHelper.stopEventsPropagation = true;
        fixture.detectChanges();
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(false);
        spyOn(event, 'stopPropagation');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(event.stopPropagation).not.toHaveBeenCalled();
    });

    it('calls `clearWindowSelection` method if selection handler returns `true`', () => {
        const selectable = selectableElements[0].injector.get(SelectableDirective);
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(true);
        spyOn(selectable, 'clearWindowSelection');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(selectable.clearWindowSelection).toHaveBeenCalled();
    });

    it('does not call `clearWindowSelection` method if selection handler returns `false`', () => {
        const selectable = selectableElements[0].injector.get(SelectableDirective);
        const event = getEventObject();
        spyOn(selectionEventsHelper, 'mouseHandler').and.returnValue(false);
        spyOn(selectable, 'clearWindowSelection');
        selectableElements[0].triggerEventHandler('mouseup', event);
        expect(selectable.clearWindowSelection).not.toHaveBeenCalled();
    });
});
