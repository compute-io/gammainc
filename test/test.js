/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate if a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Incomplete gamma function:
	GAMMAINC = require( './../lib/number.js' ).lower,

	// Module to be tested:
	gammainc = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-gammainc', function tests() {

	it( 'should export a function', function test() {
		expect( gammainc ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				gammainc( [1,2,3], 1, {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided aunrecognized/unsupported tail option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				gammainc( [1,2,3], 1, {
					'tail': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				gammainc( [1,2,3], 1, {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				gammainc( new Int8Array([1,2,3]), 1, {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				gammainc( matrix( [2,2] ), 1, {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a number as the first argument and an not applicable option', function test() {
		var values = [
			{'accessor': function getValue( d ) { return d; } },
			{'copy': false},
			{'path': 'x'},
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				gammainc( 1, [1,2,3], value );
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( gammainc( values[ i ], 1 ) ) );
		}
	});

	it( 'should return NaN if the first argument is a number and the second argument is neither numberic, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( gammainc( 1, values[ i ] ) ) );
		}
	});

	it( 'should calculate the __lower__ incomplete gamma function for two numbers', function test() {
		assert.closeTo( gammainc( 5, 1 ), 0.9932621, 1e-5 );
		assert.closeTo( gammainc( 3, 3 ), 0.5768099, 1e-5 );
	});

	it( 'should calculate the __upper__ incomplete gamma function for two numbers', function test() {
		assert.closeTo( gammainc( 5, 1, {'tail': 'upper'} ), 1 - 0.9932621, 1e-5 );
		assert.closeTo( gammainc( 3, 3, {'tail': 'upper'} ), 1 - 0.5768099, 1e-5 );
	});

	it( 'should calculate the incomplete gamma function of a scalar and an array', function test() {
		var data, actual, expected;
		data = [ 1, 2 ];
		actual = gammainc( 2, data );
		expected = [ GAMMAINC( 2, 1 ), GAMMAINC( 2, 2 ) ];
		assert.deepEqual( actual, expected );
	});

	it( 'should calculate the incomplete gamma function of a scalar and a matrix', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = gammainc( 2, data );
		expected = matrix( new Float64Array( [
			GAMMAINC( 2, 1 ),
			GAMMAINC( 2, 2 ),
			GAMMAINC( 2, 3 ),
			GAMMAINC( 2, 4 ),
		]), [2,2] );

		assert.deepEqual( actual.data, expected.data );
	});


	it( 'should calculate incomplete gamma function of a scalar and an array and cast result to a different dtype', function test() {
		var data, actual, expected;
		data = [ 1, 2 ];
		actual = gammainc( 10, data, {
			'dtype':'int32'
		});
		expected = new Int32Array([
			GAMMAINC( 10, 1 ),
			GAMMAINC( 10, 2 )
		]);
		assert.deepEqual( actual, expected );
	});


	it( 'should calculate the incomplete gamma function of a scalar and a matrix and cast to a different dtype', function test() {
		var data, actual, expected;
		data = matrix( new Int8Array( [ 1,2,3,4 ] ), [2,2] );
		actual = gammainc( 2, data, {
			'dtype': 'int32'
		});
		expected = matrix( new Int32Array( [
			GAMMAINC( 1, 2 ),
			GAMMAINC( 2, 2 ),
			GAMMAINC( 3, 2 ),
			GAMMAINC( 4, 2 ),
		]), [2,2] );

		assert.strictEqual( actual.dtype, 'int32' );
		assert.deepEqual( actual.data, expected.data );
	});

	it( 'should calculate the incomplete gamma function when provided a plain array and a scalar', function test() {
		var data, actual, expected, i;

		data = [ 0, 1, 2, 3 ];
		expected = [
			0,
			0.0803014,
			0.3233236,
			0.5768099
		];

		actual = gammainc( data, 3 );
		assert.notEqual( actual, data );

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		// Mutate...
		actual = gammainc( data, 3, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

	});

	it( 'should evaluate the incomplete gamma function when provided a plain array and another array', function test() {
		var data, actual, expected, i;

		data = [ 0, 1, 2, 3, 4 ];
		expected = [
			0,
			0.6321206,
			0.5939942,
			0.5768099,
			0.5665299
		];

		actual = gammainc( data, data );
		assert.notEqual( actual, data );

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		// Mutate...
		actual = gammainc( data, data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

	});

	it( 'should evaluate the incomplete gamma function when provided a typed array and a scalar', function test() {
		var data, actual, expected, i;

		data = new Float32Array( [ 0, 1, 2, 3, 4 ] );

		expected = new Float64Array( [
			0,
			0.08030139707139304,
			0.3233235838169301,
			0.5768099188731305,
			0.7618966944464558 ]
		);

		actual = gammainc( data, 3 );
		assert.notEqual( actual, data );

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		// Mutate:
		actual = gammainc( data, 3, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		expected = new Float32Array( [
			0,
			0.08030139707139304,
			0.3233235838169301,
			0.5768099188731305,
			0.7618966944464558 ]
		);

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}
	});

	it( 'should evaluate the incomplete gamma function when provided a typed array and another typed array', function test() {
		var data, actual, expected, i;

		data = new Int8Array( [ 0, 1, 2, 3, 4 ] );

		expected = new Float64Array( [
			0,
			0.6321206,
			0.5939942,
			0.5768099,
			0.5665299
		]);

		actual = gammainc( data, data );
		assert.notEqual( actual, data );

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		// Mutate:

		actual = gammainc( data, data, {
			'copy': false
		});
		expected = new Int8Array( [ 0, 0, 0, 0, 0 ] );
		assert.strictEqual( actual, data );

		for ( i = 0; i < expected.length; i++ ) {
			assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}
	});

	it( 'should evaluate the incomplete gamma function for an array and a scalar and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 0, 1, 2, 3, 4 ];
		expected = new Int8Array( [ 0, 0, 0, 0, 0] );

		actual = gammainc( data, 4, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the incomplete gamma function for an array and a scalar using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			[3,0],
			[4,1],
			[5,2],
			[6,3]
		];

		expected = [
			0,
			0.01898815687615274,
			0.14287653950144705,
			0.35276811121774354
		];

		actual = gammainc( data, 4, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < expected.length; i++ ) {
				assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		// Mutate:
		actual = gammainc( data, 4, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < expected.length; i++ ) {
				assert.closeTo( expected[ i ], actual[ i ], 1e-4);
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the incomplete gamma function of two object arrays using an accessor', function test() {
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

		actual = gammainc( data, y, {
			'accessor': getValue
		});

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

	it( 'should evaluate the incomplete gamma function with a numeric scale factor and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		expected = [
			{'x':[3,GAMMAINC( 0, 3 )]},
			{'x':[4,GAMMAINC( 1, 3 )]},
			{'x':[5,GAMMAINC( 2, 3 )]},
			{'x':[6,GAMMAINC( 3, 3 )]}
		];

		actual = gammainc( data, 3, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );

		// Specify a path with a custom separator...
		data = [
			{'x':[3,0]},
			{'x':[4,1]},
			{'x':[5,2]},
			{'x':[6,3]}
		];
		actual = gammainc( data, 3, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		assert.deepEqual( actual, expected );
	});

	it( 'should perform an element-wise gammaincer using an array and deep set', function test() {
		var data, actual, expected, y;

		data = [
			{'x':0},
			{'x':1},
			{'x':2},
			{'x':3}
		];

		y = [ 0, 1, 2, 3 ];

		actual = gammainc( data, y, {
			path: 'x'
		});

		expected = [
			{'x': GAMMAINC( 0, 0 ) },
			{'x': GAMMAINC( 1, 1 ) },
			{'x': GAMMAINC( 2, 2) },
			{'x': GAMMAINC( 3, 3 ) }
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

		data = gammainc( data, y, {
			'path': 'x/1',
			'sep': '/'
		});
		expected = [
			{'x':[9,GAMMAINC( 0, 0 )]},
			{'x':[9,GAMMAINC( 1, 1 )]},
			{'x':[9,GAMMAINC( 2, 2 )]},
			{'x':[9,GAMMAINC( 3, 3 )]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should evaluate the incomplete gamma function when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int32Array( 100 );
		d2 = new Int32Array( 100 );
		d3 = new Int32Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = GAMMAINC( i, i );
			d3[ i ] = GAMMAINC( i, 2 );
		}

		// matrix elements + scalar
		mat = matrix( d1, [10,10], 'int32' );
		out = gammainc( mat, 2, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d3 );

		// matrix elements + matrix elements
		mat = matrix( d1, [10,10], 'int32' );
		out = gammainc( mat, mat, {
			'dtype': 'int32'
		});

		assert.deepEqual( out.data, d2 );

		// matrix elements + scalar and mutate
		out = gammainc( mat, 2, {
			'copy': false
		});

		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should evaluate the incomplete gamma function for a matrix and a scalar scale factor and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int16Array( 100 );
		d2 = new Uint16Array( 100 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i;
			d2[ i ] = GAMMAINC( i, 2 );
		}
		mat = matrix( d1, [10,10], 'int16' );
		out = gammainc( mat, 2, {
			'dtype': 'uint16'
		});

		assert.strictEqual( out.dtype, 'uint16' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( gammainc( [], 1 ), [] );
		assert.deepEqual( gammainc( matrix( [0,0] ), 1 ).data, matrix( [0,0] ).data );
		assert.deepEqual( gammainc( new Int8Array(), 1 ), new Float64Array() );
	});

});
