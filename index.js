var fs = require('fs')

module.exports = function (input, extension) {
    const NEW_LINE =  10

    var pos = 0
    var length = input.length
    var tmp = []
    var lines = []
    var allConf = []
    var exConf = []

    while (pos < length) {
        code = input.charCodeAt(pos)

            if (code === NEW_LINE) {
                var str = tmp.join('')
                    if (str !== '') {
                        lines.push(str)
                    }
                tmp = []
            }
            else {
                tmp.push(input[pos])
            }

        pos++
    }

    lines.forEach(function (line, i) {
        if (line.match(/^\[\*\]$/)) {
            var next = lines[++i]
            while (!next.match(/^\[/)) {
                allConf.push(next)
                next = lines[i++]
            }
        }
    })


    var indentSize = []
    allConf.forEach(function (conf) {
        if (conf.match(/indent_size/)) {
            var length = conf.length
            var pos = 0
            var flag = false

            while (pos < length) {
                if (flag) {
                    indentSize.push(conf[pos])
                }
                if (conf[pos] === '=') {
                    flag = true
                }
                pos++
            }
        }
    })
    indentSize = indentSize.join('').trim() - 0

    var indentStyle = []
    allConf.forEach(function (conf) {
        if (conf.match(/indent_style/)) {
            var length = conf.length
            var pos = 0
            var flag = false
            while (pos < length) {
                if (flag) {
                    indentStyle.push(conf[pos])
                }
                if (conf[pos] === '=') {
                    flag = true
                }
                pos++
            }
        }
    })
    indentStyle = indentStyle.join('').trim()


    var exIndentSize = []
    var exIndentStyle = []

    if (extension) {
        var re = new RegExp("\\*\\." + extension)

        lines.forEach(function (line, i) {
            if (line.match(re)) {
                var next = lines[++i]
                while (!next.match(/^\[/)) {
                    exConf.push(next)
                    next = lines[++i]
                }
            }
        })


        exConf.forEach(function (conf) {
            if (conf.match(/indent_size/)) {
                var length = conf.length
                var pos = 0
                var flag = false

                while (pos < length) {
                    if (flag) {
                        exIndentSize.push(conf[pos])
                    }
                    if (conf[pos] === '=') {
                        flag = true
                    }
                    pos++
                }
            }
        })
        exIndentSize = exIndentSize.join('').trim() - 0

        exConf.forEach(function (conf) {
            if (conf.match(/indent_style/)) {
                var length = conf.length
                var pos = 0
                var flag = false
                while (pos < length) {
                    if (flag) {
                        indentStyle.push(conf[pos])
                    }
                    if (conf[pos] === '=') {
                        flag = true
                    }
                    pos++
                }
            }
        })
        exIndentStyle = exIndentStyle.join('').trim()
    }

    if (indentSize.length === 0) {
        indentSize = null
    }

    if (indentStyle.length === 0) {
        indentStyle = null
    }

    if (exIndentSize.length === 0) {
        exIndentSize = null
    } else {
        indentSize = exIndentSize
    }

    if (exIndentStyle.length === 0) {
        exIndentStyle = null
    } else {
        indentStyle = exIndentStyle
    }


    return {
        indentSize: indentSize,
        indentStyle: indentStyle
    };
}
