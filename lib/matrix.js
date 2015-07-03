'use strict';

// MODULES //

var isMatrixLike = require( 'validate.io-matrix-like' );


// FUNCTIONS

var GAMMAINC = require( './number.js' );


// INCOMPlETE GAMMA FUNCTION //

/**
* FUNCTION: gammainc( out, x, y[, tail] )
*	Computes an element-wise power of a matrix.
*
* @param {Matrix} out - output matirx
* @param {Matrix} x - input matrix
* @param {Matrix|Number} y - either a matrix of equal dimensions or a scalar
* @param {String} [tail="lower"] - wheter to compute the lower or upper incomplete gamma function
* @returns {Matrix} output matrix
*/
function gammainc( out, x, y, tail ) {
	var len = x.length,
		i, j,
		M, N,
		FUN;

	if ( out.length !== len ) {
		throw new Error( 'gammainc()::invalid input arguments. Input and output matrices must be the same length.' );
	}

	if ( tail === 'upper' ) {
		FUN = GAMMAINC.upper;
	} else {
		FUN = GAMMAINC.lower;
	}

	if ( isMatrixLike( y ) ) {
		M = x.shape[0];
		N = x.shape[1];
		if ( M !== x.shape[0] || N !== y.shape[1] ) {
			throw new Error( 'gammainc()::invalid input arguments. Exponent matrix must have the same number of rows and columns as the base matrix.' );
		}
		for ( i = 0; i < M; i++ ) {
			for ( j = 0; j < N; j++ ) {
				out.set( i, j, FUN( x.get( i, j ), y.get( i, j ) ) );
			}
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			out.data[ i ] = FUN( x.data[ i ], y );
		}
	}
	return out;
} // end FUNCTION gammainc()


// EXPORTS //

module.exports = gammainc;
