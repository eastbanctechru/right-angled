import { SelectionItem } from 'e2e4';

export interface OnSelectionChanged extends SelectionItem {
    /**
     * Опциональный хук-метод, который будет вызван реализациями контракта {@link SelectionService} как при выборе, так и при отмене выбора данного элемента.
     */
    rtOnSelectionChanged?(selected: boolean): void;
}
