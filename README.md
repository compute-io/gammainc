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

In addition, this package can be used to evaluate the *unregularized* gamma functions. The range of above functions is `[0,1]`, which is not the case fo the *unregularized* versions. The unregularized lower incomplete gamma function is defined as

<div class="equation" align="center" data-raw-text="\gamma(a,x) = \int_0^x t^{a-1} e^{-t} \; dt" data-equation="eq:unreg_lower_incomplete_gamma">
	<img src="https://cdn.rawgit.com/compute-io/gammainc/edb25812443645fa97017137b1f84708a84cea2c/docs/img/eqn3.svg" alt="Equation for the unregularized lower incomplete gamma function.">
	<br>
</div>

and the upper unregularized incomplete gamma function is 

<div class="equation" align="center" data-raw-text="\Gamma(a,x)= \int_x^\infty t^{a-1} e^{-t} \; dt" data-equation="eq:unreg_upper_incomplete_gamma">
	<img src="https://cdn.rawgit.com/compute-io/gammainc/edb25812443645fa97017137b1f84708a84cea2c/docs/img/eqn4.svg" alt="Equation for the unregularized upper incomplete gamma function.">
	<br>
</div>

The relationship between the two functions is `Γ(a,x) = γ(a,x) + Γ(a)`.

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

Evaluates element-wise the regularized incomplete gamma function. `x` can be a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix). `a` has to be either an `array` or `matrix` of equal dimensions as `x` or a single number. The function returns either an `array` with the same length as the base `array`, a `matrix` with the same dimensions as the base `matrix` or a single number. The domain of the function are the non-negative real numbers for `x` and the positve real numbers for `a`. If supplied a value outside the domain, the function returns `NaN`. For both the regularized and unregularized versions of the incomplete gamma function, in this implementation the first argument is `x` and the second argument is the scale factor `a`.

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
*	__regularized__: `boolean` indicating if the `function` should compute the *regularized* or *unregularized* incomplete gamma functions. Default: `true`.

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

To evaluate the *unregularized* incomplete gamma functions, set the `regularized` option to `false`.

```javascript
var r, u;

r = gammainc( 7, 5 );
// returns 0.8270

u = gammainc( 7, 5, {
	'regularized': false
});
// returns 19.8482
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

data = new Int8Array( [ 4, 5, 6 ] );

out = gammainc( data, 5, {
	'dtype': 'int32',
	'regularized': false
});
// returns Int32Array( [8,13,17] )

// Works for plain arrays, as well...
out = gammainc( [ 4, 5, 6 ], 5, {
	'dtype': 'uint8'
});
// returns Uint8Array( [8,13,17] )
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

## Implementation

All of the four functions (regularized and non-regularized, upper and lower) share a common implementation as they are all related to each other (see the [Boost C++ library documentation](http://www.boost.org/doc/libs/1_35_0/libs/math/doc/sf_and_dist/html/math_toolkit/special/sf_gamma/igamma.html) for a good discussion of the functions and implementation strategies).

To evaluate the regularized *lower* incomplete gamma function, this package uses the following representation of the integral as a power series in its implementation:

<div class="equation" align="center" data-raw-text="
    P(x, a) = \frac{1}{\Gamma(a)}\sum_{k=0}^\infty \frac{x^a e^{-x} x^k}{a(a+1)...(a+k)} " data-equation="eq:power_series">
	<img src="https://cdn.rawgit.com/compute-io/gammainc/f38461aaa66adafa47885a4f79ef393d8d140bdc/docs/img/eqn5.svg" alt="Power series representation for the lower incomplete gamma function.">
	<br>
</div>

This series is evaluated for all inputs `x` and `s` unless `x > 1.1` and `x > s`, in which case the function is evaluated using the upper incomplete gamma function as `P(x,s) = 1 - Q(x,s)`. To evaluate the upper incomplete gamma function, [Gauss' continued fraction expansion](https://en.wikipedia.org/wiki/Gauss%27s_continued_fraction) is used:

<div class="equation" align="center" data-raw-text="Q(x, a) = \frac{1}{\Gamma(a)}\cfrac{x^a e^{-x}}{1+x-a+ \cfrac{a-1}{3+x-a+ \cfrac{2(a-2)}{5+x-a+ \cfrac{3(a-3)} {7+x-a+ \cfrac{4(a-4)}{9+x-a+ \ddots}}}}} " data-equation="eq:continued_fraction">
	<img src="https://cdn.rawgit.com/compute-io/gammainc/f38461aaa66adafa47885a4f79ef393d8d140bdc/docs/img/eqn6.svg" alt="Continued fraction expansion for the upper incomplete gamma function.">
	<br>
</div>

To compute the continued fractions, the modified Lentz's method is implemented. For a discussion of this method, see section 5.2 of "Numerical Recipes in C (2nd Ed.): The Art of Scientific Computing".

Reference: William H. Press, Saul A. Teukolsky, William T. Vetterling, and Brian P. Flannery. 1992. Numerical Recipes in C (2nd Ed.): The Art of Scientific Computing. Cambridge University Press, New York, NY, USA. 



## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	gammainc = require( 'compute-gammainc' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}
out = gammainc( data, 1 );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = gammainc( data, 1, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = gammainc( data, 1, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float64Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}
tmp = gammainc( data, 1 );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [10,10], 'float64' );
out = gammainc( mat, 1 );
console.log( 'Matrix: %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = gammainc( mat, 1, {
	'dtype': 'float32'
});
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
