import { Component } from '@angular/core';
import { RECTANGLE_DIRECTIVES } from '../../../right-angled/index';
@Component({
  directives: [RECTANGLE_DIRECTIVES],
  moduleId: module.id,
  selector: 'caption[toolbar]',
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {
}
