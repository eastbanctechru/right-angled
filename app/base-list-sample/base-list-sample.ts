import {Component} from 'angular2/core';
@Component({
    template: `
    <div class="sample-header">
        <h1>{{message}}</h1>
    </div>
    `
})
export class BaseListSample {
    message: string = 'Hello';
}
