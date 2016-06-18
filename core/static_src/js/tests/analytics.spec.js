import { expect } from 'chai';
import sinon from 'sinon';
import { initErrorTracking, social, errors } from '../api/analytics';

describe('analytics', () => {
    let gaSpy;

    beforeEach('spy on ga', () => {
        gaSpy = sinon.spy();
        global.ga = gaSpy;
    });

    describe('#initErrorTracking', () => {
        let onerrorSpy;

        beforeEach('set onerror, and initialise', () => {
            onerrorSpy = sinon.spy();
            global.onerror = onerrorSpy;

            initErrorTracking();
        });

        it('exists', () => {
            expect(initErrorTracking).to.be.a('function');
        });

        it('captures errors with onerror', () => {
            global.onerror('Test', 'script.js', 5, 5);
            expect(gaSpy.calledOnce).to.equal(true);
        });

        it('preserves previous window.onerror callback', () => {
            global.onerror('Test', 'script.js', 5, 5);
            expect(onerrorSpy.calledOnce).to.equal(true);
        });

        it('ignores "Script error." errors', () => {
            global.onerror('Script error.', 'script.js', 5, 5);
            expect(gaSpy.calledOnce).to.equal(false);
        });

        it('contains error message', () => {
            global.onerror('Test', 'script.js', 5, 5);
            expect(gaSpy.calledWith('send', 'exception', { exDescription: 'script.js: Test (5:5)', exFatal: false })).to.equal(true);
        });
    });

    describe('social', () => {
        it('exists', () => {
            expect(social).to.be.a('object');
        });

        describe('#share', () => {
            it('exists', () => {
                expect(social.share).to.be.a('function');
            });

            it('captures share events', () => {
                social.share('facebook', 'http://example.com');
                expect(gaSpy.calledWith('send', 'social', 'facebook', 'share', 'http://example.com')).to.equal(true);
            });
        });
    });

    describe('errors', () => {
        it('exists', () => {
            expect(errors).to.be.a('object');
        });

        describe('#ajax', () => {
            it('exists', () => {
                expect(errors.ajax).to.be.a('function');
            });

            it('captures AJAX errors', () => {
                errors.ajax(400, '/api/v1/bananas');
                expect(gaSpy.calledWith('send', 'exception', { exDescription: 'AJAX error: 400 /api/v1/bananas', exFatal: false })).to.equal(true);
            });
        });
    });
});
