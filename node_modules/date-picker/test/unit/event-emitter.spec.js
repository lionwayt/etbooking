describe('unit/event-emitter.spec.js', function() {
	var ctor = require('../helpers/date-picker')
	  , dp

	beforeEach(function() {
		dp = new ctor();
	});

	describe('When calling emit()', function() {
		var spy
		beforeEach(function() {
			spy = sinon.spy();
		});
		describe('without listeners', function() {
			it('should not throw', function() {
				expect(function() {
					dp.emit('event');
				}).not.to['throw']();
			});
		});
		describe('with listener', function() {
			beforeEach(function() {
				dp.on('event', spy);
				dp.emit('event', 1, 2, 3);
			});
			it('should call the listener', function() {
				expect(spy).to.have.been.called;
			});
			it('should pass the parameters', function() {
				expect(spy).to.have.been.calledWithExactly(1, 2, 3);
			});
		});
		describe('with multiple listeners', function() {
			var spy2
			beforeEach(function() {
				spy2 = sinon.spy();
				dp.on('event', spy).on('event', spy2);
				dp.emit('event');
			});
			it('should call both listeners', function() {
				expect(spy).to.have.been.called;
				expect(spy2).to.have.been.called;
			});
		});
	});

	describe('When calling on()', function() {
		var spy
		beforeEach(function() {
			spy = sinon.spy();
		});
		it('should not throw', function() {
			expect(function() {
				dp.on('event', spy);
			}).not.to['throw']();
		});
		it('should return the date-picker for chaining', function() {
			expect(dp.on('event', spy))
				.to.equal(dp);
		});
		it('should throw if not passed a callback', function() {
			expect(function() {
				dp.on('event');
			}).to['throw']();
		});
	});

	describe('When calling off()', function() {
		var spy
		beforeEach(function() {
			spy = sinon.spy();
		});
		it('should not throw', function() {
			expect(function() {
				dp.off('event', spy);
			}).not.to['throw']();
		});
		it('should remove an added listener', function() {
			dp
				.on('event', spy)
				.off('event', spy)
				.emit('event');
			expect(spy).not.to.have.been.called;
		});
		it('should not remove other listeners', function() {
			dp
				.on('event', spy)
				.off('event', function() {})
				.emit('event');
			expect(spy).to.have.been.called;
		});
	});
});