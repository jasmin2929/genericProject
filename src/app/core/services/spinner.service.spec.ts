import { SpinnerService } from './spinner.service';

describe('BusyIndicatorService', () => {
    let component: SpinnerService;

    beforeEach(() => {
        component = new SpinnerService();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should initialise visibility to false', () => {
        component.visibility.subscribe((value: boolean) => {
            expect(value).toBe(false);
        });
    });
});
