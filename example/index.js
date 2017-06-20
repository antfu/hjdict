HJDict.set_cos_proxy('https://crossorigin.me/')

var app = new Vue({
  el: '#app',
  data: {
    failed: false,
    query: "傘",
    candidates: []
  },
  created(){
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
      this.candidates = []
      HJDict.jp2cn(this.query, data => {
        if (data.candidates)
          this.candidates = data.candidates
        else
          this.failed = true
      })
    }
  }
})
