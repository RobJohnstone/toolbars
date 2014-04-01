/* global describe, it, expect, beforeEach, afterEach, sinon, tb */

(function () {
    'use strict';

    describe('test toolbars', function () {
        var container, handlers = {};

        beforeEach(function() {
            container = {
                on: sinon.spy(function(evt, selector, handler) {
                    handlers = {
                        evt: evt,
                        selector: selector,
                        handler: handler
                    };
                }),
                off: sinon.spy(),
                append: sinon.spy()
            };
        });

        afterEach(function() {
            handlers = {};
        });

        describe('constructor', function() {
            it('should create object with correct structure', function() {
                var toolbar = new tb.Toolbar(container, {});
                expect(toolbar).to.have.keys('_container', '_buttons', '_cmds');
            });

            it('should initialise events', function() {
                var cmds = {
                    executeCurrent: sinon.spy()
                };
                new tb.Toolbar(container, cmds);
                expect(container.on.called).to.equal(true);
                expect(handlers.evt).to.equal('click');
                expect(handlers.selector).to.equal('.button');
                handlers.handler();
                expect(cmds.executeCurrent.called).to.equal(true);
            });
        });

        describe('destroy method', function() {
            it('should remove event handlers', function() {
                var cmds = {},
                    toolbar = new tb.Toolbar(container, cmds);
                expect(container.on.called).to.equal(true);
                toolbar.destroy();
                expect(container.off.called).to.equal(true);
            });
        });

        describe('addBtn method', function() {
            it('should append a button to the container', function() {
                var btn = {
                        render: sinon.spy(function() {
                            return 'some html';
                        })
                    },
                    toolbar = new tb.Toolbar(container, {});
                toolbar.addBtn(btn);
                expect(container.append.calledWith('some html')).to.equal(true);

            });
        });
    });
})();
