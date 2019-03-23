import { RTSortingsService } from './sortings.service';
import { SortDirection, SortParameter } from '../../core/sort-parameter';
import { RTFiltersService } from '../../filters/filters.service';

// tslint:disable:max-classes-per-file no-unused-expression
class SortableObject {
    public sortingsService: RTSortingsService = null;
    constructor() {
        this.sortingsService = new RTSortingsService();
    }
}

class ObjectWithDefaultSortings implements SortableObject {
    public sortingsService: RTSortingsService = null;
    constructor() {
        this.sortingsService = new RTSortingsService();
        this.sortingsService.defaultSortings = [{ direction: SortDirection.Asc, fieldName: 'id' }];
    }
}

function toTarget(): SortableObject {
    return new SortableObject();
}

function toTargetWithDefault(): SortableObject {
    return new ObjectWithDefaultSortings();
}

const savePrevious = true;
const doNotSavePrevious = false;

describe('SortingsService', () => {
    describe('work with sortings', () => {
        it('has empty default sortings by default', () => {
            const target = toTarget();
            const { sortingsService } = target;
            expect(sortingsService.defaultSortings.length).toEqual(0);
        });

        it('can have default sorting', () => {
            const target = toTargetWithDefault();
            const { sortingsService } = target;
            expect(sortingsService.defaultSortings).toEqual([{ direction: SortDirection.Asc, fieldName: 'id' }]);
            sortingsService.setSort('id', doNotSavePrevious);

            expect(sortingsService.sortings[0].fieldName).toEqual('id');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Desc);
        });
        it('can add sorting', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.setSort('id', doNotSavePrevious);
            expect(sortingsService.sortings[0].fieldName).toEqual('id');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Asc);
        });
        it('can remove sorting', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.setSort('id', doNotSavePrevious);
            expect(sortingsService.sortings[0].fieldName).toEqual('id');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Asc);
            sortingsService.removeSort('id');
            expect(sortingsService.sortings.length).toEqual(0);
        });
        it('can remove all sortings', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.setSort('id', doNotSavePrevious);
            sortingsService.setSort('тфьу', savePrevious);
            expect(sortingsService.sortings.length).toEqual(2);
            sortingsService.removeAllSortings();
            expect(sortingsService.sortings.length).toEqual(0);
        });
        it('doesn`t throw if try to remove unexisted sort', () => {
            const target = toTarget();
            const { sortingsService } = target;
            expect(sortingsService.sortings.length).toEqual(0);
            sortingsService.removeSort('id');
            expect(sortingsService.sortings.length).toEqual(0);
        });

        it('change empty sortings to setted default sortings', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.defaultSortings = [
                {
                    direction: SortDirection.Desc,
                    fieldName: 'name'
                } as SortParameter
            ];

            expect(sortingsService.sortings.length).toEqual(1);
            expect(sortingsService.sortings[0].fieldName).toEqual('name');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Desc);
        });

        it('doesn`t change provided sorting after default sortings setted', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.setSort('id', doNotSavePrevious);

            sortingsService.defaultSortings = [
                {
                    direction: SortDirection.Asc,
                    fieldName: 'name'
                } as SortParameter
            ];

            expect(sortingsService.sortings.length).toEqual(1);
            expect(sortingsService.sortings[0].fieldName).toEqual('id');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Asc);
        });

        it('set default sortings to empty array instead of null', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.defaultSortings = null;
            expect(sortingsService.defaultSortings.length).toEqual(0);
        });
        it('deeply clone default sortings to sortings', () => {
            const target = toTargetWithDefault();
            const { sortingsService } = target;

            expect(sortingsService.defaultSortings).not.toBe(sortingsService.sortings);
            expect(sortingsService.defaultSortings).toEqual(sortingsService.sortings);

            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(sortingsService);

            sortingsService.setSort('name', doNotSavePrevious);
            filtersService.resetValues();

            expect(sortingsService.defaultSortings).not.toBe(sortingsService.sortings);
            expect(sortingsService.defaultSortings).toEqual(sortingsService.sortings);
        });
        it('can serialize sortings', () => {
            const target = toTargetWithDefault();
            const { sortingsService } = target;
            sortingsService.setSort('field', false);
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(sortingsService);

            const serviceState = filtersService.getRequestState();
            expect(serviceState).toEqual({
                sortings: [{ direction: SortDirection.Asc, fieldName: 'field' }]
            });
        });
        it('can save previous sorting', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.setSort('id', doNotSavePrevious);
            sortingsService.setSort('name', savePrevious);
            expect(sortingsService.sortings.length).toEqual(2);
            expect(sortingsService.sortings[0].fieldName).toEqual('id');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Asc);
            expect(sortingsService.sortings[1].fieldName).toEqual('name');
            expect(sortingsService.sortings[1].direction).toEqual(SortDirection.Asc);
        });

        it('can reset previous sorting', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.setSort('id', savePrevious);
            sortingsService.setSort('name', doNotSavePrevious);
            expect(sortingsService.sortings.length).toEqual(1);
            expect(sortingsService.sortings[0].fieldName).toEqual('name');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Asc);
        });

        it('repeated set sort toggles sort direction', () => {
            const target = toTarget();
            const { sortingsService } = target;

            sortingsService.setSort('id', savePrevious);
            expect(sortingsService.sortings[0].fieldName).toEqual('id');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Asc);

            sortingsService.setSort('id', savePrevious);
            expect(sortingsService.sortings[0].fieldName).toEqual('id');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Desc);

            sortingsService.setSort('id', savePrevious);
            expect(sortingsService.sortings[0].fieldName).toEqual('id');
            expect(sortingsService.sortings[0].direction).toEqual(SortDirection.Asc);
        });

        it('push newly added sort to the end of sortings array', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.setSort('id', savePrevious);
            sortingsService.setSort('name', savePrevious);
            expect(sortingsService.sortings.length).toEqual(2);
            expect(sortingsService.sortings[1].fieldName).toEqual('name');
        });
        it('push toggled sort to the end of sortings array', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.setSort('id', savePrevious);
            sortingsService.setSort('name', savePrevious);
            sortingsService.setSort('id', savePrevious);
            expect(sortingsService.sortings.length).toEqual(2);
            expect(sortingsService.sortings[1].fieldName).toEqual('id');
        });
    });
    describe('on destroy', () => {
        it('set sortings to empty array on destroy', () => {
            const target = toTarget();
            const { sortingsService } = target;
            sortingsService.setSort('id', savePrevious);
            sortingsService.setSort('name', savePrevious);
            sortingsService.destroy();
            expect(sortingsService.sortings.length).toEqual(0);
        });

        it('set defaultSortings to empty array on destroy', () => {
            const target = toTargetWithDefault();
            const { sortingsService } = target;
            sortingsService.destroy();
            expect(sortingsService.defaultSortings.length).toEqual(0);
        });
    });

    describe('as filter target', () => {
        it('parse invalid params object as empty array', () => {
            const target = toTarget();
            const { sortingsService } = target;
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(sortingsService);

            const params = {
                sortings: { direction: SortDirection.Desc, fieldName: 'id' }
            };
            filtersService.applyParams(params);
            expect(sortingsService.sortings.length).toBe(0);
        });
        it('parse params object to correct sortings array', () => {
            const target = toTarget();
            const { sortingsService } = target;
            const filtersService = new RTFiltersService();
            filtersService.registerFilterTarget(sortingsService);

            const params = {
                sortings: [{ direction: SortDirection.Desc, fieldName: 'id' }, { direction: SortDirection.Desc, fieldName: 'name' }]
            };
            filtersService.applyParams(params);
            expect(sortingsService.sortings.length).toBe(2);
            expect(sortingsService.sortings[0].fieldName).toEqual(params.sortings[0].fieldName);
            expect(sortingsService.sortings[0].direction).toEqual(params.sortings[0].direction);
            expect(sortingsService.sortings[1].fieldName).toEqual(params.sortings[1].fieldName);
            expect(sortingsService.sortings[1].direction).toEqual(params.sortings[1].direction);
            expect(sortingsService.sortings).not.toBe(params.sortings);
        });
    });
});
