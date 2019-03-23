import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreventDefaultsDirective } from './misc.module';

@Component({
    template: `
        <input [rtPreventDefaults]="preventOnEvents" />
    `
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
    it('calls `preventDefault` method on specified events', () => {
        const event = document.createEvent('MouseEvent');
        event.initEvent('click', false, false);
        spyOn(event, 'preventDefault');
        nativeElement.dispatchEvent(event);
        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('handles array of event types', () => {
        spyOn(directive.renderer, 'listen');
        fixture.componentInstance.preventOnEvents = ['click', 'mouseover'];
        fixture.detectChanges();
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'click', directive.eventListener);
        expect(directive.renderer.listen).toHaveBeenCalledWith(nativeElement, 'mouseover', directive.eventListener);
    });

    it('ignores illegal values of `preventOnEvents` parameter', () => {
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

    it('detaches listeners from old events if event types changed', () => {
        const unlistenSpy = jasmine.createSpy('spy');
        spyOn(directive.renderer, 'listen').and.returnValue(unlistenSpy);
        fixture.componentInstance.preventOnEvents = 'mouseover';
        fixture.detectChanges();
        fixture.componentInstance.preventOnEvents = 'click';
        fixture.detectChanges();
        expect(unlistenSpy).toHaveBeenCalled();
    });

    it('detaches listeners on component destroy', () => {
        const unlistenSpy = jasmine.createSpy('spy');
        spyOn(directive.renderer, 'listen').and.returnValue(unlistenSpy);
        fixture.componentInstance.preventOnEvents = 'mouseover';
        fixture.detectChanges();
        fixture.destroy();
        expect(unlistenSpy).toHaveBeenCalled();
    });
});
