import {Directive, Input} from '@angular/core';
import {ISelectable} from 'e2e4/src/contracts/ISelectable';
import {RtSelectionAreaFor} from './selection-area-for';
@Directive({
    host: {
        '(mouseup)': 'mouseUpHandler($event)'
    },
    selector: '[rt-select-by-index]'
})
export class RtSelectByIndex {
    private selectionArea: RtSelectionAreaFor;
    @Input('rt-select-by-index') index: number = null;
    constructor(selectionArea: RtSelectionAreaFor) {
        this.selectionArea = selectionArea;
    }
    mouseUpHandler(event: MouseEvent): void {
        if (this.selectionArea.selectionEventsHelper.mouseHandler(event.ctrlKey, event.shiftKey, event.which, this.index)) {
            setTimeout(this.clearWindowSelection, 0);
        }
    }

    clearWindowSelection(): void {
        try {
            if (window && window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document && document.hasOwnProperty('selection')) {
                /* tslint:disable:no-string-literal */
                document['selection'].empty();
                /* tslint:enable:no-string-literal */
            }
        } catch (e) {

        }
    }
}
