import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventDefaultsDirective } from '../../src/misc-directives';

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
        let event = document.createEvent('MouseEvent');
        event.initEvent('click', false, false);
        spyOn(event, 'preventDefault');
        nativeElement.dispatchEvent(event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('Can handle array of event types', () => {
        spyOn(nativeElement, 'addEventListener');
        fixture.componentInstance.preventOnEvents = ['click', 'mouseover'];
        fixture.detectChanges();
        expect(nativeElement.addEventListener).toHaveBeenCalledWith('click', directive.eventListener);
        expect(nativeElement.addEventListener).toHaveBeenCalledWith('mouseover', directive.eventListener);
    });

    it('Can handle illegal objects', () => {
        spyOn(nativeElement, 'addEventListener');
        fixture.componentInstance.preventOnEvents = null;
        fixture.detectChanges();
        fixture.componentInstance.preventOnEvents = '';
        fixture.detectChanges();
        fixture.componentInstance.preventOnEvents = 0;
        fixture.detectChanges();
        fixture.componentInstance.preventOnEvents = 'click';
        fixture.detectChanges();
        expect(nativeElement.addEventListener).toHaveBeenCalledTimes(1);
        expect(nativeElement.addEventListener).toHaveBeenCalledWith('click', directive.eventListener);
    });

    it('Detaches handlers from old events on event types change', () => {
        spyOn(nativeElement, 'removeEventListener');
        fixture.componentInstance.preventOnEvents = 'mouseover';
        fixture.detectChanges();
        expect(nativeElement.removeEventListener).toHaveBeenCalledWith('click', directive.eventListener);
    });

    it('Detaches handlers on destroy', () => {
        spyOn(nativeElement, 'removeEventListener');
        fixture.destroy();
        expect(nativeElement.removeEventListener).toHaveBeenCalledWith('click', directive.eventListener);
    });
});
