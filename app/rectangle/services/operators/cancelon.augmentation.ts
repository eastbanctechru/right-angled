import { Observable } from 'rxjs/Observable';
import { ICancelOnSignature } from './cancelon.signature';
import { cancelOn } from './cancelon.extension';

Observable.prototype.cancelOn = cancelOn;

declare module 'rxjs/Observable' {
    /* tslint:disable:interface-name */
    interface Observable<T> {
        cancelOn: ICancelOnSignature;
    }
    /* tslint:enable */
}
