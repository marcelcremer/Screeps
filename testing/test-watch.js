var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var JasmineConsoleReporter = require('jasmine-console-reporter');
process.stdout.write('\033c');
var reporter = new JasmineConsoleReporter({
  colors: 1, // (0|false)|(1|true)|2
  cleanStack: 1, // (0|false)|(1|true)|2|3
  verbosity: 4, // (0|false)|1|2|(3|true)|4
  listStyle: 'indent', // "flat"|"indent"
  activity: false
});
jasmine.addReporter(reporter);
jasmine.loadConfig({
  spec_dir: 'src',
  spec_files: ['**/*[sS]pec.js']
});
jasmine.execute();
