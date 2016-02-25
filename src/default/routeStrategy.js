import _ from 'underscore';

let memoGroupedByLength = null;

const getRouteFragments = route => route.split("/")

const withoutTheLast = (array) => _.initial(array)

// start find base route recursive
// this.param {String} route
// this.fragments {Array} route fragments
// this.param {Number} level - length of route fragments
const getBaseRouteRecursive = (route, fragments, level) => {
    if(level == 1) {
        // it's the base itself
        return route;
    } else {
        let base = _.where(memoGroupedByLength[level], {route: route, base: true})[0];
        if(base != null) {
            return base.route;
        } else {
            let parentFragments = withoutTheLast(fragments);
            getBaseRouteRecursive(parentFragments.join("/"), parentFragments, parentFragments.length);
        }
    }
}

const scanZipped = (memo, pair) => {
    let first = pair[0];
    let last  = pair[1];

    if(_.isUndefined(first)){
        return memo * 0;
    }

    if(first.match("\\{(.*)}") && !_.isUndefined(last)){
        return memo * 1;
    }

    if(first != last) {
        return memo * 0;
    } else {
        return memo * 1;
    }
}

const getCurrentRoute = () => {
    return this.appRouterController.getCurrentRoute()
}

export default class RouteStrategy {

    constructor(options) {
        if(typeof(options) !== 'undefined') {
            this.childRoutes  = options.childRoutes;
            this.groundRoutes = options.groundRoutes;
        }
    }

    // not used yet
    groupByLength() {
        return _.groupBy(_.keys(this.childRoutes), route => getRouteFragments(route).length);
    }


    getComponentRoute(spec, routeMask) {
        return _.findKey(this.childRoutes, (routeObject, routeKey) => {
            let condition;
            if(routeMask.length < routeKey.length) {
                condition = (routeKey.substring(0, routeMask.length) == routeMask);
            } else {
                condition = (routeMask.substring(0, routeKey.length) == routeKey);
            }
            return routeObject.spec == spec && condition;
        });
    }

    getBaseRoute(route) {
        // memoize childRoutes groups by fragment length
        if !memoGroupedByLength?
            const keys    = _.keys(this.childRoutes);
            memoGroupedByLength = _.reduce(keys, (result, item, index) => {
                const fragmentsLength = getRouteFragments(item).length;

                if (result[fragmentsLength] == null) {
                    result[fragmentsLength] = [];
                }

                element = {
                    route: item
                }
                
                if(typeof(this.childRoutes[item].base) !== 'undefined') {
                    element["base"] = true;
                }

                result[fragmentsLength].push(element);
                return result;
            }, {});
            
        const fragments = getRouteFragments(route);
        const baseRoute = getBaseRouteRecursive(route, fragments, fragments.length);
        return baseRoute;
    }

    getChild(route) {
        const routeParams = getCurrentRoute.call(this.).params;
        const childRoutesKeys = _.keys(this.childRoutes);

        childRoutesKeys.forEach( routeKey => {
            fragments = routeKey.split("/");
            zipped = _.zip(fragments, routeParams);

            // res in result will be 1 or 0
            // 1 - routeKey is matched to currentRoute, 0 - not matched

            const res = _.reduce(zipped, scanZipped, 1);

            if(res) {
                let childRouteObject = this.childRoutes[routeKey];
                childRouteObject.route = routeKey;
                childRouteObject.params = routeParams;
                return childRouteObject;
            }

        });

        return undefined;
    }
}