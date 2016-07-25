import { Component } from '@angular/core';
import { SELECTION_DIRECTIVES } from 'right-angled';
@Component({
  directives: [SELECTION_DIRECTIVES],
  moduleId: module.id,
  // tslint:disable-next-line: component-selector-name component-selector-type component-selector-prefix
  selector: 'caption[rt-demo-toolbar]',
  styleUrls: ['toolbar.component.css'],
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {
}
