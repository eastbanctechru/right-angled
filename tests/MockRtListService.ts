import { RtListService } from '../src/list-directives/list-service';
import { ProgressState } from 'e2e4';

export class MockRtListService extends RtListService{
    testChangeState = (): void => {
        this.state = ProgressState.Done;
    }
}