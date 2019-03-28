import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SelectOnFocusDirective } from './misc.module';

@Component({
    template: `
        <input rtSelectOnFocus />
    `
})
class HostComponent {}

describe('rtSelectOnFocus directive', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, SelectOnFocusDirective],
            imports: [CommonModule]
        });
    });

    it('сalls `select` method of element on focus event', () => {
        const fixture = TestBed.createComponent(HostComponent);
        const input = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();

        spyOn(input, 'select');
        fixture.debugElement.children[0].triggerEventHandler('focus', null);
        expect(input.select).toHaveBeenCalledWith([]);
    });
});
