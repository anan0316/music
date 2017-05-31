/*封装
$函数
$('.类名')
$('#id名')
$('tag')
$(function(){})

1.获取
. # tag
2.添加
function
 */
function $(selector,range=document){
	if(typeof selector=='string'){
		// 获取元素
		// 对字符串去空
		let select=selector.trim();
		// 判断字符串首位字符
		let firstChar=select.charAt(0);
		if(firstChar=='.'){
			return range.getElementsByClassName(select.substring(1));
		}else if(firstChar=='#'){
			return range.getElementById(select.substring(1));
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(select)){
			// 正则对象:^表示以...开头，$表示以...结尾
			// 第一位表示可以允许a-z或A-Z开头，第二位表示可以允许a-z或A-Z或1-6开头，标签长度
			return range.getElementsByTagName(select);
		}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(select)){
			return range.createElement(select.slice(1,-1));
		}
	}else if(typeof selector=='function'){
		// 添加事件
		window.onload=function(){
			// 回调函数
			selector();
		}
	}
}


/*
获取属性元素方法：
1.getComputedStyle(对象,null).属性
2.getCurrentStyle
3.getStyle

getStyle(obj,attr):获取某一个对象指定的样式属性
obj:对象  attr:样式
getStyle(box,'width')
获取box的宽度

1.判断浏览器
// 如果访问一个存在的方法，则返回其对应的函数；
// 如果访问一个不存在的方法，则返回undefined

如何实现兼容？把一个方法当成属性访问，如果返回true,则能使用该方法，如果返回false，则使用另一个方法
*/
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}

/*
	html(obj[,content]) obj指指定的对象 [centent] 设置的内容（没有内容，则表示获取obj的内容，反之则表示设置obj的值）
	设置或获取某一元素的内容
 */

function html(obj,content){
	// 此处的content会有隐式类型转换，如果此参数没有传东西，会返回undefined,默认是false
	if(content){
		obj.innerHTML=content;
	}else{
		return obj.innerHTML;
	}
}

// 封装一个动画
// attrObj中是一个JSON对象
function animate(obj,attrObj,callBack){
	let speed=10;
	let t=setInterval(move,4000);
	function move(){
		for(let i in attrObj){
			let currentV=parseInt(getComputedStyle(obj,null)[i])+speed;
			if(currentV>=attrObj[i]){
				currentV=attrObj[i];
				clearInterval(t);
				if(callBack){
					// 冒充继承,将callBack的属性和方法冒充给obj
					callBack.call(obj);
				}
			}
		}
		obj.style[i]=attrObj+'px';
	}
}

// getChild
// 获取指定元素的子元素节点
// 1.获取子节点
// 2.筛选
function getChild(obj){
	let arr=[];
	let son=obj.childNodes;
	son.forEach(function(value,index){
		if(value.nodeType==1){
			arr.push(value);
		}
	});
	return arr;
}


// 获取指定元素的下一个兄弟节点中的元素节点
// 下一个兄弟节点 a
// 		a不是元素节点  看下一个兄弟节点b
// 			b不是元素节点  看下一个兄弟节点c
// 				......
function getNext(obj){
	let a=obj.nextSibling;
	if(a===null){
		return '已经没有子元素';
	}
	while(a.nodeType!=1){
		a=a.nextSibling;
		if(a===null){
			return '没有找到该元素的下一个兄弟节点中的元素节点';
		}
	}
	return a;
	
}


/*
getFirst第一个元素节点
0 length-1
 */
function getFirst(obj,num=0){
    return getChilds(obj)[num];

}

function getLast(obj){
	let childs=getChilds(obj);
	return childs[childs.length-1];
}


function getPrev(obj){

	let a=obj.previousSibling;
	console.log(a);
	if(a==null){
       return false;
 	}
	while(a.nodeType!=1){
		a=a.previousSibling;
		if(a==null){
			return false;
		}
	}
	return a;

}

// 将元素插入到第一个元素前面
function pretend(ele){
	let first=obj.firstElementChild;
	this.insertBefore(ele, first);
}

Node.prototype.insertAfter=function(ele){
	let next=obj.nextElementSibling;
	let parent=obj.parentNode;
	parent.insertBefore(ele, next);
}

	// 将元素添加到某一父元素中
Node.prototype.appendTo=function(parent){
	parent.appendChild(this);
} 	

/*addEvent(obj,type,fn)
addEventListener('click', function(){}, false)*/

function addEvent(obj,type,fn){
	obj.addEventListener(type,fn,false);
}


// 封装一个可以执行2个事件的滚轮事件 mouseScroll
function mouseScroll(obj,upFn,downFn){
	obj.addEventListener('mousewheel',fn,false);
	function fn(e){
		e.preventDefault();
		let a=e.wheelDelta;
		if(a==120){
			// 向上
			// 冒充继承
			upFn.apply(obj);
		}else if(a==-120){
			downFn.apply(obj);
		}
	}
}

// 获取cookie中对应属性名的属性属性值
function findValue(str){
    let cookies=document.cookie;
    let arr=obj.split('; ');
    arr.forEach(function(value){
        let arr1=value.split('=');
        if(arr1[0]==str){
        	return arr1[1];
		}
    })
	return false;
}
// 在浏览器的cookie中存储东西:saveValue(cookie,cookie中的字符串，保存时间);
function saveValue(obj,str,expires){
	if(expries){
		/*保存时间为分钟时使用
		 let time=new Date();
		 time.setMinutes(time.getMinutes()+10);
		 document.cookie=`${obj}=${str};expires=${time}`;*/
        document.cookie=`${obj}=${str};expires=${expires.toGMTString()}`;
	}else{
		document.cookie=`${obj}=${str}`;
	}
}
// 删除cookie数据
function delCookie(str){
	let time=new Date();
	time.setMinutes(time.getMinutes()-10);
	document.cookie=`${str}=zhangsan;expries`+time.toGMTString();
}