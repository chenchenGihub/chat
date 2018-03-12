const express = require('express');
const utils = require('utility');
//const pinyin = require("pinyin");
const Router = express.Router();
const { User } = require('../model/model.js');
const { Chat } = require('../model/model.js');
const { DataSource } = require('../model/model.js');
const { ParentComments } = require('../model/model.js');
const { ChildrenComments } = require('../model/model.js');



Router.post('/register',function(req,res){
	const { 
		userName, 
		pwd, 
		type,
		deviceUniqueId,
		deviceManufacturer,
		deviceModel,
		deviceID,
		SystemName,
		SystemVersion,
		AppVersion,
		UserAgent,
		Timezone,
		isEmulator,
		InstanceID,
		FirstInstallTime,
		LastUpdateTime,
		Carrier
		} = req.body;
	User.findOne({userName},function(e,d){
		if(d){
			return res.json({code:1,msg:"用户已存在"})
		}

		const userModel=new User({userName,
			pwd:salt(pwd),
			type,
			deviceUniqueId,
			deviceManufacturer,
			deviceModel,
			deviceID,
			SystemName,
			SystemVersion,
			AppVersion,
			UserAgent,
			Timezone,
			isEmulator,
			InstanceID,
			FirstInstallTime,
			LastUpdateTime,
			Carrier,
		});	

		userModel.save(function(err,doc){
			if(err){
				return res.json({code:1,msg:"服务器端发生错误,无法注册!"})
			}
			res.cookie("userId",doc._id);

			const { userName,type,_id } = doc
			return res.json({code:0,data:{ userName,type,_id }})
		})

	})
})

Router.post('/login',function(req,res){
	const { userName, pwd } = req.body;
	//console.log(userName)
	User.findOne({userName,pwd:salt(pwd)},{pwd:0,__v:0},function(e,d){
		if(!d){
			return res.json({code:1,msg:"用户不存在或密码错误"})
		}
		res.cookie("userId",d._id);
		return res.json({code:0,data:d})
	})
})

Router.post('/info',function(req,res){
	//console.log("11111111111111111111111sssdsdddsds",req.body);
	//const { userId } = req.cookies;
	const { userId,deviceUniqueId } = req.body;
	// if(!(deviceUniqueId?req.body.userId:req.cookies.userId)){
	// 	return res.json({code:1})
	// }

	User.findOne({_id:userId},{pwd:0,__v:0},function(err,doc){
		if(err){
			return res.json({code:1,msg:"服务器端发生错误"})
		}
		return res.json({code:0,data:doc})

	})
});

Router.post('/saveUserInfo',function(req,res){
	//const { userId } = req.cookies;
	const { userId,...body } = req.body
	if(!userId){
		return res.json({code:1})
	}
	//const body=req.body;
	User.findByIdAndUpdate(userId,body,function(err,doc){
		if(err){
			return res.json({code:1,msg:"服务器端发生错误"})
		}
		const data=Object.assign({},{
			user:doc.user,
			type:doc.type,
		},body)

		console.log("doc",doc)

		//const { pwd, ...rest } = doc;

		return res.json({code:0,data:data})
	})

})

Router.get('/list',function(req,res){

	const { type } = req.query;

	User.find({ type },{pwd:0,
		deviceUniqueId:0,
		deviceManufacturer:0,
		deviceID:0,
		SystemName:0,
		SystemVersion:0,
		AppVersion:0,
		isEmulator:0
	},function(err,doc){
		return res.json({code:0,data:doc})
	})
});
Router.get('/list1',function(req,res){

	

	User.find({},function(err,doc){
		return res.json({code:0,data:doc})
	})
});

Router.get('/getmsglist',function(req,res){

	//const { userId } = req.cookies;

	const { id } = req.query;

	//console.log(req.query.id);

	User.find({},function(err,doc){
		let users={};
		doc.forEach(v=>{
			users[v._id]={name:v.userName,avatar:v.avatar}
		})

		Chat.find({"$or":[{from:id},{to:id}]},function(err,doc){
			return res.json({code:0,msg:doc,userListObj:users})
		})
	})

	
});



/**
 * 上传视频
 */

Router.post('/uploadResource',function(req,res){
	const { 
		title,
		//desc,
		authorId,
		body,
		thumbnail 
		} = req.body;
			
//console.log({...req.body})
	let label=''
	if(thumbnail){
		label="video"
	}

	label="image"

		const dataSource=new DataSource({
			title:  title,
    		//desc:desc,
    		author:authorId,
    		body:body,
    		thumbnail:thumbnail,
    		label:label
		});	

		//console.log({...req.body})

		dataSource.save(function(err,doc){
			if(err){
				return res.json({code:1,msg:"服务器端发生错误,发布失败!"})
			}
			const { author,_id } = doc;
			console.log(doc)
			return res.json({code:0,data:{ author,_id }})
		})

	
})

Router.get('/loadDatalist',function(req,res){
	

	DataSource.find({'label':"image"}).populate('author').exec(function(err,doc){
		
		if(err) return res.json({code:1,data:"服务器查询失败"});
		
		return res.json({code:0,data:doc})
		
	})
	
})




function salt(pwd){
	const salt="faefaww2341faFDFGA~!@ds-==";
	return utils.md5(utils.md5(pwd+salt));
}
module.exports=Router;