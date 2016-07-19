export const FETCH_METHOD_METADATA_KEY = 'right-angled:fetch-method';
export function fetchMethod(target?: any): any {
    return (type: any, propertyKey: string): void => {
        Reflect.defineMetadata(FETCH_METHOD_METADATA_KEY, propertyKey, type);
    };
}
