'use strict'

exports.reply = function *(next) {
    var message = this.weixin
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫描二维码进来的' + message.EventKey + ' ' + message.Ticket)
            }
            this.body = '谢谢你关注我的公众号, 载入史册 \r\n 历史编号: ' + message.MsgId 
        }

        if (message.Event === 'unsubscribe') {
            console.log('可惜不是你')
        }
    }
    else if (message.MsgType === 'text') {
        if (message.Content === '1') {
            this.body = '输入你想要查询的电影名'
        }
        else if (message.Content === '2') {
            this.body = '请输入演员姓名'
        }
        else if (message.Content === '3') {
            this.body = '请输入电影类型的编号\r\n 1. 动作片 \r\n 2. 爱情片 \r\n 3. 剧情片'
        }
        else if (message.Content === '4') {
            this.body = [
                {
                    title: '如果有来生',
                    description: '好好描述',
                    picUrl: 'http://pic.pptbz.com/pptpic/201504/2015042615360363.jpg',
                    url: 'https://www.baidu.com'
                },
                {
                    title: '菩提本无树, 明镜亦非台',
                    description: '好好描述',
                    picUrl: 'http://pic.pptbz.com/pptpic/201505/2015051915093727.jpg',
                    url: 'https://www.baidu.com'
                }
            ]
        }
        else {
            this.body = '无法识别的命令'
        }
    }
    else if (message.MsgType === '') {

    }
    yield next
}