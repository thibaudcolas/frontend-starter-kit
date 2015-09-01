import { expect } from 'chai';
import { uuid } from '../utils';

describe('Example', () => {
    it('uses expect from chai', () => {
        expect(parseInt).to.be.a('function');
        expect(parseInt('200', 10)).to.equal(200);
        expect(45).to.be.greaterThan(30);
    });

    it('uuid outputs a unique identifier', () => {
        expect(uuid()).to.be.a('string');
    });
});
