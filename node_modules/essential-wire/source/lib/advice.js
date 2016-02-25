/** @license MIT License (c) copyright 2010-2013 original author or authors */

/**
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author: Brian Cavalier
 * @author: John Hann
 */

	import when from 'when';

	/**
	 * Execute advice before f, passing same arguments to both, and
	 * discarding advice's return value.
	 * @param {function} f function to advise
	 * @param {function} advice function to execute before f
	 * @returns {function} advised function
	 */
	const before = (f, advice) => {
		return function() {
			advice.apply(this, arguments);
			return f.apply(this, arguments);
		};
	}

	/**
	 * Execute advice after f, passing f's return value to advice
	 * @param {function} f function to advise
	 * @param {function} advice function to execute after f
	 * @returns {function} advised function
	 */
	const after = (f, advice) => {
		return function() {
			return advice.call(this, f.apply(this, arguments));
		};
	}

	/**
	 * Execute f after a promise returned by advice fulfills. The same args
	 * will be passed to both advice and f.
	 * @param {function} f function to advise
	 * @param {function} advice function to execute before f
	 * @returns {function} advised function which always returns a promise
	 */
	const beforeAsync = (f, advice) => {
		return function() {
			let args = arguments;

			return when(args, () => {
				return advice.apply(this, args);
			}).then(() => {
				return f.apply(this, args);
			});
		};
	}

	/**
	 * Execute advice after a promise returned by f fulfills. The same args
	 * will be passed to both advice and f.
	 * @param {function} f function to advise
	 * @param {function} advice function to execute after f
	 * @returns {function} advised function which always returns a promise
	 */
	const afterAsync = (f, advice) => {
		return function() {
			return when(arguments, (args) => {
				return f.apply(this, args);
			}).then((result) => {
				return advice.call(this, result);
			});
		};
	}

	// Very simple advice functions for internal wire use only.
	// This is NOT a replacement for meld.  These advices stack
	// differently and will not be as efficient.
	export default {
		before: before,
		after: after,
		beforeAsync: beforeAsync,
		afterAsync: afterAsync
	};