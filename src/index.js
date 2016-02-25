import _ from 'underscore';
import appRouterController from './appRouterController';
import pluginSpec from './default/spec';

const appRouterFactory = (resolver, compDef, wire) => {
    const essentialObjects = ["groundRoutes", "childRoutes"];
    essentialObjects.forEach(opt => {
        let option = compDef.options[opt];
        if (typeof(option) === 'undefined' || option === null){
            throw new Error("${opt} option should be provided for appRouter plugin usage!");
        }
        if (!_.isObject(option)){
            throw new Error("${opt} option should be Object type!");
        }
    });

    wire({
        appRouterController: {
            literal: appRouterController
        },
        root: {
            wire: {
                spec: pluginSpec,
                provide: {
                    pluginWireFn           : wire,
                    appRouterController    : {$ref: 'appRouterController'},
                    groundRoutes           : compDef.options.groundRoutes,
                    childRoutes            : compDef.options.childRoutes,
                    afterChildrenLoaded    : compDef.options.afterChildrenLoaded
                }
            }
        }
    }).then(context => {
        resolver.resolve(context);
    });
}

export default function RoutingSystemPlugin(options) {
    return {
        ready: (resolver, proxy, wire) => {
            resolver.resolve();
        },
        destroy: (resolver, proxy, wire) => {
            appRouterController.dispose();
            resolver.resolve();
        },
        factories: {
            appRouter: appRouterFactory
        }
    }
}