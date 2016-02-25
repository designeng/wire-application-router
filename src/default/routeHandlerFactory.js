import _ from 'underscore';
import when from 'when';
import TasksFactory from './tasksFactory';
import navigateToError from '../utils/navigation/navigateToError';

export default class RouteHandlerFactory {

    constructor() {
        const tasks = [
            'defineChildObject',
            'getCached',
            'loadNotCached',
            'sequenceBehavior'
        ]
        this.tasksFactory = new TasksFactory(this, tasks);
    }

    // public method
    createHandler(routeObject) {
        this.tasksFactory.runTasks(routeObject);
    }

    // tasks
    defineChildObject(routeObject) {
        this.child = this.routeStrategy.getChild(routeObject.route);

        this.contextController.startContextHashRevision(this.child);
        return routeObject;
    }

    getCached(routeObject) {
        const deferred = When.defer();
        const parentContext = this.contextController.getRegistredContext(this.child.route, 'parent');

        if(parentContext != null) {
            this.processChildRoute(parentContext, this.child);
            deferred.reject('CACHED');
        } else {
            deferred.resolve(routeObject);
        }
        return deferred.promise;
    }

    loadNotCached(routeObject) {
        let environment = {
            slot: routeObject.slot
        }

        when(this.environment.loadInEnvironment(routeObject.spec, routeObject.mergeWith, environment))
            .then(parentContext => {
                this.processChildRoute(parentContext);
                return parentContext;
            })
            .otherwise(error => navigateToError('js', error));
    }

    // 'Route' - not 'routes' - in method name, because only one child
    // should be choosed from this.childRoutes by filterStrategy in routeHandler
    // this.param {WireContext} context
    // this.param {WireContext} child - object form childRoutes, choosed by filterStrategy
    processChildRoute(context) {
        let bundle = [];
        bundle.push(this.child);

        const findDefinitionInRoutes = (childRoutes, attributes, routeMask) => {
            const route = this.routeStrategy.getComponentRoute(attributes.spec, routeMask);
            if(typeof(route) !== 'undefined') {
                definition = childRoutes[route];
                definition['route'] = route;
                return definition;
            } else {
                throw new Error('Component definition not found in childRoutes!');
            }
        }

        if(_.isString(this.child.relative)) {
            relativeComponentDefinition = findDefinitionInRoutes(this.childRoutes, {spec: this.child.relative}, this.child.route)
            bundle.push(relativeComponentDefinition);

        } else if (_.isArray(this.child.relative)) {
            _.each(this.child.relative, (relativeItem) => {
                let relativeComponentDefinition = {};
                if(_.isString(relativeItem)) {
                    relativeComponentDefinition = findDefinitionInRoutes(this.childRoutes, {spec: relativeItem}, this.child.route);
                } else if(_.isObject(relativeItem)) {
                    relativeComponentDefinition = findDefinitionInRoutes(this.childRoutes, {spec: relativeItem.spec}, this.child.route);
                }
                bundle.push(relativeComponentDefinition);
            });
        }

        this.childContextProcessor.deliver(context, bundle);
    }

    sequenceBehavior(context) {
        return (context.behavior ? this.behaviorProcessor.sequenceBehavior(context) : context);
    }
}