/* tslint:disable:jsdoc-format */
// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'e2e4': 'vendor/e2e4',
  'right-angled': 'vendor/right-angled',
  lodash: 'vendor/lodash/lodash.js',
  traceur: 'vendor/traceur/bin/traceur.js'
};

/** User packages configuration. */
const packages: any = {
  'e2e4': {
    defaultExtension: 'js',
    main: 'index.js'
  },
  'right-angled': {
    defaultExtension: 'js',
    main: 'index.js'
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'live-demo',
  'live-demo/shared'
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach(barrelName => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    main: 'main.js',
    rxjs: 'vendor/rxjs'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
