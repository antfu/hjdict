const expect = require('chai').expect
const fetch = require('node-fetch')
const HjDict = require('../dist/hjdict')

HjDict.set_fetch(fetch)

describe('basic', () => {
  describe('jp2cn', () => {
    it('reponses correctly', () => {
      const query = '学生'
      HjDict.jp2cn(query, data => {
        expect(data.query).to.equal(query)
        expect(data.from).to.equal('jp')
        expect(data.to).to.equal('cn')
        expect(data.found).to.equal(true)
        expect(data).to.have.property('explains').with.lengthOf(1) // This depends on HjDict.com, may change
        expect(data.explains[0].primary).to.equal(query)
        expect(data.explains[0].primary).to.equal('がくせい')
        expect(data.explains[0].primary).to.equal('gakusei')
      })
    })

    it('return no matches', () => {
      HjDict.jp2cn('你好', data => {
        expect(data.found).to.equal(false)
      })
    })
  })
})
