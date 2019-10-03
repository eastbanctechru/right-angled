import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'rt-demo-app',
    styleUrls: ['app.component.scss'],
    templateUrl: 'app.component.html'
})
export class DemoAppComponent {
    constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
        angulartics2GoogleAnalytics.startTracking();
    }
}
