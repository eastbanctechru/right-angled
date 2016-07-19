export const DISPOSE_ON_RELOAD_METADATA_KEY = 'right-angled:dispose-on-reload';
export function disposeOnReload(target?: any): any {
    return (type: any, propertyKey: string): void => {
        let existedConfig: Array<string> = Reflect.getMetadata(DISPOSE_ON_RELOAD_METADATA_KEY, type);
        if (existedConfig === undefined) {
            existedConfig = new Array<string>();
            Reflect.defineMetadata(DISPOSE_ON_RELOAD_METADATA_KEY, existedConfig, type);
        }
        existedConfig.push(propertyKey);
    };
}
