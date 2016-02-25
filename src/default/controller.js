import _ from 'underscore';
import when from 'when';
import Route from './route';

export default class Controller {
    registerGroundRoutes() {
        _.forEach(this.groundRoutes, (routeValue, routeKey) => {
            const routeObject = _.extend({}, routeValue, {route: routeKey});

            const routeHandler = (routeObject => {
                return () => this.routeHandlerFactory.createHandler(routeObject);
            })(routeObject);

            // register route
            new Route(routeKey, routeValue.rules, routeHandler);
        });
    }
}