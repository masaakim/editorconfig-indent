var fs = require('fs')
var test = require('tape')
var editorconfigIndent = require('..')
var editorconfig = fs.readFileSync('.editorconfig', 'utf-8')

test('editorconfig-indent', function (t) {
    var expected = { indentSize: 4, indentStyle: 'space' }
    var actual = editorconfigIndent(editorconfig)
    t.same(expected, actual)
    t.end()
})

test('editorconfig-indent', function (t) {
    var expected = { indentSize: { css: 2 }, indentStyle: { scss: 'tab' } }
    var actual = editorconfigIndent(editorconfig, ['css', 'scss'])
    t.same(expected, actual)
    t.end()
})
