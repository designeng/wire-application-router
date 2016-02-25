import navigate from '../utils/navigate'

export default class AccessPolicyProcessor {
    askForAccess:(childContext) {
        const accessPolicy = childContext.accessPolicy;
        if(typeof(accessPolicy) !== 'undefined') {
            let access = accessPolicy.checkAccess();
            if(!access) {
                // access denied, take redirect if defined
                if(typeof(accessPolicy.getRedirect) !== 'undefined') {
                    // route hash should be replaced with the next route hash, without writing in browser history
                    if(childContext.__environmentVars__.replaceable) {
                        navigate(childContext.accessPolicy.getRedirect(), 'replace');
                    } else {
                        navigate(childContext.accessPolicy.getRedirect());
                    }
                }
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}
