date-picker
===========

A simple lightweight date-picker, with no external dependencies.

Go to [fizker.github.com/date-picker](http://fizker.github.com/date-picker) to
see it in effect, and for more extensive documentation.


Roadmap
-------

- <s>0.1</s>: Can render and navigate.
- <s>0.2</s>: Can emit events.
- <s>0.3</s>: Popup and binding to input element.
- <s>0.4</s>: More options and customizability.
- <s>0.5</s>: Better cross-browser support.
- 0.6: Full support for iOS devices.
- 0.7: Ender support.
- 0.8: CSS templates and examples.

- 1.0: All done and ready for prod-use.


Installing
----------

There are currently three ways to install this:

1. If you want a somewhat stable build, use `npm install date-picker`.
2. If you want the bleeding edge, pull from [github](https://github.com/fizker/date-picker),
   `cd` into the checked-out dir, and run `npm install`.
3. If you just want to load it and test it quickly, a minified version is bundled
   with the [GitHub Pages](http://fizker.github.com/date-picker) describing this
   project. It can be fetched from [http://fizker.github.com/date-picker/lib/dp.min.js](http://fizker.github.com/date-picker/lib/dp.min.js)


Running the tests
-----------------

To run the tests, you need to do installation step 1 or 2. If 1 is chosen, there
is an additional step. `devDependencies` are not normally installed through
[npm](http://npmjs.org), so you need to install them manually:

	cd node_modules/date-picker
	npm install

Then both steps align, and simply running `npm test` will execute the tests in
node.

To run the tests in a browser, you need at least v. 0.5 (in npm) or commit
ade06aa357 (git). The install script after those versions build an html-file
and places it in `test/browser.html` (based on the package folder).

Simply load this up in a browser. A web-server is not required to run it locally.


Example code
------------

To get it up after installing, simple link to the `dp.min.js` and `dp.min.css`.
To overwrite the look, either inspect the living DOM or build upon the CSS file.

After inclusion, it can simply be created with the following snippet:

	var options = null // options are optional
	  , dp = new DatePicker(options)
	  // any of the following two give the same result
	  , element = $('.input')[0]
	  , element = '.input'

	dp.show(element);

The contents of the buttons and labels can be altered via options when creating
the date-picker. For a full list of the supported options, either check the
[source code](https://github.com/fizker/date-picker/blob/master/src/dp.js#L44-56)
or look to the [docs](http://fizker.github.com/date-picker/docs.html).


Browser compatibility
---------------------

As of this writing, all tests are green in the following browsers (or newer):

- Safari 5.1.7 (win)
- Safari for iOS 4.3
- Android browser for Android 2.3.7 (HTC Desire)
- Chrome 20 (mac)
- Firefox 12 (mac)
- Opera 11.64 (mac)
- Internet Explorer 9

The tests are known to fail in IE8, but that is due to [chai](http://http://chaijs.com)
crashing on inclusion in those browsers. A superficial manual test suggests that
the code is working. There is a plan to work on the tests and get them up and
running in at least IE8.

There is no plan to ever support IE7 or below. Any code that adds **too** much
junk to support 7+ year old browsers have a good chance of being rejected. At
some point, the world simply have to move on! But if the fix is small and lean,
feel free to submit a pull request!

There are no expected outages in older versions of the other compatible browsers.
But still, too big changes to support legacy browsers are not really interesting.


Special thanks
--------------

- [jQuery](http://jquery.com): For an otherwise great tool, and because I
  lifted some code from there (calculating the offset of an element).
