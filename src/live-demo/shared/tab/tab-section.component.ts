import { Component } from '@angular/core';

import { Tab } from './tab-base';

@Component({
    selector: 'rt-demo-tab-section',
    styleUrls: ['tab-section.component.scss'],
    templateUrl: 'tab-section.component.html'
})
export class TabSectionComponent {
    public tabs: Tab[] = [];
    public addTab(tab: Tab): void {
        if (this.tabs.length === 0) {
            tab.isActive = true;
        }
        this.tabs.push(tab);
    }
    public pick(selectedTab: Tab): void {
        this.tabs.forEach((tab) => {
            tab.isActive = false;
        });
        selectedTab.isActive = true;
    }
}
