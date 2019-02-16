export * from 'e2e4';
export * from './misc/misc.module';
export * from './filters/filters.module';
export * from './selection/selection.module';
export * from './lists/lists.module';
export declare class RTModule {
    static registerStateService({ useClass, useValue, useExisting, useFactory, deps, multi }: {
        useClass?: any;
        useValue?: any;
        useExisting?: any;
        useFactory?: () => any;
        deps?: object[];
        multi?: boolean;
    }): void;
}
