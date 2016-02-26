import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

import TasksRunner from '../../source/assets/TasksRunner';

chai.use(spies);

class TasksDistributive {

    constructor(options) {
        this.testProp = options.testProp;
    }

    oneTask() {
        return this.testProp;
    }

    twoTask() {

    }
}

describe('TasksRunner',  () => {

    let runner, target;

    const before = (done) => {
        target = new TasksDistributive({testProp: 1});
        runner = new TasksRunner(target, ['oneTask', 'twoTask', () => {} ]);
        done();
    }

    beforeEach(before);

    it('should have tasks array with length',  (done) => {
        expect(runner.tasks.length).to.equal(3);
        done();
    });

    it('should convert string task to function',  (done) => {
        expect(runner.tasks[0]).to.be.a('function');
        done();
    });

    it('should bind converted task to target',  (done) => {
        expect(runner.tasks[0]()).to.equal(1);
        done();
    });

});