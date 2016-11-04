import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopEventsDirective } from '../../src/misc-directives';

@Component({
    template: `<input [rtStopEvents]="stopEvents" />`
})
class HostComponent {
    public stopEvents: any = 'click';
}
describe('rtStopEvents directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let nativeElement: HTMLElement;
    let directive: StopEventsDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, StopEventsDirective],
            imports: [CommonModule]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        nativeElement = fixture.debugElement.children[0].nativeElement;
        directive = fixture.debugElement.children[0].injector.get(StopEventsDirective);

    });
    it('Calls \'stopPropagation\' method on specified events handlers', () => {

        let event = document.createEvent('MouseEvent');
        event.initEvent('click', false, false);
        spyOn(event, 'stopPropagation');
        nativeElement.dispatchEvent(event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('Can handle array of event types', () => {
        spyOn(nativeElement, 'addEventListener');
        fixture.componentInstance.stopEvents = ['click', 'mouseover'];
        fixture.detectChanges();
        expect(nativeElement.addEventListener).toHaveBeenCalledWith('click', directive.eventListener);
        expect(nativeElement.addEventListener).toHaveBeenCalledWith('mouseover', directive.eventListener);
    });
    it('Can handle illegal objects', () => {
        spyOn(nativeElement, 'addEventListener');
        fixture.componentInstance.stopEvents = null;
        fixture.detectChanges();
        fixture.componentInstance.stopEvents = '';
        fixture.detectChanges();
        fixture.componentInstance.stopEvents = 0;
        fixture.detectChanges();
        fixture.componentInstance.stopEvents = 'click';
        fixture.detectChanges();
        expect(nativeElement.addEventListener).toHaveBeenCalledTimes(1);
        expect(nativeElement.addEventListener).toHaveBeenCalledWith('click', directive.eventListener);
    });

    it('Detaches handlers from old events on event types change', () => {
        spyOn(nativeElement, 'removeEventListener');
        fixture.componentInstance.stopEvents = 'mouseover';
        fixture.detectChanges();
        expect(nativeElement.removeEventListener).toHaveBeenCalledWith('click', directive.eventListener);
    });

    it('Detaches handlers on destroy', () => {
        spyOn(nativeElement, 'removeEventListener');
        fixture.destroy();
        expect(nativeElement.removeEventListener).toHaveBeenCalledWith('click', directive.eventListener);
    });
});
