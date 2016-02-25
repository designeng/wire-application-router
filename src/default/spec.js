import wireDebugPlugin          from 'essential-wire/source/debug';
import wireAopPlugin            from 'essential-wire/source/aop';

import routeStrategy            from './routeStrategy';
import prepareBehavior          from './prepareBehavior';
import behaviorProcessor        from './behaviorProcessor';
import accessPolicyProcessor    from './accessPolicyProcessor';
import hasherInitializator      from './hasherInitializator';
import contextController        from './contextController';
import childContextProcessor    from './childContextProcessor';
import environment              from './environment';
import routeHandlerFactory      from './routeHandlerFactory';
import controller               from './controller';

export default {
    $plugins:[
        wireDebugPlugin,
        wireAopPlugin
    ],

    // noops:
    appRouterController: {
        parse: () => {}
    },
    groundRoutes: {},
    childRoutes: {},
    pluginWireFn: {
        module: "wire"
    },
    afterChildrenLoaded: () => {},
    // / noops

    // provided properties: [groundRoutes, childRoutes, pluginWireFn, appRouterController]

    routeStrategy: {
        create: {
            module: routeStrategy,
            isConstructor: true
        },
        properties: {
            appRouterController         : {$ref: 'appRouterController'},
            childRoutes                 : {$ref: 'childRoutes'}
        }
    },

    prepareBehavior: {
        module: prepareBehavior
    },

    behaviorProcessor: {
        create: {
            module: behaviorProcessor,
            isConstructor: true
        },
        properties: {
            pluginWireFn                : {$ref: 'pluginWireFn'}
        }
    },

    accessPolicyProcessor: {
        create: {
            module: accessPolicyProcessor,
            isConstructor: true
        },
        properties: {
            pluginWireFn                : {$ref: 'pluginWireFn'}
        }
    },

    hasherInitializator: {
        create: {
            module: hasherInitializator,
            isConstructor: true
        },
        properties: {
            appRouterController         : {$ref: 'appRouterController'}
        },
        after: {
            'parseHash'                 : 'contextController.onHashChanged'
        }
    },

    contextController: {
        create: {
            module: contextController,
            isConstructor: true
        },
        properties: {
            routeStrategy               : {$ref: 'routeStrategy'}
        }
    },

    childContextProcessor: {
        create: {
            module: childContextProcessor,
            isConstructor: true
        },
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
        create: {
            module: environment,
            isConstructor: true
        },
        properties: {
            pluginWireFn                : {$ref: 'pluginWireFn'}
        }
    },

    routeHandlerFactory: {
        create: {
            module: routeHandlerFactory,
            isConstructor: true
        },
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

    controller: {
        create: {
            module: controller,
            isConstructor: true
        },
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
}