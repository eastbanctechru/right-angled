// tslint:disable no-unused-expression max-file-line-count
import * as sinon from 'sinon';
import { RTSelectionService } from './selection.service';
import { RTSelectionEventsHelper, KeyCodes, MouseButtons } from './selection-events-helper';

const notPressedShift = false;
const pressedShift = true;
const notPressedCtrl = false;
const pressedCtrl = true;

function toSelectionService(): RTSelectionService {
    const selectionService = new RTSelectionService();
    selectionService.items = [
        { selected: false, title: 'one' },
        { selected: false, title: 'two' },
        { selected: false, title: 'three' },
        { selected: false, title: 'four' },
        { selected: false, title: 'five' }
    ];

    return selectionService;
}

function toDefaultSelectionHelper(): RTSelectionEventsHelper {
    const helper = new RTSelectionEventsHelper(toSelectionService());
    helper.horizontal = false;
    helper.multiple = true;
    helper.toggleOnly = false;
    return helper;
}

describe('RTSelectionEventsHelper', () => {
    describe('keyboard', () => {
        it('calls `trySelectNextItem` for `Tab` key', () => {
            const helper = toDefaultSelectionHelper();
            spyOn(helper, 'trySelectNextItem');

            helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.Tab);

            expect(helper.trySelectNextItem).toHaveBeenCalledTimes(1);
        });

        it('calls `trySelectPreviousItem` for `Shift+Tab` key', () => {
            const helper = toDefaultSelectionHelper();
            spyOn(helper, 'trySelectPreviousItem');

            helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.Tab);

            expect(helper.trySelectPreviousItem).toHaveBeenCalledTimes(1);
        });

        it('skips handling of `Ctrl+Tab` key', () => {
            const helper = toDefaultSelectionHelper();

            let handled = helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.Tab);

            expect(handled).toBe(false);
            handled = helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.Tab);
            expect(handled).toBe(false);
        });

        it('selects all items on exact `Ctrl+A` combination', () => {
            const helper = toDefaultSelectionHelper();
            spyOn(helper.selectionService, 'selectAll');

            helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.Enter);
            expect(helper.selectionService.selectAll).not.toHaveBeenCalled();

            helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.A);
            expect(helper.selectionService.selectAll).not.toHaveBeenCalled();

            helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.A);
            expect(helper.selectionService.selectAll).not.toHaveBeenCalled();

            helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.A);
            expect(helper.selectionService.selectAll).toHaveBeenCalledTimes(1);
        });

        it('Doesn`t handle `Ctrl+A` combination if `multiple` option is false', () => {
            const helper = toDefaultSelectionHelper();
            helper.multiple = false;
            const trySelectAllSpy = sinon.spy(helper as any, 'trySelectAll');

            helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.A);

            expect(trySelectAllSpy.calledOnce).toBe(true);
            expect(trySelectAllSpy.returnValues[0]).toBe(false);
            expect(helper.selectionService.getSelectedIndexes().length).toBe(0);
        });

        describe('horizontal behavior', () => {
            it('calls `onPreviousKey` for `ArrowUp` or horizontal and `ArrowLeft`', () => {
                const helper = toDefaultSelectionHelper();
                const onPreviousKeySpy = sinon.spy(helper as any, 'onPreviousKey');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(onPreviousKeySpy.called).toBe(true);

                onPreviousKeySpy.resetHistory();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowLeft);
                expect(onPreviousKeySpy.notCalled).toBe(true);

                helper.horizontal = true;
                onPreviousKeySpy.resetHistory();

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(onPreviousKeySpy.notCalled).toBe(true);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowLeft);
                expect(onPreviousKeySpy.called).toBe(true);
            });

            it('calls `onNextKey` for `ArrowDown` or horizontal and `ArrowRight`', () => {
                const helper = toDefaultSelectionHelper();
                const onNextKeySpy = sinon.spy(helper as any, 'onNextKey');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(onNextKeySpy.called).toBe(true);

                onNextKeySpy.resetHistory();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowRight);
                expect(onNextKeySpy.notCalled).toBe(true);

                helper.horizontal = true;
                onNextKeySpy.resetHistory();
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(onNextKeySpy.notCalled).toBe(true);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowRight);
                expect(onNextKeySpy.called).toBe(true);
            });
        });

        describe('onPreviousKey', () => {
            it('selects first item on previous key when nothing`s selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.deselectAll();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectFirst');

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).toBe(true);
            });

            it('selects first item on `Ctrl+ArrowUp` combination', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectLast();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectFirst');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).toBe(true);
            });

            it('selects up to first item on `Ctrl+Shift+ArrowUp` combination', () => {
                const helper = toDefaultSelectionHelper();
                helper.selectionService.selectLast();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).toBe(true);
                expect(selectAllSpy.calledWith(helper.selectionService.items.length - 1, 0)).toBe(true);

                selectAllSpy.resetHistory();
                helper.selectionService.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).toBe(true);
                expect(selectAllSpy.calledWith(2, 0)).toBe(true);
            });

            it('selects two items on `Shift+ArrowUp` combination when last operation is unselection of item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(2);
                helper.selectionService.deselectIndex(2);

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(selectAllSpy.calledOnce).toBe(true);
                expect(selectAllSpy.calledWith(2, 1)).toBe(true);
            });

            it('resets previous selections on `Shift+ArrowUp` combination when last operation is unselection of item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectAll();
                helper.selectionService.deselectIndex(2);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([1, 2]);
            });

            it('deselects last selected item in range and sets last processed index to previous item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(2);
                helper.selectionService.selectIndex(3, true);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([2, 3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([2]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(2);
            });

            it('moves to previous item on `ArrowUp` when not first item selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(3);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([3]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([1]);
            });

            it('moves to previous item and save on `Shift+ArrowUp` when not first item selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(3);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([3, 2, 1]);
            });

            it('don`t do anything when first index selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectFirst();
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(0);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(0);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(0);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(0);
            });
        });

        describe('onNextKey', () => {
            it('selects first item on `ArrowDown` when nothings selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.deselectAll();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectFirst');
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).toBe(true);
            });

            it('selects last item on `Ctrl+ArrowDown` combination', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectLast();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectLast');
                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).toBe(true);
            });

            it('selects up to last item on `Ctrl+Shift+ArrowDown` combination', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectFirst();

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectRange');
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).toBe(true);
                expect(selectAllSpy.calledWith(0, helper.selectionService.items.length - 1)).toBe(true);

                selectAllSpy.resetHistory();
                helper.selectionService.selectIndex(2);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).toBe(true);
                expect(selectAllSpy.calledWith(2, helper.selectionService.items.length - 1)).toBe(true);
            });

            it('selects two items on `Shift+ArrowDown` combination when last operation is unselection of item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(2);
                helper.selectionService.deselectIndex(2);

                const selectAllSpy = sinon.spy(helper.selectionService, 'selectRange');
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(selectAllSpy.calledOnce).toBe(true);
                expect(selectAllSpy.calledWith(2, 3)).toBe(true);
            });

            it('resets previous selections on `Shift+ArrowDown` combination when last operation is unselection of item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectAll();
                helper.selectionService.deselectIndex(2);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 1, 3, 4]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([2, 3]);
            });

            it('deselects last selected item in range and sets last processed index to previous item', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(3);
                helper.selectionService.selectIndex(2, true);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([3, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([3]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(3);
            });

            it('moves to next item on `ArrowDown` when not last item selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(1);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([1]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([2]);
                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([3]);
            });

            it('moves to next item and save on `Shift+ArrowDown` when not last item selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectIndex(1);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([1, 2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([1, 2, 3]);
            });

            it('don`t do anything when last index selected', () => {
                const helper = toDefaultSelectionHelper();

                helper.selectionService.selectLast();
                const lastIndex = helper.selectionService.lastProcessedIndex;

                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([lastIndex]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(lastIndex);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([lastIndex]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(lastIndex);

                helper.keyboardHandler(notPressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([lastIndex]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(lastIndex);

                helper.keyboardHandler(pressedCtrl, notPressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([lastIndex]);
                expect(helper.selectionService.lastProcessedIndex).toEqual(lastIndex);
            });
        });
        describe('allowMultipleSelection setted to false', () => {
            it('selects previous item on `Ctrl?+Shift+ArrowUp` combination and allowMultipleSelection setted to false', () => {
                const helper = toDefaultSelectionHelper();
                helper.multiple = false;
                helper.selectionService.selectLast();
                const lastItemIndex = helper.selectionService.items.length - 1;
                expect(helper.selectionService.getSelectedIndexes()).toEqual([lastItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([lastItemIndex - 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([lastItemIndex - 2]);
            });

            it('selects up to last item on `Ctrl+Shift+ArrowDown` combination', () => {
                const helper = toDefaultSelectionHelper();
                helper.multiple = false;
                helper.selectionService.selectFirst();
                const firstItemIndex = 0;

                expect(helper.selectionService.getSelectedIndexes()).toEqual([firstItemIndex]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([firstItemIndex + 1]);

                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([firstItemIndex + 2]);
            });

            it('moves to previous item on `Shift+ArrowUp` when not first item selected', () => {
                const helper = toDefaultSelectionHelper();
                helper.multiple = false;
                helper.selectionService.selectIndex(3);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([3]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([2]);
                helper.keyboardHandler(pressedCtrl, pressedShift, KeyCodes.ArrowUp);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([1]);
            });

            it('moves to next item on `Shift+ArrowDown` when not last item selected', () => {
                const helper = toDefaultSelectionHelper();
                helper.multiple = false;
                helper.selectionService.selectIndex(1);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([1]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([2]);
                helper.keyboardHandler(notPressedCtrl, pressedShift, KeyCodes.ArrowDown);
                expect(helper.selectionService.getSelectedIndexes()).toEqual([3]);
            });
        });
    });
    describe('mouse', () => {
        it('selects item on click', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);

            helper.selectionService.deselectAll();
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);

            helper.selectionService.deselectAll();
            helper.mouseHandler(notPressedCtrl, pressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
        });

        it('deselects already selected item on click', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([]);
        });

        it('add item to seletions on `Ctrl+click`', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3, 4]);
        });

        it('removes item from seletions on `Ctrl+click` selected item', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3]);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
        });

        it('resets previous seletions on click item', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 2);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([2]);
        });

        it('resets previous seletions on click already selected item', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
        });

        it('selects range of items on `Shift+click`', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(notPressedCtrl, pressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 1, 2, 3]);
        });

        it('prevents deselection of selected item on non-left button click', () => {
            const helper = toDefaultSelectionHelper();
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Right, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
        });

        it('saves selection on regular click when `toggleOnly` option is `true`', () => {
            const helper = toDefaultSelectionHelper();
            helper.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 3);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 1);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3, 1]);
        });

        it('doesn`t reset previous seletions on click item when `toggleOnly` option is `true`', () => {
            const helper = toDefaultSelectionHelper();
            helper.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 2);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3, 4, 2]);
        });

        it('doesn`t reset previous seletions on click already selected item when `toggleOnly` option is `true`', () => {
            const helper = toDefaultSelectionHelper();
            helper.toggleOnly = true;
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 3);
            helper.mouseHandler(pressedCtrl, notPressedShift, MouseButtons.Left, 4);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([0, 3, 4]);
            helper.mouseHandler(notPressedCtrl, notPressedShift, MouseButtons.Left, 0);
            expect(helper.selectionService.getSelectedIndexes()).toEqual([3, 4]);
        });
    });
});
