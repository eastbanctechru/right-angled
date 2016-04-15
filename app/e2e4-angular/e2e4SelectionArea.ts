import {Directive, OnInit, ElementRef, Input} from 'angular2/core';
import {SelectionManager} from 'e2e4/src/selectionManager';
import {KeyboardSelectionEventsHelper} from 'e2e4/src/keyboardSelectionEventsHelper';
@Directive({
    providers: [SelectionManager],
    selector: '[e2e4-selection-area]'
})
export class E2E4SelectionArea implements OnInit {
    private keyDownHandlerBinded: (event: KeyboardEvent) => any;
    private selectionManager: SelectionManager;
    private nativeElement: HTMLElement;
    @Input() multiple: boolean = true;
    @Input() autoSelectFirst: boolean = false;
    @Input() toggleOnly: boolean = false;

    constructor(el: ElementRef, selectionManager: SelectionManager) {
        this.selectionManager = selectionManager;
        this.nativeElement = el.nativeElement;
    }

    ngOnInit(): void {
    }
}
