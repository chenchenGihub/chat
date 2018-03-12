import { ToastAndroid } from 'react-native';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import sha1 from 'sha1';
//import { CLOUDINARY } from './constant/constant';
import { Toast } from 'antd-mobile';
const CLOUDINARY = {
  cloud_name: 'dqfktbdqw',  
  api_key: '982239126941818',  
  api_secret: 'HZHGi5k2hTRpr40Bex9E6NMJKVU', 
  image:'https://api.cloudinary.com/v1_1/dqfktbdqw/image/upload',
  video:'https://api.cloudinary.com/v1_1/dqfktbdqw/video/upload',
  audio:'https://api.cloudinary.com/v1_1/dqfktbdqw/raw/upload',
};

export const uploadfile=(url)=>{

	 	 /**
           * 上传图片到服务器
           */
            
        console.log("arr",url);
        
        let timestamp = Date.now();
        let tags = 'app,video';
        let folder = 'video';

        let signature=`folder=${folder}&tags=${tags}&timestamp=${timestamp+CLOUDINARY.api_secret}`;
        signature=sha1(signature);


        const body = new FormData();
        body.append('file', {uri: url, type: 'video/mp4', name: 'testvideo.mp4'});
        body.append('folder',folder);
        body.append('signature',signature);
        body.append('tags',tags);
        body.append('timestamp',timestamp);
        body.append('api_key',CLOUDINARY.api_key);
        body.append('resource_type','video');
        //body.append('file',file[0]); 


  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    let url = CLOUDINARY.video;

    xhr.open("POST", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.upload.onprogress=(event)=>{
          console.log(event)
          //Toast.loading("发布中")
    }
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send(body);

  });


};






export const uploadFormData=(url,type)=>{
  console.log("arr",url);

      if(!url){
        console.warn("no url")
      }
       
        let timestamp = Date.now();
        //let tags = 'app,video';
        let tags = type=="video"?"app,video":"app,avatar"
        let folder = type== 'video'?"video":"avatar";

        let signature=`folder=${folder}&tags=${tags}&timestamp=${timestamp+CLOUDINARY.api_secret}`;
        signature=sha1(signature);

        
        const body = new FormData();

        if(url.includes("base64")){
          body.append('file',url);
        }
        body.append('file', {uri: url, type: `${'video/mp4'}`, name: 'testvideo.mp4'});
        body.append('folder',folder);
        body.append('signature',signature);
        body.append('tags',tags);
        body.append('timestamp',timestamp);
        body.append('api_key',CLOUDINARY.api_key);
        body.append('resource_type','video');

        return body
} 		
   


  _upload=(body)=>{
  const xhr = new XMLHttpRequest();

        let url = CLOUDINARY.video;

        xhr.open("POST",url);

        xhr.onload = () => {
          if (xhr.status === 200) {
            this.setState({
              uploading:true
            })
            let response=JSON.parse(xhr.responseText);
            console.log("response",response)
            
          } else {
            console.warn('error');
          }
        }
        xhr.upload.onprogress=(event)=>{
          //console.log(event)
        }
      xhr.send(body);
}
