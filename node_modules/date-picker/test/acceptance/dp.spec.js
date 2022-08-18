/**
 * These tests stretch the limits by faking various browser-states
 */
describe('acceptance/dp.spec.js', function() {
	var ctor = require('../helpers/date-picker')
	  , dp

	describe('When creating a new instance', function() {
		var orgs
		beforeEach(function() {
			orgs =
				{ bind: Function.prototype.bind
				, keys: Object.keys
				, forEach: Array.prototype.forEach
				};
			Function.prototype.bind = null;
			Object.keys = null;
			Array.prototype.forEach = null;

			var frag = document.createDocumentFragment();
			sinon.stub(frag, 'querySelector');
			sinon.stub(document, 'createDocumentFragment').returns(frag);
			frag.querySelector.returns(document.createElement('button'));
		});
		afterEach(function() {
			Function.prototype.bind = orgs.bind;
			Object.keys = orgs.keys;
			Array.prototype.forEach = orgs.forEach;

			document.createDocumentFragment.restore();
		});

		/**
		 * This test is there because the functions disabled in beforeEach is
		 * not there in one or more of the following browsers:
		 * - iOS < 6
		 * - Safari < 6
		 * - IE < 9
		 */
		it('should not throw', function() {
			new ctor({}).show(document.createElement('div'));
		});
	});
});