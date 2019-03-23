// tslint:disable:no-unused-expression max-file-line-count
import * as sinon from 'sinon';
import { RTSelectionService } from './selection.service';

const savePrevious = true;
const doNotSavePrevious = false;

interface SelectionableObject {
    items: Item[];
    selectionService: RTSelectionService;
}

interface Item {
    name: string;
    selected: boolean;
}

function toTarget(): SelectionableObject {
    const target = {
        items: ['first', 'second', 'third', 'fourth', 'fifth'].map(name => ({ name, selected: false })),
        selectionService: null
    };
    target.selectionService = new RTSelectionService();
    target.selectionService.items = target.items;
    return target;
}

function toEmptyTarget(): SelectionableObject {
    const target = {
        items: [],
        selectionService: null
    };
    target.selectionService = new RTSelectionService();
    target.selectionService.items = target.items;
    return target;
}

describe('SelectionService', () => {
    describe('works with items without `selected` property', () => {
        it('returns empty array if nothing is selected', () => {
            const items = [1, 2, 3, 4, 5];
            const selectionService = new RTSelectionService();
            selectionService.items = items;
            expect(selectionService.getSelectedElements()).toEqual([]);
            selectionService.selectAll();
            expect(selectionService.getSelectedElements()).toEqual([1, 2, 3, 4, 5]);
        });
    });
    describe('getSelectedElements', () => {
        it('returns empty array if nothing is selected', () => {
            const target = toTarget();
            expect(target.selectionService.getSelectedElements()).toEqual([]);
        });

        it('returns selections array', () => {
            const target = toTarget();
            target.selectionService.selectFirst();
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[0]]);
        });
    });

    describe('selectFirst', () => {
        it('sets first element selected', () => {
            const target = toTarget();

            target.selectionService.selectFirst();

            expect(target.selectionService.getSelectedElements()).toEqual([target.items[0]]);
        });

        it('doesn`t affect previously selected items', () => {
            const target = toTarget();

            const firstSelectionIndex = 2;
            target.items[firstSelectionIndex].selected = true;
            target.selectionService.selectFirst();

            expect(target.selectionService.getSelectedElements()).toEqual([target.items[0]]);
            expect(target.items.every((item: Item, index: number) => !item.selected || index === firstSelectionIndex || index === 0)).toEqual(true);
        });

        it('doesn`t throw on empty collection', () => {
            const target = toEmptyTarget();

            expect(() => target.selectionService.selectFirst()).not.toThrow();
        });
    });

    describe('selectLast', () => {
        it('sets last element selected', () => {
            const target = toTarget();

            target.selectionService.selectLast();

            expect(target.selectionService.getSelectedElements()).toEqual([target.items[target.items.length - 1]]);
            expect(target.items.every((item: Item, index: number, array: Item[]) => !item.selected || index === array.length - 1)).toEqual(true);
        });

        it('doesn`t affect previously selected items', () => {
            const target = toTarget();

            const firstSelectionIndex = 0;
            target.items[firstSelectionIndex].selected = true;
            target.selectionService.selectLast();

            expect(target.selectionService.getSelectedElements()).toEqual([target.items[target.items.length - 1]]);
            expect(
                target.items.every((item: Item, index: number, array: Item[]) => !item.selected || index === firstSelectionIndex || index === array.length - 1)
            ).toEqual(true);
        });

        it('doesn`t throw on empty collection', () => {
            const target = toEmptyTarget();

            expect(() => target.selectionService.selectLast()).not.toThrow();
        });
    });

    describe('selectIndex', () => {
        it('sets element at index selected', () => {
            const target = toTarget();

            target.selectionService.selectIndex(1, savePrevious);

            expect(target.items[0].selected).toEqual(false);
            expect(target.items[1].selected).toEqual(true);
            expect(target.items[2].selected).toEqual(false);
        });

        it('handles duplicate selection', () => {
            const target = toTarget();

            target.selectionService.selectIndex(1, savePrevious);
            target.selectionService.selectIndex(1, savePrevious);

            expect(target.selectionService.getSelectedIndexes()).toEqual([1]);
        });

        it('saves previously selected elements', () => {
            const target = toTarget();

            target.selectionService.selectFirst();
            target.selectionService.selectIndex(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[0], target.items[1]]);

            expect(target.items[0].selected).toEqual(true);
            expect(target.items[1].selected).toEqual(true);
            expect(target.items[2].selected).toEqual(false);
        });

        it('clears previously selected elements', () => {
            const target = toTarget();

            target.selectionService.selectFirst();
            target.selectionService.selectIndex(1, doNotSavePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[1]]);

            expect(target.items[0].selected).toEqual(false);
            expect(target.items[1].selected).toEqual(true);
            expect(target.items[2].selected).toEqual(false);
        });

        it('ignores incorrect values', () => {
            const target = toTarget();

            target.selectionService.selectIndex(-20);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);

            target.selectionService.selectIndex(null);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);

            target.selectionService.selectIndex(150);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);
        });
    });

    describe('deselectIndex', () => {
        it('sets element at index deselected', () => {
            const target = toTarget();

            target.selectionService.selectIndex(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[1]]);

            expect(target.items[0].selected).toEqual(false);
            expect(target.items[1].selected).toEqual(true);
            expect(target.items[2].selected).toEqual(false);

            target.selectionService.deselectIndex(1);
            expect(target.selectionService.getSelectedElements()).toEqual([]);
            expect(target.items[1].selected).toEqual(false);
        });

        it('ignores incorrect values', () => {
            const target = toTarget();

            target.selectionService.deselectIndex(-20);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);

            target.selectionService.deselectIndex(null);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);

            target.selectionService.deselectIndex(150);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);
        });
        it('normally handles deselection of item which wasn`t selected', () => {
            const target = toTarget();

            target.selectionService.deselectAll();
            target.selectionService.deselectIndex(1);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);
        });
    });

    describe('toggleSelection', () => {
        it('toggles element selection at index', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[1]]);
            expect(target.items[0].selected).toEqual(false);
            expect(target.items[1].selected).toEqual(true);
            expect(target.items[2].selected).toEqual(false);

            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([]);
            expect(target.items[1].selected).toEqual(false);
        });
        it('toggles element selection only at index when multiple items selected', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(1, savePrevious);
            target.selectionService.toggleSelection(2, savePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[1], target.items[2]]);

            expect(target.items[0].selected).toEqual(false);
            expect(target.items[1].selected).toEqual(true);
            expect(target.items[2].selected).toEqual(true);

            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[2]]);
            expect(target.items[1].selected).toEqual(false);
        });

        it('toggles element selection at index, single item mode', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(1, doNotSavePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[1]]);

            expect(target.items[0].selected).toEqual(false);
            expect(target.items[1].selected).toEqual(true);
            expect(target.items[2].selected).toEqual(false);

            target.selectionService.toggleSelection(2, doNotSavePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[2]]);
            expect(target.items[1].selected).toEqual(false);
            expect(target.items[2].selected).toEqual(true);
        });

        it('toggles element selection at index, multi item mode', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[1]]);

            expect(target.items[0].selected).toEqual(false);
            expect(target.items[1].selected).toEqual(true);
            expect(target.items[2].selected).toEqual(false);

            target.selectionService.toggleSelection(2, savePrevious);
            expect(target.selectionService.getSelectedElements()).toEqual([target.items[1], target.items[2]]);
            expect(target.items[1].selected).toEqual(true);
            expect(target.items[2].selected).toEqual(true);
        });

        it('ignores incorrect values', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(-20);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);

            target.selectionService.toggleSelection(null);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);

            target.selectionService.toggleSelection(150);
            expect(target.selectionService.getSelectedElements().length).toEqual(0);
        });
    });

    describe('getMinSelectedIndex', () => {
        it('works when single item  selected', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(1, savePrevious);

            expect(target.selectionService.getMinSelectedIndex()).toEqual(1);
        });

        it('works when multiple items selected', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(0, savePrevious);
            target.selectionService.toggleSelection(1, savePrevious);

            expect(target.selectionService.getMinSelectedIndex()).toEqual(0);
        });
        it('works when selection order reversed', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(1, savePrevious);
            target.selectionService.toggleSelection(0, savePrevious);

            expect(target.selectionService.getMinSelectedIndex()).toEqual(0);
        });
        it('works when nothing selected', () => {
            const target = toTarget();

            expect(target.selectionService.getMinSelectedIndex()).toEqual(-1);
        });
    });

    describe('getMaxSelectedIndex', () => {
        it('works when single item selected', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(1, savePrevious);

            expect(target.selectionService.getMaxSelectedIndex()).toEqual(1);
        });

        it('works when multiple items selected', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(0, savePrevious);
            target.selectionService.toggleSelection(1, savePrevious);

            expect(target.selectionService.getMaxSelectedIndex()).toEqual(1);
        });

        it('works when selection order reversed', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(1, savePrevious);
            target.selectionService.toggleSelection(0, savePrevious);

            expect(target.selectionService.getMaxSelectedIndex()).toEqual(1);
        });
        it('works when nothing selected', () => {
            const target = toTarget();

            expect(target.selectionService.getMaxSelectedIndex()).toEqual(-1);
        });
    });

    describe('isIndexSelected', () => {
        it('returns selection state for index in valid range', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(1, savePrevious);

            expect(target.selectionService.isIndexSelected(1)).toEqual(true);
        });

        it('returns false for out of range index', () => {
            const target = toTarget();

            expect(target.selectionService.isIndexSelected(-1)).toEqual(false);
            expect(target.selectionService.isIndexSelected(4)).toEqual(false);
        });
    });
    describe('getItemIndex', () => {
        it('returns index of item in items source', () => {
            const target = toTarget();

            expect(target.selectionService.getItemIndex(target.items[0])).toEqual(0);
            expect(target.selectionService.getItemIndex(target.items[1])).toEqual(1);
            expect(target.selectionService.getItemIndex(target.items[2])).toEqual(2);
        });

        it('returns -1 for item which is not from items source', () => {
            const target = toTarget();

            expect(
                target.selectionService.getItemIndex({
                    name: 'cadabra',
                    selected: false
                })
            ).toEqual(-1);
        });
    });
    describe('checkSelection', () => {
        it('clears selection when pass null as source', () => {
            const target = toTarget();

            target.selectionService.selectAll();
            expect(target.selectionService.getSelectedElements().length).toEqual(target.items.length);

            target.items.pop();
            target.selectionService.items = null;
            target.selectionService.checkSelection();
            expect(target.selectionService.getSelectedElements().length).toEqual(0);
        });
        it('removes deleted item from selections on set', () => {
            const target = toTarget();

            target.selectionService.selectAll();
            expect(target.selectionService.getSelectedElements().length).toEqual(target.items.length);

            target.items.pop();
            target.selectionService.items = target.items;
            target.selectionService.checkSelection();
            expect(target.selectionService.getSelectedElements().length).toEqual(target.items.length);
        });
        it('removes shifted items from selections on set', () => {
            const target = toTarget();

            target.selectionService.selectAll();
            target.items.unshift(target.items.pop());
            target.selectionService.items = target.items;
            target.selectionService.checkSelection();

            expect(target.selectionService.getSelectedElements().length).toEqual(0);
        });
        it('uses referential equality as `trackByFn` function by default', () => {
            const target = toTarget();

            target.selectionService.selectAll();
            target.selectionService.items = target.items.map((item: Item) => ({ name: item.name } as Item));
            target.selectionService.checkSelection();

            expect(target.selectionService.getSelectedElements().length).toEqual(0);
        });
        it('use referential equality if `trackByFn` is undefined', () => {
            const target = toTarget();

            target.selectionService.trackByFn = undefined;
            target.selectionService.selectAll();
            target.selectionService.items = target.items.map((item: Item) => ({ name: item.name } as Item));
            target.selectionService.checkSelection();

            expect(target.selectionService.getSelectedElements().length).toEqual(0);
        });
        it('can use custom trackBy function', () => {
            const target = toTarget();

            target.selectionService.trackByFn = (index: number, item: any) => item.name;
            target.selectionService.selectAll();
            target.selectionService.items = target.items.map((item: Item) => ({ name: item.name, selected: false } as Item));
            target.selectionService.checkSelection();

            expect(target.selectionService.getSelectedElements().length).toEqual(5);
        });
    });

    describe('hasSelections', () => {
        it('returns boolean', () => {
            const target = toTarget();

            expect(target.selectionService.hasSelections()).toEqual(false);

            target.selectionService.toggleSelection(1, savePrevious);
            expect(target.selectionService.hasSelections()).toEqual(true);
        });
    });

    describe('selectRange', () => {
        it('ignores invalid indexes', () => {
            const target = toTarget();

            target.selectionService.selectRange(-1, 5);

            expect(target.selectionService.getSelectedElements()).toEqual([]);
        });

        it('selects all items in range', () => {
            const target = toTarget();

            target.selectionService.selectRange(0, 1);

            expect(target.selectionService.getSelectedElements()).toEqual([target.items[0], target.items[1]]);
        });

        it('doesn`t preserve previous selections', () => {
            const target = toTarget();

            target.selectionService.toggleSelection(2, savePrevious);
            target.selectionService.selectRange(0, 1);

            expect(target.selectionService.getSelectedElements()).toEqual([target.items[0], target.items[1]]);
        });

        it('checks that range already selected', () => {
            const target = toTarget();

            const spy = sinon.spy(target.selectionService, 'isRangeSelected');
            target.selectionService.selectRange(0, 1);
            target.selectionService.selectRange(0, 1);

            expect(spy.calledTwice).toBeTruthy();
            expect(spy.returnValues[0]).toEqual(false);
            expect(spy.returnValues[1]).toEqual(true);
        });
    });
    describe('isRangeSelected', () => {
        it('returns false if nothing selected at all', () => {
            const target = toTarget();

            expect(target.selectionService.isRangeSelected(0, 1)).toEqual(false);
        });
        it('returns true if all items selected', () => {
            const target = toTarget();

            target.selectionService.selectAll();

            expect(target.selectionService.isRangeSelected(0, target.items.length - 1)).toEqual(true);
        });
        it('handles by element checks', () => {
            const target = toTarget();

            target.selectionService.selectRange(1, 3);

            expect(target.selectionService.isRangeSelected(1, 3)).toEqual(true);
            expect(target.selectionService.isRangeSelected(0, 2)).toEqual(false);
        });
    });

    describe('destroy', () => {
        it('clears selections list and last processed index', () => {
            const target = toTarget();

            target.selectionService.selectAll();
            expect(target.selectionService.getSelectedElements().length).toEqual(target.items.length);

            target.selectionService.destroy();
            expect(target.selectionService.getSelectedElements().length).toEqual(0);
            expect(target.selectionService.lastProcessedIndex).toBeNull();
        });
        it('removes items source', () => {
            const target = toTarget();

            target.selectionService.destroy();

            expect(target.selectionService.items).toBeNull();
        });

        it('keeps initial collection untouched', () => {
            const target = toTarget();

            const tempItems = target.items.slice();
            target.selectionService.destroy();

            expect(target.items).toEqual(tempItems);
        });
    });
});
