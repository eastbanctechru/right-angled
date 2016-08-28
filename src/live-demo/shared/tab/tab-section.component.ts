import { Component } from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
    moduleId: module.id,
    selector: 'rt-demo-tab-section',
    styleUrls: ['tab-section.component.css'],
    template: `
    <ul>
        <li *ngFor="let tab of tabs" (click)="pick(tab)" [class.active]="tab.isActive">
            <button class="btn btn-primary">{{ tab.tabTitle }}</button>
        </li>
    </ul>
    <div class="tab-content">
        <ng-content></ng-content>
    </div>
  `
})
export class TabSectionComponent {
    public tabs: TabComponent[] = [];
    public addTab(tab: TabComponent): void {
        if (this.tabs.length === 0) {
            tab.isActive = true;
        }
        this.tabs.push(tab);
    }
    public pick(selectedTab: TabComponent): void {
        this.tabs.forEach((tab) => {
            tab.isActive = false;
        });
        selectedTab.isActive = true;
    }
}
