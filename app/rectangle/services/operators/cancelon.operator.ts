import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { CancelOnSubscriber } from './cancelon.subscriber';

export class CancelOnOperator<T, R> implements Operator<T, R> {
    private event: Observable<any>;

    constructor(event: Observable<any>) {
        this.event = event;
    }

    // TODO krozhkov: contract changed in latest version of RxJs.
    call(subscriber: Subscriber<R>): Subscriber<T> {
        return new CancelOnSubscriber(subscriber, this.event);
    }
}
