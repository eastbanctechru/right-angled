import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

interface SubscriptionFactory {
    attach(target: any, completeAction: any, errorAction: any): any;
    destroy(subscription: any): void;
    detach(subscription: any): void;
}

class ObservableSubscriptionFactory implements SubscriptionFactory {
    public attach(target: any, completeAction: any, errorAction?: (error: any) => any): any {
        return target.subscribe({ error: errorAction, next: completeAction });
    }
    public destroy(subscription: any): void { subscription.unsubscribe(); }
    public detach(subscription: any): void { subscription.unsubscribe(); }
}

class PromiseSubscriptionFactory implements SubscriptionFactory {
    public attach(target: Promise<any>, completeAction: (v: any) => any, errorAction?: (error: any) => any): any {
        return target.then(completeAction, errorAction);
    }
    public destroy(subscription: any): void { return void (0); }
    public detach(subscription: any): void { throw 'Not supported'; }
}

@Injectable()
export class AsyncSubscriber {
    private static promiseSubscription: PromiseSubscriptionFactory = new PromiseSubscriptionFactory();
    private static observableSubscription: ObservableSubscriptionFactory = new ObservableSubscriptionFactory();

    private factory: SubscriptionFactory = null;
    private lastTarget: Observable<any> | Promise<any> | EventEmitter<any> = null;
    private subscription: any = null;

    private isPromise(target: any): boolean {
        return target instanceof Promise;
    }
    private isObservable(target: any): boolean {
        return !!target.subscribe;
    }
    private chooseFactory(target: Observable<any> | Promise<any> | EventEmitter<any>): SubscriptionFactory {
        if (this.isPromise(target)) {
            return AsyncSubscriber.promiseSubscription;
        } else if (this.isObservable(target)) {
            return AsyncSubscriber.observableSubscription;
        } else {
            throw new Error('Couldn\'t subscribe to passed object');
        }
    }
    public attach(target: Observable<any> | Promise<any> | EventEmitter<any>, completeAction: (v: any) => any, errorAction?: (error: any) => any): void {
        if (this.lastTarget !== null) {
            this.destroy();
        }
        this.lastTarget = target;
        this.factory = this.chooseFactory(target);
        this.subscription = this.factory.attach(target, completeAction, errorAction);
    }
    public destroy(): void {
        if (this.factory) {
            this.factory.destroy(this.subscription);
        }
        this.factory = null;
        this.lastTarget = null;
        this.subscription = null;
    }
    public detach(): void { this.factory.detach(this.subscription); }
}
