'use strict'

var Koa = require('koa')
var path = require('path')

var util = require('./libs/util.js')
var wechat = require('./wechat/g')
var wechat_file = path.join(__dirname, './config/wechat.txt')
var config = require('./config')
var weixin = require('./weixin')

var app = new Koa()
app.use(wechat(config.wechat, weixin.reply))

app.listen(8080)
console.log('Listening 8080')