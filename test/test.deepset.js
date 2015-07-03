/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Incomplete Gamma function
	GAMMAINC = require( './../lib/number.js' ),

	// Module to be tested:
	gammainc = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset gammainc', function tests() {

	it( 'should export a function', function test() {
		expect( gammainc ).to.be.a( 'function' );
	});

	it( 'should compute the __lower__ incomplete gamma function of the array values with a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		actual = gammainc( data, 2, 'x' );

		expected = [
			{'x': GAMMAINC.lower( 0, 2 ) },
			{'x': GAMMAINC.lower( 1, 2 ) },
			{'x': GAMMAINC.lower( 2, 2) },
			{'x': GAMMAINC.lower( 3, 2 ) }
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected);

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = gammainc( data, 2, 'x/1', '/' );
		expected = [
			{'x':[9,GAMMAINC.lower( 0, 2 )]},
			{'x':[9,GAMMAINC.lower( 1, 2 )]},
			{'x':[9,GAMMAINC.lower( 2, 2 )]},
			{'x':[9,GAMMAINC.lower( 3, 2 )]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should compute the __upper__ incomplete gamma function of the array values with a scalar and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		actual = gammainc( data, 2, 'x', undefined, 'upper' );

		expected = [
			{'x': GAMMAINC.upper( 0, 2 ) },
			{'x': GAMMAINC.upper( 1, 2 ) },
			{'x': GAMMAINC.upper( 2, 2) },
			{'x': GAMMAINC.upper( 3, 2 ) }
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected);

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = gammainc( data, 2, 'x/1', '/', 'upper' );
		expected = [
			{'x':[9,GAMMAINC.upper( 0, 2 )]},
			{'x':[9,GAMMAINC.upper( 1, 2 )]},
			{'x':[9,GAMMAINC.upper( 2, 2 )]},
			{'x':[9,GAMMAINC.upper( 3, 2 )]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should evaluate the incomplete gamma function for two arrays and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = gammainc( data, y, 'x' );

		expected = [
			{'x':GAMMAINC.lower( 0, 0 )},
			{'x':GAMMAINC.lower( 1, 1 )},
			{'x':GAMMAINC.lower( 2, 2 )},
			{'x':GAMMAINC.lower( 3, 3 )}
		];

		assert.strictEqual( data, actual );
		assert.deepEqual( data, expected);

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,1]},
			{'x':[9,2]},
			{'x':[9,3]}
		];

		data = gammainc( data, y, 'x/1', '/' );
		expected = [
			{'x':[9,GAMMAINC.lower( 0, 0 )]},
			{'x':[9,GAMMAINC.lower( 1, 1 )]},
			{'x':[9,GAMMAINC.lower( 2, 2 )]},
			{'x':[9,GAMMAINC.lower( 3, 3 )]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		var arr = [];
		assert.deepEqual( gammainc( arr, 1, 'x' ), [] );
		assert.deepEqual( gammainc( arr, 1, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected, y;

		// non-numeric value
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = gammainc( data, null, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]},
			{'x':[9,NaN]}
		];
		assert.deepEqual( data, expected );

		// scalar
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		actual = gammainc( data, 1, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,GAMMAINC.lower(1,1)]},
			{'x':[9,NaN]},
			{'x':[9,GAMMAINC.lower(3,1)]}
		];
		assert.deepEqual( data, expected );

		// array
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = [ 0, 1, 2, 3];
		actual = gammainc( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,GAMMAINC.lower(1,1)]},
			{'x':[9,NaN]},
			{'x':[9,GAMMAINC.lower(3,3)]}
		];
		assert.deepEqual( data, expected );

		// typed array
		data = [
			{'x':[9,null]},
			{'x':[9,1]},
			{'x':[9,true]},
			{'x':[9,3]}
		];
		y = new Int32Array( [0,1,2,3] );
		actual = gammainc( data, y, 'x.1' );
		expected = [
			{'x':[9,NaN]},
			{'x':[9,GAMMAINC.lower(1,1)]},
			{'x':[9,NaN]},
			{'x':[9,GAMMAINC.lower(3,3)]}
		];
		assert.deepEqual( data, expected );

	});

});
