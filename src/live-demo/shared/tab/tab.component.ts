import { Component, Input } from '@angular/core';

import { TabSectionComponent } from './tab-section.component';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-tab',
    template: `
    <div [hidden]="!isActive">
      <ng-content></ng-content>
    </div>
  `
})
export class TabComponent {
    public isActive: boolean;
    @Input() public tabTitle: string;
    constructor(tabs: TabSectionComponent) {
        tabs.addTab(this);
    }
}
