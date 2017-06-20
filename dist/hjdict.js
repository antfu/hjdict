(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('node-fetch')) :
	typeof define === 'function' && define.amd ? define(['node-fetch'], factory) :
	(global.HJDict = factory(global.fetch));
}(this, (function (fetch) { 'use strict';

fetch = fetch && 'default' in fetch ? fetch['default'] : fetch;

var to_unicode = function to_unicode(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
};

var request = function request(url, callback) {
  (fetch || window.fetch)(url).then(function (r) {
    return r.text();
  }).then(function (raw) {
    var text = to_unicode(raw).replace(/\\t/g, '' // Remove redundant slash
    ).replace(/\\"/g, '"' // Remove redundant slash
    );callback(text);
  }).catch(function (e) {
    console.error(e);
    callback(null, e);
  });
};

var match_group = function match_group(string, regx, index, value) {
  if (index == null) index = 1;

  var matches = string.match(regx);
  if (!matches) return value;
  return matches[index] || value;
};

var REG_CANDIDATE_BLOCK = /<div style="clear:both">(.*?<div id="com_panel_.*?<\/div>)/g;
var REG_WORD_KANJI = /<span class="hjd_Green">\[<font color=red>(.*?)<\/font>\]<\/span>/;
var REG_WORD_KANA = /<span title="假名">\[(.*?)\]<\/span>/;
var REG_WORD_ROMAN = /<span title="罗马音".*?\[(.*?)\]<\/font><\/span>/;
var REG_WORD_MP3 = /class="hjd_fl">(.*?)<\/span>/;
var REG_WORD_DETAILS = /class="hjd_jp_explain">(.*?)<\/div>/;
var REG_WORD_DETAILS_EXAMPLE_LIST = /<img.*?>(.*?)\/(.*)/;
var REG_WORD_DETAILS_PART_OF_SPEECH = /【(.*?)】/;

var jp_cn = {
  url: function url(query) {
    return 'http://dict.hjenglish.com/services/huaci/jp_web_ajax.ashx?type=jc&w=' + query;
  },
  parser: function parser(html) {
    var candidates = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = html.match(REG_CANDIDATE_BLOCK)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var raw_block = _step.value;

        var block = {};
        block.kanji = match_group(raw_block, REG_WORD_KANJI);
        block.kana = match_group(raw_block, REG_WORD_KANA);
        block.roman = match_group(raw_block, REG_WORD_ROMAN);
        block.mp3 = match_group(raw_block, REG_WORD_MP3);
        block.details = _parse_details(match_group(raw_block, REG_WORD_DETAILS));
        candidates.push(block);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return candidates;
  }
};

function _parse_details(raw_details) {
  raw_details = raw_details || '';
  var details = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = raw_details.split('<b>').filter(function (i) {
      return i && i.trim();
    })[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var raw_part = _step2.value;

      var raw_items = (raw_part.split('</b>')[1] || '').split('<br/>').filter(function (i) {
        return i && i.trim();
      });
      var items = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = raw_items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var i = _step3.value;

          var matches = i.match(REG_WORD_DETAILS_EXAMPLE_LIST);
          if (matches) {
            items.push({
              type: 'list',
              jp: matches[1],
              cn: matches[2]
            });
          } else {
            items.push({ type: 'text', text: i.trim() });
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      details.push({
        part_of_speech: match_group(raw_part, REG_WORD_DETAILS_PART_OF_SPEECH),
        items: items
      });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return details;
}

var OPTIONS = {
  cos_proxy: ''
};

var VOID_CALLBACK = function VOID_CALLBACK() {};

var index = {
  version: '0.0.1',
  set: function set(options) {
    OPTIONS = Object.assign(OPTIONS, options);
  },
  set_cos_proxy: function set_cos_proxy(proxy) {
    this.set({ cos_proxy: proxy });
  },
  jp2cn: function jp2cn(query, callback) {
    this.query({
      parser: jp_cn.parser,
      url: jp_cn.url,
      query: query,
      callback: callback
    });
  },
  query: function query(option) {
    option = Object.assign({}, OPTIONS, option);

    var url = option.url(option.query);
    url = encodeURI(url);
    if (option.cos_proxy) {
      if (typeof option.cos_proxy === 'function') url = option.cos_proxy(url);else url = option.cos_proxy + url;
    }

    var html = request(url, function (data, e) {
      var returns = {
        query: option.query
      };

      if (e) {
        returns.error = e.message;
      } else {
        returns.candidates = option.parser(data);
      }

      (option.callback || VOID_CALLBACK)(returns);
    });
  }
};

return index;

})));
//# sourceMappingURL=hjdict.js.map
