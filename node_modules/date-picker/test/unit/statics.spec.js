// This tests the static functions exposed on the DatePicker constructor
describe('unit/statics.spec.js', function() {
	var ctor = require('../helpers/date-picker')

	describe('When calling formatDate(date, format)', function() {
		var date
		beforeEach(function() {
			date = new Date(2012, 3, 5);
		});
		it('should return a string', function() {
			var result = ctor.formatDate(date, 'y/m/d')
			expect(result).to.equal('2012/04/05');
		});
		it('should format any format-string', function() {
			var result = ctor.formatDate(date, 'Y Month D')
			expect(result).to.equal('12 4onth 5');
		});
	});

	describe('When calling parseDate(date, format)', function() {
		it('should return a date-object', function() {
			var result = ctor.parseDate('2012/04/03', 'y/m/d')
			expect(result).to.be.a('date');
		});
		it('should work with the default format', function() {
			var result = ctor.parseDate('2012/04/03', 'y/m/d')
			expect(result.getFullYear()).to.equal(2012);
			// JavaScript months go from 0->11, not 1->12!
			expect(result.getMonth()).to.equal(3);
			expect(result.getDate()).to.equal(3);
		});
		it('should parse a variant format correctly', function() {
			var result = ctor.parseDate('4/06 - 2012', 'D/M - y')
			expect(result.getFullYear()).to.equal(2012);
			// JavaScript months go from 0->11, not 1->12!
			expect(result.getMonth()).to.equal(5);
			expect(result.getDate()).to.equal(4);
		});
		it('should understand short years correctly', function() {
			var result = ctor.parseDate('4/6 - 12', 'D/M - Y')
			expect(result.getFullYear()).to.equal(2012);

			result = ctor.parseDate('4/6 - 49', 'D/M - Y')
			expect(result.getFullYear()).to.equal(1949);

			result = ctor.parseDate('4/6 - 89', 'D/M - Y')
			expect(result.getFullYear()).to.equal(1989);
		});
	});

	describe('When calling getCurrentMonth() with january 11th', function() {
		var result
		  , opts
		beforeEach(function() {
			var date = new Date(2012, 0, 11)
			result = ctor.getCurrentMonth(date, opts);
		});
		it('should return all days in the month', function() {
			expect(result.length).to.equal(31);
		});
		it('should mark the exact date as the current', function() {
			// current is 10 because date (11) - 1 (to get index from 0)
			expect(result[10]).to.have.property('current').and.to.be.ok;
		});
		it('should have no other current date', function() {
			// current is 10 because date (11) - 1 (to get index from 0)
			delete result[10];
			expect(result.some(function(date) { return date.current }))
				.not.to.be.ok;
		});
		it('should format the dates properly', function() {
			expect(result[2]).to.approximate(
				{ date: '03'
				, fullDate: '2012/01/03'
				}
			);
		});
	});

	describe('When calling getOverflowNext() with weeks starting on wednesday', function() {
		var result
		  , opts
		beforeEach(function() {
			opts =
				{ weekStart: 3 }
		});
		describe('and the last day is a thursday', function() {
			beforeEach(function() {
				var now = new Date(2012, 4, 1)
				result = ctor.getOverflowNext(now, opts)
			});
			it('should return three days', function() {
				expect(result.length).to.equal(5);
			});
			it('should date the days properly', function() {
				expect(result).to.approximate(
					[ { date: '01'
					  , fullDate: '2012/06/01'
					  }
					, { date: '02'
					  , fullDate: '2012/06/02'
					  }
					, { date: '03'
					  , fullDate: '2012/06/03'
					  }
					, { date: '04'
					  , fullDate: '2012/06/04'
					  }
					, { date: '05'
					  , fullDate: '2012/06/05'
					  }
					]
				);
			});
		});
		describe('and the last day is a saturday', function() {
			beforeEach(function() {
				var now = new Date(2012, 2, 1)
				result = ctor.getOverflowNext(now, opts)
			});
			it('should return three days', function() {
				expect(result.length).to.equal(3);
			});
			it('should date the days properly', function() {
				expect(result).to.approximate(
					[ { date: '01'
					  , fullDate: '2012/04/01'
					  }
					, { date: '02'
					  , fullDate: '2012/04/02'
					  }
					, { date: '03'
					  , fullDate: '2012/04/03'
					  }
					]
				);
			});
		});
		describe('and the last day is a wednesday', function() {
			beforeEach(function() {
				var now = new Date(2012, 1, 1)
				result = ctor.getOverflowNext(now, opts)
			});
			it('should return six days', function() {
				expect(result.length).to.equal(6);
			});
			it('should date the days properly', function() {
				expect(result).to.approximate(
					[ { date: '01'
					  , fullDate: '2012/03/01'
					  }
					, { date: '02'
					  , fullDate: '2012/03/02'
					  }
					, { date: '03'
					  , fullDate: '2012/03/03'
					  }
					, { date: '04'
					  , fullDate: '2012/03/04'
					  }
					, { date: '05'
					  , fullDate: '2012/03/05'
					  }
					, { date: '06'
					  , fullDate: '2012/03/06'
					  }
					]
				);
			});
		});
		describe('and the last day is a tuesday', function() {
			beforeEach(function() {
				var now = new Date(2012, 0, 1)
				result = ctor.getOverflowNext(now, opts)
			});
			it('should return an empty array', function() {
				expect(result).to.deep.equal([]);
			});
		});
	});

	describe('When calling getOverflowPrev() with weeks starting on monday', function() {
		var result
		  , opts

		beforeEach(function() {
			opts =
			  { weekStart: 1 }
		});

		describe('and the first is a sunday', function() {
			beforeEach(function() {
				var now = new Date(2012, 0, 1)
				result = ctor.getOverflowPrev(now, opts)
			});
			it('should return six days', function() {
				expect(result.length).to.equal(6);
			});
			it('should date the days properly', function() {
				expect(result).to.approximate(
					[ { date: '26'
					  , fullDate: '2011/12/26'
					  }
					, { date: '27'
					  , fullDate: '2011/12/27'
					  }
					, { date: '28'
					  , fullDate: '2011/12/28'
					  }
					, { date: '29'
					  , fullDate: '2011/12/29'
					  }
					, { date: '30'
					  , fullDate: '2011/12/30'
					  }
					, { date: '31'
					  , fullDate: '2011/12/31'
					  }
					]
				);
			});
		});

		describe('and the first is a wednesday', function() {
			beforeEach(function() {
				var now = new Date(2012, 1, 1)
				result = ctor.getOverflowPrev(now, opts)
			});
			it('should return two days', function() {
				expect(result.length).to.equal(2);
			});
			it('should date the days properly', function() {
				expect(result).to.approximate(
					[ { date: '30'
					  , fullDate: '2012/01/30'
					  }
					, { date: '31'
					  , fullDate: '2012/01/31'
					  }
					]
				);
			});
		});

		describe('and the first is the first of the week', function() {
			beforeEach(function() {
				var now = new Date(2012, 9, 1)
				result = ctor.getOverflowPrev(now, opts)
			});
			it('should return an empty array', function() {
				expect(result).to.deep.equal([]);
			});
		});
	});
});
