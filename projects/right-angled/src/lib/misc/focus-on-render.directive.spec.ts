import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FocusOnRenderDirective } from './misc.module';

@Component({
    template: `
        <input rtFocusOnRender />
    `
})
class HostComponent {}

describe('rtFocusOnRender directive', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, FocusOnRenderDirective],
            imports: [CommonModule]
        });
    });

    it('calls `focus` method on element after content render', async () => {
        const fixture = TestBed.createComponent(HostComponent);
        const input = fixture.nativeElement.querySelector('input');
        spyOn(input, 'focus');
        fixture.detectChanges();
        expect(input.focus).not.toHaveBeenCalled();
        await fixture.whenStable();
        expect(input.focus).toHaveBeenCalled();
    });
});
