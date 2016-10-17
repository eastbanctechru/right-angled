require('es6-shim');
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

require('typescript/lib/typescript');

//  const browserTesting = require('@angular/platform-browser-dynamic/testing');
//  const coreTesting = require('@angular/core/testing');
 
// alert(browserTesting.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);

// coreTesting.setBaseTestProviders(
//     browserTesting.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
//     browserTesting.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
// );

const context = require.context('./tests/', true, /\.spec\.ts$/);

context.keys().forEach(context);

Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;