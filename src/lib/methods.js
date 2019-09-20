export const guid = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export const getHtml4String = (val) => {
  let html = ''
  let obj = {}

  val.forEach((data, index) => {
    html += (index === 0 ? '' : '\n') + data.html
    Object.assign(obj, data.data)
  })

  const aaa = JSON.stringify(obj, null, 2).split('\n')
  let json = ''
  aaa.forEach(function(v, i) {
    const a = v.split(':')

    if (a.length === 1) {
      if (i !== 0) {
        json += '    '
      }
      json += v + '\n'
    } else {
      json += `    ${(a[0] || '').replace(/"/g, '')}:${(a[1] || '').replace(/"/g, "'")}\n`
    }
  })

  const returnHtml =
    '<template>\n' +
    (val.length <= 1 ? '' : '  <div>\n') +
    html +
    '\n' +
    (val.length <= 1 ? '' : '  </div>\n') +
    '</template>\n' +
    '<script>\n' +
    'export default {\n' +
    '  data() {\n' +
    '    return ' +
    json +
    '  }\n' +
    '};\n' +
    '<' +
    '/script>\n' +
    '<style lang="scss" scoped>\n' +
    '</style>'

  return returnHtml
}
