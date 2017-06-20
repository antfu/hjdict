HJDict.set_cors_proxy('https://crossorigin.me/')

Vue.component('hjdict-query', {
  props: {
    query: {
      type: String,
      default: ''
    },
    floated: {
      default: false
    }
  },
  template: '#template-hjdict-query',
  data() {
    return {
      empty: true,
      failed: false,
      result: {
        explains: [],
        error: null,
        from: 'jp',
        to: 'cn',
        found: false,
        querying: false,
        query: ''
      }
    }
  },
  watch: {
    query() {
      this.doquery()
    }
  },
  created() {
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
      this.result.explains = []
      this.result.error = null
      this.result.querying = true
      this.result.found = false
      if (this.query.trim()) {
        this.empty = false
        HJDict.jp2cn(this.query, data => {
          if (!data.error) {
            this.result = Object.assign({}, this.result, data)
          } else
            this.failed = true
          this.result.querying = false
        })
      } else {
        this.empty = true
      }
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    query_input: "傘",
    query: "",
  },
  created() {
    this.query_input = "傘"
    this.doquery()
  },
  methods: {
    doquery() {
      this.query = this.query_input.trim()
    }
  }
})
