const HJDict = require('../dist/hjdict')

let queries = ['傘', '私']

for (let query of queries) {
  console.log('Start querying ' + query)
  HJDict.jp2cn(query, data => {
    console.log(JSON.stringify(data, null, 2))
  })
}
