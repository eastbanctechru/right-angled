import { TabSectionComponent } from './tab-section.component';

export abstract class Tab {
    public isActive: boolean;
    public tabTitle: string = '';
    constructor(tabs: TabSectionComponent) {
        tabs.addTab(this);
    }
}
