import fetch from 'node-fetch'

let to_unicode = (text) => {
  return text.replace(/\\u[\dA-F]{4}/gi, match => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  })
}

let request = (url, callback) => {
  (fetch || window.fetch)(url)
  .then(r => r.text())
    .then(raw => {
      let text = to_unicode(raw)
        .replace(/\\t/g, '') // Remove redundant slash
        .replace(/\\"/g, '"') // Remove redundant slash
      callback(text)
    }).catch(e => {
      console.error(e)
      callback(null, e)
    })
}

let match_group = (string, regx, index, value) => {
  if (index == null)
    index = 1

  let matches = string.match(regx)
  if (!matches)
    return value
  return matches[index] || value
}

export { to_unicode, request, match_group }
