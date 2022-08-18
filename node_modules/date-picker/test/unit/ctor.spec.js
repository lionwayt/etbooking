describe('unit/ctor.spec.js', function() {
	var ctor = require('../helpers/date-picker')

	describe('When calling ctor', function() {
		it('should give the same result if called with or without new', function() {
			var withNew = new ctor()
			  , without = ctor()

			expect(withNew).to.have.property('show').and.be.a('function');
			expect(without).to.have.property('show').and.be.a('function');
		});

		describe('with options', function() {
			var dp
			  , date
			beforeEach(function() {
				var opts =
					{ date: date = new Date(2012, 0, 2)
					, unknown: 'option'
					};
				dp = ctor(opts);
			});
			it('should add the given options to the defaults', function() {
				expect(dp.options).to.have.property('unknown', 'option');
			});
			it('should allow overriding the defaults', function() {
				expect(dp.options.date).to.equal(date);
			});
		});
	});
});
