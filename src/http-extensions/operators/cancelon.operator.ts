import { CancelOnSubscriber } from './cancelon.subscriber';

import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';

export class CancelOnOperator<T, R> implements Operator<T, R> {
    constructor(private event: Observable<any>) {
    }

    public call(subscriber: Subscriber<R>, source: any): any {
        return source._subscribe(new CancelOnSubscriber(subscriber, this.event));
    }
}
