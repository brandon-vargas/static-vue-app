var some_text = "I AM SOME TEXT, YES.";



new Vue({
    el: '#app',
    data: {
      m1: some_text,
      info: null,
      more_info: 'starting info',
      name: 'idksomename',
      user: '',
      pass: '',
    },
    vuetify: new Vuetify(),
    methods: {
      myClickHandler: function(e) {
        // "this" here refers to the model
        
        var myHeaders = {'Accept': 'application/vnd.github.inertia-preview+json'};
        var configs = {
          'username': this.user, 
          'password': this.pass
          };

        axios
          .get(url,{headers: myHeaders}, {auth: configs})
          .then(response => (this.more_info = response))
          .catch(function (error) {
            // handle error
            console.log(error);
            this.more_info = error;
          })
        }    
    }
});