import hasher from 'hasher';
import navigate from '../utils/navigate';

export default class HasherInitializator {

    parseHash(newHash, oldHash) {
        if(newHash.slice(-1) == '/') {
            navigate(newHash.slice(0, -1), 'replace');
            return undefined;
        }

        this.appRouterController.parse(newHash);
        return { newHash, oldHash }
    }

    initialize() {
        hasher.initialized.add(this.parseHash);
        hasher.changed.add(this.parseHash);

        hasher.prependHash = '';
        hasher.init();
    }
}