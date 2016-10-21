var appRoot = 'src/';
var tsGlob = '**/*[!.][!d].ts';

module.exports = {
  coverage: 'coverage/',
  compiled: 'compiled/',
  docs: 'docs/',
  source: [appRoot + tsGlob],
  tests: ['tests/' + tsGlob]
};
