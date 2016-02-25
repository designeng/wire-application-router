import routeStrategy            from './default/routeStrategy'
import prepareBehavior          from './default/prepareBehavior'
import behaviorProcessor        from './default/behaviorProcessor'
import accessPolicyProcessor    from './default/accessPolicyProcessor'
import hasherInitializator      from './default/hasherInitializator'
import contextController        from './default/contextController'
import childContextProcessor    from './default/childContextProcessor'
import environment              from './default/environment'
import routeHandlerFactory      from './default/routeHandlerFactory'
import controller               from './default/controller'

export default {
    $plugins:[
        'wire/debug'
        'wire/aop'
    ],

    // noops:
    appRouterController: {
        parse: => {}
    },
    groundRoutes: {},
    childRoutes: {},
    pluginWireFn: {
        module: "wire"
    },
    afterChildrenLoaded: => {},
    // / noops

    // provided properties: [groundRoutes, childRoutes, pluginWireFn, appRouterController]

    routeStrategy: {
        create: routeStrategy,
        properties: {
            appRouterController         : {$ref: 'appRouterController'},
            childRoutes                 : {$ref: 'childRoutes'}
        }
    },

    prepareBehavior: {
        module: prepareBehavior
    },

    behaviorProcessor: {
        create: behaviorProcessor,
        properties: {
            pluginWireFn                : {$ref: 'pluginWireFn'}
        }
    },

    accessPolicyProcessor: {
        create: accessPolicyProcessor,
        properties: {
            pluginWireFn                : {$ref: 'pluginWireFn'}
        }
    },

    hasherInitializator: {
        create: hasherInitializator,
        properties: {
            appRouterController         : {$ref: 'appRouterController'}
        },
        after: {
            'parseHash'                 : 'contextController.onHashChanged'
        }
    },

    contextController: {
        create: contextController
        properties: {
            routeStrategy               : {$ref: 'routeStrategy'}
        }
    },

    childContextProcessor: {
        create: childContextProcessor,
        properties: {
            appRouterController         : {$ref: 'appRouterController'},
            routeStrategy               : {$ref: 'routeStrategy'},
            
            accessPolicyProcessor       : {$ref: 'accessPolicyProcessor'},
            prepareBehavior             : {$ref: 'prepareBehavior'},
            behaviorProcessor           : {$ref: 'behaviorProcessor'},
            environment                 : {$ref: 'environment'},
            pluginWireFn                : {$ref: 'pluginWireFn'},
            contextController           : {$ref: 'contextController'},
            afterChildrenLoaded         : {$ref: 'afterChildrenLoaded'}
        }
    },

    environment: {
        create: environment,
        properties: {
            pluginWireFn                : {$ref: 'pluginWireFn'}
        }
    },

    routeHandlerFactory: {
        create: routeHandlerFactory,
        properties: {
            contextController           : {$ref: 'contextController'},
            routeStrategy               : {$ref: 'routeStrategy'},
            childContextProcessor       : {$ref: 'childContextProcessor'},
            behaviorProcessor           : {$ref: 'behaviorProcessor'},
            environment                 : {$ref: 'environment'},
            groundRoutes                : {$ref: 'groundRoutes'},
            childRoutes                 : {$ref: 'childRoutes'}
        }
    },

    controller:
        create: controller,
        properties: {
            groundRoutes                : {$ref: 'groundRoutes'},
            routeHandlerFactory         : {$ref: 'routeHandlerFactory'}
        },
        afterFulfilling: {
            "registerGroundRoutes": "hasherInitializator.initialize"
        },
        ready: {
            registerGroundRoutes: {}
        }
}