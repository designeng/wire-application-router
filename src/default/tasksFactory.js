import _        from 'underscore';
import when     from 'when';
import pipeline from 'when/pipeline';

const allowedReasons = ["CACHED"];

const invariant = object => object;

export default class TasksFactory {

    constructor(target, tasks) {
        this.distributive = this.provideFunctions(target, this.prepareTasks(tasks));
        return this;
    }

    prepareTasks(tasks) {
        distributive = {};
        distributive['tasks'] = tasks;
        return distributive;
    }

    provideFunctions(target, distributive) {
        let result = {};
        _.each(distributive, function(methods, key) {
            return result[key] = _.map(methods, function(method) {
                if (!target[method]) {
                    throw new Error("No method with name '" + method + "' provided!");
                } else {
                    return target[method];
                }
            }, target);
        }, target);
        return result;
    }

    runTasks(item, callback, options) {
        if (!_.isFunction(callback)) {
            callback = invariant;
        }

        if (options != null ? options.skip : void 0) {
            tasks = _.filter(this.distributive["tasks"], function(methodToSkip, index) {
                return (indexOf.call(options.skip, index) >= 0) ? false : true;
            });
        } else {
            tasks = this.distributive["tasks"];
        }

        pipeline(tasks, item).then(result => callback(result),
            reason => {
                if (indexOf.call(allowedReasons, reason) >= 0) {
                    return invariant();
                // TODO: navigate to error page?
                } else {
                    return console.error("PIPELINE TASKS ERROR:::", reason);
                }
            }
        );
    }
}