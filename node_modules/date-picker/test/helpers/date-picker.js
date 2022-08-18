fakeDOM();

require('../../src/dp')

module.exports = global.DatePicker;

// This function fakes the DOM in order to do unit-tests in node.js
function fakeDOM() {
	global.document =
		{ createDocumentFragment: createDocumentFragment
		, createElement: createElement
		, querySelectorAll: function() { return [] }
		, querySelector: function() { return null }
		, body: createElement('body')
		, documentElement: createElement('documentElement')
		};
};

function createElement(elementName) {
	return (
		{ appendChild: function() {}
		, tagName: elementName.toUpperCase()
		, querySelector: function() { return null }
		, querySelectorAll: function() { return [] }
		, getBoundingClientRect: function() {}
		, ownerDocument: global.document
		, _dataset: {}
		, setAttribute: function(key, value) { this._dataset[key]=value }
		, getAttribute: function(key) { return this._dataset[key] }
		, style: {}
		, parentNode: { removeChild: function() {} }
		}
	);
};

function createDocumentFragment() {
	return this.fakeDocFrag ||
		{ appendChild: function() {}
		, querySelector: function() { return null }
		, querySelectorAll: function() { return [] }
		};
};
