import _ from 'underscore';
import when from 'when';
import pipeline from 'when/pipeline';
import sequence from 'when/sequence';
import TasksFactory from './tasksFactory';
import navigate from '../utils/navigation/navigate';

export default class ChildContextProcessor {

    // should be defined in "deliver" method
    // parentContext: undefined

    constructor() {
        const tasks = [
            "wireChildContext",
            "checkForAccess",
            "sequenceBehavior",
            "synchronize",
        ];
        this.tasksFactory = new TasksFactory(this, tasks);
    }

    deliver(parentContext, bundle) {
        this.parentContext = parentContext;
        
        // if any filter return false, no tasks processing

        // TODO: choose PARALLEL or QUEUE by option?

        // PARALLEL WIRING
        // _.each bundle, (item, index) =>
        //      @mainSpecification = item.spec if index == 0
        //      @tasksFactory.runTasks(item, null)

        // QUEUE WIRING
        // REASON: runTasks invoked tasks in parallel for different items,
        // but sometimes it's usefull to call runTasks with two (or more) different arguments,
        // waiting while tasks for first item will be completed.
        const childQueue = _.map(bundle, (item, index) => {
            return () => {
                let options = {}
                item.childContext = this.contextController.getRegistredContext(item.route, "child");
                this.mainSpecification = index == 0 ? item.spec : null;

                if(typeof(item.childContext) !== 'undefined') {
                    // should be skipped "wireChildContext", "checkForAccess" tasks - pass the array of indexes:
                    options.skip = [0, 1]
                    // as sequenceBehavior has childContext in argument, item.childContext should be passed
                    this.tasksFactory.runTasks(item.childContext, null, options);
                } else {
                    this.tasksFactory.runTasks(item);
                }
            }
        });

        sequence(childQueue).then(result => {
            this.afterChildrenLoaded ? this.afterChildrenLoaded() : null;
        });
    }

    wireChildContext(child) {
        if(typeof(child.childContext) !== 'undefined') {
            return child.childContext;
        } else {
            // "reserved words": __environmentVars__, slot

            let environment = {
                __environmentVars__: {
                    spec                : child.spec,
                    replaceable         : child.replaceable,
                    route               : child.route,
                    destroyOnBlur       : child.destroyOnBlur
                },
                slot            : child.slot
            }

            if(typeof(child.behavior) !== 'undefined') {
                environment["behavior"] = this.prepareBehavior(child.behavior);

                return when(this.environment.loadInEnvironment(child.spec, child.mergeWith, environment, this.parentContext))
                    .then(
                        childContext => {
                            // register context only if option noCache is not true:
                            if(!child.noCache){
                                this.contextController.register(this.parentContext, childContext, child);
                            }
                            // if option clearCache is true, all contextController._contextHash will be cleared and all cached contexts destroyed:
                            if(child.clearCache) {
                                this.contextController.clearCache();
                            }
                            return childContext;
                        }, 
                        rejectReason => {
                            console.debug("ChildContextProcessor::wireChildContext:rejectReason:", rejectReason);
                        }
                    );
            }
        }
    }

    // if no access, checkForAccess promise is rejected, and no tasks after it is passed.
    checkForAccess(childContext) {
        const access = this.accessPolicyProcessor.askForAccess(childContext);
        return (access ? childContext : {});
    }

    sequenceBehavior(childContext) {
        if(typeof(childContext.behavior) !== 'undefined' && childContext.__environmentVars__.spec == this.mainSpecification) {
            return this.behaviorProcessor.sequenceBehavior(childContext);
        } else {
            return childContext;
        }
    }

    synchronize(childContext) {
        // console.debug "CURRENT:::", currentRoute.params.join("/"), currentRoute.route._pattern
        // console.debug "childObj:::now", childObj, childContext

        const isActive = (context) => {
            return(context.__environmentVars__.route == this.routeStrategy.getChild(this.appRouterController.getCurrentRoute().route._pattern).route);
        }

        if(isActive(childContext) && typeof(childContext.synchronizeWithRoute) !== "undefined") {
            childContext.synchronizeWithRoute.call(childContext);
        }

        return childContext;
    }
}
