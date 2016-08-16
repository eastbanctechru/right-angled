import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  // tslint:disable-next-line: component-selector-name component-selector-type component-selector-prefix
  selector: 'caption[rt-demo-toolbar]',
  styleUrls: ['toolbar.component.css'],
  templateUrl: 'toolbar.component.html'
})
export class ToolbarComponent {
  @Input() public checkable: boolean = false;
}
