global.chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon');

require('./helpers/sinon').extend(sinon);

chai.use(require('sinon-chai'));
require('./helpers/chai').addMethods(chai);
