/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to check whether a value is NaN
	isnan = require( 'validate.io-nan' ),

	// Module to be tested:
	gammainc = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'typed-array gammainc', function tests() {

	it( 'should export a function', function test() {
		expect( gammainc ).to.be.a( 'function' );
	});

	it( 'should calculate the __lower__ incomplete gamma function for two typed arrays', function test() {
		var data, actual, expected, y, i;

		data = new Float64Array([
			0,
			1,
			2,
			3,
			4
		]);
		y = new Float64Array([
			0,
			1,
			2,
			3,
			4
		]);
		actual = new Float64Array( data.length );

		actual = gammainc( actual, data, y );

		expected = new Float64Array([
			0,
			0.6321206,
			0.5939942,
			0.5768099,
			0.5665299
		]);

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}
	});


	it( 'should calculate the __upper__ incomplete gamma function for two typed arrays', function test() {
		var data, actual, expected, y, i;

		data = new Float64Array([
			0,
			1,
			2,
			3,
			4
		]);
		y = new Float64Array([
			0,
			1,
			2,
			3,
			4
		]);
		actual = new Float64Array( data.length );

		actual = gammainc( actual, data, y, 'upper' );

		expected = new Float64Array([
			1 - 0,
			1 - 0.6321206,
			1 - 0.5939942,
			1 - 0.5768099,
			1 - 0.5665299
		]);

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}
	});

	it( 'should throw an error if provided two typed arrays of differing lengths', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			gammainc( new Array(2), new Int8Array( [1,2] ), new Int8Array( [1,2,3] ) );
		}

		expect( foo2 ).to.throw( Error );
		function foo2() {
			gammainc( new Array(2), new Int8Array( [1,2] ), [ 1, 2, 3 ] );
		}
	});

	it( 'should handle non-numeric y values by setting the respective element to NaN', function test() {
		var data, actual, expected, y, i;

		data = new Float64Array([
			1,
			2,
			3,
			4
		]);
		actual = new Array( data.length );
		actual = gammainc( actual, data, null );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = new Array( data.length );
		y = [ 1, 2, 3, null ];
		actual = gammainc( actual, data, y );

		expected = [
			0.6321206,
			0.5939942,
			0.5768099,
			NaN
		];

		for ( i = 0; i < expected.length; i++ ) {
			if ( !isnan( expected[ i ] ) && !isnan( actual[ i ] ) ) {
				assert.closeTo( expected[ i ], actual[ i ], 1e-4);
			}
		}

	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( gammainc( new Int8Array(), new Int8Array() ), new Int8Array() );
	});

});
