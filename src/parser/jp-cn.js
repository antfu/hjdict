const REG_CANDIDATE_BLOCK = /<div style="clear:both">(.*?<div id="com_panel_.*?<\/div>)/g

export default {
  url(query) {
    return 'http://dict.hjenglish.com/services/huaci/jp_web_ajax.ashx?type=jc&w=' + query
  },
  parser(html) {
    let candidates = []
    for (let block of html.match(REG_CANDIDATE_BLOCK)) {
      let candi = {}
      candi.kanji = /<span class="hjd_Green">\[<font color=red>(.*?)<\/font>\]<\/span>/.exec(block)[1]
      candi.kana = /<span title="假名">\[(.*?)\]<\/span>/.exec(block)[1]
      candi.roman = /<span title="罗马音".*?\[(.*?)\]<\/font><\/span>/.exec(block)[1]
      candi.mp3 = /class="hjd_fl">(.*?)<\/span>/.exec(block)[1]
      // TODO: Further parse details
      candi.details = (/class="hjd_jp_explain">(.*?)<\/div>/.exec(block)[1] || '').replace(/<img.*?>(.*?)\/(.*?)<br\/>/g, '<div class="dot"></div><div class="list_jp">$1</div><div class="list_cn">$2</div><br>')
      candidates.push(candi)
    }
    return candidates
  }
}
