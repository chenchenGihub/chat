const express = require('express');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const _ = require('underscore');
const { Chat } = require('./model/model.js');
/**
 * [app description]
 * @type {[type]}
 */
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http,{pingTimeout: 30000});

const mongoose = require("./model/model.js");
const Router = require('./user/user.js');


io.on('connection',function(socket){
	console.log('a user connected',socket.id);
  socket.on('disconnect', function(){
    console.log('user disconnected',socket.id);
  });

	socket.on('setName',function (data) {
        socket.name = data;
        console.log(socket.name)
    });

	socket.on("sendmsg",function(data){

		console.log(data)

		//socket.broadcast.emit("recievemsg",data)
		//io.emit("recievemsg",data)
		const { from ,to , msg } = data;

		const chatId = [from,to].sort().join("_");
		Chat.create({chatId,from,to,msg},function(err,doc){
			if(err){
				return new Error(err)
			}
			let toSocket;
			if(toSocket=_.findWhere(io.sockets.sockets,{name:to})){
				
				toSocket.emit("recieveMsg",Object.assign({},doc._doc));
			}
			
		})
	})
})

app.use(cookieParser());
app.use(bodyParser.json());
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1');  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});  
app.use("/user",Router);



http.listen(8088,function(){
	console.log('server listening at port 8088');
})