'use strict'

var path = require('path')

var util = require('./libs/util.js')
var wechat = require('./wechat/g')
var wechat_file = path.join(__dirname, './config/wechat.txt')

var config = {
	wechat: {
		appId: 'wx63f5d151adbdb9f9',
		appSecret: '3971b3d3b39eb93527184668c32f9dde',
		token: 'watsonyan',
		getAccessToken: function() {
			return util.readFileAsync(wechat_file)
		},
		saveAccessToken: function(data) {
			data = JSON.stringify(data)
			return util.writeFileAsync(wechat_file, data)
		}
	}
}

module.exports = config