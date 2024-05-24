import { Injectable } from '@angular/core';
// tslint:disable:max-classes-per-file

/**
 * Contract to implement abstracted subscription proxy which hides any details of underlying subscription
 */
export interface SubscriptionProxy {
    /**
     * Subscribes to passed object
     * @param target object to subscribe
     * @param completeAction action to call on underlying subscription successful completion
     * @param errorAction action to call on underlying subscription error
     */

    attach(target: any, completeAction: any, errorAction: any): any;

    /**
     * Detaches from underlying subscription
     */
    detach(subscription: any): void;
}

/**
 * Implementation of {@link SubscriptionProxy} to work with any objects with `subscribe/unsubscribe` contracts. This contract is suitable for Observable, for example.
 */
export class PushBasedSubscriptionProxy implements SubscriptionProxy {
    /**
     * Returns `true` if this proxy type can subscribe to passed object. `false` otherwise.
     */
    public static isAcceptable(target: any): boolean {
        return !!target.subscribe;
    }
    /**
     * @inheritdoc
     */
    public attach(target: any, completeAction: any, errorAction?: (error: any) => any): any {
        return target.subscribe({ error: errorAction, next: completeAction });
    }
    /**
     * @inheritdoc
     */
    public detach(subscription: any): void {
        subscription.unsubscribe();
    }
}

/**
 * Implementation of {@link SubscriptionProxy} which works with Promise and adds ability to unsubscribe from it.
 */
export class PromiseSubscriptionProxy implements SubscriptionProxy {
    private isAlive = true;
    /**
     * Returns `true` if this proxy type can subscribe to passed object. `false` otherwise.
     */
    public static isAcceptable(target: any): boolean {
        return target instanceof Promise;
    }
    /**
     * @inheritdoc
     */
    public attach(target: Promise<any>, completeAction: (value: any) => any, errorAction?: (error: any) => any): any {
        return target.then(
            (value: any) => {
                if (this.isAlive) {
                    completeAction(value);
                }
            },
            (error: any) => {
                if (this.isAlive) {
                    errorAction(error);
                }
            }
        );
    }
    /**
     * @inheritdoc
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public detach(_subscription: any): void {
        this.isAlive = false;
    }
}

/**
 * Service to manage async subscriptions which acts as mediator to {@link SubscriptionProxy} contract implementations.
 */
@Injectable()
export class AsyncSubscriber {
    private proxy: SubscriptionProxy = null;
    private lastTarget: any = null;
    private subscription: any = null;

    /**
     * @see {@link SubscriptionProxy.attach}
     */
    public attach(target: any, completeAction: (value: any) => any, errorAction?: (error: any) => any): void {
        if (this.lastTarget !== null) {
            this.destroy();
        }
        this.lastTarget = target;
        this.proxy = this.getProxy(target);
        this.subscription = this.proxy.attach(target, completeAction, errorAction);
    }
    /**
     * Detaches from underlying subscription and destroys all internal objects.
     */
    public destroy(): void {
        if (this.proxy) {
            this.proxy.detach(this.subscription);
        }
        this.proxy = null;
        this.lastTarget = null;
        this.subscription = null;
    }
    /**
     * @see {@link SubscriptionProxy.detach}
     */
    public detach(): void {
        if (this.proxy) {
            this.proxy.detach(this.subscription);
        }
    }
    private getProxy(target: any): SubscriptionProxy {
        if (PromiseSubscriptionProxy.isAcceptable(target)) {
            return new PromiseSubscriptionProxy();
        }
        if (PushBasedSubscriptionProxy.isAcceptable(target)) {
            return new PushBasedSubscriptionProxy();
        }
        throw new Error('Passed object is not subscribable');
    }
}
