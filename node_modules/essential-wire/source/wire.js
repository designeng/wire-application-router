import createContext from './lib/context';

var wire, rootContext, rootOptions;
var rootSpec = {};

wire.version = '0.10.11';

rootOptions = { require: require.context(".", true, /\/lib\//) };

function wire(spec, options) {

	// If the root context is not yet wired, wire it first
	if (!rootContext) {
		rootContext = createContext(rootSpec, null, rootOptions);
	}

	// Use the rootContext to wire all new contexts.
	return rootContext.then(function (root) {
		return root.wire(spec, options);
	});
}

wire.load = function amdLoad(name, require, done /*, config */) {
	// If it's a string, try to split on ',' since it could be a comma-separated
	// list of spec module ids
	wire(name.split(','), { require: require })
		.then(done, done.error)
		.otherwise(crash);

	function crash(e) {
		// Throw uncatchable exception for loaders that don't support
		// AMD error handling.  This will propagate up to the host environment
		setTimeout(function() { throw e; }, 0);
	}
};

module.exports = wire;