var tb = tb || {};

tb.cmds = (function() {
	'use strict';

	var _cmds = {},
		_current;

	function invalidCommandError(name) {
		throw new Error('Command "'+name+'" does not exist');
	}

	return {
		add: function(cmd) {
			_cmds[cmd.name] = cmd;
		},
		get: function(name) {
			if (_cmds[name]) {
				return _cmds[name];
			} else {
				invalidCommandError(name);
			}
		},
		length: function() {
			return Object.keys(_cmds).length;
		},
		clear: function() {
			_cmds = {};
			_current = undefined;
		},
		getCurrent: function() {
			return _current;
		},
		setCurrent: function(name) {
			if (_cmds[name]) {
				_current = _cmds[name];
			} else {
				invalidCommandError(name);
			}
		},
		execCurrent: function() {
			if (_current && typeof _current.exec === 'function') {
				_current.exec();
			}
		}
	};
})();