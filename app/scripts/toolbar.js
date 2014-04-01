var tb = tb || {};

tb.Toolbar = (function() {
	'use strict';

	/**
	 * Toolbar constructor
	 * @param container {jElm} The element holding the toolbar
	 * @param cmds {tb.cmds}
	 */
	function Toolbar(container, cmds) {
		this._container = container;
		this._buttons = [];
		this._cmds = cmds;
		this._initialiseEvents();
	}

	/**
	 * initialise events
	 */
	Toolbar.prototype._initialiseEvents = function() {
		this._container.on('click', '.button', this._handleBtnClick.bind(this));
	};

	/**
	 * handle button click
	 * @param parameter
	 */
	Toolbar.prototype._handleBtnClick = function() {
		this._cmds.executeCurrent();
	};

	/**
	 * tidy up
	 */
	Toolbar.prototype.destroy = function() {
		this._container.off();
	};

	/**
	 * Add a button
	 * @param btn {tb.Btn} the button to be added
	 */
	Toolbar.prototype.addBtn = function(btn) {
		this._container.append(btn.render());
	};

	return Toolbar;
})();