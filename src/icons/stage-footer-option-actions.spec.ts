import stageFooterOptionIcons from '@/icons/stage-footer-option-actions';

describe('stageFooterOptionIcons', () => {
    it('should has 7 elements', () => {
        const stageFooter = {};
        expect(stageFooterOptionIcons(stageFooter).length).toBe(7);
    });

    it('decrease should call decreaseMethod', () => {
        const decreaseLogFilterLevelMock = jest.fn();
        const stageFooter = {
            decreaseLogFilterLevel: decreaseLogFilterLevelMock
        };
        const options = stageFooterOptionIcons(stageFooter);
        options.find(option => option.iconClass?.includes('minus'))!.action!();
        expect(decreaseLogFilterLevelMock).toHaveBeenCalled();
    });

    it('expand should call expandMethod', () => {
        const $emitMock = jest.fn();
        const stageFooter = {
            $emit: $emitMock
        };
        const options = stageFooterOptionIcons(stageFooter);
        options.find(option => option.iconClass?.includes('expand'))!.action!();
        expect($emitMock).toHaveBeenCalledWith('expandWindow');
    });

    it('compress should call compressMethod', () => {
        const $emitMock = jest.fn();
        const stageFooter = {
            $emit: $emitMock
        };
        const options = stageFooterOptionIcons(stageFooter);
        options.find(option => option.iconClass?.includes('compress'))!.action!();
        expect($emitMock).toHaveBeenCalledWith('compressWindow');
    });

    it('clear should call clearMethod', () => {
        const clearLogsMock = jest.fn();
        const stageFooter = {
            clearLogs: clearLogsMock
        };
        const options = stageFooterOptionIcons(stageFooter);
        options.find(option => option.iconClass?.includes('ban'))!.action!();
        expect(clearLogsMock).toHaveBeenCalled();
    });

});
