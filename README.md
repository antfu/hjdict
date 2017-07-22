# HjDict
[![npm](https://img.shields.io/npm/v/hjdict.svg?style=flat-square)](https://www.npmjs.com/package/hjdict)
[![Travis](https://img.shields.io/travis/antfu/hjdict.svg?style=flat-square)](https://travis-ci.org/antfu/hjdict)

An unofficial [HjDict](http://dict.hjenglish.com/) API in Javascript. 沪江小D非官方API

[(简体中文文档)](./README.zh-cn.md)

**[🌐 Live demo](https://antfu.github.io/hjdict/demo/)**

## Quick Example
Get Japanese-Chinese dict:
```js
HjDict.jp2cn('傘', data => {
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
Download [hjdict.js](https://antfu.github.io/hjdict/dist/hjdict.js)
and add following code in your HTML head:
```html
<script src="<Path To>/hjdict.js">
```
Or you can just use
```html
<script src="https://antfu.github.io/hjdict/dist/hjdict.js">
```

***Note:*** When using HjDict in browser,
you may face [Cross Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) problem.
You should try [the solution here](#cross-origin-request).

### Node
```sh
npm install hjdict node-fetch
```
```js
const fetch = require('node-fetch')
const HjDict = require('hjdict')
HjDict.set_fetch(fetch)
```
For Node.js, you should install `note-fetch` and pass it though `HjDict.set_fetch`.

## Cross Origin Request
Since version `0.0.3`, the default CORS proxy is set to http://crossorigin.me/.
You can always set/unset it by using the following code at the begin of your scripts:
```js
// Set the cors proxy
HjDict.set_cors_proxy('http://crossorigin.me/')

// Reset
HjDict.set_cors_proxy('')
```

## Language Support
**Supported/Planed:**
- [x] Japanese-Chinese
- [x] Chinese-Japanese
- [ ] English-Chinese
- [ ] Chinese-English

***Note:*** There are some other languages are supported by HjDict.com but not
in this list. Since I am not a user of those languages, I may not have
time to implement them. However, any PR is welcome 🤗.


## License
MIT - [antfu](https://github.com/antfu)
