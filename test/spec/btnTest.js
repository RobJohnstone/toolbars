/* global describe, it, expect, sinon, tb */

(function () {
    'use strict';

    describe('test buttons', function () {
        describe('constructor', function() {
            it('should create object with correct structure', function() {
                var btn = new tb.Btn('cmd', 'class', 'immediate');
                expect(btn).to.have.keys('_class', '_cmd', '_immediate');
            });
        });

        describe('render method', function() {
            it('should return correct html', function() {
                var expected = '<div class="btn testBtn"></div>',
                    btn = new tb.Btn({}, 'testBtn', false);
                expect(btn.render()).to.equal(expected);
            });
        });

        describe('click method', function() {
            it('should set current command if not immediate', function() {
                var cmd = {},
                    btn = new tb.Btn(cmd, []),
                    setCurrentCmdSpy = sinon.stub(tb.cmds, 'setCurrent');
                btn.click();
                expect(setCurrentCmdSpy.called).to.equal(true);
                expect(setCurrentCmdSpy.calledWith(cmd)).to.equal(true);
                setCurrentCmdSpy.restore();
            });

            it('should execute command if immediate', function() {
                var cmd = {
                        exec: sinon.spy()
                    },
                    btn = new tb.Btn(cmd, [], true);
                btn.click();
                expect(cmd.exec.called).to.equal(true);
                expect(cmd.exec.calledWith(undefined)).to.equal(true);
            });
        });
    });
})();
