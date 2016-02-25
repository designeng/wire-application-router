import appRouterController from '../appRouterController';

export default class Route {
    constructor(route, rules, handler) {
        this._route = appRouterController.addRoute(route);
        this.applyRules(rules);
        this.applyHandler(handler);
    }

    applyRules(rules) {
        this._route.rules = rules;
    }

    applyHandler(handler) {
        this._route.matched.add(handler);
    }
}