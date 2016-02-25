import crossroads from 'crossroads';
import navigateToError from './utils/navigation/navigateToError';

let appRouterController;

class AppRouterController {

    constructor() {
        const router = crossroads.create();

        router.bypassed.add((route) => { 
            navigateToError("404", "The page with route #{route} you tried to access does not exist");
        });

        router.getCurrentRoute = () => {
            return this._prevRoutes[0];
        }

        router.resetPreviousRoutes = () => {
            this._prevRoutes = [];
        }

        return router;
    }
}

appRouterController = typeof(appRouterController) === 'undefined' ? new AppRouterController() : appRouterController;

export default appRouterController;