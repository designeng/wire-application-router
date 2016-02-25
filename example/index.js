wire({
    $plugins: [
        wireDebugPlugin,
        wireRoutingSystemPlugin
    ],

    groundRoutes: {
        module: groundRoutes
    },

    childRoutes: {
        module: childRoutes
    },

    router: {
        appRouter: {
            groundRoutes: {$ref: 'groundRoutes'},
            childRoutes: {$ref: 'childRoutes'}
        }
    }
})
.then(context => {

})
.otherwise(error => console.log("ERROR::::", error))