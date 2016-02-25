import _ from 'underscore';
import when from 'when';
import Route from './route';

export default class Controller {
    registerGroundRoutes() {
        this.__routes__ = [];
        _.forEach(this.groundRoutes, (routeValue, routeKey) => {

            const routeObject = _.extend({}, routeValue, {route: routeKey});

            const routeHandler = (routeObject => {
                return () => this.routeHandlerFactory.createHandler(routeObject);
            })(routeObject);

            // register route
            this.__routes__.push(new Route(routeKey, routeValue.rules, routeHandler));
        });
    }
}