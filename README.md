gammainc
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Incomplete gamma function.

Computes the regularized lower incomplete gamma function:

<div class="equation" align="center" data-raw-text="P( x, a ) = \frac{\gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_0^x t^{a-1} e^{-t} \; dt" data-equation="eq:lower_incomplete_gamma">
	<img src="https://cdn.rawgit.com/compute-io/gammainc/68d3e61dfeace303cffe14b75c5b249ba75b5281/docs/img/eqn1.svg" alt="Equation for the regularized lower incomplete gamma function.">
	<br>
</div>

The function can also be used to evaluate the regularized upper incomplete gamma function, which is defined as follows:  

<div class="equation" align="center" data-raw-text="Q( x, a ) = \frac{\Gamma(a,x)}{\Gamma(a)} = \frac{1}{\Gamma(a)} \int_x^\infty t^{a-1} e^{-t} \; dt" data-equation="eq:upper_incomplete_gamma">
	<img src="https://cdn.rawgit.com/compute-io/gammainc/68d3e61dfeace303cffe14b75c5b249ba75b5281/docs/img/eqn2.svg" alt="Equation for the regularized upper incomplete gamma function.">
	<br>
</div>

The two functions have the relationship `Q(x,a) = 1 - P(x,a)`.

## Installation

``` bash
$ npm install compute-gammainc
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var foo = require( 'compute-gammainc' );
```

#### foo( arr )

What does this function do?


## Examples

``` javascript
var foo = require( 'compute-gammainc' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-gammainc.svg
[npm-url]: https://npmjs.org/package/compute-gammainc

[travis-image]: http://img.shields.io/travis/compute-io/gammainc/master.svg
[travis-url]: https://travis-ci.org/compute-io/gammainc

[coveralls-image]: https://img.shields.io/coveralls/compute-io/gammainc/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/gammainc?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/gammainc.svg
[dependencies-url]: https://david-dm.org/compute-io/gammainc

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/gammainc.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/gammainc

[github-issues-image]: http://img.shields.io/github/issues/compute-io/gammainc.svg
[github-issues-url]: https://github.com/compute-io/gammainc/issues
