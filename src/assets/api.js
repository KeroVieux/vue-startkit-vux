const apiMethods = {
	methods: {
		getData(obj) {
			return new Promise((resolve, reject) => {
	      this.$http.post(`report`, {
	      		year: obj.year,
	      		month: obj.month,
	      		day: obj.day,
	      		rtp_token: obj.rtp_token
	      }).then((response) => {
	      	console.log('success')
	        resolve(response.data)
	      }, (response) => {
	      	console.log('fail')
	      	resolve(response)
	      })
	    })
		},
	}
}

export default apiMethods