import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { FocusOnRenderDirective } from "../../index";

@Component({
    template: `<input rtFocusOnRender />`
})
class HostComponent {}

describe("rtFocusOnRender directive", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent, FocusOnRenderDirective],
            imports: [CommonModule]
        });
    });

    it("Calls 'focus' method on element after content render", done => {
        const fixture = TestBed.createComponent(HostComponent);
        const input = fixture.nativeElement.querySelector("input");
        const renderer = fixture.debugElement.children[0].injector.get(FocusOnRenderDirective).renderer;
        spyOn(renderer, "invokeElementMethod");
        fixture.detectChanges();
        expect(renderer.invokeElementMethod).not.toHaveBeenCalled();
        fixture.whenStable().then(() => {
            expect(renderer.invokeElementMethod).toHaveBeenCalledWith(input, "focus");
            done();
        });
    });
});
