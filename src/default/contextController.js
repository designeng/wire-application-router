import _ from 'underscore';
import Collection from '../../../utils/collection';

// TODO: merge with contextHashController?

let currentParams = [];

const _contextHash = new Collection();

export default class ContextController {

    updateCachedItem(route, options) {
        let cachedContext = _contextHash.find({route: route});

        if (typeof cachedContext === "undefined" || cachedContext === null) {
            _contextHash.addItem(_.extend({
                route: route
            }, options));
        } else {
            _contextHash.update({
                route: route
            }, options);
        }
    }

    register(parentContext, childContext, child) {
        // registration enter point (key): child.route

        // TODO: for "search/{searchId}/offer/{offerId}" now baseRoute="search" - is it wrong? (TODO: set 'base' option)

        // first get base route for the current route
        const baseRoute = this.routeStrategy.getBaseRoute(child.route);

        const hash = child.params?["input"];

        // parent context and child context can be cached in different route keys
        this.updateCachedItem(baseRoute, { parentContext, hash });
        this.updateCachedItem(child.route, { childContext, hash });
    }

    unregister(route) {
        // begin from child
        const types = ["child", "parent"];
        _.each(types, (type) => {
            context = this.getRegistredContext(route, type);
            context?.destroy();
        }
        _contextHash.reset();
    }

    // @param {Object} parsedHashObject
    //       - @param {Strins} parsedHashObject.newHash
    //       - @param {Strins} parsedHashObject.oldHash
    onHashChanged(parsedHashObject) {
        this.destroyOnBlur(parsedHashObject.oldHash);
    }

    // this.param {Strins} hash
    destroyOnBlur(hash) {
        let cachedItemWithChildContext, item, ref;
        const cachedItems = _contextHash.where({hash: hash});
        item = cachedItemWithChildContext = _.filter(cachedItems, function(item) {
            return item["childContext"] != null;
        })[0];

        if ((typeof item !== "undefined" && item !== null) && ((ref = item["childContext"]) != null ? ref.__environmentVars__.destroyOnBlur : void 0)) {
            item["childContext"].destroy();
            _contextHash.remove(item["_id"]);
        }
    }

    clearCache() {
        _contextHash.each(function(item) {
            var ref, ref1;
            if ((ref = item["childContext"]) != null) {
                ref.destroy();
            }
            return (ref1 = item["parentContext"]) != null ? ref1.destroy() : void 0;
        });
        _contextHash.reset();
    }

    // route = child.route
    getRegistredContext(route, type) {
        var baseRoute, ref, ref1;
        if (type === "parent") {
            baseRoute = this.routeStrategy.getBaseRoute(route);
            return (ref = _contextHash.find({
                route: baseRoute
            })) != null ? ref.parentContext : void 0;
        } else if (type === "child") {
            return (ref1 = _contextHash.find({
                route: route
            })) != null ? ref1.childContext : void 0;
        }
    }

    // TODO: remove if not used 
    // context duck-typing
    ensureContext(context) {
        return (context.destroy && context.resolve && context.wire ? true : false);
    }

    startContextHashRevision(child) {
        const positions = this.calculatePositions(child);

        // it should be always different, checking is not needed in general
        if(!this.theSame(child.params, currentParams)) {
            const mutations = this.indexesOfMutation(child.params, currentParams);
            if(this.changesOccurred(mutations, positions)) {
                this.unregister(child.route);
                currentParams = child.params;
            }
        }
    }

    guessContextResetRoutePositions(route) {
        fragments = this.normalizeRoute(route);
        return _.reduce(fragments, (result, item, index) => {
            item.match("\\{(.*)}") ? result.push(index) : void 0;
            return result;
        }, []);
    }

    normalizeRoute(route) {
        return (_.isArray(route) ? route : (_.isString(route) ? route.split "/" : void 0));
    }

    validate(emphasizedPositions, positions) {
        return _.reduce(emphasizedPositions, (result, positionValue) => {
            return (_.indexOf(positions, positionValue) == -1 ? result * 0 : result);
        }, 1);
    }

    // option 'contextResetRoutePositions' described in childRoutes options comment.
    calculatePositions(child) {
        let positions = this.guessContextResetRoutePositions(child.route);
        let emphasizedPositions = child.contextResetRoutePositions;
        if (emphasizedPositions) {
            let isValid = this.validate(emphasizedPositions, positions);
            if (!isValid) {
                throw new Error("Provided for child route '" + child.route + "' contextResetRoutePositions is not valid!");
            }
        return emphasizedPositions;
        } else {
            return positions;
        }
    }

    // @param {Array} a
    // @param {Array} b
    // @returns {Boolean}
    theSame(a, b) {
        return _.all(_.zip(a, b), x => x[0] === x[1]);
    }

    // @param {Array} a
    // @param {Array} b
    // @returns {Array}
    indexesOfMutation(a, b) {
        return _.reduce(_.zip(a, b), (result, item, index) => {
            return (item[0] != item[1] ? result.push(index) : result);
        }, []);
    }

    changesOccurred(mutations, positions) {
        return !!_.intersection(mutations, positions).length;
    }
}