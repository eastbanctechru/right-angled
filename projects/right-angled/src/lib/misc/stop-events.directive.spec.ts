import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StopEventsDirective } from './misc.module';

@Component({
    template: `
        <input [rtStopEvents]="stopEvents" />
    `
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
    it('calls `stopPropagation` method on specified events handlers', () => {
        const event = document.createEvent('MouseEvent');
        event.initEvent('click', false, false);
        spyOn(event, 'stopPropagation');
        nativeElement.dispatchEvent(event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('handles array of event types', () => {
        spyOn(directive.renderer, 'listen');
        fixture.componentInstance.stopEvents = ['click', 'mouseover'];
        fixture.detectChanges();
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'click', directive.eventListener);
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'mouseover', directive.eventListener);
    });
    it('ignores illegal values of `stopEvents` parameter', () => {
        spyOn(directive.renderer, 'listen');
        fixture.componentInstance.stopEvents = null;
        fixture.detectChanges();
        fixture.componentInstance.stopEvents = '';
        fixture.detectChanges();
        fixture.componentInstance.stopEvents = 0;
        fixture.detectChanges();
        fixture.componentInstance.stopEvents = 'click';
        fixture.detectChanges();
        expect(directive.renderer.listen).toHaveBeenCalledTimes(1);
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'click', directive.eventListener);
    });

    it('detaches listeners from old events on event types change', () => {
        const unlistenSpy = jasmine.createSpy('spy');
        spyOn(directive.renderer, 'listen').and.returnValue(unlistenSpy);
        fixture.componentInstance.stopEvents = 'mouseover';
        fixture.detectChanges();
        fixture.componentInstance.stopEvents = 'click';
        fixture.detectChanges();
        expect(unlistenSpy).toHaveBeenCalled();
    });

    it('detaches listeners on destroy', () => {
        const unlistenSpy = jasmine.createSpy('spy');
        spyOn(directive.renderer, 'listen').and.returnValue(unlistenSpy);
        fixture.componentInstance.stopEvents = 'mouseover';
        fixture.detectChanges();
        fixture.destroy();
        expect(unlistenSpy).toHaveBeenCalled();
    });
});
