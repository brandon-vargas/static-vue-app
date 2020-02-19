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
	  github_api: '',
	  recentMilestone: '',
    },
	vuetify: new Vuetify(),
	watch: {
		more_info: function(val) {
		  console.log('i am a watcher');
		  var recentMilestone = moment().subtract(10, 'years')
		  
		  for(var i = 0; i < val.length; i++){
		  // var tempObj = {"name":"","created":"","closed":""};
			console.log('val obj = ' + val)
			
			var currMilestone = moment(val[i].closed_on)
			if(currMilestone > recentMilestone){
			  recentMilestone = currMilestone;
			}
		  }
		  console.log(val)
		  console.log("most recent Milestone = " + recentMilestone.format("YYYY-MM-DDTHH:MM:SSZ"))
		  this.recentMilestone = recentMilestone.format("YYYY-MM-DDTHH:MM:SSZ")
		  // this.extract_issues_per_milestone();
		}  
	},
    methods: {
      myClickHandler: function(e) {

        var auth = { 'user': this.pass }
        var url = this.github_api 
        if (url === '') {
          url = 'https://api.github.com/user'
        } 
        
        var headers = []
		headers['Accept'] = 'application/vnd.github.inertia-preview+json';
        var authdata = this.base64_encode(this.user + ':' + this.pass);
		headers['Authorization'] = 'Basic ' + authdata;
				
		console.log('1 = ' + this.more_info)
  			
		$.ajaxSetup({
			headers : headers
		});
	
		$.ajax({
			type: 'GET',
			url: url,
			success: function(response, status, request){

				console.log('i am successful request!');
				console.log(response)
				// this.more_info = JSON.parse(response);
				this.more_info = response;
			
			}.bind(this)
		});

		console.log('3 = ' + this.more_info);
		console.log('4 = ' + this.more_info[0]);
	},
	base64_encode: function (input) {
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
	
		input = this._utf8_encode(input);
	
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
	
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
	
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
	
			output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	},
	_utf8_encode: function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
	
		for (var n = 0; n < string.length; n++) {
	
			var c = string.charCodeAt(n);
	
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
	
		return utftext;
	},
	temp_func: function () {
		console.log('will i work? ' + this.more_info)
		
		}, 
    }
});
