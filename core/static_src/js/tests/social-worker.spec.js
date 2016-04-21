import { expect } from 'chai';
import { buildFacebookLink, buildTwitterLink } from '../utils/social-worker';

describe('format', () => {
    describe('#buildFacebookLink', () => {
        it('exists', () => {
            expect(buildFacebookLink).to.be.a('function');
        });

        it('Facebook sharing link is created', () => {
            expect(buildFacebookLink('http://www.example.com/')).to.equal('https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.example.com%2F');
        });
    });

    describe('#buildTwitterLink', () => {
        it('exists', () => {
            expect(buildTwitterLink).to.be.a('function');
        });

        it('number formatting makes the numbers look nicer', () => {
            expect(buildTwitterLink('Check this out!', 'https://www.springload.co.nz/')).to.equal('https://twitter.com/intent/tweet/?&text=Check%20this%20out!&url=https%3A%2F%2Fwww.springload.co.nz%2F');
            expect(buildTwitterLink('Check this out!', 'https://www.springload.co.nz/', 'springloadnz')).to.equal('https://twitter.com/intent/tweet/?&text=Check%20this%20out!&url=https%3A%2F%2Fwww.springload.co.nz%2F&via=springloadnz');
        });
    });
});
