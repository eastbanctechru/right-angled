import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';

Observable.prototype.cancelOn = cancelOn;

function cancelOn<T>(event: Observable<any>): Observable<T> {
    return this.lift(new CancelOnOperator(event));
}

interface ICancelOnSignature {
    <T>(event: Observable<any>): Observable<T>;
}

class CancelOnOperator<T, R> implements Operator<T, R> {
    private event: Observable<any>;

    constructor(event: Observable<any>) {
        this.event = event;
    }

    // TODO krozhkov: contract changed in latest version of RxJs.
    call(subscriber: Subscriber<R>): Subscriber<T> {
        return new CancelOnSubscriber(subscriber, this.event);
    }
}

class CancelOnSubscriber<T, R> extends Subscriber<T> {
    constructor(destination: Subscriber<R>,
        event: Observable<any>) {
        super(destination);
        this.add(event.subscribe(() => {
            this.unsubscribe();
        }));
    }
}

declare module 'rxjs/Observable' {
    /* tslint:disable:interface-name */
    interface Observable<T> {
        cancelOn: ICancelOnSignature;
    }
    /* tslint:enable */
}
