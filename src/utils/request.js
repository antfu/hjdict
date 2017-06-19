import fetch from 'node-fetch'

function to_unicode(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, match => {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  })
}

export default (url, callback) => {
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
