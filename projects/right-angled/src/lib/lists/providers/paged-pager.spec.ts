import { ListResponse } from '../../core/list-response';
import { RTPagedPager } from './paged-pager';
import { RTFiltersService } from '../../filters/filters.service';

// tslint:disable no-unused-expression max-file-line-count
function toResponseObject(): ListResponse<any> {
    return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        loadedCount: 20,
        totalCount: 100
    };
}

describe('PagedPager', () => {
    describe('ctor', () => {
        it('created with good state', () => {
            const pager = new RTPagedPager();
            expect(pager.totalCount).toEqual(0);
            expect(pager.loadedCount).toEqual(0);
            expect(pager.pageNumber).toEqual(1);
            expect(pager.pageSize).toEqual(pager.defaultPageSize);
            expect(pager.displayFrom).toEqual(0);
            expect(pager.displayTo).toEqual(0);
        });
    });

    describe('response processing', () => {
        it('process response values', () => {
            const pager = new RTPagedPager();
            const response = toResponseObject();
            pager.processResponse(response);

            expect(pager.totalCount).toEqual(response.totalCount);
            expect(pager.loadedCount).toEqual(response.loadedCount);
        });

        it('handles array of records as full response', () => {
            const pager = new RTPagedPager();
            const response = [1, 2, 3, 4, 5];
            pager.processResponse(response);

            expect(pager.totalCount).toEqual(response.length);
            expect(pager.loadedCount).toEqual(response.length);
        });

        it('process incorrect totalCount as 0', () => {
            const pager = new RTPagedPager();
            const response = toResponseObject();
            response.totalCount = null;
            pager.processResponse(response);
            expect(pager.totalCount).toEqual(0);
        });

        it('can calculate loadedCount from items array', () => {
            const pager = new RTPagedPager();
            const response = toResponseObject();
            response.loadedCount = null;
            response.totalCount = 20;
            pager.processResponse(response);
            expect(pager.loadedCount).toEqual(response.items.length);
        });
        it('sets loadedCount to 0 if it not specified in response and items array is empty', () => {
            const pager = new RTPagedPager();
            const response = toResponseObject();
            response.loadedCount = null;
            response.items.length = 0;
            pager.processResponse(response);
            expect(pager.loadedCount).toEqual(0);
        });
        it('calculates displayFrom and displayTo', () => {
            const pager = new RTPagedPager();
            const response = toResponseObject();
            response.loadedCount = 20;
            response.totalCount = 35;
            pager.processResponse(response);
            expect(pager.displayFrom).toEqual(1);
            expect(pager.displayTo).toEqual(20);

            pager.tryMoveToNextPage();
            response.loadedCount = 15;
            pager.processResponse(response);
            expect(pager.displayFrom).toEqual(21);
            expect(pager.displayTo).toEqual(35);
        });

        it('resets contract properties', () => {
            const pager = new RTPagedPager();
            const response = toResponseObject();
            pager.processResponse(response);
            pager.reset();
            expect(pager.totalCount).toEqual(0);
            expect(pager.pageNumber).toEqual(1);
            expect(pager.pageSize).toEqual(pager.defaultPageSize);
        });
    });
    describe('as filter target', () => {
        it('maps pageNumber to skip param on building request', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            let result = filtersService.getRequestState();
            expect(result.skip).toEqual(0);
            pager.totalCount = 100;
            pager.tryMoveToNextPage();
            result = filtersService.getRequestState();
            expect(result.skip).toEqual(pager.pageSize);
        });
        it('maps pageSize to take param on building request', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            const result = filtersService.getRequestState();
            expect(result.take).toEqual(pager.pageSize);
        });
        it('parse skip param to pageNumber', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            expect(pager.pageNumber).toEqual(1);
            const params = {
                skip: 50,
                take: 10
            };
            filtersService.applyParams(params);
            expect(pager.pageNumber).toEqual(6);
        });
        it('parse pageNumber as 1 if skip param is invalid', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            expect(pager.pageNumber).toEqual(1);
            const params: any = {
                skip: null,
                take: 10
            };
            filtersService.applyParams(params);
            expect(pager.pageNumber).toEqual(1);
            params.skip = {};
            filtersService.applyParams(params);
            expect(pager.pageNumber).toEqual(1);
        });
        it('doesn`t round pageNumber (if skip % take!=0 then 1)', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            expect(pager.pageNumber).toEqual(1);
            const params = {
                skip: 7,
                take: 10
            };
            filtersService.applyParams(params);
            expect(pager.pageNumber).toEqual(1);
        });
        it('parse pageSize as defaultPageSize if take param is invalid', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            expect(pager.pageNumber).toEqual(1);
            const params: any = {
                skip: 20,
                take: null
            };
            filtersService.applyParams(params);
            expect(pager.pageSize).toEqual(pager.defaultPageSize);
            params.take = {};
            filtersService.applyParams(params);
            expect(pager.pageSize).toEqual(pager.defaultPageSize);
        });
        it('parse pageSize from take param', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            expect(pager.pageNumber).toEqual(1);
            const params = {
                skip: 50,
                take: 10
            };
            filtersService.applyParams(params);
            expect(pager.pageSize).toEqual(params.take);
        });

        it('sets pageSize to defaultPageSize on reset', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            pager.pageSize = 40;
            expect(pager.pageSize).toEqual(40);
            filtersService.resetValues();
            expect(pager.pageSize).toEqual(pager.defaultPageSize);
        });

        it('can have own defaultPageSize', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            pager.defaultPageSize = 5;
            filtersService.resetValues();
            expect(pager.pageSize).toEqual(5);
            expect(RTPagedPager.settings.defaultPageSize).not.toEqual(pager.defaultPageSize);
        });

        it('skips validation on pageSize reset', () => {
            const pager = new RTPagedPager();
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(pager);

            pager.totalCount = 1;
            pager.pageSize = pager.defaultPageSize;
            expect(pager.pageSize).not.toEqual(pager.defaultPageSize);
            expect(pager.pageSize).toEqual(pager.totalCount);
            filtersService.resetValues();
            expect(pager.pageSize).toEqual(pager.defaultPageSize);
        });
    });
    describe('pager state', () => {
        describe('pageSize', () => {
            it('sets pageNumber to defaultPageSize on invalid', () => {
                const pager = new RTPagedPager();
                pager.pageSize = null;
                expect(pager.pageSize).toEqual(pager.defaultPageSize);
                pager.pageSize = undefined;
                expect(pager.pageSize).toEqual(pager.defaultPageSize);
                pager.pageSize = -20;
                expect(pager.pageSize).toEqual(pager.defaultPageSize);
            });
            it('sets pageSize to maxPageSize when try to set bigger value', () => {
                const pager = new RTPagedPager();
                pager.pageSize = RTPagedPager.settings.maxPageSize + 100;
                expect(pager.pageSize).toEqual(RTPagedPager.settings.maxPageSize);
            });

            it('can have own maxPageSize', () => {
                const pager = new RTPagedPager();
                pager.maxPageSize = RTPagedPager.settings.maxPageSize + 100;
                pager.pageSize = pager.maxPageSize + 100;
                expect(pager.pageSize).toEqual(pager.maxPageSize);
                expect(pager.maxPageSize).not.toEqual(RTPagedPager.settings.maxPageSize);
            });

            it('sets pageSize to defaultPageSize when try to set value less then minPageSize', () => {
                const pager = new RTPagedPager();
                pager.pageSize = RTPagedPager.settings.minPageSize - 1;
                expect(pager.pageSize).toEqual(pager.defaultPageSize);
            });

            it('can have own minPageSize', () => {
                const pager = new RTPagedPager();
                pager.minPageSize = RTPagedPager.settings.minPageSize + 10;
                pager.pageSize = pager.minPageSize - 10;
                expect(pager.pageSize).toEqual(pager.defaultPageSize);
                expect(pager.minPageSize).not.toEqual(RTPagedPager.settings.minPageSize);
            });

            it('sets pageSize to totalCount when try to set value greater then totalCount', () => {
                const response = toResponseObject();
                const pager = new RTPagedPager();
                pager.processResponse(response);
                pager.pageSize = response.totalCount + 1;
                expect(pager.pageSize).toEqual(response.totalCount);
            });

            it('sets pageSize to specified value when totalCount is not zero', () => {
                const response = toResponseObject();
                const pager = new RTPagedPager();
                pager.processResponse(response);
                pager.pageSize = response.totalCount - 1;
                expect(pager.pageSize).toEqual(response.totalCount - 1);
            });

            it('sets pageSize to maximum possible for current pageNumber', () => {
                const response = toResponseObject();
                const pager = new RTPagedPager();
                pager.processResponse(response);

                pager.pageNumber = response.totalCount / response.loadedCount;

                pager.pageSize = response.loadedCount + 1;
                expect(pager.pageSize).toEqual(response.loadedCount);
            });

            it('sets pageSize to maximum possible for current pageNumber and not bigger then maxPageSize', () => {
                const response = toResponseObject();
                const pager = new RTPagedPager();
                pager.processResponse(response);
                pager.maxPageSize = response.loadedCount / 2;
                pager.pageNumber = response.totalCount / response.loadedCount;
                pager.pageSize = response.loadedCount + 1;
                expect(pager.pageSize).toEqual(pager.maxPageSize);
            });
        });
        describe('Pages navigation', () => {
            describe('tryMoveToFirstPage', () => {
                it('Goes to first page', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);

                    pager.pageNumber = pager.pageCount;
                    expect(pager.pageNumber).toEqual(pager.pageCount);
                    const wasHandled = pager.tryMoveToFirstPage();
                    expect(pager.pageNumber).toEqual(1);
                    expect(wasHandled).toBe(true);
                });

                it('Doesn`t go to first page if it`s already first', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);

                    expect(pager.pageNumber).toEqual(1);
                    const wasHandled = pager.tryMoveToFirstPage();
                    expect(pager.pageNumber).toEqual(1);
                    expect(wasHandled).toBe(false);
                });
            });
            describe('tryMoveToPreviousPage', () => {
                it('Goes to previous page', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);

                    pager.pageNumber = pager.pageCount;
                    expect(pager.pageNumber).toEqual(pager.pageCount);
                    const wasHandled = pager.tryMoveToPreviousPage();
                    expect(pager.pageNumber).toEqual(pager.pageCount - 1);
                    expect(wasHandled).toBe(true);
                });

                it('Doesn`t go to previous page if it`s already first', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);

                    expect(pager.pageNumber).toEqual(1);
                    const wasHandled = pager.tryMoveToPreviousPage();
                    expect(pager.pageNumber).toEqual(1);
                    expect(wasHandled).toBe(false);
                });
            });
            describe('tryMoveToLastPage', () => {
                it('Goes to last page', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);
                    expect(pager.pageNumber).toEqual(1);

                    const wasHandled = pager.tryMoveToLastPage();

                    expect(pager.pageNumber).toEqual(pager.pageCount);
                    expect(wasHandled).toBe(true);
                });

                it('Doesn`t go to last page if it`s already last', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);
                    pager.pageNumber = pager.pageCount;
                    expect(pager.pageNumber).toEqual(pager.pageCount);

                    const wasHandled = pager.tryMoveToLastPage();
                    expect(pager.pageNumber).toEqual(pager.pageCount);
                    expect(wasHandled).toBe(false);
                });
            });
            describe('tryMoveToNextPage', () => {
                it('Goes to next page', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);
                    expect(pager.pageNumber).toEqual(1);

                    const wasHandled = pager.tryMoveToNextPage();

                    expect(pager.pageNumber).toEqual(1 + 1);
                    expect(wasHandled).toBe(true);
                });

                it('Doesn`t go to next page if it`s already last page', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);
                    pager.pageNumber = pager.pageCount;
                    expect(pager.pageNumber).toEqual(pager.pageCount);

                    const wasHandled = pager.tryMoveToNextPage();
                    expect(pager.pageNumber).toEqual(pager.pageCount);
                    expect(wasHandled).toBe(false);
                });
            });
            describe('canMoveBackward', () => {
                it('returns false if pageCount is 0', () => {
                    const pager = new RTPagedPager();
                    expect(pager.pageCount).toEqual(0);
                    expect(pager.canMoveBackward).toBe(false);
                });
                it('returns false if pager is on the first page', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);
                    expect(pager.pageNumber).toEqual(1);
                    expect(pager.canMoveBackward).toBe(false);
                });

                it('returns true if pager is not on the first page', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);
                    pager.pageNumber = 2;
                    expect(pager.canMoveBackward).toBe(true);
                });
            });
            describe('canMoveForward', () => {
                it('returns false if pageCount is 0', () => {
                    const pager = new RTPagedPager();
                    expect(pager.pageCount).toEqual(0);
                    expect(pager.canMoveForward).toBe(false);
                });
                it('returns false if pager is not on the last page', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);
                    pager.tryMoveToLastPage();
                    expect(pager.canMoveForward).toBe(false);
                });

                it('returns true if pager is not on the last page', () => {
                    const pager = new RTPagedPager();
                    const response = toResponseObject();
                    pager.processResponse(response);
                    expect(pager.canMoveForward).toBe(true);
                });
            });
        });
        describe('pageNumber', () => {
            it('sets pageNumber to 1 on invalid', () => {
                const pager = new RTPagedPager();
                pager.pageNumber = null;
                expect(pager.pageNumber).toEqual(1);
                pager.pageNumber = undefined;
                expect(pager.pageNumber).toEqual(1);
                pager.pageNumber = -20;
                expect(pager.pageNumber).toEqual(1);
            });

            it('sets pageNumber to 1 if invalid', () => {
                const pager = new RTPagedPager();
                pager.pageNumber = null;
                expect(pager.pageNumber).toEqual(1);
                pager.pageNumber = undefined;
                expect(pager.pageNumber).toEqual(1);
            });
            it('sets pageNumber no bigger then pageCount', () => {
                const pager = new RTPagedPager();
                const response = toResponseObject();
                pager.processResponse(response);
                pager.pageNumber = pager.pageCount;
                expect(pager.pageNumber).toEqual(pager.pageCount);
                pager.pageNumber = pager.pageCount + 10;
                expect(pager.pageNumber).toEqual(pager.pageCount);
            });
        });
        it('calculates pageCount as count/size', () => {
            const pager = new RTPagedPager();
            const response = toResponseObject();
            pager.processResponse(response);
            expect(pager.pageCount).toEqual(Math.ceil(pager.totalCount / pager.pageSize));
        });
    });
});
