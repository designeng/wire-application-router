import _        from 'underscore';
import when     from 'when';
import pipeline from 'when/pipeline';

export default function TasksRunner(target, tasks, options) {
    this.target = target;
    let skip = options && options.skip ? options.skip : null;

    if (skip) {
        this.tasks = _.filter(this.tasks, (methodToSkip, index) => {
            console.log("methodToSkip, index:::", methodToSkip, index);
            return (Array.prototype.indexOf.call(options.skip, index) >= 0) ? false : true;
        });
    }

    this.tasks = _.map(tasks, (task) => {
        return (_.isFunction(task) ? task : (_.isString(task) ? target[task].bind(target) : void 0));
    });
}

TasksRunner.prototype.run = function(...args) {
    const tasks = this.tasks;
    return pipeline(tasks, args);
}