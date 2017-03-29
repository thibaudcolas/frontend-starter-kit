import { querySelectArray, debounce } from './index';

describe('utils', () => {
    describe('#querySelectArray', () => {
        it('works', () => {
            document.body.innerHTML = '<ul><li>1</li><li>2</li><li>3</li></ul>';
            expect(querySelectArray('li').map(e => e.innerHTML)).toEqual(['1', '2', '3']);
        });
    });

    describe('#debounce', () => {
        it('calls its callback', () => {
            jest.useFakeTimers();

            const callback = jest.fn();
            const proxy = debounce(callback, 5000);

            proxy();

            // Fast forward and exhaust only currently pending timers
            // (but not any new timers that get created during that process)
            jest.runOnlyPendingTimers();

            expect(callback).toBeCalled();
            expect(callback).toHaveBeenCalledTimes(1);
        });
    });
});
