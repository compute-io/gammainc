/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to check whether a value is NaN
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	gammainc = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor gammainc', function tests() {

	it( 'should export a function', function test() {
		expect( gammainc ).to.be.a( 'function' );
	});

	it( 'should evaluate the __lower__ gamma function of an array with a scalar using an accessor', function test() {
		var data, actual, expected, i;

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
		actual = new Array( data.length );
		actual = gammainc( actual, data, 1, getValue );

		expected = [
			0.09516258,
			0.1812692,
			0.3934693,
			0.6321206,
			0.8646647,
			0.9502129,
			0.9816844,
			0.9932621
		];

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should evaluate the __upper__ gamma function of an array with a scalar using an accessor', function test() {
		var data, actual, expected, i;

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
		actual = new Array( data.length );
		actual = gammainc( actual, data, 1, getValue, 'upper' );

		expected = [
			1 - 0.09516258,
			1 - 0.1812692,
			1 - 0.3934693,
			1 - 0.6321206,
			1 - 0.8646647,
			1 - 0.9502129,
			1 - 0.9816844,
			1 - 0.9932621
		];

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		function getValue( d ) {
			return d.x;
		}

	});

	it( 'should evaluate the incomplete gamma function for two arrays using an accessor', function test() {
		var data, actual, expected, y, i;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4}
		];

		y = [
			0,
			1,
			2,
			3,
			4
		];

		actual = new Array( data.length );
		actual = gammainc( actual, data, y, getValue );

		expected = [
			0,
			0.6321206,
			0.5939942,
			0.5768099,
			0.5665299
		];

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		function getValue( d, i ) {
			return d.x;
		}

	});

	it( 'should evaluate the incomplete gamma function for two object arrays using an accessor', function test() {
		var data, actual, expected, y, i;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4}
		];

		y = [
			{'y':0},
			{'y':1},
			{'y':2},
			{'y':3},
			{'y':4}
		];

		actual = new Array( data.length );
		actual = gammainc( actual, data, y, getValue );

		expected = [
			0,
			0.6321206,
			0.5939942,
			0.5768099,
			0.5665299
		];

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		function getValue( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should return empty array if provided an empty array', function test() {
		assert.deepEqual( gammainc( [], [], 1, getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y, i;

		// numeric value
		data = [
			{'x':1},
			{'x':null},
			{'x':3}
		];
		actual = new Array( data.length );
		actual = gammainc( actual, data, 1, getValue );

		expected = [ 0.6321206, NaN, 0.9502129 ];
		for ( i = 0; i < expected.length; i++ ) {
			if ( !isnan( expected[ i ] ) && !isnan( actual[ i ] ) ) {
				assert.closeTo( expected[ i ], actual[ i ], 1e-4);
			}
		}

		// single non-numeric value
		y = false;
		actual = new Array( data.length );
		actual = gammainc( actual, data, y, getValue );
		expected = [ NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		// numeric array
		y = [ 1, 2, 3 ];
		actual = new Array( data.length );
		actual = gammainc( actual, data, y, getValue );
		expected = [ 0.6321206, NaN,  0.5768099 ];


		for ( i = 0; i < expected.length; i++ ) {
			if ( !isnan( expected[ i ] ) && !isnan( actual[ i ] ) ) {
				assert.closeTo( expected[ i ], actual[ i ], 1e-4);
			}
		}

		function getValue( d, i ) {
			return d.x;
		}

		// typed array
		y = new Int32Array( [1,2,3] );
		actual = new Array( data.length );
		actual = gammainc( actual, data, y, getValue );
		expected = [ 0.6321206, NaN,  0.5768099 ];

		for ( i = 0; i < expected.length; i++ ) {
			if ( !isnan( expected[ i ] ) && !isnan( actual[ i ] ) ) {
				assert.closeTo( expected[ i ], actual[ i ], 1e-4);
			}
		}

		// object array
		y = [
			{'y':1},
			{'y':2},
			{'y':3}
		];
		actual = new Array( data.length );
		actual = gammainc( actual, data, y, getValue2 );
		expected = [ 0.6321206, NaN,  0.5768099 ];

		for ( i = 0; i < expected.length; i++ ) {
			if ( !isnan( expected[ i ] ) && !isnan( actual[ i ] ) ) {
				assert.closeTo( expected[ i ], actual[ i ], 1e-4);
			}
		}

		function getValue2( d, i, j ) {
			if ( j === 0 ) {
				return d.x;
			} else {
				return d.y;
			}
		}

	});

	it( 'should throw an error if provided an array of scale factors which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			gammainc( [], [1,2], [1,2,3], getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

	it( 'should throw an error if provided a typed array of scale factors which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			gammainc( [], [1,2], new Int32Array( [1,2,3] ), getValue );
		}
		function getValue( d ) {
			return d;
		}
	});

});
