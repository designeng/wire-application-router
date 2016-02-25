import _ from 'underscore';
import when from 'when';
import sequence from 'when/sequence';

export default class BehaviorProcessor {
    sequenceBehavior(childContext) {
        return when(this.pluginWireFn.getProxy(childContext.behavior)
                , (behaviorObject) => {
                    let tasks = behaviorObject.target;
                    // normalize tasks
                    if(_.isFunction(tasks)){
                        tasks = [tasks];
                    }
                    // @param {Array} tasks - array of tasks
                    // @param {Object} childContext - current resulted child context
                    sequence(tasks, childContext);
                }
                , () => {
                    // nothing to do, no behavior defined
                }
        ).then( 
            ()      => childContext,
            error   => console.error('BehaviorProcessor::sequenceBehavior ERROR:', error.stack)
        );
    }
}