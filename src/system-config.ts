/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'e2e4': 'vendor/e2e4',
  'right-angled': 'right-angled',
  'moment': 'vendor/moment/moment.js',
  'lodash': 'vendor/lodash/lodash.js',
  'ng2-bootstrap': 'vendor/ng2-bootstrap',
  '@angular/router-deprecated': 'vendor/@angular/router-deprecated',
};

/** User packages configuration. */
const packages: any = {
  'e2e4': {
    main: 'index.js',
    defaultExtension: 'js'
  },
  'right-angled': {
    defaultExtension: 'js'
  },
  'ng2-bootstrap': { defaultExtension: 'js' },
  '@angular/router-deprecated': { main: 'index.js', defaultExtension: 'js' }
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
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/master-detail-sample',
  'app/paged-list-sample',
  'app/buffered-list-sample',
  'app/simple-list-sample',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
