import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SelectOnFocusDirective } from '../../index';

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
        const fixture = TestBed.createComponent(HostComponent);
        const input = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();

        const renderer = fixture.debugElement.children[0].injector.get(SelectOnFocusDirective).renderer;
        spyOn(renderer, 'invokeElementMethod');
        fixture.debugElement.children[0].triggerEventHandler('focus', null);
        expect(renderer.invokeElementMethod).toHaveBeenCalledWith(input, 'select', []);
    });
});
