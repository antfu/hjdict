# HJDict
[![npm](https://img.shields.io/npm/v/hjdict.svg?style=flat-square)](https://www.npmjs.com/package/hjdict)
[![Travis](https://img.shields.io/travis/antfu/hjdict.svg?style=flat-square)](https://travis-ci.org/antfu/hjdict)

An unofficial [HJDict](http://dict.hjenglish.com/) API in Javascript. 沪江小D非官方API

[(简体中文文档)](./README.zh-cn.md)

**[🌐 Live demo](https://antfu.github.io/hjdict/demo/)**

## Quick Example
Get Japanese-Chinese dict:
```js
HJDict.jp2cn('傘', data => {
  console.log(data)
  // Do what you what with the data
})
```

```JSON
{
  "query": "傘",
  "explains": [{
    "primary": "傘",
    "secondary": "かさ",
    "tertiary": "kasa",
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
    "primary": "傘",
    "secondary": "からかさ",
    "tertiary": "karakasa",
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
For more data format, please check the [API document](./docs/API.md).

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
You should try [the solution here](#cross-origin-request).

### Node
```sh
npm install hjdict
```
```js
var HJDict = require('hjdict')
```

## Cross Origin Request
We recommend a free CORS proxy: http://crossorigin.me/.
You can set it by using the following code at the begin of your scripts:
```js
HJDict.set_cors_proxy('http://crossorigin.me/')
```

## Language Support
**Supported/Planed:**
- [x] Japanese-Chinese
- [x] Chinese-Japanese
- [ ] English-Chinese
- [ ] Chinese-English

***Note:*** There are some other languages are supported by HJDict.com but not
in this list. Since I am not a user of those languages, I may not have
time to implement them. However, any PR is welcome 🤗.


## License
MIT - [antfu](https://github.com/antfu)
