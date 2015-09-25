import { expect } from 'chai';
import sinon from 'sinon';
import { humanNumber, debounce } from '../utils';

let clock;

describe('Utils', () => {
    beforeEach('bend time', () => {
        clock = sinon.useFakeTimers();
    });

    afterEach('  time', () => {
        clock.restore();
    });

    it('has a number formatting function', () => {
        expect(humanNumber).to.be.a('function');
        expect(humanNumber(5)).to.be.a('string');
    });

    it('number formatting makes the numbers look nicer', () => {
        expect(humanNumber(0)).to.be.equal('0');
        expect(humanNumber(5000)).to.be.equal('5,000');
        expect(humanNumber(5000000)).to.be.equal('5,000,000');
        expect(humanNumber(-5000)).to.be.equal('-5,000');
        expect(humanNumber(-5000000)).to.be.equal('-5,000,000');
        expect(humanNumber(5000.5000)).to.be.equal('5,000.5');
        expect(humanNumber(0.3333333)).to.be.equal('0.3333333');
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

        expect(callback.called).to.be.true;
        expect(callback.calledOnce).to.be.true;
    });
});
