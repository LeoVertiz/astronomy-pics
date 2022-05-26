const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
const axios = require('axios').default
const moment = require('moment')


axios.defaults.baseURL = `https://api.nasa.gov/planetary`
function getUrl(params = {}){
	const apiKey = '299gLUfCxKRxsGRUrscvd310ehlexN5ZmkDVwLEB'
	let url = '/apod?api_key=' + apiKey

	for(let key in params){
		url += `&${key}=${params[key]}`
	}

	return url
}

function init(){
	let Data = []
	console.log('Getting data...')
	axios.get(getUrl({count: 100}))
		.then(res => {
			Data = res.data

			app.use(cors())
			app.get('/:page', async (req, res) => {
				let page = req.params.page
				let startDate = req.query.startDate
				let endDate = req.query.endDate
				let search = req.query.search

				let items = Data
				if(startDate){
					items = items.filter(d => moment(startDate).isSameOrBefore(d.date))
				}
				if(endDate){
					items = items.filter(d => moment(endDate).isSameOrAfter(d.date))
				}
				if(search){
					items = items.filter(d => d.title.toLowerCase().includes(search.toLowerCase()))
				}
				let pages = Math.ceil(items.length/4)
				items = items.slice((page-1)*4, page*4)

				res.send({
					items,
					page,
					pages,
				})
			})

			app.listen(port, () => {
				console.log(`App listening on port ${port}`)
			})
		})
}

init()
//Populate data
// function getData(){
	
// }
// getData()




