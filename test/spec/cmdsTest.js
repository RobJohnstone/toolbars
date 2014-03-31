/* global describe, it, assert, expect, afterEach, beforeEach, sinon, tb */

(function () {
    'use strict';

    describe('test commands handling', function () {
        afterEach(function() {
            tb.cmds.clear();
        });

        describe('add and get methods', function() {
            it('add method and get methods should work', function () {
                tb.cmds.add({
                    name: 'test command'
                });
                assert.equal('test command', tb.cmds.get('test command').name);
            });

            it('should throw exception when getting a command that doesn\'t exist', function() {
                var getInvalidCommand = function() {
                    tb.cmds.get('test');
                };
                expect(getInvalidCommand).to.throw('Command "test" does not exist');
            });
        });

        describe('length method', function() {
            it('should return correct length', function() {
                expect(tb.cmds.length()).to.equal(0);
                tb.cmds.add({
                    name: 'test command'
                });
                expect(tb.cmds.length()).to.equal(1);
            });
        });

        describe('clear method', function() {
            beforeEach(function() {
                tb.cmds.add({
                    name: 'test'
                });
                tb.cmds.setCurrent('test');
            });

            it('clear method should clear all commands', function() {
                expect(tb.cmds.length()).to.equal(1);
                tb.cmds.clear();
                expect(tb.cmds.length()).to.equal(0);
            });

            it('should remove current command', function() {
                tb.cmds.clear();
                expect(tb.cmds.getCurrent()).to.equal(undefined);
            });
        });

        describe('setCurrent and getCurrent', function() {
            it('should set and retrieve current command', function() {
                tb.cmds.add({
                    name: 'test'
                });
                expect(tb.cmds.getCurrent()).to.equal(undefined);
                tb.cmds.setCurrent('test');
                expect(tb.cmds.getCurrent().name).to.equal('test');
            });

            it('should throw an exception when setting as current a command that does not exist', function() {
                var setInvalidCurrent = function() {
                    tb.cmds.setCurrent('test');
                };
                expect(setInvalidCurrent).to.throw('Command "test" does not exist');
            });
        });

        describe('execute current', function() {
            it('should execute current command', function() {
                var cmd = {
                    name: 'test',
                    exec: sinon.spy()
                };
                tb.cmds.add(cmd);
                tb.cmds.setCurrent(cmd.name);
                tb.cmds.execCurrent();
                expect(cmd.exec.called).to.equal(true);
            });

            it('should fail silently if there is no current command', function() {
                expect(tb.cmds.execCurrent).not.to.throw(Error);
            });
        });
    });
})();
