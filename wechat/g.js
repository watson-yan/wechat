'use strict'

var sha1 = require('sha1')
var Promise = require('bluebird')
var getRawBody = require('raw-body')
var request = Promise.promisify(require('request'))

var Wechat = require('./wechat')
var util = require('./util')

module.exports = function (opts, handler) {
	var wechat = new Wechat(opts)

	return function* (next) {
		console.log(this.query)

		var token = opts.token
		var signature = this.query.signature
		var timestamp = this.query.timestamp
		var echostr = this.query.echostr
		var nonce = this.query.nonce

		var str = [token, timestamp, nonce].sort().join('')
		var sha = sha1(str)

		// 判断消息类型 
		if (this.method === 'GET') {
			if (sha === signature) {
				this.body = echostr + ''
			}
			else {
				this.body = 'wrong'
			}
		}
		else if (this.method === 'POST') {
			if (sha !== signature) {
				this.body = 'wrong'
				return false
			}

			var data = yield getRawBody(this.req, {
				length: this.length,
				limit: '1mb',
				encoding: this.charset
			}) // 返回的是xml格式的，需要转换

			var content = yield util.parseXMLAsync(data)
			console.log(content)

			var message = util.formatMessage(content.xml)
			console.log(message)
			
			this.weixin = message

			yield handler.call(this, next)

			wechat.reply.call(this)
		}
	}
}