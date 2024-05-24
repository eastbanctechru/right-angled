// tslint:disable:max-classes-per-file no-unused-expression max-file-line-count
import { from, Observable, BehaviorSubject } from 'rxjs';
import * as sinon from 'sinon';
import { RTStateService } from './state.service';
import { AsyncSubscriber } from './async-subscriber';
import { RTSortingsService } from './sortings.service';
import { RTFiltersService } from '../../filters/filters.service';
import { RTList } from './list';
import { NullObjectPager } from './null-object-pager';
import { RTPagedPager } from './paged-pager';
import { OperationStatus } from '../../core/operation-status';

class FirstStubStateService implements RTStateService {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public persistState(_filtersService: RTFiltersService): void {
        return;
    }
    public getState(): any {
        return;
    }
}
class SecondStubStateService implements RTStateService {
    public persistState(): void {
        return;
    }
    public getState(): any {
        return;
    }
}

describe('List', () => {
    let clock: sinon.SinonFakeTimers;
    const delay = 100;
    let list: RTList;
    let firstStubStateService: FirstStubStateService;
    let secondStubStateService: SecondStubStateService;
    let filtersService: RTFiltersService;
    let sortingsService: RTSortingsService;
    let asyncSubscriber: AsyncSubscriber;
    beforeEach(() => {
        clock = sinon.useFakeTimers();
        firstStubStateService = new FirstStubStateService();
        secondStubStateService = new SecondStubStateService();
        filtersService = new RTFiltersService();
        sortingsService = new RTSortingsService();
        asyncSubscriber = new AsyncSubscriber();
        list = new RTList(asyncSubscriber, null, null, sortingsService, filtersService);
        list.fetchMethod = () =>
            new Observable((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
    });
    afterEach(() => {
        clock.restore();
        list.destroy();
    });

    describe('ctor', () => {
        it('sets stateServices array with passed service', () => {
            list = new RTList(asyncSubscriber, null, null, sortingsService, filtersService);
            expect(list.stateServices.length).toEqual(0);
            list = new RTList(asyncSubscriber, firstStubStateService, null, sortingsService, filtersService);
            expect(list.stateServices).toEqual([firstStubStateService]);
            list = new RTList(asyncSubscriber, [firstStubStateService, secondStubStateService] as any, null, sortingsService, filtersService);
            expect(list.stateServices).toEqual([firstStubStateService, secondStubStateService]);
        });
        it('inits pager as NullObjectPager', () => {
            expect(list.pager instanceof NullObjectPager).toBe(true);
        });
    });
    describe('pager', () => {
        it('pager setter unregister old service and registers new as filter', () => {
            const oldPager = list.pager;
            const newPager = new RTPagedPager();
            spyOn(filtersService, 'removeFilterTarget');
            spyOn(filtersService, 'registerFilterTarget');
            list.pager = newPager;
            expect(filtersService.removeFilterTarget).toHaveBeenCalledTimes(1);
            expect(filtersService.removeFilterTarget).toHaveBeenCalledWith(oldPager);
            expect(filtersService.registerFilterTarget).toHaveBeenCalledTimes(1);
            expect(filtersService.registerFilterTarget).toHaveBeenCalledWith(newPager);
        });
    });
    describe('filters', () => {
        it('resetSettings is a proxy to FiltersService.resetValues method', () => {
            const spy = sinon.spy(filtersService, 'resetValues');
            list.resetSettings();
            expect(spy.calledOnce).toBe(true);
        });
        it('registerFilterTarget is a proxy to FiltersService.registerFilterTarget method', () => {
            const spy = sinon.spy(filtersService, 'registerFilterTarget');
            list.registerFilterTarget({}, {}, {});
            expect(spy.calledOnce).toBe(true);
        });
        it('removeFilterTarget is a proxy to FiltersService.removeFilterTarget method', () => {
            const spy = sinon.spy(filtersService, 'removeFilterTarget');
            list.removeFilterTarget({}, {}, {});
            expect(spy.calledOnce).toBe(true);
        });
        it('getRequestState is a proxy to FiltersService.getRequestState method', () => {
            const spy = sinon.spy(filtersService, 'getRequestState');
            list.getRequestState();
            expect(spy.calledOnce).toBe(true);
        });
    });
    describe('status', () => {
        it('List.busy is true only when status is equal to OperationStatus.Progress', () => {
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Initial);
            expect(list.busy).toBe(false);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Cancelled);
            expect(list.busy).toBe(false);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Done);
            expect(list.busy).toBe(false);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Fail);
            expect(list.busy).toBe(false);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.NoData);
            expect(list.busy).toBe(false);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Progress);
            expect(list.busy).toBe(true);
        });
        it('List.busy is true when status is not equal to OperationStatus.Progress', () => {
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Initial);
            expect(list.ready).toBe(true);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Cancelled);
            expect(list.ready).toBe(true);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Done);
            expect(list.ready).toBe(true);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Fail);
            expect(list.ready).toBe(true);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.NoData);
            expect(list.ready).toBe(true);
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Progress);
            expect(list.ready).toBe(false);
        });
    });
    describe('state services', () => {
        it('adds state services to stateServices collection on registerStateService call', () => {
            expect(list.stateServices).toEqual([]);
            list.registerStateService(firstStubStateService, secondStubStateService);
            expect(list.stateServices).toEqual([firstStubStateService, secondStubStateService]);
        });
        it('removes state service from stateServices collection on removeStateService call', () => {
            list.registerStateService(firstStubStateService, secondStubStateService);
            expect(list.stateServices).toEqual([firstStubStateService, secondStubStateService]);
            list.removeStateService(firstStubStateService);
            expect(list.stateServices).toEqual([secondStubStateService]);
        });
        it('doesn`t throw if not registered service unregistered', () => {
            list.registerStateService(firstStubStateService);
            expect(() => {
                list.removeStateService(secondStubStateService);
            }).not.toThrow();
        });
    });
    describe('cancelRequests', () => {
        it('sets list status to Cancelled', () => {
            list.init();
            list.loadData();
            list.cancelRequests();
            expect(list.status).toEqual(OperationStatus.Cancelled);
        });
        it('sets list status to Cancelled only if list is busy', () => {
            list.init();
            list.cancelRequests();
            expect(list.status).not.toEqual(OperationStatus.Cancelled);
        });
        it('calls AsyncSubscriber.detach', () => {
            spyOn(asyncSubscriber, 'detach');
            list.init();
            list.loadData();
            expect(asyncSubscriber.detach).not.toHaveBeenCalled();
            list.cancelRequests();
            expect(asyncSubscriber.detach).toHaveBeenCalled();
        });
        it('calls AsyncSubscriber.detach only if list is busy', () => {
            spyOn(asyncSubscriber, 'detach');
            list.init();
            expect(asyncSubscriber.detach).not.toHaveBeenCalled();
            list.cancelRequests();
            expect(asyncSubscriber.detach).not.toHaveBeenCalled();
        });
        it('destroys items even if they was keeped on load', () => {
            list.init();
            list.keepRecordsOnLoad = true;
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.loadData();
            expect(list.items).toEqual([1, 2, 3, 4, 5]);
            list.cancelRequests();
            expect(list.items).toEqual([]);
        });
    });
    describe('reloadData', () => {
        it('sets list status to Progress', () => {
            list.init();
            expect(list.status).not.toEqual(OperationStatus.Progress);
            list.reloadData();
            expect(list.status).toEqual(OperationStatus.Progress);
        });
        it('calls specified fetchMethod with FiltersService.getRequestState value as parameter', () => {
            const fetchSpy = sinon.spy(list, 'fetchMethod');
            list.init();
            list.reloadData();
            expect(fetchSpy.calledOnce).toBe(true);
            expect(fetchSpy.args[0][0]).toEqual(filtersService.getRequestState());
        });
        it('doesn`t destroy items array if `keepRecordsOnLoad` setted to `true`', () => {
            list.init();
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.keepRecordsOnLoad = true;
            list.reloadData();
            expect(list.items).toEqual([1, 2, 3, 4, 5]);
        });
        it('destroys items array if `keepRecordsOnLoad` setted to `false`', () => {
            list.init();
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.keepRecordsOnLoad = false;
            list.reloadData();
            expect(list.items).toEqual([]);
        });

        it('calls attach method of asyncSubscriber to listen observable', () => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            const attachSpy = sinon.spy(asyncSubscriber, 'attach');
            list.init();
            list.reloadData();
            expect(attachSpy.calledOnce).toBe(true);
            expect(attachSpy.calledWith(observable, (list as any).reloadDataSuccessCallback, (list as any).reloadDataFailCallback)).toBe(true);
        });
        it('returns without request if list status is equal to OperationStatus.Progress', () => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            spyOn(asyncSubscriber, 'attach');
            list.init();
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Progress);
            list.reloadData();
            expect(asyncSubscriber.attach).not.toHaveBeenCalled();
        });
        it('calls registered state service persistState method', () => {
            spyOn(firstStubStateService, 'persistState');
            list.registerStateService(firstStubStateService);
            expect(firstStubStateService.persistState).not.toHaveBeenCalled();
            list.init();
            expect(firstStubStateService.persistState).not.toHaveBeenCalled();
            list.loadData();
            expect(firstStubStateService.persistState).toHaveBeenCalledTimes(1);
            expect(firstStubStateService.persistState).toHaveBeenCalledWith(filtersService);
            clock.tick(delay);
            list.reloadData();
            expect(firstStubStateService.persistState).toHaveBeenCalledTimes(2);
        });
        it('clears data on error if `keepRecordsOnLoad` is `true` and `pager.appendedOnLoad` is `false`', () => {
            list.init();
            list.fetchMethod = () =>
                new Observable((observer: any) => {
                    setTimeout(() => {
                        observer.error();
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.reloadData();
            expect(list.items).toEqual([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).toEqual([]);
        });
        it('clears data on success if `keepRecordsOnLoad` is `true` and `pager.appendedOnLoad` is `false`', () => {
            list.init();
            list.fetchMethod = () =>
                new Observable((observer: any) => {
                    setTimeout(() => {
                        observer.next([6, 7, 8]);
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.reloadData();
            expect(list.items).toEqual([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).toEqual([6, 7, 8]);
        });

        it('resets pager state before performing request', () => {
            const spy = sinon.spy(() => from([]));
            list.fetchMethod = spy;
            const pager = new RTPagedPager();
            list.pager = pager;

            list.init();

            pager.appendedOnLoad = false;
            pager.pageSize = pager.defaultPageSize / 2;
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            expect(pager.pageSize).toEqual(pager.defaultPageSize / 2);
            list.reloadData();
            expect(pager.pageSize).toEqual(pager.defaultPageSize);
            expect(spy.calledOnce).toBe(true);
            expect(spy.calledWith({ skip: 0, take: pager.defaultPageSize, sortings: [] })).toBe(true);
        });
    });
    describe('init', () => {
        it('sets inited flag to true', () => {
            expect(list.inited).toBe(false);
            list.init();
            expect(list.inited).toBe(true);
        });
        it('returns if already inited', () => {
            spyOn(filtersService, 'registerFilterTarget');
            (list.inited$ as BehaviorSubject<boolean>).next(true);
            list.init();
            expect(filtersService.registerFilterTarget).not.toHaveBeenCalled();
        });
        it('registers sortings and paging services as filter targets', () => {
            spyOn(filtersService, 'registerFilterTarget');
            list.init();
            expect(filtersService.registerFilterTarget).toHaveBeenCalledWith(list.pager, sortingsService);
        });
        it('calls registered state service getState method on init', () => {
            spyOn(firstStubStateService, 'getState');
            list.registerStateService(firstStubStateService);
            expect(firstStubStateService.getState).not.toHaveBeenCalled();
            list.init();
            expect(firstStubStateService.getState).toHaveBeenCalled();
        });
    });
    describe('destroy', () => {
        it('calls underlying services destroy methods and own clearData method', () => {
            list.init();
            const subscriberSpy = sinon.spy(asyncSubscriber, 'destroy');
            const filtersSpy = sinon.spy(filtersService, 'destroy');
            const sortingsSpy = sinon.spy(sortingsService, 'destroy');
            const clearSpy = sinon.spy(list, 'clearData');
            list.destroy();
            expect(subscriberSpy.calledOnce).toBe(true);
            expect(filtersSpy.calledOnce).toBe(true);
            expect(sortingsSpy.calledOnce).toBe(true);
            expect(clearSpy.calledOnce).toBe(true);
        });
        it('sets destroyed flag to true', () => {
            list.init();
            expect(list.destroyed).toBe(false);
            list.destroy();
            expect(list.destroyed).toBe(true);
        });
    });
    describe('loadData', () => {
        it('sets list status to Progress', () => {
            list.init();
            expect(list.status).not.toEqual(OperationStatus.Progress);
            list.loadData();
            expect(list.status).toEqual(OperationStatus.Progress);
        });
        it('calls specified fetchMethod with FiltersService.getRequestState value as parameter', () => {
            const fetchSpy = sinon.spy(list, 'fetchMethod');
            list.init();
            list.loadData();
            expect(fetchSpy.calledOnce).toBe(true);
            expect(fetchSpy.args[0][0]).toEqual(filtersService.getRequestState());
        });
        it('doesn`t destroy items array if Pager.appendedOnLoad is true', () => {
            list.init();
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.pager.appendedOnLoad = true;
            list.loadData();
            expect(list.items).toEqual([1, 2, 3, 4, 5]);
        });
        it('destroys items array if Pager.appendedOnLoad is false', () => {
            list.init();
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.pager.appendedOnLoad = false;
            list.loadData();
            expect(list.items).toEqual([]);
        });
        it('doesn`t destroy items array if `keepRecordsOnLoad` setted to `true`', () => {
            list.init();
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            list.loadData();
            expect(list.items).toEqual([1, 2, 3, 4, 5]);
        });
        it('destroys items array if `keepRecordsOnLoad` setted to `false`', () => {
            list.init();
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = false;
            list.loadData();
            expect(list.items).toEqual([]);
        });
        it('calls destroy methods of items elements if it exists', () => {
            list.init();
            const item1 = { destroy: sinon.spy() };
            const item2 = { destroy: sinon.spy() };
            (list.items$ as BehaviorSubject<any[]>).next([item1, item2]);

            list.loadData();
            clock.tick(delay);
            expect(item1.destroy.calledOnce).toBe(true);
            expect(item2.destroy.calledOnce).toBe(true);
        });
        it('calls attach method of asyncSubscriber to listen observable', () => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            const attachSpy = sinon.spy(asyncSubscriber, 'attach');
            list.init();
            list.loadData();
            expect(attachSpy.calledOnce).toBe(true);
            expect(attachSpy.calledWith(observable, (list as any).loadDataSuccessCallback, (list as any).loadDataFailCallback)).toBe(true);
        });
        it('returns without request if list status is equal to OperationStatus.Progress', () => {
            const observable = new Observable((observer: any) => {
                setTimeout(() => {
                    observer.next([]);
                }, delay);
            });
            list.fetchMethod = () => observable;
            spyOn(asyncSubscriber, 'attach');
            list.init();
            (list.status$ as BehaviorSubject<OperationStatus>).next(OperationStatus.Progress);
            list.loadData();
            expect(asyncSubscriber.attach).not.toHaveBeenCalled();
        });
        it('calls registered state service persistState method', () => {
            spyOn(firstStubStateService, 'persistState');
            list.registerStateService(firstStubStateService);
            expect(firstStubStateService.persistState).not.toHaveBeenCalled();
            list.init();
            expect(firstStubStateService.persistState).not.toHaveBeenCalled();
            list.loadData();
            expect(firstStubStateService.persistState).toHaveBeenCalledTimes(1);
            expect(firstStubStateService.persistState).toHaveBeenCalledWith(filtersService);
            clock.tick(delay);
            list.loadData();
            expect(firstStubStateService.persistState).toHaveBeenCalledTimes(2);
        });
        it('clears data on error if `keepRecordsOnLoad` is `true` and `pager.appendedOnLoad` is `false`', () => {
            list.init();
            list.fetchMethod = () =>
                new Observable((observer: any) => {
                    setTimeout(() => {
                        observer.error();
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.loadData();
            expect(list.items).toEqual([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).toEqual([]);
        });
        it('clears data on success if `keepRecordsOnLoad` is `true` and `pager.appendedOnLoad` is `false`', () => {
            list.init();
            list.fetchMethod = () =>
                new Observable((observer: any) => {
                    setTimeout(() => {
                        observer.next([6, 7, 8]);
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.loadData();
            expect(list.items).toEqual([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).toEqual([6, 7, 8]);
        });

        it('Can handle stream of values', () => {
            list.init();
            list.fetchMethod = () =>
                new Observable((observer: any) => {
                    setTimeout(() => {
                        observer.next([6, 7, 8]);
                        setTimeout(() => {
                            observer.next([9, 10, 11]);
                        }, delay);
                    }, delay);
                });
            list.pager.appendedOnLoad = false;
            list.keepRecordsOnLoad = true;
            (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3, 4, 5]);
            list.loadData();
            expect(list.items).toEqual([1, 2, 3, 4, 5]);
            clock.tick(delay);
            expect(list.items).toEqual([6, 7, 8]);
            clock.tick(delay);
            expect(list.items).toEqual([9, 10, 11]);
        });
    });
    describe('Response interception', () => {
        it('Intercepts Cancellation response with call of `cancelRequests`', () => {
            list.init();
            const cancelRequestsSpy = sinon.spy(list, 'cancelRequests');
            list.fetchMethod = () =>
                new Observable((observer: any) => {
                    setTimeout(() => {
                        observer.next({
                            items: [],
                            status: OperationStatus.Cancelled,
                            totalCount: 0,
                        });
                    }, delay);
                });
            list.loadData();
            clock.tick(delay);
            expect(cancelRequestsSpy.calledOnce).toEqual(true);
            list.reloadData();
            clock.tick(delay);
            expect(cancelRequestsSpy.calledTwice).toEqual(true);
        });
        it('Intercepts Fail response with call of `reloadDataFailCallback`', () => {
            list.init();
            const failCallbackSpy = sinon.spy(list as any, 'reloadDataFailCallback');
            list.fetchMethod = () =>
                new Observable((observer: any) => {
                    setTimeout(() => {
                        observer.next({
                            items: [],
                            status: OperationStatus.Fail,
                            totalCount: 0,
                        });
                    }, delay);
                });
            list.loadData();
            clock.tick(delay);
            expect(failCallbackSpy.calledOnce).toEqual(true);
            list.reloadData();
            clock.tick(delay);
            expect(failCallbackSpy.calledTwice).toEqual(true);
        });
        it('Intercepts Progress response but do nothing until loading completed', () => {
            list.init();
            const interceptSpy = sinon.spy(list as any, 'tryInterceptStatusResponse');
            list.fetchMethod = () =>
                new Observable((observer: any) => {
                    setTimeout(() => {
                        observer.next({
                            items: [],
                            status: OperationStatus.Progress,
                            totalCount: 0,
                        });
                        setTimeout(() => {
                            observer.next([1, 2, 3]);
                        }, delay);
                    }, delay);
                });
            list.loadData();
            expect(list.items).toEqual([]);
            clock.tick(delay);
            expect(interceptSpy.calledOnce).toEqual(true);
            expect(interceptSpy.returnValues[0]).toEqual(true);
            expect(list.status).toEqual(OperationStatus.Progress);
            expect(list.items).toEqual([]);
            interceptSpy.resetHistory();

            clock.tick(delay);
            expect(interceptSpy.calledOnce).toEqual(true);
            expect(interceptSpy.returnValues[0]).toEqual(false);
            expect(list.status).toEqual(OperationStatus.Done);
            expect(list.items).toEqual([1, 2, 3]);

            interceptSpy.resetHistory();

            list.reloadData();
            expect(list.items).toEqual([]);
            clock.tick(delay);
            expect(interceptSpy.calledOnce).toEqual(true);
            expect(interceptSpy.returnValues[0]).toEqual(true);
            expect(list.status).toEqual(OperationStatus.Progress);
            expect(list.items).toEqual([]);
            interceptSpy.resetHistory();

            clock.tick(delay);
            expect(interceptSpy.calledOnce).toEqual(true);
            expect(interceptSpy.returnValues[0]).toEqual(false);
            expect(list.status).toEqual(OperationStatus.Done);
            expect(list.items).toEqual([1, 2, 3]);
        });
    });

    describe('loadData callbacks', () => {
        describe('loadFailCallback', () => {
            it('sets status to failed', () => {
                list.init();
                list.fetchMethod = () =>
                    new Observable((observer: any) => {
                        setTimeout(() => {
                            observer.error();
                        }, delay);
                    });
                list.loadData();
                clock.tick(delay);
                expect(list.status).toEqual(OperationStatus.Fail);
            });
        });
        describe('loadSuccessCallback', () => {
            it('sets status to NoData if async returns empty array', () => {
                list.init();
                list.fetchMethod = () =>
                    new Observable((observer: any) => {
                        setTimeout(() => {
                            observer.next([]);
                        }, delay);
                    });
                list.loadData();
                clock.tick(delay);
                expect(list.status).toEqual(OperationStatus.NoData);
            });
            it('sets status to Done data returned', () => {
                list.init();
                list.fetchMethod = () =>
                    new Observable((observer: any) => {
                        setTimeout(() => {
                            observer.next([1]);
                        }, delay);
                    });
                list.loadData();
                clock.tick(delay);
                expect(list.status).toEqual(OperationStatus.Done);
            });
            it('calls Pager.reset and List.clearData if empty complex response returned', () => {
                list.init();
                const response = {
                    items: [1],
                    totalCount: 1,
                };
                list.pager.appendedOnLoad = true;
                list.fetchMethod = () =>
                    new Observable((observer: any) => {
                        setTimeout(() => {
                            observer.next(response);
                        }, delay);
                    });

                spyOn(list.pager, 'reset');
                spyOn(list, 'clearData');
                list.loadData();
                clock.tick(delay);
                expect(list.pager.reset).not.toHaveBeenCalled();
                expect(list.clearData).not.toHaveBeenCalled();

                response.items.length = 0;
                response.totalCount = 0;
                list.loadData();
                clock.tick(delay);
                expect(list.pager.reset).toHaveBeenCalled();
                expect(list.clearData).toHaveBeenCalled();
            });
            it('doesn`t call Pager.reset and List.clearData if empty flat array returned', () => {
                list.init();
                const data = [1];
                list.pager.appendedOnLoad = true;
                list.fetchMethod = () =>
                    new Observable((observer: any) => {
                        setTimeout(() => {
                            observer.next(data);
                        }, delay);
                    });

                list.loadData();
                spyOn(list.pager, 'reset');
                spyOn(list, 'clearData');
                clock.tick(delay);
                expect(list.pager.reset).not.toHaveBeenCalled();
                expect(list.clearData).not.toHaveBeenCalled();
                data.length = 0;
                list.loadData();
                clock.tick(delay);
                expect(list.pager.reset).not.toHaveBeenCalled();
                expect(list.clearData).not.toHaveBeenCalled();
            });
            it('calls pager.processResponse with returned response object', () => {
                list.init();
                spyOn(list.pager, 'processResponse');
                const response = {
                    items: [1, 2, 3, 4, 5],
                    loadedCount: 5,
                    totalCount: 10,
                };
                list.fetchMethod = () =>
                    new Observable((observer: any) => {
                        setTimeout(() => {
                            observer.next(response);
                        }, delay);
                    });
                list.loadData();

                expect(list.pager.processResponse).not.toHaveBeenCalled();
                clock.tick(delay);
                expect(list.pager.processResponse).toHaveBeenCalledTimes(1);
                expect(list.pager.processResponse).toHaveBeenCalledWith(response);
            });
            it('calls pager.processResponse with array of records if simple array was returned as response', () => {
                list.init();
                spyOn(list.pager, 'processResponse');
                const response = [1, 2, 3, 4, 5];
                list.fetchMethod = () =>
                    new Observable((observer: any) => {
                        setTimeout(() => {
                            observer.next(response);
                        }, delay);
                    });
                list.loadData();

                expect(list.pager.processResponse).not.toHaveBeenCalled();
                clock.tick(delay);
                expect(list.pager.processResponse).toHaveBeenCalledTimes(1);
                expect(list.pager.processResponse).toHaveBeenCalledWith(response);
            });
            it('concats items array with loaded data', () => {
                list.init();
                list.pager.appendedOnLoad = true;
                (list.items$ as BehaviorSubject<any[]>).next([1, 2, 3]);
                list.fetchMethod = () =>
                    new Observable((observer: any) => {
                        setTimeout(() => {
                            observer.next([4, 5]);
                        }, delay);
                    });
                list.loadData();
                clock.tick(delay);
                expect(list.items).toEqual([1, 2, 3, 4, 5]);
            });
            it('doesn`t destroy items array if `appendStreamedData` setted to `true`', () => {
                const dataStream = new BehaviorSubject<number[]>([]);
                list.appendStreamedData = true;
                list.init();
                list.fetchMethod = () => dataStream;

                list.loadData();
                dataStream.next([1, 2, 3, 4, 5]);
                dataStream.next([6, 7, 8, 9, 10]);
                expect(list.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
            });
            it('destroys items array if `appendStreamedData` setted to `false`', () => {
                const dataStream = new BehaviorSubject<number[]>([]);
                list.appendStreamedData = false;
                list.init();
                list.fetchMethod = () => dataStream;

                list.loadData();
                dataStream.next([1, 2, 3, 4, 5]);
                dataStream.next([6, 7, 8, 9, 10]);
                expect(list.items).toEqual([6, 7, 8, 9, 10]);
            });
        });
    });
});
