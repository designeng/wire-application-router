import chai, { expect } from 'chai';
import spies from 'chai-spies';
import when from 'when';

import TasksRunner from '../../source/assets/TasksRunner';

chai.use(spies);

const skippedTaskSpy = chai.spy();

class TasksDistributive {

    constructor(options) {
        this.testProp = options.testProp;
    }

    oneTask() {
        return this.testProp;
    }

    twoTask(a) {
        return a + 1;
    }

    threeTask(a) {
        return a + 1;
    }

    skippedTask(a) {
        skippedTaskSpy();
        return a + 10;
    }
}

describe('TasksRunner',  () => {

    let runner, target;

    const before = (done) => {
        target = new TasksDistributive({testProp: 1});
        runner = new TasksRunner(target, ['oneTask', 'twoTask', 'threeTask', (x) => x ]);
        done();
    }

    beforeEach(before);

    it('should have tasks array with length',  (done) => {
        expect(runner.tasks.length).to.equal(4);
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

    it('should run tasks in pipeline',  (done) => {
        runner.run().then(result => {
            expect(result).to.equal(3);
            done();
        })
    });

});