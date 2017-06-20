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
    floated: false,
    found: false,
    querying: false
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
      this.querying = true
      this.found = false
      HJDict.jp2cn(this.query, data => {
        if (!data.error) {
          this.explains = data.explains
          this.from = data.from
          this.to = data.to
          this.found = data.found
        } else
          this.failed = true
        this.querying = false
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
