// tslint:disable:no-unused-expression no-inferred-empty-object-type
import { Observable } from 'rxjs';
import * as sinon from 'sinon';
import { AsyncSubscriber } from './async-subscriber';

describe('AsyncSubscriber', () => {
    let clock: sinon.SinonFakeTimers;
    const delay = 100;
    const resolveValue = 5;
    const rejectValue = 5;
    let subscriber: AsyncSubscriber;
    let successSpy: sinon.SinonSpy = sinon.spy();
    let failureSpy: sinon.SinonSpy = sinon.spy();
    beforeEach(() => {
        successSpy = sinon.spy();
        failureSpy = sinon.spy();
        subscriber = new AsyncSubscriber();
        clock = sinon.useFakeTimers();
    });
    afterEach(() => {
        clock.restore();
    });
    // tslint:disable-next-line: quotemark
    it("destroys successfully even if there's no subscriptions created", () => {
        expect(() => {
            subscriber.destroy();
        }).not.toThrow();
    });
    describe('Promise', () => {
        it('handles resolve', (done: any) => {
            const promise = new Promise((resolve: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });

            subscriber.attach(promise, successSpy, failureSpy);
            clock.tick(delay);
            promise.then(() => {
                expect(successSpy.calledOnce).toBeTruthy();
                expect(successSpy.calledWith(resolveValue)).toBeTruthy();
                done();
            });
        });

        it('handles reject', (done: any) => {
            const promise = new Promise((resolve: any, reject: any) => {
                setTimeout(() => reject(rejectValue), delay);
            });

            subscriber.attach(promise, successSpy, failureSpy);
            clock.tick(delay);
            promise.catch(() => {
                expect(failureSpy.calledOnce).toBeTruthy();
                expect(failureSpy.calledWith(rejectValue)).toBeTruthy();
                done();
            });
        });

        it('handles detach and does not call resolve callback', (done: any) => {
            const promise = new Promise((resolve: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            const testFn = () => {
                expect(successSpy.notCalled).toBeTruthy();
                done();
            };
            promise.then(testFn, testFn);
        });

        it('handles detach and does not call reject callback', (done: any) => {
            const promise = new Promise((resolve: any, reject: any) => {
                setTimeout(() => reject(rejectValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            const testFn = () => {
                expect(failureSpy.notCalled).toBeTruthy();
                done();
            };
            promise.then(testFn, testFn);
        });

        it('handles destroy and does not call resolve or reject callbacks', (done: any) => {
            const promise = new Promise((resolve: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.destroy();
            clock.tick(delay);
            const testFn = () => {
                expect(successSpy.notCalled).toBeTruthy();
                expect(failureSpy.notCalled).toBeTruthy();
                done();
            };
            promise.then(testFn, testFn);
        });
        it('resets previous subscription on new subscribe', () => {
            const promise = new Promise((resolve: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            const anotherPromise = new Promise((resolve: any) => {
                setTimeout(() => resolve(resolveValue), delay);
            });
            subscriber.attach(promise, successSpy, failureSpy);
            subscriber.attach(anotherPromise, sinon.spy(), sinon.spy());
            clock.tick(delay);
            expect(successSpy.notCalled).toBeTruthy();
        });
    });
    describe('Observable', () => {
        it('handles resolve', () => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.next(resolveValue);
                    observer.complete();
                }, delay);
            });
            subscriber.attach(observable, successSpy, failureSpy);
            clock.tick(delay);
            expect(successSpy.calledOnce).toBeTruthy();
            expect(successSpy.calledWith(resolveValue)).toBeTruthy();
        });
        it('handles reject', (done: any) => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.error(rejectValue);
                    observer.complete();
                }, delay);
            });

            subscriber.attach(observable, successSpy, failureSpy);
            clock.tick(delay);
            expect(failureSpy.calledOnce).toBeTruthy();
            expect(failureSpy.calledWith(rejectValue)).toBeTruthy();
            done();
        });

        it('handles detach and does not call resolve callbacks', (done: any) => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.next(resolveValue);
                    observer.complete();
                }, delay);
            });

            subscriber.attach(observable, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            expect(successSpy.notCalled).toBeTruthy();
            done();
        });

        it('handles detach and does not call reject callbacks', (done: any) => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.error(rejectValue);
                    observer.complete();
                }, delay);
            });

            subscriber.attach(observable, successSpy, failureSpy);
            subscriber.detach();
            clock.tick(delay);
            expect(failureSpy.notCalled).toBeTruthy();
            done();
        });

        it('handles destroy and does not call resolve or reject callbacks', (done: any) => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.error(rejectValue);
                    observer.complete();
                }, delay);
            });

            subscriber.attach(observable, successSpy, failureSpy);
            subscriber.destroy();
            clock.tick(delay);
            expect(successSpy.notCalled).toBeTruthy();
            expect(failureSpy.notCalled).toBeTruthy();
            done();
        });
        it('resets previous subscription on new subscribe', () => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.next(resolveValue);
                    observer.complete();
                }, delay);
            });
            const anotherObservable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.next(resolveValue);
                    observer.complete();
                }, delay);
            });
            subscriber.attach(observable, successSpy, failureSpy);
            subscriber.attach(anotherObservable, sinon.spy(), sinon.spy());
            clock.tick(delay);
            expect(successSpy.notCalled).toBeTruthy();
        });
    });
    describe('Other', () => {
        it('throws error', () => {
            const target = {};
            expect(() => {
                subscriber.attach(target, successSpy, failureSpy);
            }).toThrow();
        });
    });
});
