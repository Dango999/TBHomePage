//计算字符串的字节长度
function retBytes(str) {     
	var num = str.length;
	for(var i = 0; i < str.length; i ++) {
		if(str.charCodeAt(i) > 255) {
			num ++;
		}
	}
	return num;
}

//返回类型
function type(target) {     
	var ret = typeof(target);
	var template = {
		"[object Array]" : "array",
		"[object Object]" : "object",
		"[object Number]" : "number - object",
		"[object Boolean]" : "boolean - object",
		"[object String]" : "string - object"
	}
	if(target === null) {
		return "null";
	}else if(ret == "object") {
		var str = Objct.prototype.toString.call(target);
		return template[str];
	}else{
		return ret;
	} 
}

//数组去重
Array.prototype.unique = function () {    
	var temp = {},
	    arr = [],
	    len = this.length;
	for(var i = 0; i < len; i ++) {
		if(!temp[this[i]]) {   
//this指向arr,temp对象里面没值的话是undefined，前面加个!(非)取反就可以走if里面的
			temp[this[i]] = "abc";
			arr.push(this[i]);
		}
	}
	return arr;
}

//查找元素第n层父元素节点
function retParent(elem, n) {
	while(elem && n) {
		elem = elem.parentElement;
		n --;
	}
	return elem;
}

//查看当前元素的元素子节点们
Element.prototype.myChildren = function () {
	var child = this.childrenNodes;
	var len = child.length;
	var arr = [];
	for(var i = 0; i < len; i ++) {
		if(child[i].nodeType == 1) {
			arr.push(child[i]);
		}
	}
	return arr;
}

//查看当前元素是否有元素子节点
Element.prototype.Children = function () {
	var child = this.childrenNodes;
	var len = child.length;
	var arr = [];
	for(var i = 0; i < len; i ++) {
		if(child[i].nodeType == 1) {
			return true;
		}
	}
	return false;
}

//有insertBefore,现在自己编写一个insertAfter
Element.prototype.insertAfter = function (targetNode, afterNode) {
	var beforeNode = afterNode.nextElementSibling;
	if(beforeNode == null) {
		this.appendChild(targetNode);
	}else{
		this.insertBefore(targetNode, beforeNode);
	}
}

//封装兼容性方法，求滚动轮滚动距离
function getScrollOffset() {
	if(window.pageXOffset) {
		return{
			x : window.pageXOffset,
			y : window.pageYOffset
		}
	}else{
		return{
			x : document.body.scrollLeft + document.documentElement.scrollLeft,
			y : document.body.scrollTop + document.documentElement.scrollTop,
		}
	}
}

//查看前或后n位那个兄弟元素节点，实现兼容
function retSibling(e, n) {
	while(e && n) {
		if(n > 0) {
			if(e.nextElementSibling) {
				e = e.nextElementSibling;
			}else{
				for(e = e.nextSibling; e && e.nodeType != 1; e = e.nextSibling);
			}
			n --;
		}else{
			if(e.previousElementSibling) {
				e = e.previousElementSibling;
			}else{
				for(e = e.previousSibling; e && e.nodeType != 1; e = e.previousSibling);
			}
			n ++;
		}
	}
	return e;
}

//封装兼容性方法，返回浏览器视口尺寸
function getViewportOffset() {
	if(window.innerWidth) {
		return{
			w : window.innerWidth,
			h : window.innerHeight
		}
	}else{
		if(document.compatMode === "BackCompat") {
			return {
				w : document.body.clientWidth,
				h : document.body.clientHeight
			}
		}else{
			return {
				w : document.documentElement.clientWidth,
				h : document.documentElement.clientHeight
			}
		}
	}
}

//封装兼容性绑定事件处理函数
 function addEvent(elem, type, handle) {
	if(elem.addEventListener) {
		elem.addEventListener(type, handle, false);
	}else if(elem.attachEvent) {
		elem.attachEvent('on' + type, function() {
			handle.call(elem);
		})
	}else{
		elem['on' + type] = handle;
	}
}

//封装兼容性解除事件处理程序
function removeEvent(elem, type, handle) {
	if(elem.removeEventListener) {
		elem.removeEventListener(type, handle, false);
	}else if(elem.detachEvent) {
		elem.detachEvent('on' + type, function() {
			handle.call(elem);
		})
	}else{
		elem['on' + type] = false;
	}
}

//封装阻止默认事件的函数
function cancelHandler(event) {
	if(event.preventDefault) {
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
}

//封装取消冒泡的函数
function stopBubble(event) {
	if(event.stopPropagation) {
		event.stopPropagation();
	}else{
		event.cancelBubble = true;
	}
}

//封装兼容性方法，查询计算样式
function getStyle(elem, prop) {
	if(window.getComputedStyle) {
		return window.getComputedStyle(elem, null)[prop];
	}else{
		return elem.currentStyle[prop];
	}
}

//javascript异步加载,插入到DOM中，加载完毕后callBack
function loadScript(url, callback) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	if(script.readyState) {
		script.onreadystatechange = function () {
			if(script.readyState == "complete" || script.readyState == "loaded") {
				callback();
			}
		}
	}else{
		script.onload = function () {//Safari chrome firefox opera
			callback();
		}
	}
	script.src = url;
	document.head.appendChild(script);
}

//封装拖拽函数
function drag(elem) {
	var disX,
    	    disY;
	addEvent(elem, 'mousedown', function (e) {
		var event = e || window.event;
		disX = event.clientX - parseInt(getStyle(elem, 'left'));
		disY = event.clientY - parseInt(getStyle(elem, 'top'));
		addEvent(document, 'mousemove', mouseMove);
		addEvent(document, 'mouseup', mouseUp);
		stopBubble(event);
		cancelHandler(event);
	});
	function mouseMove(e) {
		var event = e || window.event;
		elem.style.left = event.clientX - disX + "px";
		elem.style.top = event.clientY - disY + "px"; 
	}
	function mouseUp(e) {
		var event = e || window.event;
		removeEvent(document, 'mousemove', mouseMove);
		removeEvent(document, 'mouseup', mouseUp);
	}
}