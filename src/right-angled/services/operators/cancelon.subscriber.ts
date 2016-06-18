import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

export class CancelOnSubscriber<T, R> extends Subscriber<T> {
    constructor(destination: Subscriber<R>,
        event: Observable<any>) {
        super(destination);
        this.add(event.subscribe(() => {
            this.unsubscribe();
        }));
    }
}
