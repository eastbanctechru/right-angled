import {Component} from 'angular2/core';
import {StatusTracker} from 'e2e4';
@Component({
    template: `
    <div class="sample-header">
        <h1>{{message}}</h1>
    </div>
    `
})
export class BaseListSample {
    message: string = 'Hello';
    constructor() {
        StatusTracker.trackStatus('abcde');
    }
}
