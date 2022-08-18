describe('unit/render.spec.js', function() {
	var ctor = require('../helpers/date-picker')
	  , dp
	  , fakeFragment
	  , fakes = sinon.scope()

	beforeEach(function() {
		dp = ctor();

		fakeFragment = document.createDocumentFragment();
		fakeFragment.querySelector = sinon.stub();
		fakes.stub(document, 'createDocumentFragment').returns(fakeFragment);
	});
	afterEach(function() {
		fakes.restore();
	});

	describe('When calling "render()"', function() {
		var fakeCell
		  , fakes

		beforeEach(function() {
			fakes = sinon.scope()

			fakeCell = document.createElement('span');
			fakes.spy(fakeCell, 'setAttribute');
			/**
			 * We need to stub this to not break the DOM
			 * (it throws exception when append an element to itself,
			 *  and this is the only element returned by the stub)
			 */
			fakes.stub(fakeCell, 'appendChild');

			fakes.stub(document, 'createElement').returns(fakeCell);

			fakeFragment.querySelector.returns({});

			/**
			 * This date is within february.
			 * It should build and append the entire month
			 */
			dp = ctor({ date: new Date(2012, 1, 12) });
			dp.render();
		});
		afterEach(function() {
			fakes.restore();
		});
		it('should set the expected date as data-values on the cells', function() {
			// The expected date is an arbitrary date in february
			expect(fakeCell.setAttribute)
				.to.have.been.calledWith('data-date', '2012/02/04');
		});
	});

	describe('When adding event listeners', function() {
		var next
		  , prev
		  , cells

		beforeEach(function() {
			next = {};
			prev = {};
			cells = {};

			fakeFragment.querySelector.withArgs('.fzk-dp-btn-nxt').returns(next);
			fakeFragment.querySelector.withArgs('.fzk-dp-btn-prv').returns(prev);
			fakeFragment.querySelector.withArgs('.fzk-dp-cells').returns(cells);

			dp.render();
		});

		it('should bind onclick to next', function() {
			expect(next).to.have.property('onclick').and.to.be.a('function');
		});
		it('should bind onclick to prev', function() {
			expect(prev).to.have.property('onclick').and.to.be.a('function');
		});
		it('should bind onclick to cells', function() {
			expect(cells).to.have.property('onclick').and.to.be.a('function');
		});
	});

	describe('When clicking on a "cell"', function() {
		var cells
		  , fakeEvent

		beforeEach(function() {
			fakeEvent =
				{ target: document.createElement('span')
				};
			fakeEvent.target.getAttribute = sinon.stub();
			cells = {};

			fakeFragment.querySelector.returns({});
			fakeFragment.querySelector.withArgs('.fzk-dp-cells').returns(cells);

			dp.render();

			// We don't care about arbitrary dates
			sinon.stub(ctor, 'parseDate').returns(new Date());
		});
		afterEach(function() {
			ctor.parseDate.restore();
		});
		it('should call "change" listener with the date when clicking on cell', function() {
			var changeSpy = sinon.spy()
			  , fakeDate = new Date()

			// Only this specific date is interesting
			ctor.parseDate.withArgs('date').returns(fakeDate)

			fakeEvent.target.getAttribute
				.withArgs('data-date').returns('date');

			dp.on('change', changeSpy);
			cells.onclick(fakeEvent);

			expect(changeSpy).to.have.been.calledWith(fakeDate);
		});
		it('should not emit "show" event', function() {
			var showSpy = sinon.spy()

			dp.on('show', showSpy);
			cells.onclick(fakeEvent);

			expect(showSpy).not.to.have.been.called;
		});
	});

	describe('When calling rerender()', function() {
		var container

		beforeEach(function() {
			// For some reason, the normal fakeFragment fails on iOS 5.
			// This workaround makes the test pass.
			fakeFragment =
				{ querySelector: function() { return {} }
				, appendChild:function() {}
				};
			document.createDocumentFragment.returns(fakeFragment)

			container = document.createElement('div');
			container.appendChild = sinon.spy();
			dp.container = container;

			dp.rerender();
		});
		it('should add the fragment from render() to "this.container"', function() {
			expect(container.appendChild).to.have.been.calledWith(fakeFragment);
		});
	});
});
