/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to check whether a value is NaN
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	gammainc = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array gammainc', function tests() {

	it( 'should export a function', function test() {
		expect( gammainc).to.be.a( 'function' );
	});

	it( 'should calculate the __lower__ incomplete gamma function for an array and a scalar', function test() {
		var data, actual, expected, i;

		data = [
			0.1,
			0.2,
			0.5,
			1,
			2,
			3,
			4,
			5
		];
		actual = new Array( data.length );

		actual = gammainc( actual, data, 1 );

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

		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = gammainc( actual, data, 1 );
		expected = new Int32Array( expected );

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}
	});


		it( 'should calculate the __upper__ incomplete gamma function for an array and a scalar', function test() {
			var data, actual, expected, i;

			data = [
				0.1,
				0.2,
				0.5,
				1,
				2,
				3,
				4,
				5
			];
			actual = new Array( data.length );

			actual = gammainc( actual, data, 1, 'upper' );

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

			// Typed arrays...
			data = new Int32Array( data );
			actual = new Int32Array( data.length );

			actual = gammainc( actual, data, 1 );
			expected = new Int32Array( expected );

			for ( i = 0; i < expected.length; i++ ) {
				assert.closeTo( expected[ i ], actual[ i ], 1e-4);
			}
		});

	it( 'should calculate the incomplete gamma function for two arrays', function test() {
		var data, actual, expected, y, i;

		data = [
			0,
			1,
			2,
			3,
			4
		];

	 	y = [
			0,
			1,
			2,
			3,
			4
		];
		actual = new Array( data.length );

		actual = gammainc( actual, data, y );

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
		// Typed arrays...
		data = new Int32Array( data );
		actual = new Int32Array( data.length );

		actual = gammainc( actual, data, y );
		expected = new Int32Array( expected );

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( gammainc( [], [], 1 ), [] );
		assert.deepEqual( gammainc( new Int8Array(), new Int8Array(), 1 ), new Int8Array() );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y, i;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = gammainc( actual, data, 1 );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 1, 2, 3, 4 ];
		actual = gammainc( actual, data, y );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		data = [ 1, 2, 3 ];
		y = null;
		actual = new Array( data.length );
		actual = gammainc( actual, data, y );
		expected = [ NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		data = [ 1, null, 3 ];
		y = new Int32Array( [1,2,3] );
		actual = new Array( data.length );
		actual = gammainc( actual, data, y );
		expected = [ 0.6321206, NaN,  0.5768099 ];

		for ( i = 0; i < expected.length; i++ ) {
			if ( !isnan( expected[ i ] ) && !isnan( actual[ i ] ) ) {
				assert.closeTo( expected[ i ], actual[ i ], 1e-4);
			}
		}

	});

	it( 'should throw an error if provided an exponent array which is not of equal length to the input array', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			gammainc( [], [1,2], [1,2,3] );
		}
		expect( foo2 ).to.throw( Error );
		function foo2() {
			gammainc( [], [1,2], new Int32Array( [1,2,3] ) );
		}
	});

});
