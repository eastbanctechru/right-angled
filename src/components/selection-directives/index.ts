import { SelectionAreaForDirective } from './selection-area-for.directive';
import { SelectByIndexDirective } from './select-by-index.directive';
import { SelectionCheckboxForDirective } from './selection-checkbox-for.directive';
import { SelectAllDirective } from './select-all.directive';
import { DeselectAllDirective } from './deselect-all.directive';
import { CheckAllDirective } from './check-all.directive';

export var SELECTION_DIRECTIVES: any[] = [
    SelectionAreaForDirective,
    SelectByIndexDirective,
    SelectionCheckboxForDirective,
    SelectAllDirective,
    DeselectAllDirective,
    CheckAllDirective];

export { RtSelectionService } from './selection-service';
export { SelectionEventsEmitter } from './contract/selection-events-emitter';

export { OnSelected } from './contract/on-selected-hook';
export { OnDeselected } from './contract/on-deselected-hook';
export { OnSelectionChanged } from './contract/on-selection-changed-hook';

export { OnSelectedEvent } from './contract/on-selected-event';
export { OnDeselectedEvent } from './contract/on-deselected-event';
export { OnSelectionChangedEvent } from './contract/on-selection-changed-event';
