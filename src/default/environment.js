import _ from 'underscore';
import when from 'when';

export default class Environment {
    loadModule(moduleId) {
        this.pluginWireFn.loadModule(moduleId).then(
            resultContext => resultContext,
            error => navigateToError('js', error)
        )
    }

    // @param {String} specId - the primary target specificationId
    // @param {String | Array} mergeWith - id(s) of merging specification(s)
    // @return {Array of promises}
    getMergedModulesArrayOfPromises(specId, mergeWith) {
        let promisedModules = []
        promisedModules.push(this.loadModule(specId))
            
        if(mergeWith){
            if(_.isString(mergeWith)){
                promisedModules.push(this.loadModule(mergeWith))
            }
            else if(_.isArray(mergeWith)){
                mergeWith.forEach(mergingModule => {
                    promisedModules.push(this.loadModule(mergingModule))
                })
            }
            else {
                throw new Error('mergeWith option has unsupported format!')
            }
        }

        return promisedModules
    }

    applyEnvironment(object, environment) {
        object = _.extend(object, environment)
        if(typeof(environment.behavior != 'undefined')) {
            if(!object.$plugins) {
                object.$plugins = [];
            }
            object.$plugins.push('core/plugin/behavior');
        }
        return object
    }

    // @param {String} specId - spec field in route configuration
    // @param {Array | String} mergeWith - module id(s) of merging with target spec specifications
    // @param {Object} environment - object of fields for result context to be extended with
    // @return {Promise}
    loadInEnvironment(specId, mergeWith, environment, parentContext) {
        promisedModules = this.getMergedModulesArrayOfPromises(specId, mergeWith)
        next = context => context;
        return when.all(promisedModules).then(
            modulesResult => {
                // 0 item is leftmost; left is win in merging; so to set environment to [0] is enough
                modulesResult[0] = this.applyEnvironment(modulesResult[0], environment);
                if(!parentContext){
                    this.pluginWireFn.createChild(modulesResult).then(next);
                }
                else {
                    parentContext.wire(modulesResult).then(next);
                }
            },
            reason => console.debug('Environment::loadInEnvironment reject reason:', reason)
        );
    }
}