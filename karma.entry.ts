import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'typescript/lib/typescript';

declare var __karma__: any;
declare var require: any;

__karma__.loaded = function () {};


Promise.all([
  require('@angular/core/testing'),
  require('@angular/platform-browser-dynamic/testing')
])
  .then(([testing, testingBrowser]) => {
    testing.getTestBed().initTestEnvironment(
      testingBrowser.BrowserDynamicTestingModule,
      testingBrowser.platformBrowserDynamicTesting()
    );
  })
  .then(() => require.context('./tests/', true, /\.test\.ts/))
  .then(context => context.keys().map(context))
  .then(__karma__.start, __karma__.error);
