'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isnan = require( 'validate.io-nan' ),
	isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var gammainc1 = require( './array.js' ),
	gammainc2 = require( './accessor.js' ),
	gammainc3 = require( './deepset.js' ),
	gammainc4 = require( './matrix.js' ),
	gammainc5 = require( './typedarray.js' ),
	gammainc6 = require( './number.js' );


/**
* FUNCTION: fill( n, val )
*	Creates an array of length n and fills it with the supplied value
* @param {Number} n - array length
* @param {*} val - value to fill the array with
* @returns {Array} array of length n
*/
function fill( n, val ) {
	var ret = new Array( n );
	for ( var i = 0; i < n; i++ ) {
		ret[ i ] = val;
	}
	return ret;
}


// INCOMPlETE GAMMA FUNCTION //

/**
* FUNCTION: gammainc( x, y[, opts] )
*	Computes the incomplete gamma function.
*
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} y - either an array or matrix of equal dimension or a scalar
* @param {Object} [opts] - function options
* @param {Boolean} [opts.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {String} [opts.path] - deep get/set key path
* @param {String} [opts.sep="."] - deep get/set key path separator
* @param {String} [opts.dtype="float64"] - output data type
* @param {String} [opts.tail="lower"] - string indicating whether to compute the lower or upper incomplete gamma function
* @param {Boolean} [opts.regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @returns {Number|Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} function value(s)
*/
function gammainc( x, y, options ) {
	/* jshint newcap:false */
	var opts = {},
		ctor,
		err,
		out,
		dt,
		d,
		scalarCase = false;
	// Handle cases where first argument is a number
	if ( isNumber( x ) || isnan( x ) ) {
		for ( var key in options ) {
			if ( key !== 'dtype' && key !== 'tail' && key !== 'regularized' ){
				throw new Error( 'gammainc()::only dtype, regularized and tail options are applicable when first argument is not array- or matrix-like. Keys: `' + Object.keys( options ) + '`.' );
			}
		}
		if ( isMatrixLike( y ) ) {
			// Create a matrix holding x's:
			d = new Float64Array( fill( y.length, x ) );
			x = matrix( d, y.shape, 'float64' );
			return options ? gammainc( x, y, options ) : gammainc( x, y );
		}
		if ( isArrayLike( y ) ) {
			return options ? gammainc( fill( y.length, x ), y, options ) : gammainc( fill( y.length, x ), y );
		}
		if ( !isNumber( y ) ) {
			return NaN;
		}
		scalarCase = true;
	}
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	opts.regularized = ( opts.regularized === undefined ) ? true : opts.regularized;
	opts.tail = opts.tail || 'lower';
	if ( opts.tail !== 'lower' && opts.tail !== 'upper' ){
		throw new Error( 'gammainc()::invalid option. Tail option has to be either `lower` or `upper`. Value: ' + opts.tail + '`.' );
	}

	if ( scalarCase === true ) {
		return (opts.tail === 'upper') ? gammainc6.upper( x, y, opts.regularized ) : gammainc6.lower( x, y, opts.regularized );
	}
	if ( isMatrixLike( x ) ) {
		if ( opts.copy !== false ) {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'gammainc()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			// Create an output matrix:
			d = new ctor( x.length );
			out = matrix( d, x.shape, dt );
		} else {
			out = x;
		}
		return gammainc4( out, x, y, opts.tail, opts.regularized  );
	}
	if ( isTypedArrayLike( x ) ) {
		if ( opts.copy === false ) {
			out = x;
		} else {
			dt = opts.dtype || 'float64';
			ctor = ctors( dt );
			if ( ctor === null ) {
				throw new Error( 'gammainc()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
			}
			out = new ctor( x.length );
		}
		return gammainc5( out, x, y, opts.tail, opts.regularized  );
	}
	if ( isArrayLike( x ) ) {
		// Handle deepset first...
		if ( opts.path ) {
			opts.sep = opts.sep || '.';
			return gammainc3( x, y, opts.path, opts.sep, opts.tail, opts.regularized );
		}
		// Handle regular and accessor arrays next...
		if ( opts.copy === false ) {
			out = x;
		}
		else if ( opts.dtype ) {
			ctor = ctors( opts.dtype );
			if ( ctor === null ) {
				throw new TypeError( 'gammainc()::invalid input argument. Unrecognized/unsupported array-like object. Provide either a plain or typed array. Value: `' + x + '`.' );
			}
			out = new ctor( x.length );
		}
		else {
			out = new Array( x.length );
		}
		if ( opts.accessor ) {
			return gammainc2( out, x, y, opts.accessor, opts.tail, opts.regularized  );
		}
		return gammainc1( out, x, y, opts.tail, opts.regularized  );
	}
	return NaN;
} // end FUNCTION gammainc()


// EXPORTS //

module.exports = gammainc;
