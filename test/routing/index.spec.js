import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

import wire                 from 'essential-wire';
import wireDebugPlugin      from 'essential-wire/source/debug';

import wireRoutingSystemPlugin  from '../../src/index';
import appRouterController      from '../../src/appRouterController';

chai.use(spies);

describe('root ......',  () => {

    let root = {};

    const groundRoutes = {
        "{plain}" : {
            spec: "specs/prospect/plain/spec",
            slot: {$ref: "dom.first!#prospect"},
            rules: {
                plain: /\bcontacts\b/i
            }
        }
    }

    const childRoutes = {
        "contacts"  : {
            spec: "components/contacts/spec",
            slot: {$ref: "dom.first!#page"}
        }
    }

    const before = (done) => {
        wire({
            $plugins: [
                wireDebugPlugin,
                wireRoutingSystemPlugin
            ],

            test: 123,

            groundRoutes: {
                module: groundRoutes
            },

            childRoutes: {
                module: childRoutes
            },

            router: {
                appRouter: {
                    groundRoutes: {$ref: 'groundRoutes'},
                    childRoutes: {$ref: 'childRoutes'},
                    appRouterController: appRouterController
                }
            }
        })
        .then(context => {
            root = context;
            done();
        })
        .otherwise(error => console.log("ERROR::::", error))
    }

    beforeEach(before);

    it('should.............',  (done) => {
        console.log("appRouterController::::", appRouterController);
        // expect(appRouterController.match('/foo/')).to.be.ok;
        expect(root.test).to.be.ok;
        // expect(root.test).to.equal(123);
        done();
    });

});