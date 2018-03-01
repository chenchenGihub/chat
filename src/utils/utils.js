/*flow*/
import { ToastAndroid,AlertIOS } from 'react-native';
import { Toast } from 'antd-mobile';
import pinyin from "pinyin";
import _ from 'lodash';

export function redirectTo({type,avatarurl}){
	let routeName=type?"WorkerInfo":"BossInfo";

	if(avatarurl){
		return "TabBarIcon"
	}


	return routeName
}

export function isValidInputCheck(value){
	if(value==null||value==''||value==undefined) return false;
	return true;
}

export function ToastUtils(OS,message,time){
	OS==='android'?ToastAndroid.showWithGravity(message,time,ToastAndroid.CENTER):Toast.info(message,time)
}

export function ToastMessage(OS,message,time){
    OS==='android'?ToastAndroid.showWithGravity(message,time,ToastAndroid.CENTER):AlertIOS.alert(message)
}

export function shallowEqual(objA, objB) {
	  if (isEqual(objA, objB)) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty.call(objB, keysA[i]) || !isEqual(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	 
function isEqual(x, y) {
  if (x === y) {
    //排除 +0 == -0
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}



export function pinyinsort(value:Array<Object>){
	
	
	
	
	
	if(value){
		
		value.map((v:Object,i:number)=>{
			v.key=(pinyin(v.nickname,{style:pinyin.STYLE_NORMAL})[0]&&(pinyin(v.nickname,{
			  style: pinyin.STYLE_NORMAL, // 设置拼音风格
			  heteronym: true
			})[0][0].toUpperCase()).substr(0,1))
			
			
			

		});
	}

	 
	let nextArr=[]
	_.toPairs(_.groupBy(_.filter(value,(o)=>o.key),'key')).map(v=>{
		let firstCharArr={};
		firstCharArr.key=v[0];
		firstCharArr.data=v[1];
		nextArr.push(firstCharArr)
		//console.log(firstCharArr)
	})

	//console.log(value,nextArr)

	return nextArr.sort((a,b)=>{
		if(a.key<b.key) return -1;
		if(a.key>b.key) return 1;
		return 0;
	})
}


export function shallowPropsEqual(){


	Object.prototype.equals = function(object2) {
    //For the first loop, we only check for types
    for (propName in this) {
        //Check for inherited methods and properties - like .equals itself
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        //Return false if the return value is different
        if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
            return false;
        }
        //Check instance type
        else if (typeof this[propName] != typeof object2[propName]) {
            //Different types => not equal
            return false;
        }
    }
    //Now a deeper check using other objects property names
    for(propName in object2) {
        //We must check instances anyway, there may be a property that only exists in object2
            //I wonder, if remembering the checked values from the first loop would be faster or not 
        if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
            return false;
        }
        else if (typeof this[propName] != typeof object2[propName]) {
            return false;
        }
        //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
        if(!this.hasOwnProperty(propName))
          continue;

        //Now the detail check and recursion

        //This returns the script back to the array comparing
        /**REQUIRES Array.equals**/
        if (this[propName] instanceof Array && object2[propName] instanceof Array) {
                   // recurse into the nested arrays
           if (!this[propName].equals(object2[propName]))
                        return false;
        }
        else if (this[propName] instanceof Object && object2[propName] instanceof Object) {
                   // recurse into another objects
                   //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
           if (!this[propName].equals(object2[propName]))
                        return false;
        }
        //Normal value comparison for strings and numbers
        else if(this[propName] != object2[propName]) {
           return false;
        }
    }
    //If everything passed, let's say YES
    return true;
}



	// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});




}

export function compareArr(){

    for (var i = 0; i < arguments.length; i++) {
        return arguments[i].toString() == arguments[i + 1].toString() ? true : false;

	}
}


