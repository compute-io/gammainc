'use strict';

// MODULES //

var gamma = require( 'gamma' );

// VARIABLES //

var EPSILON = 1e-12,
	TINY = 1e-30;


// UPPER INCOMPLETE GAMMA FUNCTION
// via modified Lentz's method for computing continued fraction, see README.md

/**
* FUNCTION: gammainc_u( s, x )
*	Computes the regularized upper incomplete gamma function
* @param {Number} s - function parameter
* @param {Number} x - function parameter
* @returns {Number} function value
*/
function gammainc_u( s, x ) {

	if ( x < 1.1 || x < s ) {
		return 1 - gammainc_u( s, x );
	}

	var f = 1 + x - s,
		C = f,
		D = 0,
		i = 1,
		a, b, chg;
	for ( i = 1; i < 1000; i++ ) {
		a = i * (s - i);
		b = (i<<1) + 1 + x - s;
		D = b + a * D;
		if ( D === TINY ) {
			D = TINY;
		}
		C = b + a / C;
		if ( C === TINY ) {
			C = TINY;
		}
		D = 1 / D;
		chg = C * D;
		f *= chg;
		if ( Math.abs( chg - 1 ) < EPSILON ) {
			break;
		}
	}
	return Math.exp(s * Math.log( x ) - x - gamma.log( s ) - Math.log(f) );
}

// LOWER INCOMPlETE GAMMA FUNCTION //
// via power series expansion, see README.md

/**
* FUNCTION: gammainc_l( s, x )
*	Computes the regularized lower incomplete gamma function
* @param {Number} s - function parameter
* @param {Number} x - function parameter
* @returns {Number} function value
*/
function gammainc_l( s, x ) {
    if ( x === 0) {
        return 0;
    }
    if ( x < 0 || s < 0 ) {
        return NaN;
    }

	if( x > 1.1 && x > s ) {
        return 1 - gammainc_u( s, x );
    }

    var ft,
        r = s,
        c = 1,
        pws = 1;

    ft = s * Math.log( x ) - x - gamma.log( s );
    ft = Math.exp( ft );
    do {
        r += 1;
        c *= x/r;
        pws += c;
    } while ( c / pws > EPSILON );
    return pws*ft/s;
}



module.exports = gammainc_l;
