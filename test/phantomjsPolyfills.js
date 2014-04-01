/**
 * Polyfills that are only required for testing in phantomjs
 * phantomjs has some ultra modern stuff but is also missing one or two fairly basic things due to upstream issues
 */

/**
 * bind
 * taken from MDN with minor modifications to satisfy jshint
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        'use strict';
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            EmptyObj = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof EmptyObj && oThis ? this : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        EmptyObj.prototype = this.prototype;
        fBound.prototype = new EmptyObj();

        return fBound;
    };
}