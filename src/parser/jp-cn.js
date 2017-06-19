const REG_CANDIDATE_BLOCK = /<div style="clear:both">(.*?<div id="com_panel_.*?<\/div>)/g
const REG_EXAMPLE_LIST = /<img.*?>(.*?)\/(.*)/

function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}

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

      // Parse details
      let raw_details = (/class="hjd_jp_explain">(.*?)<\/div>/.exec(block)[1] || '').trim()
      let details = []
      for (let raw_part of raw_details.split('<b>').filter(i => i)) {
        let part = {}
        part.part_of_speech = /【(.*?)】/.exec(raw_part)[1]
        let raw_items = raw_part.split('</b>')[1].split('<br/>')
        raw_items = raw_items.filter(i => { return i && i.trim() })
        let items = []
        for (let i of raw_items) {
          let matches = i.match(REG_EXAMPLE_LIST)
          if (matches) {
            items.push({
              type: 'example',
              jp: matches[1],
              cn: matches[2]
            })
          } else {
            items.push({ type: 'text', text: i.trim() })
          }
        }
        part.items = items
        details.push(part)
      }
      candi.details = details
      //.replace(/<img.*?>(.*?)\/(.*?)<br\/>/g, '<div class="dot"></div><div class="list_jp">$1</div><div class="list_cn">$2</div><br>')
      candidates.push(candi)
    }
    return candidates
  }
}
