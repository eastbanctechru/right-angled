import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Tab } from './tab-base';
import { TabSectionComponent } from './tab-section.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-sample-tab',
    template: `
        <div [ngClass]="{ hidden: !(isActive$ | async) }">
            <ng-content></ng-content>
        </div>
    `
})
export class SampleTabComponent extends Tab {
    public tabTitle = 'Live demo';
    constructor(tabSection: TabSectionComponent) {
        super();
        tabSection.addTab(this);
    }
}
