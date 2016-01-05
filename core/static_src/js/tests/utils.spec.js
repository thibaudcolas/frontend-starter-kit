import { expect } from 'chai';
import sinon from 'sinon';
import { debounce } from '../utils';

let clock;

describe('Utils', () => {
    beforeEach('bend time', () => {
        clock = sinon.useFakeTimers();
    });

    afterEach('restore time', () => {
        clock.restore();
    });

    it('has a debounce function', () => {
        expect(debounce).to.be.a('function');
    });

    it('debounce calls its callback', () => {
        const callback = sinon.spy();
        const proxy = debounce(callback, 5000);

        proxy();

        // Move the sinon clock to 5001ms.
        clock.tick(5001);

        expect(callback.called).to.equal(true);
        expect(callback.calledOnce).to.equal(true);
    });
});
