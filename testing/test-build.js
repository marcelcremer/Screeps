var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var reporters = require('jasmine-reporters');
var junitReporter = new reporters.JUnitXmlReporter({
  savePath: __dirname + '/test-reports',
  consolidateAll: false
});
jasmine.addReporter(junitReporter);
jasmine.loadConfig({
  spec_dir: 'src',
  spec_files: ['**/*[sS]pec.js']
});
jasmine.execute();
