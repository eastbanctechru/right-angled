import { Component, Input } from '@angular/core';

import { Tab } from './tab-base';
import { TabSectionComponent } from './tab-section.component';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-sample-tab',
    template: `
    <div [hidden]="!isActive">
        <ng-content></ng-content>
    </div>
  `
})
export class SampleTabComponent extends Tab {
    @Input() public tabTitle: string;
    constructor(tabs: TabSectionComponent) {
        super(tabs);
    }
}
