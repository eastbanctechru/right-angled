var appRoot = 'src/';
var tsGlob = '**/*[!.][!d].ts';

module.exports = {
  root: appRoot,
  coverage: 'coverage/',
  docs: 'docs/',
  source: [appRoot + tsGlob],
  tests: ['tests/' + tsGlob],
  esmOutput: 'esm/',
};
