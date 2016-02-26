import _        from 'underscore';
import when     from 'when';
import pipeline from 'when/pipeline';

export default function TasksRunner(target, tasks) {
    this.target = target;
    this.tasks = _.map(tasks, (task) => {
        return (_.isFunction(task) ? task : (_.isString(task) ? target[task].bind(target) : void 0));
    });
}