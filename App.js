var some_text = "I AM SOME TEXT, YES.";



new Vue({
    el: '#app',
    data: {
      m1: some_text,
      info: null
    },
    vuetify: new Vuetify(),
    mounted () {
        axios
          .get('https://api.coindesk.com/v1/bpi/currentprice.json')
          .then(response => (this.info = response))
      }
});