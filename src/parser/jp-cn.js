import { match_group } from '../utils'

const REG_CANDIDATE_BLOCK = /<div style="clear:both">(.*?<div id="com_panel_.*?<\/div>)/g
const REG_WORD_KANJI = /<span class="hjd_Green">\[<font color=red>(.*?)<\/font>\]<\/span>/
const REG_WORD_KANA = /<span title="假名">\[(.*?)\]<\/span>/
const REG_WORD_ROMAN = /<span title="罗马音".*?\[(.*?)\]<\/font><\/span>/
const REG_WORD_MP3 = /class="hjd_fl">(.*?)<\/span>/
const REG_WORD_DETAILS = /class="hjd_jp_explain">(.*?)<\/div>/
const REG_WORD_DETAILS_EXAMPLE_LIST = /<img.*?>(.*?)\/(.*)/
const REG_WORD_DETAILS_PART_OF_SPEECH = /【(.*?)】/

export default {
  url(query) {
    return 'http://dict.hjenglish.com/services/huaci/jp_web_ajax.ashx?type=jc&w=' + query
  },
  parser(html) {
    let candidates = []
    for (let raw_block of html.match(REG_CANDIDATE_BLOCK)) {
      let block = {}
      block.kanji = match_group(raw_block, REG_WORD_KANJI)
      block.kana = match_group(raw_block, REG_WORD_KANA)
      block.roman = match_group(raw_block, REG_WORD_ROMAN)
      block.mp3 = match_group(raw_block, REG_WORD_MP3)
      block.details = _parse_details(match_group(raw_block, REG_WORD_DETAILS))
      candidates.push(block)
    }
    return candidates
  },
}

function _parse_details(raw_details) {
  raw_details = raw_details || ''
  let details = []
  for (let raw_part of raw_details.split('<b>').filter(i => {return i && i.trim()})) {
    let raw_items = (raw_part
        .split('</b>')[1] || '')
      .split('<br/>')
      .filter(i => { return i && i.trim() })
    let items = []
    for (let i of raw_items) {
      let matches = i.match(REG_WORD_DETAILS_EXAMPLE_LIST)
      if (matches) {
        items.push({
          type: 'list',
          jp: matches[1],
          cn: matches[2]
        })
      } else {
        items.push({ type: 'text', text: i.trim() })
      }
    }
    details.push({
      part_of_speech: match_group(raw_part, REG_WORD_DETAILS_PART_OF_SPEECH),
      items
    })
  }
  return details
}
