(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'node_modules/rxjs',
        'ng2-bootstrap': 'node_modules/ng2-bootstrap',
        '@angular': 'node_modules/@angular',
        'e2e4': 'node_modules/e2e4',
        'moment': 'node_modules/moment/moment.js',
        'lodash': 'node_modules/lodash/lodash.js'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {
            format: 'register',
            defaultExtension: 'js'
        },
        'e2e4': {
            format: 'register',
            defaultExtension: 'js'
        },
        'rxjs': { defaultExtension: 'js' },
        'ng2-bootstrap': { defaultExtension: 'js' }
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade',
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    };

    System.config(config);

})(this);
