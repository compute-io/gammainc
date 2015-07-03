'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' );


// FUNCTIONS

var GAMMAINC = require( './number.js' );


// INCOMPlETE GAMMA FUNCTION //

/**
* FUNCTION: gammainc( out, arr, a[, tail] )
*	Computes the incomplete gamma function for an array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} a - either an array of equal length or a scalar
* @param {String} [tail="lower"] - whether to compute the lower or upper incomplete gamma function
* @param {Boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function gammainc( out, arr, a, tail, regularized ) {
	var len = arr.length,
		i,
		FUN;

	if ( tail === 'upper' ) {
		FUN = GAMMAINC.upper;
	} else {
		FUN = GAMMAINC.lower;
	}

	if ( isTypedArrayLike( a ) ) {
		if ( len !== a.length ) {
			throw new Error( 'gammainc()::invalid input argument. Scale array must have a length equal to that of the input array.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof arr[ i ] === 'number' ) {
				out[ i ] = FUN( arr[ i ], a[ i ], regularized );
			} else {
				out[ i ] = NaN;
			}
		}
	} else if ( isArrayLike( a ) ) {
		if ( len !== a.length ) {
			throw new Error( 'gammainc()::invalid input argument. Scale array must have a length equal to that of the input array.' );
		}
		for ( i = 0; i < len; i++ ) {
			if ( typeof a[ i ] === 'number' && typeof arr[ i ] === 'number' ) {
				out[ i ] = FUN( arr[ i ], a[ i ], regularized );
			} else {
				out[ i ] = NaN;
			}
		}
	} else {
		if ( typeof a === 'number' ) {
			for ( i = 0; i < len; i++ ) {
				if ( typeof arr[ i ] === 'number' ) {
					out[ i ] = FUN( arr[ i ], a, regularized );
				} else {
					out[ i ] = NaN;
				}
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				out[ i ] = NaN;
			}
		}
	}
	return out;
} // end FUNCTION gammainc()


// EXPORTS //

module.exports = gammainc;
