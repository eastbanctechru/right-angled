import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SelectOnFocusDirective } from '../../src/misc-directives/index';

@Component({
    template: `<input rtSelectOnFocus />`
})
class HostComponent {
}

describe('rtSelectOnFocus directive', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, SelectOnFocusDirective],
            imports: [CommonModule]
        });
    });

    it('Calls \'select\' method on focus event', () => {
        let fixture = TestBed.createComponent(HostComponent);
        let input = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();

        let renderer = fixture.debugElement.children[0].injector.get(SelectOnFocusDirective).renderer;
        spyOn(renderer, 'invokeElementMethod');
        fixture.debugElement.children[0].triggerEventHandler('focus', null);
        expect(renderer.invokeElementMethod).toHaveBeenCalledWith(input, 'select', []);
    });
});
