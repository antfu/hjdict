import { match_group } from '../utils'
import { cnjp_parse_details } from './commons'

const QUERY_TYPE = 'cj'
const REG_CANDIDATE_BLOCK = /<div style="clear:both">(.*?<div id="com_panel_.*?<\/div>)/g
const REG_NODATA = /id='hjd_nodata_msg'>(.*?)<\/div>/
const REG_WORD_HANZI = /<span class="hjd_Green">\[(.*?)\]<\/span>/
const REG_WORD_DETAILS = /class="hjd_jp_explain">(.*?)<\/div>/

export default {
  url(query) {
    return 'http://dict.hjenglish.com/services/huaci/jp_web_ajax.ashx?type=' + QUERY_TYPE + '&w=' + query
  },
  parser(html) {
    let explains = []
    let found = false
    let matches = html.match(REG_CANDIDATE_BLOCK)
    if (matches) {
      found = true
      for (let raw_block of matches) {
        let block = {}
        block.primary = match_group(raw_block, REG_WORD_HANZI)
        block.details = cnjp_parse_details(match_group(raw_block, REG_WORD_DETAILS))
        explains.push(block)
      }
    }
    return { from: 'cn', to: 'jp', explains, found }
  }
}
