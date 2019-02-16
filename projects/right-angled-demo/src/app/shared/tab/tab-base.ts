export abstract class Tab {
    public tabTitle = '';
    public isActive = false;
    public activate(): void {
        this.isActive = true;
    }
    public deactivate(): void {
        this.isActive = false;
    }
}
