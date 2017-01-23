import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventDefaultsDirective } from '../../src/misc-directives/index';

@Component({
    template: `<input [rtPreventDefaults]="preventOnEvents" />`
})
class HostComponent {
    public preventOnEvents: any = 'click';
}
describe('rtPreventDefaults directive', () => {
    let fixture: ComponentFixture<HostComponent>;
    let nativeElement: HTMLElement;
    let directive: PreventDefaultsDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, PreventDefaultsDirective],
            imports: [CommonModule]
        });
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        nativeElement = fixture.debugElement.children[0].nativeElement;
        directive = fixture.debugElement.children[0].injector.get(PreventDefaultsDirective);

    });
    it('Calls \'preventDefault\' method on specified events handlers', () => {
        const event = document.createEvent('MouseEvent');
        event.initEvent('click', false, false);
        spyOn(event, 'preventDefault');
        nativeElement.dispatchEvent(event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('Can handle array of event types', () => {
        spyOn(directive.renderer, 'listen');
        fixture.componentInstance.preventOnEvents = ['click', 'mouseover'];
        fixture.detectChanges();
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'click', directive.eventListener);
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'mouseover', directive.eventListener);
    });

    it('Can handle illegal objects', () => {
        spyOn(directive.renderer, 'listen');
        fixture.componentInstance.preventOnEvents = null;
        fixture.detectChanges();
        fixture.componentInstance.preventOnEvents = '';
        fixture.detectChanges();
        fixture.componentInstance.preventOnEvents = 0;
        fixture.detectChanges();
        fixture.componentInstance.preventOnEvents = 'click';
        fixture.detectChanges();
        expect(directive.renderer.listen).toHaveBeenCalledTimes(1);
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'click', directive.eventListener);
    });

    it('Detaches handlers from old events on event types change', () => {
        const spy = jasmine.createSpy('spy');
        spyOn(directive.renderer, 'listen').and.returnValue(spy);
        fixture.componentInstance.preventOnEvents = 'mouseover';
        fixture.detectChanges();
        fixture.componentInstance.preventOnEvents = 'click';
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('Detaches handlers on destroy', () => {
        const spy = jasmine.createSpy('spy');
        spyOn(directive.renderer, 'listen').and.returnValue(spy);
        fixture.componentInstance.preventOnEvents = 'mouseover';
        fixture.detectChanges();
        fixture.destroy();
        expect(spy).toHaveBeenCalled();
    });
});
