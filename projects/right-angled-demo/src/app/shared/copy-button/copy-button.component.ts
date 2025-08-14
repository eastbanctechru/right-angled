import { Component, ElementRef, Input, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-copy-button',
    styleUrls: ['copy-button.component.scss'],
    template: `
        <button class="btn btn-primary" title="Copy source code to clipboard" (click)="copy()">
            Copy code
        </button>
    `,
    standalone: false
})
export class CopyButtonComponent {
    @Input() public text: string = null;
    private readonly clipboard = inject(Clipboard);
    constructor() { }
    public copy(): void {
        this.clipboard.copy(this.text);
    }
}
