export class RtNullObjectInjectable {
    public static instance: RtNullObjectInjectable = new RtNullObjectInjectable();
    public static getFirstNotNullInstance(...instances: any[]): any {
        return instances.find(instance => instance !== RtNullObjectInjectable.instance);
    }
}
