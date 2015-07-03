/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	gammainc = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number gammainc', function tests() {

	it( 'should export a lower and upper function', function test() {
		expect( gammainc.lower ).to.be.a( 'function' );
		expect( gammainc.upper ).to.be.a( 'function' );
	});

	it( 'should evaluate the lower incomplete gamma function', function test() {
		assert.closeTo( gammainc.lower( 4, 2 ), 0.9084218, 1e-4 );
		assert.closeTo( gammainc.lower( 0.5, 0.5 ), 0.6826895, 1e-4 );
		assert.closeTo( gammainc.lower( 1, 3 ), 0.0803014, 1e-4 );
		assert.closeTo( gammainc.lower( 0.5, 0.8 ), 0.4991921, 1e-4 );
	});

	it( 'should evaluate the upper incomplete gamma function', function test() {
		assert.closeTo( gammainc.upper( 4, 2 ), 0.09157819, 1e-4 );
		assert.closeTo( gammainc.upper( 0.5, 0.5 ), 0.3173105, 1e-4 );
		assert.closeTo( gammainc.upper( 1, 3 ), 0.9196986, 1e-4 );
		assert.closeTo( gammainc.upper( 0.5, 0.8 ), 0.5008079, 1e-4 );
		assert.closeTo( gammainc.upper( 2, 9 ), 0.9997625526717389, 1e-4 );
	});

	it( 'should return NaN if provided x < 0 or s <= 0', function test() {
		var val;

		// x < 0
		val = gammainc.lower( -0.1, 2 );
		assert.isNumber( val );
		assert.ok( val !== val );

		// s = 0
		val = gammainc.lower( 0.1, 0 );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val;

		val = gammainc.lower( NaN, 2 );
		assert.isNumber( val );
		assert.ok( val !== val );

		val = gammainc.lower( 2, NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

});
