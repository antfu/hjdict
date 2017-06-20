# HJDict [WIP]
An unofficial [HJDict](http://dict.hjenglish.com/) API in Javascript.

沪江小D非官方API [(简体中文文档)](./README.zh-cn.md)

A Live demo here: https://antfu.github.io/hjdict/example/

## Quick Example
Get Japanese-Chinese dict:
```js
HJDict.jp2cn('傘', data => {
  // Do what you what with data
})
```

Data:
```JSON
{
  "query": "傘",
  "result": [
    {
      "kanji": "傘",
      "kana": "かさ",
      "roman": "kasa",
      "mp3": "http://d1.g.hjfile.cn/voice/jpsound/J12852.mp3",
      "details": "..."
    },
    {
      "kanji": "傘",
      "kana": "からかさ",
      "roman": "karakasa",
      "mp3": "http://d1.g.hjfile.cn/voice/jpsound/J14795.mp3",
      "details": "<b>【名词】</b><br/>纸伞，油纸伞。（さしがさ。）<br/>"
    }
  ]
}
```

## License
MIT - [antfu](https://github.com/antfu)
