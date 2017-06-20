import { match_group } from '../utils'

const REG_WORD_DETAILS_EXAMPLE_LIST = /<img.*?>(.*?)\/(.*)/
const REG_WORD_DETAILS_PART_OF_SPEECH = /【(.*?)】/

export function cnjp_parse_details(raw_details) {
  raw_details = (raw_details || '').trim()
  let details = []
  let raw_parts = raw_details.split('<b>').filter(i => { return i && i.trim() }) || []
  if (raw_parts.length) {
    for (let raw_part of raw_parts) {
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
  } else if (raw_details) {
    details.push({ items: [{ type: 'text', text: raw_details }] })
  }
  return details
}
