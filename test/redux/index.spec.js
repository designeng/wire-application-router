import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

import wire                 from 'essential-wire';
import wireDebugPlugin      from 'essential-wire/source/debug';

chai.use(spies);

describe('root ......',  () => {

    let root = {};

    const before = (done) => {
        wire({
            $plugins: [
                wireDebugPlugin
            ],
            test: 123
        })
        .then((context) => {
            root = context;
            done();
        })
        .otherwise((error) => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('should.............',  (done) => {
        expect(root.test).to.be.ok;
        expect(root.test).to.equal(123);
        done();
    });

});