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

## Install
### Browser
Download [hjdict.js](./dist/hjdict.js)
and add following code in your HTML head:
```html
<script src="<Path To>/hjdict.js">
```
Or you can just use
```html
<script src="https://antfu.github.io/hjdict/dist/hjdict.js">
```

***Note:*** When using HJDict in browser,
you may face [Cross Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) problem.
You should try [the solution here](#Cross_Origin_Request).

### Node
```sh
npm install hjdict
```
```js
var HJDict = require('hjdict')
```

## Cross Origin Request
We recommend a free CORS proxy: http://crossorigin.me/. You can set it by using:
```js
HJDict.set_cors_proxy('http://crossorigin.me/')
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
