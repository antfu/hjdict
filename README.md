# HJDict
An unofficial [HJDict](http://dict.hjenglish.com/) API in Javascript. 沪江小D非官方API

[(简体中文文档)](./README.zh-cn.md)

**[Live demo](https://antfu.github.io/hjdict/example/)**

## Quick Example
Get Japanese-Chinese dict:
```js
HJDict.jp2cn('傘', data => {
  // Do what you what with the data
})
```

```JSON
{
  "query": "傘",
  "candidates": [{
    "kanji": "傘",
    "kana": "かさ",
    "roman": "kasa",
    "mp3": "http://d1.g.hjfile.cn/voice/jpsound/J12852.mp3",
    "details": [{
      "part_of_speech": "名词",
      "items": [{
        "type": "text",
        "text": "伞。（傘）。"
      }, {
        "type": "list",
        "jp": "傘をさす。",
        "cn": "撑伞，打伞。"
      }]
    }]
  }, {
    "kanji": "傘",
    "kana": "からかさ",
    "roman": "karakasa",
    "mp3": "http://d1.g.hjfile.cn/voice/jpsound/J14795.mp3",
    "details": [{
      "part_of_speech": "名词",
      "items": [{
        "type": "text",
        "text": "纸伞，油纸伞。（さしがさ。）"
      }]
    }]
  }]
}
```

## Language Support
**Supported/Planed:**
- [x] Japanese-Chinese
- [ ] Chinese-Japanese
- [ ] English-Chinese
- [ ] Chinese-English

***Note:*** There is some other languages are supported by HJDict but not
in this list. Since I am not a user in those languages, I may not have
motivation to implement the APIs for them. However, any PR is welcome 🤗.


## License
MIT - [antfu](https://github.com/antfu)
