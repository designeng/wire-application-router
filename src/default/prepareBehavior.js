import _ from 'underscore';

export default const prepareBehavior = (behavior) => {
    if (_.isArray(behavior)) {
        const length = behavior.length;
        const behaviorRef = _.reduce(behavior, (result, item, index) => {
            let suffix = index < length - 1 ? "," : "";
            return result += _.pick(item, "method")["method"] + suffix;
        }, "behavior!");

        const argumentsRef = _.reduce(behavior, (result, item, index) => {
            let suffix = index < length - 1 ? "," : "";
            let args = _.pick(item, "args")["args"];
            result.push(args);
            return result;
        }, []);

        return {
            apply: {
                $ref: behaviorRef,
                args: argumentsRef
            }
        }
    } else if (_.isObject(behavior)) {
        return behavior;
    }
}