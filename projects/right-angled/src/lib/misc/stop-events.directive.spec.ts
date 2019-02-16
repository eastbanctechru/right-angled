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
    it('Calls "stopPropagation" method on specified events handlers', () => {
        const event = document.createEvent('MouseEvent');
        event.initEvent('click', false, false);
        spyOn(event, 'stopPropagation');
        nativeElement.dispatchEvent(event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('Can handle array of event types', () => {
        spyOn(directive.renderer, 'listen');
        fixture.componentInstance.stopEvents = ['click', 'mouseover'];
        fixture.detectChanges();
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'click', directive.eventListener);
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'mouseover', directive.eventListener);
    });
    it('Can handle illegal objects', () => {
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

    it('Detaches handlers from old events on event types change', () => {
        const spy = jasmine.createSpy('spy');
        spyOn(directive.renderer, 'listen').and.returnValue(spy);
        fixture.componentInstance.stopEvents = 'mouseover';
        fixture.detectChanges();
        fixture.componentInstance.stopEvents = 'click';
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('Detaches handlers on destroy', () => {
        const spy = jasmine.createSpy('spy');
        spyOn(directive.renderer, 'listen').and.returnValue(spy);
        fixture.componentInstance.stopEvents = 'mouseover';
        fixture.detectChanges();
        fixture.destroy();
        expect(spy).toHaveBeenCalled();
    });
});
