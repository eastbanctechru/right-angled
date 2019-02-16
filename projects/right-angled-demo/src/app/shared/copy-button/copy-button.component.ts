import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as Clipboard from 'clipboard';

@Component({
    selector: 'rt-demo-copy-button',
    styleUrls: ['copy-button.component.scss'],
    template: `
        <button class="btn btn-primary" title="Copy source code to clipboard">
            Copy code
        </button>
    `
})
export class CopyButtonComponent implements OnInit, OnDestroy {
    @Input() public text: string = null;
    private clipboard: Clipboard;
    constructor(private elementRef: ElementRef) {}
    public ngOnInit(): void {
        this.clipboard = new Clipboard(this.elementRef.nativeElement, {
            text: this.getText
        });
    }
    public ngOnDestroy(): void {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    }
    public getText = (): string => {
        return this.text;
    };
}
