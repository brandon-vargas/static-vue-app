var some_text = "I AM SOME TEXT, YES.";



new Vue({
    el: '#app',
    data: {
      m1: some_text,
      info: null,
      more_info: 'starting info',
      name: 'idksomename',
    },
    vuetify: new Vuetify(),
    methods: {
      myClickHandler: function(e) {
        // "this" here refers to the model
        // alert("Hello " + this.name);
        
        var url = 'https://api.'+ this.name + '.com/v1/bpi/currentprice.json';
        axios
          .get(url)
          .then(response => (this.more_info = response))
        }    
    },
    mounted () {
        axios
          .get('https://api.coindesk.com/v1/bpi/currentprice.json')
          .then(response => (this.info = response))
      }
});