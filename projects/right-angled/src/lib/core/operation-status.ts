/**
 * Represents possible values for operation status (e.g. of request to the server).
 */
export enum OperationStatus {
    /**
     * Nothing was performed before.
     */
    Initial = 0,
    /**
     * Last operation completed successfully.
     */
    Done = 1,
    /**
     * Operation is performing right now.
     */
    Progress = 2,
    /**
     * Last operation completed with failure.
     */
    Fail = 3,
    /**
     * Last operation was cancelled.
     */
    Cancelled = 4,
    /**
     * Last operation doesn't return any data.
     */
    NoData = 5
}
