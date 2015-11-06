var dsTestCases = require('mesh-ds-bus-test-cases');
var MemoryDsBus = require('./index');

dsTestCases.create(MemoryDsBus).forEach(function(tc) {
    it(tc.description, tc.run);
});
