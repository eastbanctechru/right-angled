import { Component } from '@angular/core';
import { SELECTION_DIRECTIVES } from '../../../right-angled/selection-directives';
@Component({
  directives: [SELECTION_DIRECTIVES],
  moduleId: module.id,
  // tslint:disable-next-line: component-selector-name component-selector-type component-selector-prefix
  selector: 'caption[rt-demo-toolbar]',
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {
}
