describe('unit/input-bind.spec.js', function() {
	var ctor = require('../helpers/date-picker')
	  , dp
	  , inputElm

	  , fakeFragment
	  , fakes = sinon.scope()

	beforeEach(function() {
		fakeFragment = document.createDocumentFragment();
		fakeFragment.querySelector = sinon.stub();
		fakeFragment.querySelector.returns(document.createElement('button'));

		fakes.stub(document, 'createDocumentFragment').returns(fakeFragment);

		inputElm = document.createElement('input');
		inputElm.getBoundingClientRect = sinon.stub();
		// These are the values we care about. More are returned by real browsers!
		inputElm.getBoundingClientRect.returns({ top: 0, left: 0, height: 0 });

		dp = ctor({ dateFormat: 'd - M - y' });
	});
	afterEach(function() {
		fakes.restore();
	});

	describe('When showing on an input', function() {
		var nextBtn
		  , prevBtn
		  , fakes = sinon.scope()

		beforeEach(function() {
			nextBtn = document.createElement('button');
			fakeFragment.querySelector.withArgs('.fzk-dp-btn-nxt')
				.returns(nextBtn);
			prevBtn = document.createElement('button');
			fakeFragment.querySelector.withArgs('.fzk-dp-btn-prv')
				.returns(prevBtn);

			fakes.stub(document.body, 'appendChild');

			inputElm.value = '04 - 2 - 2012';
			fakes.spy(ctor, 'parseDate');
			dp.show(inputElm);
		});
		afterEach(function() {
			fakes.restore();
		});
		it('should attach to body', function() {
			expect(document.body.appendChild).to.have.been.called;
		});
		it('should use the input-value', function() {
			expect(ctor.parseDate).to.have.been.calledWith('04 - 2 - 2012');
		});

		describe('and next/prev is clicked', function() {
			it('should move to next', function() {
				nextBtn.onclick();
				// month -1 because of JS dates.
				expect(dp._visibleDate.getMonth()).to.equal(2);
			});
			it('should move to prev', function() {
				prevBtn.onclick();
				// month -1 because of JS dates.
				expect(dp._visibleDate.getMonth()).to.equal(0);
			});
		});
	});
	describe('When clicking a cell', function() {
		var fakeEvent
		  , cells

		beforeEach(function() {
			cells = document.createElement('div');
			fakeFragment.querySelector.withArgs('.fzk-dp-cells').returns(cells);

			fakeEvent =
				{ target: document.createElement('span')
				};
			fakeEvent.target.getAttribute = sinon.stub();
			fakeEvent.target.getAttribute.withArgs('data-date').returns('2012/04/05');

			dp.show(inputElm);
		});
		it('should update the input', function() {
			cells.onclick(fakeEvent);
			expect(inputElm.value).to.equal('05 - 4 - 2012');
		});
	});
});
