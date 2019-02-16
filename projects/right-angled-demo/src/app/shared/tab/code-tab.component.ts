import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { Tab } from './tab-base';
import { TabSectionComponent } from './tab-section.component';

import { HttpClient } from '@angular/common/http';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
    selector: 'rt-demo-code-tab',
    template: `
        <div [ngClass]="{ hidden: !isActive }">
            <rt-demo-copy-button [ngClass]="{ hidden: !contentReady }" [text]="rawSources"></rt-demo-copy-button>
            <div [ngClass]="{ hidden: contentReady }" class="spinner">
                <div class="spinner-pusher">
                    <div class="spinner-wraper">
                        <div class="spinner-body"></div>
                        <div class="spinner-line"></div>
                    </div>
                </div>
            </div>
            <pre [ngClass]="{ hidden: !contentReady }"></pre>
        </div>
    `
})
export class CodeTabComponent extends Tab implements OnChanges {
    public isActive: boolean;
    public contentLoadStarted = false;
    public contentReady = false;
    public baseUrl = 'https://raw.githubusercontent.com/eastbanctechru/right-angled/master/projects/right-angled-demo/src/app/';
    public rawSources: string = null;
    @Input() public url: string;
    @Input() public title: string;
    constructor(private tabSection: TabSectionComponent, private http: HttpClient, private elementRef: ElementRef) {
        super();
    }
    public activate(): void {
        super.activate();
        if (!this.contentLoadStarted) {
            this.contentLoadStarted = true;
            this.http.get(this.baseUrl + this.url, { responseType: 'text' }).subscribe(res => {
                this.rawSources = res;
                const pre = this.elementRef.nativeElement.querySelector('pre');
                const ext = this.url
                    .substring(this.url.lastIndexOf('.') + 1)
                    .replace('tsfake', 'ts')
                    .toLowerCase();
                const lang = ext === 'ts' ? 'typescript' : 'html';
                pre.innerHTML = Prism.highlight(res, Prism.languages[lang]);
                this.contentReady = true;
            });
        }
    }
    public ngOnChanges(changes: any): void {
        if (changes.url && !this.tabTitle) {
            const title =
                this.url
                    .substring(this.url.lastIndexOf('.') + 1)
                    .replace('tsfake', 'ts')
                    .toLowerCase() === 'ts'
                    ? 'Component'
                    : 'Template';
            this.tabTitle = this.title || title;
            this.tabSection.addTab(this);
        }
    }
}
