import { Component } from '@angular/core';
import {RECTANGLE_DIRECTIVES} from '../../../right-angled/index';
@Component({
  moduleId: module.id,
  selector: 'caption[toolbar]',
  directives: [RECTANGLE_DIRECTIVES],
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {
}
