HJDict.set_cors_proxy('https://crossorigin.me/')

var app = new Vue({
  el: '#app',
  data: {
    failed: false,
    query: "傘",
    explains: [],
    error: null,
    from: 'jp',
    to: 'cn',
    floated: false
  },
  created() {
    this.query = "傘"
    this.doquery()
  },
  methods: {
    play(url) {
      var audio = new Audio(url)
      audio.play()
      return audio
    },
    doquery() {
      this.failed = false
      this.explains = []
      HJDict.jp2cn(this.query, data => {
        if (data.explains)
          this.explains = data.explains
        else
          this.failed = true
      })
    },
    get_lang_class(from, to) {
      if (from === 'cn' && to === 'jp')
        return 'lang-cn-jp'
      else if (from === 'jp' && to === 'cn')
        return 'lang-jp-cn'
    }
  }
})
