'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for validated options
* @param {Object} options - function options
* @param {Boolean} [options.copy=true] - boolean indicating if the function should return a new data structure
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {String} [options.sep] - deep get/set key path separator
* @param {String} [options.path] - deep get/set key path
* @param {String} [options.dtype] - output data type
* @param {String} [options.tail] - string indicating whether to compute the lower or upper incomplete gamma function
* @param {Boolean} [options.regularized] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @returns {Null|Error} null or an error
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'gammainc()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'gammainc()::invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'accessor' ) ) {
		opts.accessor = options.accessor;
		if ( !isFunction( opts.accessor ) ) {
			return new TypeError( 'gammainc()::invalid option. Accessor must be a function. Option: `' + opts.accessor + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'path' ) ) {
		opts.path = options.path;
		if ( !isString( opts.path ) ) {
			return new TypeError( 'gammainc()::invalid option. Key path option must be a string primitive. Option: `' + opts.path + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'gammainc()::invalid option. Separator option must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'dtype' ) ) {
		opts.dtype = options.dtype;
		if ( !isString( opts.dtype ) ) {
			return new TypeError( 'gammainc()::invalid option. Data type option must be a string primitive. Option: `' + opts.dtype + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'regularized' ) ) {
		opts.regularized = options.regularized;
		if ( !isBoolean( opts.regularized ) ) {
			return new TypeError( 'gammainc()::invalid option. Regularized option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'tail' ) ) {
		opts.tail = options.tail;
		if ( !isString( opts.tail ) ) {
			return new TypeError( 'gammainc()::invalid option. Tail option must be a string primitive. Option: `' + opts.tail + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
