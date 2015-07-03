gammainc
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Incomplete gamma function.

Computes the regularized lower incomplete gamma function:

<div class="equation" align="center" data-raw-text="P( x, a ) = \frac{\gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_0^x t^{a-1} e^{-t} \; dt" data-equation="eq:lower_incomplete_gamma">
	<img src="https://cdn.rawgit.com/compute-io/gammainc/68d3e61dfeace303cffe14b75c5b249ba75b5281/docs/img/eqn1.svg" alt="Equation for the regularized lower incomplete gamma function.">
	<br>
</div>

The function can also be used to evaluate the regularized upper incomplete gamma function, which is defined as follows:  

<div class="equation" align="center" data-raw-text="Q( x, a ) = \frac{\Gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_x^\infty t^{a-1} e^{-t} \; dt" data-equation="eq:upper_incomplete_gamma">
	<img src="https://cdn.rawgit.com/compute-io/gammainc/68d3e61dfeace303cffe14b75c5b249ba75b5281/docs/img/eqn2.svg" alt="Equation for the regularized upper incomplete gamma function.">
	<br>
</div>

The two functions have the relationship `Q(x,a) = 1 - P(x,a)`.

## Installation

``` bash
$ npm install compute-gammainc
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var gammainc = require( 'compute-gammainc' );
```

#### gammainc( x, a[, opts] )

Evaluates element-wise the regularized incomplete gamma function. `x` can be a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix). `a` has to be either an `array` or `matrix` of equal dimensions as `x` or a single number. The function returns either an `array` with the same length as the base `array`, a `matrix` with the same dimensions as the base `matrix` or a single number. The domain of the function are the non-negative real numbers for `x` and the positve real numbers for `a`. If supplied a value outside the domain, the function returns `NaN`.
``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = gammainc( 6, 2 );
// returns ~0.9826

out = gammainc( -7, 3 );
// returns NaN

data = [ 0.1, 0.2, 0.3 ];
out = gammainc( data, 1 );
// returns [ ~0.0952, ~0.18127, ~0.25918 ]

data = [ 1, 2, 3 ];
out = gammainc( 2, data );
// returns [ ~0.8647, ~0.5940, ~0.3233 ]

data = [ 1, 2, 3 ];
out = gammainc( data, [ 1, 2, 3 ] )
// returns [ ~0.6321, ~0.5940, ~0.5768 ]


data = new Float32Array( [0.1,0.2,0.3] );
out = gammainc( data, 1 );
// returns Float64Array( [~0.0952, ~0.18127, ~0.25918] )

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = gammainc( mat, 4 );
/* returns approximately
	[ 0      0.0190
	  0.1429 0.3528
	  0.5665 0.7350 ]
*/

out = gammainc( mat, mat );
/* returns approximately
.	[  0      0.6321
	   0.5940 0.5768
	   0.5665 0.5595 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.
*	__tail__:`string` indicating whether to evaluate the `'lower'` or `'upper'` incomplete gamma function. Default: `'lower'`.

By default, the function evaluates the *lower* regularized incomplete gamma function, `P(x,a)`. To evaluate the *upper* function instead, i.e. `Q(x,a)`, set the `tail` option to `'upper'`.

```javascript
var l, u, bool;

l = gammainc( 1, 2)
// returns ~0.2642

u = gammainc( 1, 2, {
	'tail': 'upper'
});
// returns ~0.7358

bool = ( l + u === 1 ) 
// returns true
``` 

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
data = [
	{'x':0.1},
	{'x':0.2},
	{'x':0.5},
	{'x':1},
	{'x':2},
	{'x':3},
	{'x':4},
	{'x':5}
];

function getValue( d, i ) {
	return d.x;
}

var out = power( data, 2, {
	'accessor': getValue
});
// returns [ ~0.0951, ~0.1812, ~0.3934, ~0.6321, ~0.8646, ~0.9502, ~0.9816, ~0.9932 ]
```

When exponentiating values between two object `arrays`, provide an accessor `function` which accepts `3` arguments.

``` javascript
var data = [
	['beep', 0],
	['boop', 1],
	['bip', 2],
	['bap', 3],
	['baz', 4]
];

var arr = [
	{'x': 0},
	{'x': 1},
	{'x': 2},
	{'x': 3},
	{'x': 4}
];

function getValue( d, i, j ) {
	if ( j === 0 ) {
		return d[ 1 ];
	}
	return d.x;
}

var out = power( data, arr, {
	'accessor': getValue
});
// returns [ 0, ~0.6321, ~0.5940, ~0.5768, ~0.5665 ]
```

__Note__: `j` corresponds to the input `array` index, where `j=0` is the index for the first input `array` and `j=1` is the index for the second input `array`.

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,2]},
	{'x':[1,3]},
	{'x':[2,5]},
	{'x':[3,7]},
	{'x':[4,11]}
];

var out = gammainc( data, 7, 'x|1', '|' );
/*
	[
		{'x':[0,~0.0045]},
		{'x':[1,~0.0335]},
		{'x':[2,~0.2378]},
		{'x':[3,~0.5503},
		{'x':[4,~0.9214]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new Int8Array( [ 1, 2, 3 ] );

out = gammainc( data, 2, {
	'dtype': 'int32'
});
// returns Int32Array( [1,4,9] )

// Works for plain arrays, as well...
out = gammainc( [ 1, 2, 3 ], 2, {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,0,0] )
```

By default, the function returns a new data structure. To mutate the input data structure, set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 0.1, 0.2, 0.3 ];

out = gammainc( data, 1, {
	'copy': false
});
// returns [ ~0.0952, ~0.18127, ~0.25918 ]

bool = ( data === out );
// returns true

data = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,2], 'int16' );
/*
	[  0  1
	   2  3
	   4  5 ]
*/

out = gammainc( mat, 4, {
	'copy': false
});
/* returns approximately
	[ 0      0.0190
	  0.1429 0.3528
	  0.5665 0.7350 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the returned value  is `NaN`.

	``` javascript
	var data, out;

	out = gammainc( null, 1 );
	// returns NaN

	out = gammainc( true, 1 );
	// returns NaN

	out = gammainc( {'a':'b'}, 1 );
	// returns NaN

	out = gammainc( [ true, null, [] ], 1 );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = gammainc( data, 1, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = gammainc( data, 1, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = gammainc( [ true, null, [] ], 1, {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```

*	When calling the function with a numeric value as the first argument and a `matrix` or `array` as the second argument, only the `dtype` option is applicable.

	``` javascript
		// Valid:
		var out = gammainc( 1, [ 1, 2, 3 ], {
			'dtype': 'int8'
		});
		// returns Int8Array( [0,0,0] )

		// Not valid:
		var out = gammainc( 0.5, [ 1, 2, 3 ], {
			'copy': false
		});
		// throws an error
	```


## Examples

``` javascript
var gammainc = require( 'compute-gammainc' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-gammainc.svg
[npm-url]: https://npmjs.org/package/compute-gammainc

[travis-image]: http://img.shields.io/travis/compute-io/gammainc/master.svg
[travis-url]: https://travis-ci.org/compute-io/gammainc

[coveralls-image]: https://img.shields.io/coveralls/compute-io/gammainc/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/gammainc?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/gammainc.svg
[dependencies-url]: https://david-dm.org/compute-io/gammainc

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/gammainc.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/gammainc

[github-issues-image]: http://img.shields.io/github/issues/compute-io/gammainc.svg
[github-issues-url]: https://github.com/compute-io/gammainc/issues
