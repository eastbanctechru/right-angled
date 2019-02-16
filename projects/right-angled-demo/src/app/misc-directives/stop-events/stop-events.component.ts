import { Component } from '@angular/core';
@Component({
    selector: 'rt-demo-stop-events',
    templateUrl: 'stop-events.component.html'
})
export class StopEventsComponent {
    public stopPropagation = true;
    public logKeyPress(eventKey: string): void {
        alertify.log(`'${eventKey}' pressed`);
    }
}
