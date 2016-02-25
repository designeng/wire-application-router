import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

chai.use(spies);

describe('root ......',  () => {

    let root = {};

    const before = (done) => {
        done();
    }

    beforeEach(before);

    it('should.............',  (done) => {
        expect(true).to.be.ok;
        done();
    });

});