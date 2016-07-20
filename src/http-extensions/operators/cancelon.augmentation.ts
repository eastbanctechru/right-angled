import { Observable } from 'rxjs/Observable';

import { CancelOnSignature } from './cancelon.signature';
import { cancelOn } from './cancelon.extension';

Observable.prototype.cancelOn = cancelOn;

declare module 'rxjs/Observable' {
    /* tslint:disable:interface-name */
    interface Observable<T> {
        cancelOn: CancelOnSignature;
    }
    /* tslint:enable */
}
