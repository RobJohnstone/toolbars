var tb = tb || {};

tb.Btn = (function() {
	'use strict';

	/**
	 * Btn constructor
	 * @param cmd {cmd}
	 * @param cls {String || Array} css class name(s)
	 * @param immediate {Boolean} true if the command should be executed on click, false if should simply be set as current command
	 */
	function Btn(cmd, cls, immediate) {
		this._cmd = cmd;
		this._class = cls;
		this._immediate = !!immediate;
	}

	/**
	 * Renders the button
	 * @return {String} html for the button
	 */
	Btn.prototype.render = function() {
		var classes = ['btn'].concat(this._class);
		return '<div class="'+classes.join(' ')+'"></div>';
	};

	/**
	 * Handles the button being clicked
	 */
	Btn.prototype.click = function() {
		if (this._immediate) {
			this._cmd.exec();
		} else {
			tb.cmds.setCurrent(this._cmd);
		}
	};

	return Btn;
})();