/**
 * elements don't return width/height in getBoundingClientRect().
 *   -> use some weird css-style sniffing and calculation
 */

describe('acceptance/ie8.spec.js', function() {
	var ctor = require('../helpers/date-picker')
	  , dp
	  , fakeFragment
	  , fakes = sinon.scope()

	beforeEach(function() {
		dp = ctor();

		fakeFragment = document.createDocumentFragment();
		fakes.stub(document, 'createDocumentFragment').returns(fakeFragment);
	});
	afterEach(function() {
		fakes.restore();
	});

	describe('When calculating the position in regards to an input', function() {
		var input

		beforeEach(function() {
			input = document.createElement('input')
			input.ownerDocument =
				{ documentElement:
				  { scrollTop: 1
				  , scrollLeft: 1
				  , clientTop: 1
				  , clientLeft: 1
				  }
				};
			input.currentStyle =
				{ paddingTop: '1px'
				, paddingBottom: '2px'
				, borderTop: '3px'
				, borderBottom: '4px'
				};
			// 13 because the values above evaluates to 10,
			// and when subtracted, we want to end with 3!
			input.offsetHeight = 13;

			// IE8 does not return the width/height of this
			sinon.stub(input, 'getBoundingClientRect').returns(
				{ top: 1
				, left: 2
				}
			);
		});
		it('should calculate the offset correctly', function() {
			var offset = dp.getOffset(input);
			expect(offset).to.approximate(
				{ top: 1
				, left: 2
				, height: 3
				}
			);
		});
	});

	/**
	 * IE8 does not supply an event-object to click-handlers,
	 * instead it adds a magic event-object that is almost a keyword.
	 * Also, this event-object does not have #target, instead it uses #srcElement.
	 */
	describe('When clicking on a "cell"', function() {
		var cells
		  , fakeEvent
		  , fakes = sinon.scope()

		beforeEach(function() {
			fakeEvent =
				{ srcElement: document.createElement('span')
				};
			fakeEvent.srcElement.getAttribute = sinon.stub();
			cells = {};

			fakeFragment.querySelector = sinon.stub();
			fakeFragment.querySelector.returns({});
			fakeFragment.querySelector.withArgs('.fzk-dp-cells').returns(cells);

			dp.render();

			// We don't care about arbitrary dates
			fakes.stub(ctor, 'parseDate').returns(new Date());
		});
		afterEach(function() {
			fakes.restore();
		});

		it('should call "change" listener with the date when clicking on cell', function() {
			var changeSpy = sinon.spy()
			  , fakeDate = new Date()

			dp.on('change', changeSpy);

			// Only this specific date is interesting
			ctor.parseDate.withArgs('date').returns(fakeDate)
			fakeEvent.srcElement.getAttribute
				.withArgs('data-date').returns('date');

			// instead of passing the event in, we will fake the "magical" event
			// property by binding it on global
			global.event = fakeEvent;
			cells.onclick();
			delete global.event;

			expect(changeSpy).to.have.been.calledWith(fakeDate);
		});
	});
});