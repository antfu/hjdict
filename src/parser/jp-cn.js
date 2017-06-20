import { match_group } from '../utils'
import { cnjp_parse_details } from './commons'

const QUERY_TYPE = 'jc'
const REG_CANDIDATE_BLOCK = /<div style="clear:both">(.*?<div id="com_panel_.*?<\/div>)/g
const REG_WORD_KANJI = /<span class="hjd_Green">\[<font color=red>(.*?)<\/font>\]<\/span>/
const REG_WORD_KANA = /<span title="假名">\[(.*?)\]<\/span>/
const REG_WORD_ROMAN = /<span title="罗马音".*?\[(.*?)\]<\/font><\/span>/
const REG_WORD_MP3 = /class="hjd_fl">(.*?)<\/span>/
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
        block.primary = match_group(raw_block, REG_WORD_KANJI)
        block.secondary = match_group(raw_block, REG_WORD_KANA)
        block.tertiary = match_group(raw_block, REG_WORD_ROMAN)
        block.mp3 = match_group(raw_block, REG_WORD_MP3)
        block.details = cnjp_parse_details(match_group(raw_block, REG_WORD_DETAILS))
        explains.push(block)
      }
    }
    return { from: 'jp', to: 'cn', explains, found }
  }
}
