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
			title:  {type:String,default:""},
    		desc:{type:String,default:""},
    		author: {
    			authorId:{type:mongoose.Schema.Types.ObjectId,require:true},
				authorName:{type:String},
				authorAvatar:{type:String}
    		},
    		body:   {type:String,require:true},
    		thumbnail:{type:String,require:true},
    		//comments: [{ body: String, date: Date }],
    		date: { type: Date, default: Date.now },
    		hidden: { type:Boolean,default:false },
    		label:{type:Array},
    		meta: {
      			votes: { type:Number,default:undefined},
      			favs:  { type:Number,default:undefined},
      			comments:{ type:Number,default:undefined}
    		}
		},
		parentComments:{
			dataId:{type:mongoose.Schema.Types.ObjectId,require:true},
			commentor:{
				commentorId:{type:mongoose.Schema.Types.ObjectId,require:true},
				commentorName:{type:String},
				commentorAvatar:{type:String}
			},
			content:{type:mongoose.Schema.Types.Mixed,require:true},
			date: { type: Date, default: Date.now },
			meta: {
      			votes: Number,
      			comments:Number
    		}
		},
		childrenComments:{
			parentCommentId:{type:mongoose.Schema.Types.ObjectId,require:true},
			from:{
				fromId:{type:mongoose.Schema.Types.ObjectId,require:true},
				fromName:{type:String,require:true},
				fromAvatar:{type:String,require:true}
			},
			to:{
				toId:{type:mongoose.Schema.Types.ObjectId,require:true},
				toName:{type:String,require:true},
				toAvatar:{type:String,require:true},
				relateContent:{type:String,require:true}
			},
			targetContent:{type:mongoose.Schema.Types.Mixed,require:true},
			date: { type: Date, default: Date.now },
		},
	}
const schema = new mongoose.Schema(models.user);
const User=mongoose.model('User',schema);
const Chat=mongoose.model('Chat',new mongoose.Schema(models.chat));
const DataSource=mongoose.model('DataSource',new mongoose.Schema(models.dataSource));
const ParentComments=mongoose.model('ParentComments',new mongoose.Schema(models.parentComments));
const ChildrenComments=mongoose.model('ChildrenComments',new mongoose.Schema(models.childrenComments));



module.exports={
	User,
	Chat,
	DataSource,
	ParentComments,
	ChildrenComments
};