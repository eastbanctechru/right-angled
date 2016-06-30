import { Component } from '@angular/core';
import { RIGHTANGLED_DIRECTIVES } from '../../../right-angled/index';
@Component({
  directives: [RIGHTANGLED_DIRECTIVES],
  moduleId: module.id,
  selector: 'caption[toolbar]',
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {
}
