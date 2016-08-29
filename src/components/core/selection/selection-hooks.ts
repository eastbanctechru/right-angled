export interface OnSelected {
    /**
     * Опциональный хук-метод, который будет вызван реализациями контракта {@link SelectionService} при выборе данного элемента.
     */
    rtOnSelected(): void;
}

export interface OnDeselected {
    /**
     * Опциональный хук-метод, который будет вызван реализациями контракта {@link SelectionService} при отмене выбора данного элемента.
     */
    rtOnDeselected(): void;
}

export interface OnSelectionChanged {
    /**
     * Опциональный хук-метод, который будет вызван реализациями контракта {@link SelectionService} как при выборе, так и при отмене выбора данного элемента.
     */
    rtOnSelectionChanged(selected: boolean): void;
}
