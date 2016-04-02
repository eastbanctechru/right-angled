System.config({
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        },
        e2e4:{
            format: 'register',
            defaultExtension: 'js'
        }
    },
    map:{
        'e2e4': 'node_modules/e2e4',
        'lodash': 'node_modules/lodash/lodash.js'
    }
});