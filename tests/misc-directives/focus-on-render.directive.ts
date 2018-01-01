import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { FocusOnRenderDirective } from '../../index';

@Component({
    template: `<input rtFocusOnRender />`
})
class HostComponent {}

describe('rtFocusOnRender directive', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, FocusOnRenderDirective],
            imports: [CommonModule]
        });
    });

    it("Calls 'focus' method on element after content render", done => {
        const fixture = TestBed.createComponent(HostComponent);
        const input = fixture.nativeElement.querySelector('input');
        spyOn(input, 'focus');
        fixture.detectChanges();
        expect(input.focus).not.toHaveBeenCalled();
        fixture.whenStable().then(() => {
            expect(input.focus).toHaveBeenCalled();
            done();
        });
    });
});
