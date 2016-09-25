var appRoot = 'src/';
var tsGlob = '**/*[!.][!d].ts';

module.exports = {
  coverage: 'coverage/',
  docs: 'docs/',
  source: [appRoot + tsGlob],
  tests: ['tests/' + tsGlob],
  esmOutput: 'esm/',
};
