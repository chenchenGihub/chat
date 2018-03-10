const mongoose = require('mongoose');
const DB_URL="mongodb://localhost:27017/reactdemo";
mongoose.connect(DB_URL);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once("open",()=>{
	console.log("we connected~~~")
})


const models={
		user:{
			userName:{type:String,require:true},
			pwd:{type:String,require:true},
			type:{type:Boolean,require:true},
			nickname:{type:String},
			avatarurl:{type:String},
			desc:{type:String},
			title:{type:String},
			brief:{type:String},
			/*boss*/
			shopname:{type:String},
			company:{type:String},
			salary:{type:String},
			/**
			 * [deviceUniqueId  设备信息]
			 * @type {Object}
			 */
			deviceUniqueId:{type:String},
			deviceManufacturer:{type:String},
			deviceModel:{type:String},
			deviceID:{type:String},
			SystemName:{type:String},
			SystemVersion:{type:String},
			AppVersion:{type:String},
			UserAgent:{type:String},
			isEmulator:{type:String},
			InstanceID:{type:String},
			FirstInstallTime:{type:String},
			LastUpdateTime:{type:String},
			Carrier:{type:String},
			plublish:[{type: mongoose.Schema.Types.ObjectId, ref: 'DataSource' }],
			repost:[{type: mongoose.Schema.Types.ObjectId, ref: 'RepostSource' }],
			fans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
			mysubscribes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
			history:[{type: mongoose.Schema.Types.ObjectId, ref: 'DataSource' }],
			fav:[{type: mongoose.Schema.Types.ObjectId, ref: 'DataSource' }]
		},
		chat:{
			chatId:{type:String,require:true},
			from:{type:String,require:true},
			to:{type:String,require:true},
			msg:{type:String,require:true,default:''},
			isRead:{type:Boolean,require:true,default:false},
			createTime:{type:Number,require:true,default:Date.now},
			isShowTime:{type:Boolean,require:true,default:true}
		},
		dataSource:{
			title:  {type:String},
    		desc:{type:String,default:""},
    		author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    		body:   {type:mongoose.Schema.Types.Mixed},
    		thumbnail:{type:String},
    		votes:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    		comments: [{ type:mongoose.Schema.Types.ObjectId,ref: 'ParentComments' }],
    		repost:[{ type:mongoose.Schema.Types.ObjectId,ref: 'RepostSource' }],
    		fav:[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    		date: { type: Date, default: Date.now },
    		hidden: { type:Boolean,default:false },
    		label:{type:Array},
    		meta: {
      			votes: { type:Number,default:undefined},
      			repost:  { type:Number,default:undefined},
      			comments:{ type:Number,default:undefined},
      			reads:{type:Number,default:undefined}
    		}
		},
		repostSource:{
			repostTitle:{
				type:String,
				set:function(v){

					return v
				}
			},
			repostor:{
				type: mongoose.Schema.Types.ObjectId, ref: 'User',require:true
			},
			dataSourceId:{type: mongoose.Schema.Types.ObjectId, ref: 'DataSource' },
			comments: [{ type:mongoose.Schema.Types.ObjectId,ref: 'ParentComments' }],
    		repost:[{ type:mongoose.Schema.Types.ObjectId,ref: 'RepostSource' }],
    		votes:[{type:mongoose.Schema.Types.ObjectId, ref: 'User',require:true}],
			meta:{
			 	votes: { type:Number,default:undefined},
      			repost:  { type:Number,default:undefined},
      			comments:{ type:Number,default:undefined},
      			reads:{type:Number,default:undefined}
			 },
		},
		parentComments:{
			dataId:{type:mongoose.Schema.Types.ObjectId,require:true},
			commentor:{
				type: mongoose.Schema.Types.ObjectId, ref: 'User',require:true
			},
			content:{type:mongoose.Schema.Types.Mixed,require:true},
			votes:[{type:mongoose.Schema.Types.ObjectId, ref: 'User',require:true}],
			date: { type: Date, default: Date.now },
			childrenComments:[{type:mongoose.Schema.Types.ObjectId,require:true}],
			meta: {
      			votes: Number,
      			comments:Number
    		}
		},
		childrenComments:{
			parentCommentId:{type:mongoose.Schema.Types.ObjectId,require:true},
			from:{
				type: mongoose.Schema.Types.ObjectId, ref: 'User',require:true
			},
			to:{
				type: mongoose.Schema.Types.ObjectId, ref: 'User',require:true
			},
			votes:[{type:mongoose.Schema.Types.ObjectId, ref: 'User',require:true}],
			fromContent:{type:mongoose.Schema.Types.Mixed,require:true},
			toContent:{type:mongoose.Schema.Types.Mixed,require:true},
			date: { type: Date, default: Date.now },
		},
	}
const schema = new mongoose.Schema(models.user);
const User=mongoose.model('User',schema);
const Chat=mongoose.model('Chat',new mongoose.Schema(models.chat));
const DataSource=mongoose.model('DataSource',new mongoose.Schema(models.dataSource));
const RepostSource=mongoose.model('RepostSource',new mongoose.Schema(models.repostSource));
const ParentComments=mongoose.model('ParentComments',new mongoose.Schema(models.parentComments));
const ChildrenComments=mongoose.model('ChildrenComments',new mongoose.Schema(models.childrenComments));



module.exports={
	User,
	Chat,
	DataSource,
	RepostSource,
	ParentComments,
	ChildrenComments
};