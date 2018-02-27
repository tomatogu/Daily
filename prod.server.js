var express = require('express');
var config = require('./config/index');
var compression = require('compression');
var axios = require('axios');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/',function(req, res, next) {
    req.url = 'index.html';
    next();
});

app.use(router);

var apiRoutes = express.Router();

apiRoutes.get('/home', function(req, res) {
	const url = 'https://news-at.zhihu.com/api/4/news/latest'

	axios.get(url).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e)
	})
})

apiRoutes.get('/newsDetail', function(req, res) {
	const id = req.query.id
	const url = `https://news-at.zhihu.com/api/4/news/${id}`

	axios.get(url).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e)
	})
})

apiRoutes.get('/themesList', function(req, res) {
	const url = 'https://news-at.zhihu.com/api/4/themes'

	axios.get(url).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e)
	})
})

apiRoutes.get('/psychology', function(req, res) {
	const id = req.query.id
	const url = `https://news-at.zhihu.com/api/4/theme/${id}`

	axios.get(url).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e)
	})
})

apiRoutes.get('/recommend', function(req, res) {
	const id = req.query.id
	const url = `https://news-at.zhihu.com/api/4/theme/${id}`

	axios.get(url).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e)
	})
})

apiRoutes.get('/movie', function(req, res) {
	const id = req.query.id
	const url = `https://news-at.zhihu.com/api/4/theme/${id}`

	axios.get(url).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e)
	})
})

apiRoutes.get('/not-boring', function(req, res) {
	const id = req.query.id
	const url = `https://news-at.zhihu.com/api/4/theme/${id}`

	axios.get(url).then((response) => {
		res.json(response.data)
	}).catch((e) => {
		console.log(e)
	})
})

app.use('/api', apiRoutes);

app.use(compression())

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return
	}
	console.log('Listening at http://localhost:' + port + '\n')
});
