'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isTypedArrayLike = require( 'validate.io-typed-array-like' ),
	deepSet = require( 'utils-deep-set' ).factory,
	deepGet = require( 'utils-deep-get' ).factory;


// FUNCTIONS

var GAMMAINC = require( './number.js' );


// INCOMPlETE GAMMA FUNCTION //

/**
* FUNCTION: gammainc( arr, a, path[, sep] )
*	Computes the incomplete gamma function for each element and deep sets the input array.
*
* @param {Array} arr - input array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Number} a - either an array of equal length or a scalar
* @param {String} path - key path used when deep getting and setting
* @param {String} [sep] - key path separator
* @returns {Array} input array
*/
function gammainc( x, a, path, sep, tail ) {
	var len = x.length,
		opts = {},
		dget,
		dset,
		v, i,
		FUN;

	if ( tail === 'upper' ) {
		FUN = GAMMAINC.upper;
	} else {
		FUN = GAMMAINC.lower;
	}

	if ( arguments.length > 3 ) {
		opts.sep = sep;
	}
	if ( len ) {
		dget = deepGet( path, opts );
		dset = deepSet( path, opts );
		if ( isTypedArrayLike( a ) ) {
			for ( i = 0; i < len; i++ ) {
				v = dget( x[ i ] );
				if ( typeof v === 'number' ) {
					dset( x[ i ], FUN( a[ i ], v ) );
				} else {
					dset( x[ i ], NaN );
				}
			}
		} else if ( isArrayLike( a ) ) {
			for ( i = 0; i < len; i++ ) {
				v = dget( x[ i ] );
				if ( typeof v === 'number' && typeof a[ i ] === 'number' ) {
					dset( x[ i ], FUN( a[ i ], v ) );
				} else {
					dset( x[ i ], NaN );
				}
			}
		} else {
			if ( typeof a === 'number' ) {
				for ( i = 0; i < len; i++ ) {
					v = dget( x[ i ] );
					if ( typeof v === 'number' ) {
						dset( x[ i ], FUN( a, v ) );
					} else {
						dset( x[ i ], NaN );
					}
				}
			} else {
				for ( i = 0; i < len; i++ ) {
					dset( x[ i ], NaN );
				}
			}
		}
	}
	return x;
} // end FUNCTION gammainc()


// EXPORTS //

module.exports = gammainc;
