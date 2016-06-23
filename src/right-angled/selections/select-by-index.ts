import {SkipSelf, HostListener, Directive, Input, Host} from '@angular/core';
import {RtSelectionAreaForDirective} from './selection-area-for';
@Directive({
    selector: '[rt-select-by-index]'
})
export class RtSelectByIndexDirective {
    private selectionArea: RtSelectionAreaForDirective;
    @Input('rt-select-by-index') index: number = null;
    constructor(@SkipSelf()selectionArea: RtSelectionAreaForDirective) {
        this.selectionArea = selectionArea;
    }
    @HostListener('mouseup', ['$event'])
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
