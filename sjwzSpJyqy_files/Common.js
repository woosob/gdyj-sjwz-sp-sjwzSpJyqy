var CONTEXT = "/GDYJ";
/* 判断浏览器类型和版本 */
var Browser = new Object();
var browser = navigator.appName;
var version = navigator.appVersion.split(";")[1].replace(/[ ]/g, "");
Browser.IE6 = browser == "Microsoft Internet Explorer" && version == "MSIE6.0";
Browser.IE7 = browser == "Microsoft Internet Explorer" && version == "MSIE7.0";
Browser.IE8 = browser == "Microsoft Internet Explorer" && version == "MSIE8.0";
Browser.IE9 = browser == "Microsoft Internet Explorer" && version == "MSIE9.0";
Browser.Mozilla = browser == "Netscape";
Browser.Opera = browser == "Opera";

var globalButtonEventForOnRowClick = false;// 控制列表按钮,如果点击按钮时,不触发点击整行事件
/**
 * 屏蔽鼠标右键 开发时可暂时屏蔽
 * 
 * document.oncontextmenu = function() { return false; } window.ClearEvent =
 * function() { event.cancelBubble = false; var sSrcTagName =
 * event.srcElement.tagName.toLowerCase();
 * 
 * return (sSrcTagName == "textarea" || sSrcTagName == "input" || sSrcTagName ==
 * "select"); }
 * 
 * window.ClearKey = function() { event.cancelBubble = false; var iKeyCode =
 * event.keyCode; return !(iKeyCode == 78 && event.ctrlKey); }
 * 
 * with (window.document) { oncontextmenu = onselectstart = ondragstart =
 * window.ClearEvent; onkeydown = window.ClearKey; } 屏蔽鼠标右键 结束
 */
 
/**
 * 多选字典组件控制右键不可粘贴
 */
function controlPaste(){
    if(arguments[0]){
	    var obj1 = document.getElementById (arguments[0]);
	    if(obj1) 
	    obj1.onpaste = function (){return false;}
    }
}

/**
 * 兼容IE，FF和Opera的弹出模态窗口方法 注：该方法有待改进，未来会把showModalDialog和open方法的sFeatures参数统一起来
 * 
 * @param sURL
 *            URL
 * @param vArguments
 *            需要传递的参数对象
 * @param sFeatures
 *            窗口的外观信息
 */

function openModelWindow(sURL, vArguments, sFeatures) {
	sFeatures += ",model=yes";
	var modelWindow = window.open(sURL, vArguments, sFeatures);
	modelWindow.onblur = function() {
		modelWindow.focus();
	}
	window.onfocus = function() {
		modelWindow.focus();
		window.blur();
	}
}
/**
 * 提交审核的确定按
 */
function confirmSubmit() {
	return window.confirm("确认提交审核");
}
/**
 * 收缩详表栏目
 */
function foldTable(tableId, imageId) {
	var table = document.getElementById(tableId);
	var img = document.getElementById(imageId);
	var src = "";
	for (var i = 1; i < table.rows.length; i++) {
		e = table.rows.item(i);
		if (e.style.display == "none") {
			e.style.display = '';
			src = CONTEXT + "/images/workflow/menu_open.gif";
		} else {
			e.style.display = "none";
			src = CONTEXT + "/images/workflow/menu_close.gif";
		}
	}
	if (img) {
		img.src = src;
	}
}

/** 切换DOM对象的显示状态 */
function showElement(id, imageId) {
	var e = document.getElementById(id);
	var scr = "";
	var img = document.getElementById(imageId);
	if (e.style.display == "none") {
		e.style.display = '';
		src = CONTEXT + "/images/workflow/menu_open.gif";
	} else {
		e.style.display = "none";
		src = CONTEXT + "/images/workflow/menu_close.gif";
	}
	if (img) {
		img.src = src;
	}
}

/*******************************************************************************
 * 点击图片来控制某个区域是否显示并且换图片
 ******************************************************************************/
/*******************************************************************************
 * 设置某个区域可以展开或关闭 image_unwrap 展开时图片路径 image_wrap 闭合时图片路径 imageId 图片ID areaId
 * 控制区的ID（table、div等）
 ******************************************************************************/
function controlDisplay(image_unwrap, image_wrap, imageId, areaId) {
	var imageObject = document.getElementById(imageId);
	var areaObject = document.getElementById(areaId);
	var sbuStartIndex = imageObject.src.lastIndexOf("/");
	var realSrc = imageObject.src.substring(sbuStartIndex + 1,
			imageObject.src.length);
	// images/为路径名
	realSrc = "images/" + realSrc;

	var display = "";
	var undisplay = "none";
	// 展开时的图片和不展开时的图片切换
	(image_unwrap == realSrc)
			? imageObject.src = image_wrap
			: imageObject.src = image_unwrap;
	// 控制区域的可见与不可见的切换
	(areaObject.style.display == display)
			? areaObject.style.display = undisplay
			: areaObject.style.display = display;
}

/*******************************************************************************
 * 选择显示列
 ******************************************************************************/
function openSelectTable(tableId, aId) {
	var table = document.getElementById(tableId);
	var a = document.getElementById(aId);
	if (table.style.display == "none") {
		table.style.display = "";
		a.className = "selectImage02";
	} else {
		table.style.display = "none";
		a.className = "selectImage01";
	}
}
/*******************************************************************************
 * 删除前校验
 ******************************************************************************/
function setActionCheck(fieldID, detail) {
	if (confirm(detail)) {
		document.getElementById(fieldID).value = "true";
	} else {
		document.getElementById(fieldID).value = "false";
	}
}
/*******************************************************************************
 * 删除前校验 EDIT LHL
 ******************************************************************************/
function mdel(id, newvalue) {
	var flg = false;
	globalButtonEventForOnRowClick = true;
	if (confirm("\u4f60\u786e\u5b9a\u5220\u9664?")) {
		var obj = document.getElementById(id);
		if (obj) {
			obj.value = newvalue;
			flg = true;
			loading(box);
		} else {
			alert("\u5bf9\u8c61\u4e0d\u5b58\u5728!!!\u8bf7\u786e\u5b9aid\u4e3a "
					+ id + " \u6807\u7b7e\u662f\u5426\u5b58\u5728!");
			flg = false;
		}
	} else {
		flg = false;
	}
	return flg;
}
	
/*******************************************************************************
 * 批量删除前的校验
 ******************************************************************************/
function bulkDel(selectedId){
   	var selectIdVal = document.getElementById(selectedId).value; //选中的ID
   	if(isNullValue(selectIdVal)){
   		alert('请选择要删除的数据');
       	return false;
   	} else {
   		return confirm("\u4f60\u786e\u5b9a\u5220\u9664?");
	}
}
/*
 * 上报的提示
 */
function mdel2(id, newvalue) {
	var flg = false;
	if (confirm("您确认上报该数据?")) {
		var obj = document.getElementById(id);
		if (obj) {
			obj.value = newvalue;
			flg = true;
		} else {
			alert("\u5bf9\u8c61\u4e0d\u5b58\u5728!!!\u8bf7\u786e\u5b9aid\u4e3a "
					+ id + " \u6807\u7b7e\u662f\u5426\u5b58\u5728!");
			flg = false;
		}
	} else {
		flg = false;
	}
	return flg;
}

function mdeleteClass() {
	this.go_delete = function(hid, newvalue) {
		var flg = false;
		if (confirm("\u4f60\u786e\u5b9a\u5220\u9664?")) {
			var obj = document.getElementById(hid);
			if (obj) {
				obj.value = newvalue;
				flg = true;
			} else {
				alert("\u5bf9\u8c61\u4e0d\u5b58\u5728!!!\u8bf7\u786e\u5b9aid\u4e3a "
						+ id + " \u6807\u7b7e\u662f\u5426\u5b58\u5728!");
				flg = false;
			}
		} else {
			flg = false;
		}
		return flg;
	}

}
var mdelete = new mdeleteClass();

/*******************************************************************************
 * 关联的时候新增角色
 ******************************************************************************/
function mAdd(id, newvalue) {
	var flg = false;
	var obj = document.getElementById(id);
	if (obj) {
		obj.value = newvalue;
		flg = true;
	} else {
		alert("\u5bf9\u8c61\u4e0d\u5b58\u5728!!!\u8bf7\u786e\u5b9aid\u4e3a "
				+ id + " \u6807\u7b7e\u662f\u5426\u5b58\u5728!");
		flg = false;
	}
	return flg;
}
/*******************************************************************************
 * //修改的时候将页面可填字段修改为可编辑状态 //将修改变为不可用，恢复和保存变为可用 //参数 from的ID
 * ,修改按钮的ID，恢复按钮ID，保存按钮ID
 ******************************************************************************/
function AllisUpdate(fomobj, medit, mreset, msave) {
	var obj = document.getElementById(fomobj);
	if (obj) {
		// 如果页面有其他的TAG要改变，请在数组中增加对应的TAG名
		var upobjs = new Array("input", "textarea", "select", "text");
		for (var j = 0; j < upobjs.length; j++) {
			var cbokes = obj.getElementsByTagName(upobjs[j]);
			for (var i = 0; i < cbokes.length; i++) {
				// begin 2008-3-9 曾斌 修改了循环不对按钮作处理
				if (upobjs[j] == "input" && cbokes[i].className == "button01") {
					continue;
				}
				// end
				if (cbokes[i].getAttribute("readonly")) {
					cbokes[i].readOnly = false;
				}
				if (cbokes[i].getAttribute("disabled")) {
					cbokes[i].disabled = false;
					cbokes[i].value = "";
				}
				if (cbokes[i].getAttribute("disabled") == "disabled") {
					cbokes[i].disabled = "";
				}
			}
		}
		// 改变修改按钮状态
		var editbnt = document.getElementById(fomobj + ":" + medit);
		if (editbnt) {
			editbnt.disabled = "disabled";
		} else {
			alert("id\u4e3a\uff1a" + medit
					+ " \u7684\u7ec4\u4ef6\u6ca1\u627e\u5230");
		}
		// 改变恢复按钮状态
		var resetbnt = document.getElementById(fomobj + ":" + mreset);
		if (resetbnt) {
			resetbnt.disabled = "";
		} else {
			alert("id\u4e3a\uff1a" + mreset
					+ " \u7684\u7ec4\u4ef6\u6ca1\u627e\u5230");
		}
		// 改变保存按钮状态
		var savebnt = document.getElementById(fomobj + ":" + msave);
		if (savebnt) {
			savebnt.disabled = "";
		} else {
			alert("id\u4e3a\uff1a" + msave
					+ " \u7684\u7ec4\u4ef6\u6ca1\u627e\u5230");
		}
	}
	return false;
}
/*******************************************************************************
 * 页面部分打印
 ******************************************************************************/
var ie = navigator.appName == "Microsoft Internet Explorer" ? true : false;
var printWin;
var pContent;
function DP(printTabId, formId, path) {
	if (window.print) {
		pContent = document.getElementById(formId);
		window.showModelessDialog(path + "/library/js/printWindow.html",
				pContent, "dialogWidth=800px;dialogHeight=600px");
	}
}

// 改写打印标签页的方法
function owerDP(formId, path) {
	if (window.print) {
		pContent = document.getElementById(formId);
		if (pContent) {
			window.showModelessDialog(path + "/library/js/printWindow.html",
					pContent, "dialogWidth=750px;dialogHeight=600px");
		} else {
			alert("\u672a\u627eFROM\u5bf9\u8c61\uff01");
		}
	}
	return false;
}
function processPrint() {
	if (printWin.document && printWin.document.body) {
		if (ie) {
			// printWin.document.body.innerHTML = '<center>' + pContent +
			// '</center>';
			printWin.document.body.innerHTML = pContent;
			var aDivs = printWin.document.body.getElementsByTagName("DIV");
			for (var i = 0; i < aDivs.length; i++) {
				if (aDivs[i].style.overflowY == "scroll") {
					var css = "<style type=\"text/css\" media=all>"
							+ ".ftitle { line-height: 120%; font-size: 18px; color: #000000}"
							+ "</style>";
					var body = "<table border=\"0\" cellspacing=\"0\" cellpadding=\"5\">"
							+ " <tr> "
							+ " <td class=\"fbody\"> "
							+ " <div align=\"center\" class=ftitle>"
							+ aDivs[i].innerHTML
							+ "</div>"
							+ " </td>"
							+ " </tr>" + "</table>";
					printWin.document.body.innerHTML = "<center>" + css + body
							+ "</center>";
					var buttons = printWin.document.body
							.getElementsByTagName("INPUT");
					for (var j = 0; j < buttons.length; j++) {
						if (buttons[j].type && buttons[j].type == "button") {
							buttons[j].style.display = "none";
						}
						buttons[j].readonly = "true";
					}
					break;
				}
			}
			try {
				printWin.print();
			} catch (ex) {
				alert("error occured when printing tab,please retry");
			}
		} else {
			window.printContent = pContent;
		}
		pContent = null;
	} else {
		setTimeout("processPrint()", 500);
	}
}
/*******************************************************************************
 * rich:dataTable的行上的click事件，需要将h:commandLink 放在第一个rich:column中 2008-2-1 qibiao
 ******************************************************************************/
function lookRowLink(currentRow) {// currentRow为tr对象
	var currentRowFirstTd = currentRow.firstChild; // 第一个td
	var nodes = currentRowFirstTd.childNodes;// 第一个td的所有子节点
	var ahref;
	for (var i = 0; i < nodes.length; i++) {// 遍例，找到一个超连接对象并保存在ahref中，然后退出。
		var name = nodes[i].tagName;
		if (name == "A") {
			ahref = nodes[i];
			break;
		}
	}
	if (ahref != null) {// ahref不为空，执行该超连接的单击事件
		// showsavemesg_allform();
		ahref.click();
	}
}
/*******************************************************************************
 * 来源--部门框架
 ******************************************************************************/
function showsavemesg_allform() {
	try {
		var globalMessage = window.document;
		shdiv_form = globalMessage.createElement("div");
		shdiv_form.style.display = "none";
		shdiv_form.style.position = "absolute";
		document.body.insertAdjacentElement("beforeEnd", shdiv_form);
		shdiv_form.style.width = 200;
		shdiv_form.style.height = 80;
		shdiv_form.style.backgroundColor = "black";
		shdiv_form.style.filter = "progid:DXImageTransform.Microsoft.Alpha( Opacity=50, Style=0)";
		msgdiv_form = globalMessage.createElement("div");
		msgdiv_form.style.display = "none";
		msgdiv_form.style.position = "absolute";
		document.body.insertAdjacentElement("beforeEnd", msgdiv_form);
		msgdiv_form.innerHTML = "<b><i><br><br>\u6b63\u5728\u8bfb\u53d6\u6570\u636e\uff0c\u8bf7\u7a0d\u5019...</i></b>";
		msgdiv_form.style.width = 200;
		msgdiv_form.style.height = 80;
		msgdiv_form.style.backgroundColor = "yellow";
		msgdiv_form.style.fontSize = 14;
		msgdiv_form.align = "center";
		shdiv_form.style.display = "";
		shdiv_form.style.top = 200;// globalMessage.body.scrollTop+globalMessage.body.offsetHeight/2-shdiv_form.offsetHeight/2+7;
		shdiv_form.style.left = 300;// globalMessage.body.scrollLeft+globalMessage.body.offsetWidth/2-shdiv_form.offsetWidth/2+6;
		msgdiv_form.style.display = "";
		msgdiv_form.style.top = 200;// globalMessage.body.scrollTop+globalMessage.body.offsetHeight/2-msgdiv_form.offsetHeight/2;
		msgdiv_form.style.left = 300;// globalMessage.body.scrollLeft+globalMessage.body.offsetWidth/2-msgdiv_form.offsetWidth/2;
	} catch (E) {
	}
	// window.setTimeout("hidemesg()",1500);
}
function lookPageValidation(inputText, totalPageId, oldValue) {
	var totalpage = document.getElementById(totalPageId).value;
	var lookpage = inputText.value;
	var reg = /^[0-9]*$/;
	if (!reg.test(lookpage + "")) {
		inputText.value = oldValue;
		alert("\u4f60\u5f55\u5165\u7684\u9875\u7801\u4e0d\u5b58\u5728,\u6062\u590d\u539f\u503c");
		// inputText.focus();
		return;
	}
	if (lookpage - 1 < 0 || lookpage - totalpage > 0) {
		inputText.value = oldValue;
		alert("\u4f60\u5f55\u5165\u7684\u9875\u7801\u4e0d\u5b58\u5728,\u6062\u590d\u539f\u503c");
		// inputText.focus();
	}
}

function enterGo(node, oldValue) {
	if (event.keyCode == 13) {
		if (node.onblur != null) {
			node.onblur();
		}
		if(node.value == oldValue){
			return false;
		}
		node.previousSibling.focus();
		// document.getElementById(btId).focus();
	}
}
/*******************************************************************************
 * 防止在输入框中输入了数字后再点上一页或下一页会在原来的基础上加1或减1
 ******************************************************************************/
function pageValidation(newPage, oldPage) {
	alert('a');
	document.getElementById(newPage).value = document.getElementById(oldPage).value;
	return false;
}
function pageValidation(newPage) {
	// document.getElementBy().value =
	return false;
}
/*******************************************************************************
 * 日期自动计算
 ******************************************************************************/
function dateAutoCount(startDateId, inputText, fieldId) {
	var endDateFormat;
	var startDate = document.getElementById(startDateId).value;// 开始日期
	var limit = inputText.value + "";// 有效期限
	var reg = /^[0-9]*$/;
	if (inputText.readOnly == false) {
		if (startDate != null && startDate != NaN && startDate != "") {
			if (!reg.test(limit) || limit == "") {
				alert("有效期限是一个整数");
				return;
			}
			/*
			 * endDate = new Date(parseInt((startDate.substring(0, 4))) +
			 * parseInt(limit), startDate.substring(5, 7),
			 * startDate.substring(8, 10) - parseInt(1));//截止日期 if
			 * (startDate.substring(5, 7) < 10 && startDate.substring(8, 10) <
			 * 10) { endDateFormat = endDate.getYear() + "-0" +
			 * endDate.getMonth() + "-0" + endDate.getDate(); } else { if
			 * (startDate.substring(5, 7) < 10 && startDate.substring(8, 10) >=
			 * 10) { endDateFormat = endDate.getYear() + "-0" +
			 * endDate.getMonth() + "-" + endDate.getDate(); } else { if
			 * (startDate.substring(5, 7) >= 10 && startDate.substring(8, 10) <
			 * 10) { endDateFormat = endDate.getYear() + "-" +
			 * endDate.getMonth() + "-0" + endDate.getDate(); } else {
			 * endDateFormat = endDate.getYear() + "-" + endDate.getMonth() +
			 * "-" + endDate.getDate(); } } }
			 * document.getElementById(fieldId).value = endDateFormat;
			 */
			// qibiao change 2008-7-8
			start = new Date(startDate.substring(0, 4), startDate.substring(5,
							7)
							- 1, startDate.substring(8, 10));
			start.setYear(parseInt(start.getYear()) + parseInt(limit));
			start.setDate(start.getDate() - 1);
			document.getElementById(fieldId).value = start.getYear() + "-"
					+ (start.getMonth() + 1) + "-" + start.getDate();
		} else {
			document.getElementById(startDateId).focus();
			inputText.value = "";
			alert("\u8bf7\u5148\u586b\u5199\u5f00\u59cb\u65e5\u671f!");
		}
	}
}
function dateAutoCount3(startDateId, fieldId) {
	var endDateFormat;
	var startDate = document.getElementById(startDateId).value;// 开始日期

	if (startDate != null && startDate != NaN && startDate != "") {
		endDate = new Date(parseInt((startDate.substring(0, 4))) + 3, startDate
						.substring(5, 7), startDate.substring(8, 10)
						- parseInt(1));// 截止日期
		if (startDate.substring(5, 7) < 10 && startDate.substring(8, 10) < 10) {
			endDateFormat = endDate.getYear() + "-0" + endDate.getMonth()
					+ "-0" + endDate.getDate();
		} else {
			if (startDate.substring(5, 7) < 10
					&& startDate.substring(8, 10) >= 10) {
				endDateFormat = endDate.getYear() + "-0" + endDate.getMonth()
						+ "-" + endDate.getDate();
			} else {
				if (startDate.substring(5, 7) >= 10
						&& startDate.substring(8, 10) < 10) {
					endDateFormat = endDate.getYear() + "-"
							+ endDate.getMonth() + "-0" + endDate.getDate();
				} else {
					endDateFormat = endDate.getYear() + "-"
							+ endDate.getMonth() + "-" + endDate.getDate();
				}
			}
		}
		document.getElementById(fieldId).value = endDateFormat;
	}
}
/*******************************************************************************
 * 去除前后空格
 ******************************************************************************/
String.prototype.trim = function() {
	// 用正则表达式将前后空格
	// 用空字符串替代。
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
/*******************************************************************************
 * 药品许可证编号验证规则
 ******************************************************************************/
function validateLicence(inputId) {
	var idValue, pattern;
	idValue = inputId.value;// 取得输入值
	if (inputId.readOnly == false) {
		var subValueSpace = idValue.substring(1, idValue.indexOf("2"));// 取得子字符串
		var subValue = subValueSpace.trim();// 去除空格
		pattern = /^([HZSTYQ]([yz]{1,2}))+$/;// 创建正则表达式
		var va = pattern.exec(subValue); // 验证匹配
		if (va == null) {
			alert("\u8f93\u5165\u7684\u7f16\u53f7\u89c4\u5219\u9519\u8bef,\u8bf7\u91cd\u65b0\u8f93\u5165!");
		}
	}
}
/*******************************************************************************
 * 将汉字转换成汉语拼音
 ******************************************************************************/
var strGB = "\u5416\u963f\u554a\u9515\u55c4\u54ce\u54c0\u5509\u57c3\u6328\u953f\u6371\u7691\u764c\u55f3\u77ee\u853c\u972d\u827e\u7231\u7839\u9698\u55cc\u5ad2\u788d\u66a7\u7477\u5b89\u6849\u6c28\u5eb5\u8c19\u9e4c\u978d\u4ffa\u57ef\u94f5\u63de\u72b4\u5cb8\u6309\u6848\u80fa\u6697\u9eef\u80ae\u6602\u76ce\u51f9\u5773\u6556\u55f7\u5ed2\u7352\u9068\u71ac\u7ff1\u8071\u87af\u9ccc\u93d6\u62d7\u8884\u5aaa\u5c99\u50b2\u5965\u9a9c\u6fb3\u61ca\u93ca\u516b\u5df4\u53ed\u6252\u5427\u5c9c\u82ad\u75a4\u634c\u7b06\u7c91\u62d4\u8307\u83dd\u8dcb\u9b43\u628a\u94af\u9776\u575d\u7238\u7f62\u9c85\u9738\u705e\u63b0\u767d\u767e\u4f70\u67cf\u636d\u6446\u5457\u8d25\u62dc\u7a17\u6273\u73ed\u822c\u9881\u6591\u642c\u7622\u764d\u962a\u5742\u677f\u7248\u94a3\u8228\u529e\u534a\u4f34\u626e\u62cc\u7eca\u74e3\u90a6\u5e2e\u6886\u6d5c\u7ed1\u699c\u8180\u868c\u508d\u68d2\u8c24\u84a1\u78c5\u9551\u5305\u5b62\u82de\u80de\u7172\u9f85\u8912\u96f9\u5b9d\u9971\u4fdd\u9e28\u5821\u8446\u8913\u62a5\u62b1\u8c79\u8db5\u9c8d\u66b4\u7206\u9642\u5351\u676f\u60b2\u7891\u9e4e\u5317\u8d1d\u72c8\u90b6\u5907\u80cc\u94a1\u500d\u6096\u88ab\u60eb\u7119\u8f88\u789a\u84d3\u8919\u97b4\u943e\u5954\u8d32\u951b\u672c\u82ef\u755a\u574c\u7b28\u5d29\u7ef7\u5623\u752d\u6cf5\u8ff8\u750f\u8e66\u903c\u8378\u9f3b\u5315\u6bd4\u5421\u59a3\u5f7c\u79d5\u4ffe\u7b14\u822d\u9119\u5e01\u5fc5\u6bd5\u95ed\u5e87\u7540\u54d4\u6bd6\u835c\u965b\u6bd9\u72f4\u94cb\u5a62\u5eb3\u655d\u8406\u5f3c\u610e\u7b5a\u6ed7\u75f9\u84d6\u88e8\u8df8\u8f9f\u5f0a\u78a7\u7b85\u853d\u58c1\u5b16\u7be6\u859c\u907f\u6fde\u81c2\u9ac0\u74a7\u895e\u8fb9\u782d\u7b3e\u7f16\u7178\u8759\u9cca\u97ad\u8d2c\u6241\u7a86\u533e\u78a5\u890a\u535e\u5f01\u5fed\u6c74\u82c4\u62da\u4fbf\u53d8\u7f0f\u904d\u8fa8\u8fa9\u8fab\u6753\u5f6a\u6807\u98d1\u9adf\u9aa0\u8198\u762d\u9556\u98d9\u98da\u9573\u8868\u5a4a\u88f1\u9cd4\u618b\u9cd6\u522b\u8e69\u762a\u5bbe\u5f6c\u50a7\u658c\u6ee8\u7f24\u69df\u9554\u6fd2\u8c73\u6448\u6ba1\u8191\u9acc\u9b13\u51b0\u5175\u4e19\u90b4\u79c9\u67c4\u70b3\u997c\u7980\u5e76\u75c5\u6452\u62e8\u6ce2\u73bb\u5265\u94b5\u997d\u5575\u8116\u83e0\u64ad\u4f2f\u5b5b\u9a73\u5e1b\u6cca\u52c3\u4eb3\u94b9\u94c2\u8236\u535a\u6e24\u9e41\u640f\u7b94\u818a\u8e23\u8584\u7934\u8ddb\u7c38\u64d8\u6a97\u900b\u94b8\u6661\u91ad\u535c\u535f\u8865\u54fa\u6355\u4e0d\u5e03\u6b65\u6016\u949a\u90e8\u57e0\u74ff\u7c3f\u5693\u64e6\u7924\u731c\u624d\u6750\u8d22\u88c1\u91c7\u5f69\u776c\u8e29\u83dc\u8521\u53c2\u9a96\u9910\u6b8b\u8695\u60ed\u60e8\u9eea\u707f\u7cb2\u74a8\u4ed3\u4f27\u6ca7\u82cd\u8231\u85cf\u64cd\u7cd9\u66f9\u5608\u6f15\u69fd\u825a\u87ac\u8349\u518c\u4fa7\u5395\u607b\u6d4b\u7b56\u5c91\u6d94\u564c\u5c42\u8e6d\u53c9\u6748\u63d2\u9987\u9538\u67e5\u832c\u8336\u643d\u7339\u69ce\u5bdf\u78b4\u6aab\u8869\u9572\u6c4a\u5c94\u8be7\u59f9\u5dee\u62c6\u9497\u4faa\u67f4\u8c7a\u867f\u7625\u89c7\u63ba\u6400\u5a75\u8c17\u5b71\u7985\u998b\u7f20\u8749\u5edb\u6f7a\u9561\u87fe\u8e94\u4ea7\u8c04\u94f2\u9610\u8487\u5181\u5fcf\u98a4\u7fbc\u4f25\u660c\u5a3c\u7316\u83d6\u960a\u9cb3\u957f\u80a0\u82cc\u5c1d\u507f\u5e38\u5f9c\u5ae6\u5382\u573a\u6636\u60dd\u655e\u6c05\u6005\u7545\u5021\u9b2f\u5531\u6284\u600a\u949e\u712f\u8d85\u6641\u5de2\u671d\u5632\u6f6e\u5435\u7092\u8016\u8f66\u7817\u626f\u5f7b\u577c\u63a3\u64a4\u6f88\u62bb\u90f4\u741b\u55d4\u5c18\u81e3\u5ff1\u6c89\u8fb0\u9648\u5bb8\u6668\u8c0c\u789c\u95ef\u886c\u79f0\u9f80\u8d81\u6987\u8c36\u67fd\u86cf\u94db\u6491\u77a0\u4e1e\u6210\u5448\u627f\u67a8\u8bda\u57ce\u4e58\u57d5\u94d6\u60e9\u7a0b\u88ce\u584d\u9172\u6f84\u6a59\u901e\u9a8b\u79e4\u5403\u54e7\u86a9\u9e31\u7735\u7b1e\u55e4\u5ab8\u75f4\u87ad\u9b51\u5f1b\u6c60\u9a70\u8fdf\u830c\u6301\u5319\u5880\u8e1f\u7bea\u5c3a\u4f88\u9f7f\u803b\u8c49\u892b\u5f73\u53f1\u65a5\u8d64\u996c\u70bd\u7fc5\u6555\u557b\u50ba\u761b\u5145\u51b2\u5fe1\u833a\u8202\u61a7\u825f\u866b\u5d07\u5ba0\u94f3\u62bd\u7633\u4ec7\u4fe6\u5e31\u60c6\u7ef8\u7574\u6101\u7a20\u7b79\u916c\u8e0c\u96e0\u4e11\u7785\u81ed\u51fa\u521d\u6a17\u520d\u9664\u53a8\u6ec1\u9504\u870d\u96cf\u6a71\u8e87\u8e70\u6775\u7840\u50a8\u696e\u695a\u891a\u4e8d\u5904\u6035\u7ecc\u6410\u89e6\u61b7\u9edc\u77d7\u640b\u63e3\u555c\u562c\u8e39\u5ddb\u5ddd\u6c1a\u7a7f\u4f20\u8221\u8239\u9044\u693d\u821b\u5598\u4e32\u948f\u56f1\u75ae\u7a97\u5e8a\u521b\u6006\u5439\u708a\u5782\u9672\u6376\u68f0\u69cc\u9524\u6625\u693f\u877d\u7eaf\u5507\u83bc\u6df3\u9e51\u9187\u8822\u8e14\u6233\u7ef0\u8f8d\u9f8a\u5472\u75b5\u8bcd\u7960\u8308\u8328\u74f7\u6148\u8f9e\u78c1\u96cc\u9e5a\u7ccd\u6b64\u6b21\u523a\u8d50\u4ece\u5306\u82c1\u679e\u8471\u9aa2\u7481\u806a\u4e1b\u6dd9\u742e\u51d1\u6971\u8160\u8f8f\u7c97\u5f82\u6b82\u4fc3\u731d\u9162\u851f\u918b\u7c07\u8e59\u8e74\u6c46\u64ba\u9569\u8e7f\u7a9c\u7be1\u7228\u5d14\u50ac\u6467\u69b1\u7480\u8106\u5550\u60b4\u6dec\u8403\u6bf3\u7601\u7cb9\u7fe0\u6751\u76b4\u5b58\u5fd6\u5bf8\u6413\u78cb\u64ae\u8e49\u5d6f\u75e4\u77ec\u9e7e\u811e\u539d\u632b\u63aa\u9509\u9519\u54d2\u8037\u642d\u55d2\u8921\u8fbe\u59b2\u601b\u6c93\u7b2a\u7b54\u7629\u977c\u9791\u6253\u5927\u5446\u5454\u6b79\u50a3\u4ee3\u5cb1\u7519\u7ed0\u8fe8\u5e26\u5f85\u6020\u6b86\u73b3\u8d37\u57ed\u888b\u902e\u6234\u9edb\u4e39\u5355\u62c5\u7708\u803d\u90f8\u8043\u6b9a\u7605\u7baa\u510b\u80c6\u75b8\u63b8\u65e6\u4f46\u8bde\u5556\u5f39\u60ee\u6de1\u840f\u86cb\u6c2e\u6fb9\u5f53\u88c6\u6321\u515a\u8c20\u51fc\u5b95\u7800\u8361\u6863\u83ea\u5200\u53e8\u5fc9\u6c18\u5bfc\u5c9b\u5012\u6363\u7977\u8e48\u5230\u60bc\u7118\u76d7\u9053\u7a3b\u7e9b\u5f97\u951d\u5fb7\u7684\u706f\u767b\u5654\u7c26\u8e6c\u7b49\u6225\u9093\u51f3\u5d9d\u77aa\u78f4\u956b\u4f4e\u7f9d\u5824\u5600\u6ef4\u955d\u72c4\u7c74\u8fea\u654c\u6da4\u837b\u7b1b\u89cc\u5ae1\u6c10\u8bcb\u90b8\u577b\u5e95\u62b5\u67e2\u7825\u9ab6\u5730\u5f1f\u5e1d\u5a23\u9012\u7b2c\u8c1b\u68e3\u7747\u7f14\u8482\u78b2\u55f2\u6382\u6ec7\u98a0\u5dc5\u766b\u5178\u70b9\u7898\u8e2e\u7535\u4f43\u7538\u963d\u576b\u5e97\u57ab\u73b7\u94bf\u60e6\u6dc0\u5960\u6bbf\u975b\u765c\u7c1f\u5201\u53fc\u51cb\u8c82\u7889\u96d5\u9cb7\u540a\u9493\u8c03\u6389\u94de\u7239\u8dcc\u8fed\u57a4\u74de\u8c0d\u558b\u581e\u63f2\u800b\u53e0\u7252\u789f\u8776\u8e40\u9cbd\u4e01\u4ec3\u53ee\u738e\u7594\u76ef\u9489\u8035\u914a\u9876\u9f0e\u8ba2\u5b9a\u5576\u815a\u7887\u952d\u4e22\u94e5\u4e1c\u51ac\u549a\u5cbd\u6c21\u9e2b\u8463\u61c2\u52a8\u51bb\u4f97\u578c\u5cd2\u606b\u680b\u6d1e\u80e8\u80f4\u7850\u90fd\u515c\u8538\u7bfc\u6597\u6296\u94ad\u9661\u86aa\u8c46\u9017\u75d8\u7aa6\u561f\u7763\u6bd2\u8bfb\u6e0e\u691f\u724d\u728a\u9ee9\u9ad1\u72ec\u7b03\u5835\u8d4c\u7779\u828f\u5992\u675c\u809a\u5ea6\u6e21\u9540\u8839\u7aef\u77ed\u6bb5\u65ad\u7f0e\u6934\u7145\u953b\u7c16\u5806\u961f\u5bf9\u5151\u603c\u7893\u619d\u9566\u5428\u6566\u58a9\u7905\u8e72\u76f9\u8db8\u56e4\u6c8c\u7096\u76fe\u7818\u949d\u987f\u9041\u591a\u5484\u54c6\u88f0\u593a\u94ce\u6387\u8e31\u6735\u54da\u579b\u7f0d\u8eb2\u5241\u6cb2\u5815\u8235\u60f0\u8dfa\u5c59\u8bb9\u4fc4\u5a25\u5ce8\u83aa\u9507\u9e45\u86fe\u989d\u5a40\u5384\u5443\u627c\u82ca\u8f6d\u57a9\u6076\u997f\u8c14\u9102\u960f\u6115\u843c\u904f\u816d\u9537\u9e57\u989a\u5669\u9cc4\u6069\u84bd\u6441\u513f\u800c\u9e38\u9c95\u5c14\u8033\u8fe9\u6d31\u9975\u73e5\u94d2\u4e8c\u4f74\u8d30\u53d1\u4e4f\u4f10\u57a1\u7f5a\u9600\u7b4f\u6cd5\u781d\u73d0\u5e06\u756a\u5e61\u7ffb\u85e9\u51e1\u77fe\u9492\u70e6\u6a0a\u8543\u71d4\u7e41\u8e6f\u8629\u53cd\u8fd4\u72af\u6cdb\u996d\u8303\u8d29\u7548\u68b5\u65b9\u90a1\u574a\u82b3\u678b\u94ab\u9632\u59a8\u623f\u80aa\u9c82\u4eff\u8bbf\u5f77\u7eba\u822b\u653e\u98de\u5983\u975e\u5561\u7eef\u83f2\u6249\u871a\u970f\u9cb1\u80a5\u6ddd\u8153\u532a\u8bfd\u60b1\u6590\u69a7\u7fe1\u7bda\u5420\u5e9f\u6cb8\u72d2\u80ba\u8d39\u75f1\u9544\u5206\u5429\u7eb7\u82ac\u6c1b\u73a2\u915a\u575f\u6c7e\u68fc\u711a\u9f22\u7c89\u4efd\u594b\u5fff\u507e\u6124\u7caa\u9cbc\u7035\u4e30\u98ce\u6ca3\u67ab\u5c01\u75af\u781c\u5cf0\u70fd\u8451\u950b\u8702\u9146\u51af\u9022\u7f1d\u8bbd\u552a\u51e4\u5949\u4ff8\u4f5b\u7f36\u5426\u592b\u544b\u80a4\u8dba\u9eb8\u7a03\u8dd7\u5b75\u6577\u5f17\u4f0f\u51eb\u5b5a\u6276\u8299\u82be\u602b\u62c2\u670d\u7ec2\u7ecb\u82fb\u4fd8\u6c1f\u7953\u7f58\u832f\u90db\u6d6e\u7829\u83a9\u86a8\u5310\u6874\u6daa\u7b26\u8274\u83d4\u88b1\u5e45\u798f\u8709\u8f90\u5e5e\u8760\u9efb\u5452\u629a\u752b\u5e9c\u62ca\u65a7\u4fef\u91dc\u812f\u8f85\u8151\u6ecf\u8150\u9efc\u7236\u8ba3\u4ed8\u5987\u8d1f\u9644\u5490\u961c\u9a78\u590d\u8d74\u526f\u5085\u5bcc\u8d4b\u7f1a\u8179\u9c8b\u8d59\u876e\u9cc6\u8986\u99a5\u65ee\u4f3d\u9486\u5c1c\u560e\u5676\u5c15\u5c2c\u8be5\u9654\u5793\u8d45\u6539\u4e10\u9499\u76d6\u6e89\u6224\u6982\u5e72\u7518\u6746\u809d\u5769\u6cd4\u82f7\u67d1\u7aff\u75b3\u9150\u5c34\u79c6\u8d76\u6562\u611f\u6f89\u6a44\u64c0\u65f0\u77f8\u7ec0\u6de6\u8d63\u5188\u521a\u5c97\u7eb2\u809b\u7f38\u94a2\u7f61\u6e2f\u6760\u7b7b\u6206\u768b\u7f94\u9ad8\u69d4\u777e\u818f\u7bd9\u7cd5\u6772\u641e\u7f1f\u69c1\u7a3f\u9550\u85c1\u544a\u8bf0\u90dc\u9506\u6208\u572a\u7ea5\u7599\u54e5\u80f3\u88bc\u9e3d\u5272\u6401\u6b4c\u9601\u9769\u683c\u9b32\u845b\u86e4\u9694\u55dd\u5865\u643f\u8188\u9549\u9abc\u54ff\u8238\u4e2a\u5404\u867c\u784c\u94ec\u7ed9\u6839\u8ddf\u54cf\u4e98\u826e\u831b\u66f4\u5e9a\u8015\u8d53\u7fb9\u54fd\u57c2\u7ee0\u803f\u6897\u9ca0\u5de5\u5f13\u516c\u529f\u653b\u4f9b\u80b1\u5bab\u606d\u86a3\u8eac\u9f9a\u89e5\u5de9\u6c5e\u62f1\u73d9\u5171\u8d21\u52fe\u4f5d\u6c9f\u94a9\u7f11\u7bdd\u97b2\u5ca3\u72d7\u82df\u67b8\u7b31\u6784\u8bdf\u8d2d\u57a2\u591f\u5abe\u5f40\u9058\u89cf\u4f30\u5495\u59d1\u5b64\u6cbd\u8f71\u9e2a\u83c7\u83f0\u86c4\u89da\u8f9c\u9164\u6bc2\u7b8d\u9e58\u53e4\u6c69\u8bc2\u8c37\u80a1\u726f\u9aa8\u7f5f\u94b4\u86ca\u9e44\u9f13\u560f\u81cc\u77bd\u56fa\u6545\u987e\u5d2e\u688f\u727f\u96c7\u75fc\u9522\u9cb4\u74dc\u522e\u80cd\u9e39\u5471\u5250\u5be1\u5366\u8bd6\u6302\u8902\u4e56\u62d0\u602a\u5173\u89c2\u5b98\u51a0\u500c\u68fa\u9ccf\u9986\u7ba1\u8d2f\u60ef\u63bc\u6dab\u76e5\u704c\u9e73\u7f50\u839e\u5149\u54a3\u6844\u80f1\u5e7f\u72b7\u901b\u5f52\u572d\u59ab\u9f9f\u89c4\u7688\u95fa\u7845\u7470\u9c91\u5b84\u8f68\u5e8b\u5326\u8be1\u7678\u9b3c\u6677\u7c0b\u523d\u523f\u67dc\u7085\u8d35\u6842\u8dea\u9cdc\u886e\u7ef2\u8f8a\u6eda\u78d9\u9ca7\u68cd\u5459\u57da\u90ed\u5d1e\u8052\u9505\u8748\u56fd\u5e3c\u63b4\u8662\u9998\u679c\u7313\u6901\u873e\u88f9\u8fc7\u94ea\u54c8\u55e8\u5b69\u9ab8\u6d77\u80f2\u91a2\u4ea5\u9a87\u5bb3\u6c26\u9878\u86b6\u9163\u61a8\u9f3e\u9097\u542b\u90af\u51fd\u6657\u6db5\u7113\u5bd2\u97e9\u7f55\u558a\u6c49\u6c57\u65f1\u608d\u634d\u710a\u83e1\u9894\u6496\u61be\u64bc\u7ff0\u701a\u592f\u676d\u7ed7\u822a\u9883\u6c86\u84bf\u5686\u8585\u869d\u6beb\u55e5\u8c6a\u568e\u58d5\u6fe0\u597d\u90dd\u53f7\u660a\u6d69\u8017\u7693\u98a2\u704f\u8bc3\u5475\u559d\u55ec\u79be\u5408\u4f55\u52be\u548c\u6cb3\u66f7\u9602\u6838\u76cd\u8377\u6db8\u76d2\u83cf\u86b5\u988c\u8c89\u9616\u7fee\u8d3a\u8910\u8d6b\u9e64\u58d1\u9ed1\u563f\u75d5\u5f88\u72e0\u6068\u4ea8\u54fc\u6052\u6841\u73e9\u6a2a\u8861\u8605\u8f70\u54c4\u8a07\u70d8\u85a8\u5f18\u7ea2\u5b8f\u95f3\u6cd3\u6d2a\u836d\u8679\u9e3f\u857b\u9ec9\u8ba7\u4faf\u5589\u7334\u760a\u7bcc\u7cc7\u9aba\u543c\u540e\u539a\u5f8c\u9005\u5019\u5820\u9c8e\u4e4e\u547c\u5ffd\u70c0\u8f77\u553f\u60da\u6ef9\u56eb\u5f27\u72d0\u80e1\u58f6\u659b\u6e56\u7322\u846b\u7173\u745a\u9e55\u69f2\u7cca\u8774\u9190\u89f3\u864e\u6d52\u552c\u7425\u4e92\u6237\u51b1\u62a4\u6caa\u5cb5\u6019\u623d\u795c\u7b0f\u6248\u74e0\u9e71\u82b1\u534e\u54d7\u9a85\u94e7\u6ed1\u733e\u5316\u5212\u753b\u8bdd\u6866\u6000\u5f8a\u6dee\u69d0\u8e1d\u574f\u6b22\u737e\u8fd8\u73af\u90c7\u6d39\u6853\u8411\u953e\u5bf0\u7f33\u9b1f\u7f13\u5e7b\u5942\u5ba6\u5524\u6362\u6d63\u6da3\u60a3\u7115\u902d\u75ea\u8c62\u6f36\u9ca9\u64d0\u8093\u8352\u614c\u7687\u51f0\u968d\u9ec4\u5fa8\u60f6\u6e5f\u9051\u714c\u6f62\u749c\u7bc1\u8757\u7640\u78fa\u7c27\u87e5\u9cc7\u604d\u6643\u8c0e\u5e4c\u7070\u8bd9\u54b4\u6062\u6325\u867a\u6656\u73f2\u8f89\u9ebe\u5fbd\u96b3\u56de\u6d04\u8334\u86d4\u6094\u5349\u6c47\u4f1a\u8bb3\u54d5\u6d4d\u7ed8\u835f\u8bf2\u605a\u6867\u70e9\u8d3f\u5f57\u6666\u79fd\u5599\u60e0\u7f0b\u6bc1\u6167\u8559\u87ea\u660f\u8364\u5a5a\u960d\u6d51\u9984\u9b42\u8be8\u6df7\u6eb7\u8020\u952a\u5290\u8c41\u6509\u6d3b\u706b\u4f19\u94ac\u5925\u6216\u8d27\u83b7\u7978\u60d1\u970d\u956c\u56af\u85ff\u8816\u4e0c\u8ba5\u51fb\u53fd\u9965\u4e69\u573e\u673a\u7391\u808c\u82a8\u77f6\u9e21\u54ad\u8ff9\u525e\u5527\u59ec\u5c50\u79ef\u7b04\u57fa\u7ee9\u5d47\u7284\u7f09\u8d4d\u7578\u8dfb\u7b95\u757f\u7a3d\u9f51\u58bc\u6fc0\u7f81\u53ca\u5409\u5c8c\u6c72\u7ea7\u5373\u6781\u4e9f\u4f76\u6025\u7b08\u75be\u6222\u68d8\u6b9b\u96c6\u5ac9\u696b\u84ba\u8f91\u7620\u857a\u7c4d\u51e0\u5df1\u866e\u6324\u810a\u638e\u621f\u5d74\u9e82\u8ba1\u8bb0\u4f0e\u7eaa\u5993\u5fcc\u6280\u82b0\u9645\u5242\u5b63\u54dc\u65e2\u6d0e\u6d4e\u7ee7\u89ca\u5048\u5bc2\u5bc4\u60b8\u796d\u84df\u66a8\u8dfd\u9701\u9c9a\u7a37\u9cab\u5180\u9afb\u9aa5\u52a0\u5939\u4f73\u8fe6\u67b7\u6d43\u73c8\u5bb6\u75c2\u7b33\u8888\u88b7\u846d\u8dcf\u5609\u9553\u5cac\u90cf\u835a\u605d\u621b\u94d7\u86f1\u988a\u7532\u80db\u8d3e\u94be\u7615\u4ef7\u9a7e\u67b6\u5047\u5ac1\u7a3c\u620b\u5978\u5c16\u575a\u6b7c\u95f4\u80a9\u8270\u517c\u76d1\u7b3a\u83c5\u6e54\u728d\u7f04\u641b\u714e\u7f23\u84b9\u9ca3\u9e63\u97af\u56dd\u62e3\u67a7\u4fed\u67ec\u8327\u6361\u7b15\u51cf\u526a\u68c0\u8dbc\u7751\u7877\u88e5\u950f\u7b80\u8c2b\u622c\u78b1\u7fe6\u8b07\u8e47\u89c1\u4ef6\u5efa\u996f\u5251\u726e\u8350\u8d31\u5065\u6da7\u8230\u6e10\u8c0f\u6957\u6bfd\u6e85\u8171\u8df5\u9274\u952e\u50ed\u69db\u7bad\u8e3a\u6c5f\u59dc\u5c06\u8333\u6d46\u8c47\u50f5\u7f30\u7913\u7586\u8bb2\u5956\u6868\u848b\u8029\u5320\u964d\u6d1a\u7edb\u9171\u729f\u7ce8\u827d\u4ea4\u90ca\u59e3\u5a07\u6d47\u832d\u9a84\u80f6\u6912\u7126\u86df\u8de4\u50ec\u9c9b\u8549\u7901\u9e6a\u89d2\u4f7c\u4fa5\u6322\u72e1\u7ede\u997a\u768e\u77eb\u811a\u94f0\u6405\u6e6b\u527f\u656b\u5fbc\u7f34\u53eb\u5ce4\u8f7f\u8f83\u6559\u7a96\u9175\u564d\u91ae\u9636\u7596\u7686\u63a5\u79f8\u5588\u55df\u63ed\u8857\u5b51\u8282\u8ba6\u52ab\u6770\u8bd8\u62ee\u6d01\u7ed3\u6840\u5a55\u6377\u9889\u776b\u622a\u78a3\u7aed\u9c92\u7faf\u5979\u59d0\u89e3\u4ecb\u6212\u82a5\u5c4a\u754c\u75a5\u8beb\u501f\u86a7\u9ab1\u85c9\u5dfe\u4eca\u65a4\u91d1\u6d25\u77dc\u887f\u7b4b\u895f\u4ec5\u537a\u7d27\u5807\u8c28\u9526\u5ed1\u9991\u69ff\u747e\u5c3d\u52b2\u5997\u8fd1\u8fdb\u8369\u664b\u6d78\u70ec\u8d46\u7f19\u7981\u9773\u89d0\u5664\u4eac\u6cfe\u7ecf\u830e\u8346\u60ca\u65cc\u83c1\u6676\u8148\u775b\u7cb3\u5162\u7cbe\u9cb8\u4e95\u9631\u522d\u80bc\u9888\u666f\u5106\u61ac\u8b66\u51c0\u5f2a\u5f84\u8ff3\u80eb\u75c9\u7ade\u5a67\u7adf\u656c\u9753\u9756\u5883\u734d\u9759\u955c\u6243\u8fe5\u70af\u7a98\u7ea0\u7a76\u9e20\u8d73\u9604\u557e\u63ea\u9b0f\u4e5d\u4e45\u7078\u7396\u97ed\u9152\u65e7\u81fc\u548e\u759a\u67e9\u6855\u53a9\u6551\u5c31\u8205\u50e6\u9e6b\u5c45\u62d8\u72d9\u82f4\u9a79\u75bd\u63ac\u6910\u741a\u8d84\u9514\u88fe\u96ce\u97a0\u97ab\u5c40\u6854\u83ca\u6a58\u5480\u6cae\u4e3e\u77e9\u8392\u6989\u6998\u9f83\u8e3d\u53e5\u5de8\u8bb5\u62d2\u82e3\u5177\u70ac\u949c\u4ff1\u5028\u5267\u60e7\u636e\u8ddd\u728b\u98d3\u952f\u7aad\u805a\u5c66\u8e1e\u907d\u77bf\u91b5\u5a1f\u6350\u6d93\u9e43\u954c\u8832\u5377\u9529\u5026\u684a\u72f7\u7ee2\u96bd\u7737\u9104\u5658\u6485\u5b53\u51b3\u8bc0\u6289\u73cf\u7edd\u89c9\u5014\u5d1b\u6398\u6877\u89d6\u53a5\u5282\u8c32\u7357\u8568\u5671\u6a5b\u7235\u9562\u8e76\u56bc\u77cd\u721d\u652b\u519b\u541b\u5747\u94a7\u76b2\u83cc\u7b60\u9e87\u4fca\u90e1\u5cfb\u6343\u6d5a\u9a8f\u7ae3\u5494\u5496\u5580\u5361\u4f67\u80e9\u5f00\u63e9\u950e\u51ef\u5240\u57b2\u607a\u94e0\u6168\u8488\u6977\u9534\u5ffe\u520a\u52d8\u9f9b\u582a\u6221\u574e\u4f83\u780d\u83b0\u770b\u961a\u77b0\u5eb7\u6177\u7ce0\u625b\u4ea2\u4f09\u6297\u95f6\u7095\u94aa\u5c3b\u8003\u62f7\u6832\u70e4\u94d0\u7292\u9760\u5777\u82db\u67ef\u73c2\u79d1\u8f72\u75b4\u94b6\u68f5\u988f\u7a1e\u7aa0\u9897\u778c\u78d5\u874c\u9ac1\u58f3\u54b3\u53ef\u5ca2\u6e34\u514b\u523b\u5ba2\u606a\u8bfe\u6c2a\u9a92\u7f02\u55d1\u6e98\u951e\u80af\u57a6\u6073\u5543\u88c9\u542d\u5751\u94ff\u7a7a\u5025\u5d06\u7b9c\u5b54\u6050\u63a7\u62a0\u82a4\u770d\u53e3\u53e9\u6263\u5bc7\u7b58\u853b\u5233\u67af\u54ed\u5800\u7a9f\u9ab7\u82e6\u5e93\u7ed4\u55be\u88e4\u9177\u5938\u4f89\u57ae\u630e\u80ef\u8de8\u84af\u5757\u5feb\u4fa9\u90d0\u54d9\u72ef\u810d\u7b77\u5bbd\u9acb\u6b3e\u5321\u8bd3\u54d0\u7b50\u72c2\u8bf3\u593c\u909d\u5739\u7ea9\u51b5\u65f7\u77ff\u8d36\u6846\u7736\u4e8f\u5cbf\u609d\u76d4\u7aa5\u594e\u9035\u9997\u55b9\u63c6\u8475\u668c\u9b41\u777d\u8770\u5914\u5080\u8dec\u532e\u559f\u6126\u6127\u6e83\u8489\u9988\u7bd1\u8069\u5764\u6606\u7428\u951f\u9ae1\u918c\u9cb2\u6083\u6346\u9603\u56f0\u6269\u62ec\u681d\u86de\u9614\u5ed3\u5783\u62c9\u5566\u908b\u65ef\u782c\u5587\u524c\u814a\u760c\u8721\u8fa3\u6765\u5d03\u5f95\u6d9e\u83b1\u94fc\u8d49\u7750\u8d56\u6fd1\u765e\u7c41\u5170\u5c9a\u62e6\u680f\u5a6a\u9611\u84dd\u8c30\u6f9c\u8934\u6593\u7bee\u9567\u89c8\u63fd\u7f06\u6984\u6f24\u7f71\u61d2\u70c2\u6ee5\u5577\u90ce\u72fc\u83a8\u5eca\u7405\u6994\u7a02\u9512\u8782\u6717\u9606\u6d6a\u8497\u635e\u52b3\u7262\u5520\u5d02\u75e8\u94f9\u91aa\u8001\u4f6c\u59e5\u6833\u94d1\u6f66\u6d9d\u70d9\u8022\u916a\u4ec2\u4e50\u53fb\u6cd0\u52d2\u9cd3\u96f7\u5ad8\u7f27\u6a91\u956d\u7fb8\u8012\u8bd4\u5792\u78ca\u857e\u5121\u808b\u6cea\u7c7b\u7d2f\u9179\u64c2\u561e\u5844\u68f1\u695e\u51b7\u6123\u5398\u68a8\u72f8\u79bb\u8389\u9a8a\u7281\u55b1\u9e42\u6f13\u7f21\u84e0\u870a\u5ae0\u7483\u9ca1\u9ece\u7bf1\u7f79\u85dc\u9ee7\u8821\u793c\u674e\u91cc\u4fda\u54e9\u5a0c\u9026\u7406\u9502\u9ca4\u6fa7\u91b4\u9ce2\u529b\u5386\u5389\u7acb\u540f\u4e3d\u5229\u52b1\u5456\u575c\u6ca5\u82c8\u4f8b\u623e\u67a5\u75a0\u96b6\u4fd0\u4fea\u680e\u75ac\u8354\u8f79\u90e6\u6817\u7301\u783a\u783e\u8385\u5533\u7b20\u7c92\u7c9d\u86ce\u5088\u75e2\u8a48\u8dde\u96f3\u6ea7\u7be5\u4fe9\u5941\u8fde\u5e18\u601c\u6d9f\u83b2\u8054\u88e2\u5ec9\u9ca2\u6fc2\u81c1\u9570\u880a\u655b\u740f\u8138\u88e3\u8539\u7ec3\u5a08\u70bc\u604b\u6b93\u94fe\u695d\u6f4b\u826f\u51c9\u6881\u690b\u7cae\u7cb1\u589a\u8e09\u4e24\u9b49\u4eae\u8c05\u8f86\u667e\u91cf\u8fbd\u7597\u804a\u50da\u5be5\u5ed6\u5639\u5bee\u64a9\u7360\u7f2d\u71ce\u9563\u9e69\u948c\u84fc\u4e86\u5c25\u6599\u6482\u54a7\u5217\u52a3\u51bd\u6d0c\u57d2\u70c8\u6369\u730e\u88c2\u8d94\u8e90\u9b23\u90bb\u6797\u4e34\u5549\u6dcb\u7433\u7cbc\u5d99\u9074\u8f9a\u9716\u77b5\u78f7\u9cde\u9e9f\u51db\u5eea\u61d4\u6aa9\u541d\u8d41\u853a\u81a6\u8e8f\u62ce\u4f36\u7075\u56f9\u5cad\u6ce0\u82d3\u67c3\u73b2\u74f4\u51cc\u94c3\u9675\u68c2\u7eeb\u7f9a\u7fce\u8046\u83f1\u86c9\u96f6\u9f84\u9cae\u9143\u9886\u4ee4\u53e6\u5464\u6e9c\u7198\u5218\u6d4f\u6d41\u7559\u7409\u786b\u65d2\u905b\u998f\u9a9d\u69b4\u7624\u954f\u938f\u67f3\u7efa\u950d\u516d\u9e68\u54af\u9f99\u5499\u6cf7\u830f\u680a\u73d1\u80e7\u783b\u7b3c\u804b\u9686\u7643\u7abf\u9647\u5784\u5785\u62e2\u5a04\u507b\u55bd\u848c\u697c\u8027\u877c\u9ac5\u5d5d\u6402\u7bd3\u964b\u6f0f\u7618\u9542\u9732\u565c\u64b8\u5362\u5e90\u82a6\u5786\u6cf8\u7089\u680c\u80ea\u8f73\u9e2c\u823b\u9885\u9c88\u5364\u864f\u63b3\u9c81\u6a79\u9565\u9646\u5f55\u8d42\u8f82\u6e0c\u902f\u9e7f\u7984\u6ee4\u788c\u8def\u6f09\u622e\u8f98\u6f5e\u7490\u7c0f\u9e6d\u9e93\u6c07\u9a74\u95fe\u6988\u5415\u4fa3\u65c5\u7a06\u94dd\u5c61\u7f15\u8182\u891b\u5c65\u5f8b\u8651\u7387\u7eff\u6c2f\u5b6a\u5ce6\u631b\u683e\u9e3e\u8114\u6ee6\u92ae\u5375\u4e71\u63a0\u7565\u950a\u62a1\u4ed1\u4f26\u56f5\u6ca6\u7eb6\u8f6e\u8bba\u634b\u7f57\u7321\u8136\u841d\u903b\u6924\u9523\u7ba9\u9aa1\u9559\u87ba\u502e\u88f8\u7630\u8803\u6cfa\u6d1b\u7edc\u8366\u9a86\u73de\u843d\u645e\u6f2f\u96d2\u5988\u5b37\u9ebb\u87c6\u9a6c\u72b8\u739b\u7801\u8682\u6769\u9a82\u551b\u5417\u561b\u57cb\u973e\u4e70\u836c\u52a2\u8fc8\u9ea6\u5356\u8109\u989f\u86ee\u9992\u7792\u9794\u9cd7\u6ee1\u87a8\u66fc\u8c29\u5881\u5e54\u6162\u6f2b\u7f26\u8513\u71b3\u9558\u9099\u5fd9\u8292\u76f2\u832b\u786d\u83bd\u6f2d\u87d2\u732b\u6bdb\u77db\u7266\u8305\u65c4\u86d1\u951a\u9ae6\u8765\u87ca\u536f\u5cc1\u6cd6\u8306\u6634\u94c6\u8302\u5192\u8d38\u8004\u88a4\u5e3d\u7441\u7780\u8c8c\u61cb\u4e48\u6ca1\u679a\u73ab\u7709\u8393\u6885\u5a92\u5d4b\u6e44\u7338\u6963\u7164\u9176\u9545\u9e5b\u9709\u6bcf\u7f8e\u6d7c\u9541\u59b9\u6627\u8882\u5a9a\u5bd0\u9b45\u95e8\u626a\u9494\u95f7\u7116\u61d1\u4eec\u6c13\u867b\u840c\u76df\u750d\u77a2\u6726\u6aac\u791e\u8268\u52d0\u731b\u8499\u9530\u824b\u8722\u61f5\u8813\u5b5f\u68a6\u54aa\u5f25\u7962\u8ff7\u7315\u8c1c\u919a\u7cdc\u7e3b\u9e8b\u9761\u863c\u7c73\u8288\u5f2d\u6549\u8112\u772f\u7cf8\u6c68\u5b93\u6ccc\u89c5\u79d8\u5bc6\u5e42\u8c27\u5627\u871c\u7720\u7ef5\u68c9\u514d\u6c94\u9efe\u52c9\u7704\u5a29\u5195\u6e4e\u7f05\u817c\u9762\u55b5\u82d7\u63cf\u7784\u9e4b\u676a\u7707\u79d2\u6dfc\u6e3a\u7f08\u85d0\u9088\u5999\u5e99\u4e5c\u54a9\u706d\u8511\u7bfe\u881b\u6c11\u5cb7\u739f\u82e0\u73c9\u7f17\u76bf\u95f5\u62bf\u6cef\u95fd\u60af\u654f\u610d\u9cd8\u540d\u660e\u9e23\u8317\u51a5\u94ed\u6e9f\u669d\u7791\u879f\u9169\u547d\u8c2c\u7f2a\u6478\u8c1f\u5aeb\u998d\u6479\u6a21\u819c\u9ebd\u6469\u78e8\u8611\u9b54\u62b9\u672b\u6b81\u6cab\u8309\u964c\u79e3\u83ab\u5bde\u6f20\u84e6\u8c8a\u58a8\u763c\u9546\u9ed8\u8c98\u8031\u54de\u725f\u4f94\u7738\u8c0b\u936a\u67d0\u6bcd\u6bea\u4ea9\u7261\u59c6\u62c7\u6728\u4eeb\u76ee\u6c90\u5776\u7267\u82dc\u94bc\u52df\u5893\u5e55\u7766\u6155\u66ae\u7a46\u62ff\u954e\u54ea\u5185\u90a3\u7eb3\u80ad\u5a1c\u8872\u94a0\u637a\u4e43\u5976\u827f\u6c16\u5948\u67f0\u8010\u8418\u9f10\u56e1\u7537\u5357\u96be\u5583\u6960\u8d67\u8169\u877b\u56d4\u56ca\u9995\u66e9\u652e\u5b6c\u5476\u6320\u7847\u94d9\u7331\u86f2\u57b4\u607c\u8111\u7459\u95f9\u6dd6\u8bb7\u5450\u5462\u9981\u5ae9\u80fd\u55ef\u59ae\u5c3c\u576d\u6029\u6ce5\u502a\u94cc\u730a\u9713\u9cb5\u4f32\u4f60\u62df\u65ce\u6635\u9006\u533f\u6eba\u7768\u817b\u62c8\u5e74\u9c87\u9cb6\u9ecf\u637b\u8f87\u64b5\u78be\u5eff\u5ff5\u57dd\u5a18\u917f\u9e1f\u8311\u8885\u5b32\u5c3f\u8132\u634f\u9667\u6d85\u8042\u81ec\u556e\u55eb\u954a\u954d\u989e\u8e51\u5b7d\u8616\u60a8\u5b81\u549b\u62e7\u72de\u67e0\u804d\u51dd\u4f5e\u6cde\u752f\u599e\u725b\u5ff8\u626d\u72c3\u7ebd\u94ae\u519c\u4fac\u54dd\u6d53\u8113\u5f04\u8028\u5974\u5b65\u9a7d\u52aa\u5f29\u80ec\u6012\u5973\u9495\u6067\u8844\u759f\u8650\u6696\u632a\u50a9\u8bfa\u558f\u6426\u9518\u61e6\u7cef\u5662\u54e6\u8bb4\u6b27\u6bb4\u74ef\u9e25\u5455\u5076\u8026\u85d5\u6004\u6ca4\u8db4\u556a\u8469\u6777\u722c\u8019\u7436\u7b62\u5e15\u6015\u62cd\u4ff3\u5f98\u6392\u724c\u54cc\u6d3e\u6e43\u848e\u6f58\u6500\u723f\u76d8\u78d0\u8e52\u87e0\u5224\u6cee\u53db\u76fc\u7554\u88a2\u897b\u4e53\u6ec2\u5e9e\u9004\u65c1\u8783\u802a\u80d6\u629b\u812c\u5228\u5486\u5e96\u72cd\u70ae\u888d\u530f\u8dd1\u6ce1\u75b1\u5478\u80da\u9185\u966a\u57f9\u8d54\u952b\u88f4\u6c9b\u4f69\u5e14\u65c6\u914d\u8f94\u9708\u55b7\u76c6\u6e53\u6026\u62a8\u7830\u70f9\u562d\u670b\u580b\u5f6d\u68da\u787c\u84ec\u9e4f\u6f8e\u7bf7\u81a8\u87db\u6367\u78b0\u4e15\u6279\u7eb0\u90b3\u576f\u62ab\u7812\u94cd\u5288\u567c\u9739\u76ae\u8298\u6787\u6bd7\u75b2\u868d\u90eb\u9674\u5564\u57e4\u7435\u813e\u7f74\u8731\u8c94\u9f19\u5339\u5e80\u4ef3\u572e\u75de\u64d7\u7656\u5c41\u6de0\u5ab2\u7765\u50fb\u7513\u8b6c\u7247\u504f\u728f\u7bc7\u7fe9\u9a88\u80fc\u8e41\u8c1d\u9a97\u527d\u6f02\u7f25\u98d8\u87b5\u74e2\u6b8d\u779f\u7968\u560c\u5ad6\u6c15\u6487\u77a5\u82e4\u59d8\u62fc\u8d2b\u5ad4\u9891\u98a6\u54c1\u6980\u725d\u5a09\u8058\u4e52\u4fdc\u5e73\u8bc4\u51ed\u576a\u82f9\u5c4f\u67b0\u74f6\u840d\u9c86\u948b\u5761\u6cfc\u9887\u5a46\u9131\u76a4\u53f5\u94b7\u7b38\u8feb\u73c0\u7834\u7c95\u9b44\u5256\u638a\u88d2\u4ec6\u6534\u6251\u94fa\u5657\u530d\u8386\u83e9\u8461\u84b2\u749e\u6fee\u9564\u6734\u5703\u57d4\u6d66\u666e\u6ea5\u8c31\u6c06\u9568\u8e7c\u7011\u66dd\u4e03\u6c8f\u59bb\u67d2\u51c4\u6816\u6864\u621a\u840b\u671f\u6b3a\u5601\u69ed\u6f06\u8e4a\u4e93\u7941\u9f50\u573b\u5c90\u82aa\u5176\u5947\u6b67\u7948\u8006\u8110\u9880\u5d0e\u6dc7\u7566\u8401\u9a90\u9a91\u68cb\u7426\u742a\u797a\u86f4\u65d7\u7da6\u871e\u8572\u9ccd\u9e92\u4e5e\u4f01\u5c7a\u5c82\u8291\u542f\u675e\u8d77\u7eee\u7dae\u6c14\u8bab\u6c54\u8fc4\u5f03\u6c7d\u6ce3\u5951\u780c\u8360\u847a\u789b\u5668\u61a9\u6390\u845c\u6070\u6d3d\u9ac2\u5343\u4edf\u9621\u6266\u828a\u8fc1\u4f65\u5c8d\u948e\u7275\u60ad\u94c5\u8c26\u6106\u7b7e\u9a9e\u6434\u8930\u524d\u8368\u94a4\u8654\u94b1\u94b3\u4e7e\u63ae\u7b9d\u6f5c\u9ed4\u6d45\u80b7\u614a\u9063\u8c34\u7f31\u6b20\u82a1\u831c\u5029\u5811\u5d4c\u6920\u6b49\u545b\u7f8c\u6215\u6217\u67aa\u8dc4\u8154\u8723\u9516\u9535\u956a\u5f3a\u5899\u5af1\u8537\u6a2f\u62a2\u7f9f\u8941\u709d\u6084\u7857\u8df7\u5281\u6572\u9539\u6a47\u7f32\u4e54\u4fa8\u835e\u6865\u8c2f\u6194\u9792\u6a35\u77a7\u5de7\u6100\u4fcf\u8bee\u5ced\u7a8d\u7fd8\u64ac\u9798\u5207\u8304\u4e14\u59be\u602f\u7a83\u6308\u60ec\u7ba7\u9532\u4eb2\u4fb5\u94a6\u887e\u82a9\u82b9\u79e6\u7434\u79bd\u52e4\u55ea\u6eb1\u5659\u64d2\u6a8e\u8793\u9513\u5bdd\u5423\u6c81\u63ff\u9752\u6c22\u8f7b\u503e\u537f\u570a\u6e05\u873b\u9cad\u60c5\u6674\u6c30\u64ce\u6aa0\u9ee5\u82d8\u9877\u8bf7\u8b26\u5e86\u7b90\u78ec\u7f44\u8deb\u928e\u909b\u7a77\u7a79\u8315\u7b47\u743c\u86e9\u4e18\u90b1\u79cb\u86af\u6978\u9cc5\u56da\u72b0\u6c42\u866c\u6cc5\u4fc5\u914b\u9011\u7403\u8d47\u5def\u9052\u88d8\u8764\u9f3d\u7cd7\u533a\u66f2\u5c96\u8bce\u9a71\u5c48\u795b\u86c6\u8eaf\u86d0\u8d8b\u9eb4\u9ee2\u52ac\u6710\u9e32\u6e20\u8556\u78f2\u74a9\u8627\u6c0d\u766f\u8862\u883c\u53d6\u5a36\u9f8b\u53bb\u9612\u89d1\u8da3\u609b\u5708\u5168\u6743\u8be0\u6cc9\u8343\u62f3\u8f81\u75ca\u94e8\u7b4c\u8737\u919b\u9b08\u98a7\u72ac\u754e\u7efb\u529d\u5238\u7094\u7f3a\u7638\u5374\u60ab\u96c0\u786e\u9615\u9619\u9e4a\u69b7\u9021\u88d9\u7fa4\u86ba\u7136\u9aef\u71c3\u5189\u82d2\u67d3\u79b3\u74e4\u7a70\u56b7\u58e4\u6518\u8ba9\u835b\u9976\u6861\u6270\u5a06\u7ed5\u60f9\u70ed\u4eba\u4ec1\u58ec\u5fcd\u834f\u7a14\u5203\u8ba4\u4ede\u4efb\u7eab\u598a\u8f6b\u97e7\u996a\u887d\u6041\u845a\u6254\u4ecd\u65e5\u620e\u809c\u72e8\u7ed2\u8338\u8363\u5bb9\u5d58\u6eb6\u84c9\u6995\u7194\u877e\u878d\u5197\u67d4\u63c9\u7cc5\u8e42\u97a3\u8089\u5982\u8339\u94f7\u5112\u5685\u5b7a\u6fe1\u85b7\u8966\u8815\u98a5\u6c5d\u4e73\u8fb1\u5165\u6d33\u6ebd\u7f1b\u84d0\u8925\u962e\u670a\u8f6f\u8564\u854a\u82ae\u6798\u868b\u9510\u745e\u777f\u95f0\u6da6\u82e5\u504c\u5f31\u7bac\u4ee8\u6492\u6d12\u5345\u98d2\u810e\u8428\u585e\u816e\u567b\u9cc3\u8d5b\u4e09\u53c1\u6bf5\u4f1e\u6563\u7cc1\u9993\u6851\u55d3\u6421\u78c9\u98a1\u4e27\u6414\u9a9a\u7f2b\u81ca\u9ccb\u626b\u5ac2\u57fd\u7619\u8272\u6da9\u556c\u94ef\u745f\u7a51\u68ee\u50e7\u6740\u6c99\u7eb1\u5239\u7802\u838e\u94e9\u75e7\u88df\u9ca8\u50bb\u553c\u5565\u6b43\u715e\u970e\u7b5b\u6652\u5c71\u5220\u6749\u829f\u59d7\u886b\u9490\u57cf\u73ca\u8222\u8dda\u717d\u6f78\u81bb\u95ea\u9655\u8baa\u6c55\u759d\u82eb\u5261\u6247\u5584\u9a9f\u912f\u7f2e\u5b17\u64c5\u81b3\u8d61\u87ee\u9cdd\u4f24\u6b87\u5546\u89de\u5892\u71b5\u88f3\u57a7\u664c\u8d4f\u4e0a\u5c1a\u7ef1\u634e\u68a2\u70e7\u7a0d\u7b72\u8244\u86f8\u52fa\u828d\u82d5\u97f6\u5c11\u52ad\u90b5\u7ecd\u54e8\u6f72\u5962\u731e\u8d4a\u7572\u820c\u4f58\u86c7\u820d\u538d\u8bbe\u793e\u5c04\u6d89\u8d66\u6151\u6444\u6ee0\u9e9d\u7533\u4f38\u8eab\u547b\u7ec5\u8bdc\u5a20\u7837\u6df1\u795e\u6c88\u5ba1\u54c2\u77e7\u8c02\u5a76\u6e16\u80be\u751a\u80c2\u6e17\u614e\u6939\u8703\u5347\u751f\u58f0\u7272\u80dc\u7b19\u7525\u6e11\u7ef3\u7701\u771a\u5723\u665f\u76db\u5269\u5d4a\u5c38\u5931\u5e08\u8671\u8bd7\u65bd\u72ee\u6e7f\u84cd\u917e\u9cba\u5341\u4ec0\u77f3\u65f6\u8bc6\u5b9e\u62fe\u70bb\u8680\u98df\u57d8\u83b3\u9ca5\u53f2\u77e2\u8c55\u4f7f\u59cb\u9a76\u5c4e\u58eb\u6c0f\u4e16\u4ed5\u5e02\u793a\u5f0f\u4e8b\u4f8d\u52bf\u89c6\u8bd5\u9970\u5ba4\u6043\u62ed\u662f\u67ff\u8d33\u9002\u8210\u8f7c\u901d\u94c8\u5f11\u8c25\u91ca\u55dc\u7b6e\u8a93\u566c\u87ab\u6536\u624b\u5b88\u9996\u824f\u5bff\u53d7\u72e9\u517d\u552e\u6388\u7ef6\u7626\u4e66\u6bb3\u6292\u7ebe\u53d4\u67a2\u59dd\u500f\u6b8a\u68b3\u6dd1\u83fd\u758f\u8212\u6445\u6bf9\u8f93\u852c\u79eb\u5b70\u8d4e\u587e\u719f\u6691\u9ecd\u7f72\u9f20\u8700\u85af\u66d9\u672f\u620d\u675f\u6cad\u8ff0\u6811\u7ad6\u6055\u5eb6\u6570\u8167\u5885\u6f31\u6f8d\u5237\u5530\u800d\u8870\u6454\u7529\u5e05\u87c0\u95e9\u62f4\u6813\u6dae\u53cc\u971c\u5b40\u723d\u8c01\u6c34\u7a0e\u7761\u542e\u987a\u821c\u77ac\u8bf4\u5981\u70c1\u6714\u94c4\u7855\u55cd\u6420\u84b4\u55fd\u69ca\u53b6\u4e1d\u53f8\u79c1\u549d\u601d\u9e36\u65af\u7f0c\u86f3\u53ae\u9536\u5636\u6495\u6f8c\u6b7b\u5df3\u56db\u5bfa\u6c5c\u4f3a\u4f3c\u5155\u59d2\u7940\u6cd7\u9972\u9a77\u4fdf\u7b25\u801c\u55e3\u8086\u5fea\u677e\u51c7\u5d27\u6dde\u83d8\u5d69\u6002\u609a\u8038\u7ae6\u8bbc\u5b8b\u8bf5\u9001\u9882\u55d6\u641c\u6eb2\u998a\u98d5\u953c\u8258\u878b\u53df\u55fe\u778d\u64de\u85ae\u82cf\u9165\u7a23\u4fd7\u5919\u8bc9\u8083\u6d91\u7d20\u901f\u5bbf\u7c9f\u8c21\u55c9\u5851\u612b\u6eaf\u50f3\u850c\u89eb\u7c0c\u72fb\u9178\u849c\u7b97\u867d\u837d\u772d\u7762\u6fc9\u7ee5\u968b\u968f\u9ad3\u5c81\u795f\u8c07\u9042\u788e\u96a7\u71e7\u7a57\u9083\u5b59\u72f2\u836a\u98e7\u635f\u7b0b\u96bc\u69ab\u5506\u5a11\u6332\u686b\u68ad\u7743\u55e6\u7fa7\u84d1\u7f29\u6240\u5522\u7d22\u7410\u9501\u4ed6\u5b83\u8dbf\u94ca\u584c\u6ebb\u5854\u736d\u9cce\u631e\u95fc\u9062\u69bb\u8e0f\u8e4b\u9a80\u80ce\u53f0\u90b0\u62ac\u82d4\u70b1\u8dc6\u9c90\u85b9\u592a\u6c70\u6001\u80bd\u949b\u6cf0\u915e\u574d\u8d2a\u644a\u6ee9\u762b\u575b\u6619\u8c08\u90ef\u8983\u75f0\u952c\u8c2d\u6f6d\u6a80\u5fd0\u5766\u8892\u94bd\u6bef\u53f9\u70ad\u63a2\u8d55\u78b3\u6c64\u94f4\u7fb0\u9557\u9967\u5510\u5802\u68e0\u5858\u642a\u6e8f\u746d\u6a18\u819b\u7cd6\u8797\u87b3\u91a3\u5e11\u5018\u6dcc\u50a5\u8025\u8eba\u70eb\u8d9f\u6d9b\u7ee6\u638f\u6ed4\u97ec\u9955\u6d2e\u9003\u6843\u9676\u5555\u6dd8\u8404\u9f17\u8ba8\u5957\u5fd1\u5fd2\u7279\u94fd\u615d\u75bc\u817e\u8a8a\u6ed5\u85e4\u5254\u68af\u9511\u8e22\u7ee8\u557c\u63d0\u7f07\u9e48\u9898\u8e44\u918d\u4f53\u5c49\u5243\u501c\u608c\u6d95\u9016\u60d5\u66ff\u88fc\u568f\u5929\u6dfb\u7530\u606c\u754b\u751c\u586b\u9617\u5fdd\u6b84\u8146\u8214\u63ad\u4f7b\u6311\u7967\u6761\u8fe2\u7b24\u9f86\u8729\u9aeb\u9ca6\u7a95\u773a\u7c9c\u94eb\u8df3\u8d34\u841c\u94c1\u5e16\u992e\u5385\u6c40\u542c\u753a\u70c3\u5ef7\u4ead\u5ead\u839b\u505c\u5a77\u8476\u8713\u9706\u633a\u6883\u94e4\u8247\u901a\u55f5\u4edd\u540c\u4f5f\u5f64\u833c\u6850\u783c\u94dc\u7ae5\u916e\u50ee\u6f7c\u77b3\u7edf\u6345\u6876\u7b52\u6078\u75db\u5077\u5934\u6295\u9ab0\u900f\u51f8\u79c3\u7a81\u56fe\u5f92\u6d82\u837c\u9014\u5c60\u9174\u571f\u5410\u948d\u5154\u580d\u83df\u6e4d\u56e2\u629f\u7583\u5f56\u63a8\u9893\u817f\u9000\u717a\u8715\u892a\u541e\u66be\u5c6f\u9968\u8c5a\u81c0\u6c3d\u4e47\u6258\u62d6\u8131\u9a6e\u4f57\u9640\u5768\u6cb1\u9a7c\u67c1\u7823\u9e35\u8dce\u9161\u6a50\u9f0d\u59a5\u5eb9\u692d\u62d3\u67dd\u553e\u7ba8\u54c7\u5a03\u6316\u6d3c\u5a32\u86d9\u74e6\u4f64\u889c\u817d\u6b6a\u5d34\u5916\u5f2f\u525c\u6e7e\u873f\u8c4c\u4e38\u7ea8\u8284\u5b8c\u73a9\u987d\u70f7\u5b9b\u633d\u665a\u5a49\u60cb\u7efe\u8118\u83c0\u742c\u7696\u7579\u7897\u4e07\u8155\u6c6a\u4ea1\u738b\u7f51\u5f80\u6789\u7f54\u60d8\u8f8b\u9b4d\u5984\u5fd8\u65fa\u671b\u5371\u5a01\u504e\u9036\u9688\u8473\u5fae\u7168\u8587\u5dcd\u4e3a\u97e6\u5729\u56f4\u5e0f\u6ca9\u8fdd\u95f1\u6845\u6da0\u552f\u5e37\u60df\u7ef4\u5d6c\u6f4d\u4f1f\u4f2a\u5c3e\u7eac\u82c7\u59d4\u709c\u73ae\u6d27\u5a13\u8bff\u840e\u9697\u7325\u75ff\u8249\u97ea\u9c94\u536b\u672a\u4f4d\u5473\u754f\u80c3\u8ece\u5c09\u8c13\u5582\u6e2d\u732c\u851a\u6170\u9b4f\u6e29\u761f\u6587\u7eb9\u95fb\u868a\u960c\u96ef\u520e\u543b\u7d0a\u7a33\u95ee\u6c76\u74ba\u7fc1\u55e1\u84ca\u74ee\u8579\u631d\u502d\u6da1\u83b4\u5594\u7a9d\u8717\u6211\u6c83\u809f\u5367\u5e44\u63e1\u6e25\u786a\u65a1\u9f8c\u4e4c\u572c\u6c61\u90ac\u545c\u5deb\u5c4b\u8bec\u94a8\u65e0\u6bcb\u5434\u543e\u829c\u5514\u68a7\u6d6f\u8708\u9f2f\u4e94\u5348\u4ef5\u4f0d\u575e\u59a9\u5e91\u5fe4\u6003\u8fd5\u6b66\u4fae\u6342\u727e\u9e49\u821e\u5140\u52ff\u52a1\u620a\u9622\u674c\u82b4\u7269\u8bef\u609f\u6664\u7110\u5a7a\u75e6\u9a9b\u96fe\u5be4\u9e5c\u92c8\u5915\u516e\u6c50\u897f\u5438\u5e0c\u6614\u6790\u77fd\u7a78\u8bf6\u90d7\u550f\u595a\u606f\u6d60\u727a\u6089\u60dc\u6b37\u6dc5\u70ef\u7852\u83e5\u6670\u7280\u7a00\u7c9e\u7fd5\u823e\u6eaa\u7699\u9521\u50d6\u7184\u7199\u8725\u563b\u5b09\u819d\u6a28\u6b59\u71b9\u7fb2\u8785\u87cb\u91af\u66e6\u9f37\u4e60\u5e2d\u88ad\u89cb\u5ab3\u96b0\u6a84\u6d17\u73ba\u5f99\u94e3\u559c\u8478\u5c63\u84f0\u79a7\u620f\u7cfb\u9969\u7ec6\u90c4\u960b\u8204\u9699\u798a\u5477\u867e\u778e\u5323\u4fa0\u72ce\u5ce1\u67d9\u72ed\u7856\u9050\u6687\u7455\u8f96\u971e\u9ee0\u4e0b\u5413\u590f\u53a6\u7f45\u4ed9\u5148\u7ea4\u6c19\u7946\u7c7c\u83b6\u6380\u8df9\u9170\u9528\u9c9c\u66b9\u95f2\u5f26\u8d24\u54b8\u6d8e\u5a34\u8237\u8854\u75eb\u9e47\u5acc\u51bc\u663e\u9669\u7303\u86ac\u7b45\u8de3\u85d3\u71f9\u53bf\u5c98\u82cb\u73b0\u7ebf\u9650\u5baa\u9677\u9985\u7fa1\u732e\u817a\u9730\u4e61\u8297\u76f8\u9999\u53a2\u6e58\u7f03\u8459\u7bb1\u8944\u9aa7\u9576\u8be6\u5ea0\u7965\u7fd4\u4eab\u54cd\u9977\u98e8\u60f3\u9c9e\u5411\u5df7\u9879\u8c61\u50cf\u6a61\u87d3\u67ad\u524a\u54d3\u67b5\u9a81\u5bb5\u6d88\u7ee1\u900d\u8427\u785d\u9500\u6f47\u7bab\u9704\u9b48\u56a3\u5d24\u6dc6\u5c0f\u6653\u7b71\u5b5d\u8096\u54ee\u6548\u6821\u7b11\u5578\u4e9b\u6954\u6b47\u874e\u534f\u90aa\u80c1\u631f\u5055\u659c\u8c10\u643a\u52f0\u64b7\u7f2c\u978b\u5199\u6cc4\u6cfb\u7ec1\u5378\u5c51\u68b0\u4eb5\u6e2b\u8c22\u698d\u69ad\u5ee8\u61c8\u736c\u85a4\u9082\u71ee\u7023\u87f9\u8e9e\u5fc3\u5ffb\u82af\u8f9b\u6615\u6b23\u8398\u950c\u65b0\u6b46\u85aa\u99a8\u946b\u56df\u4fe1\u8845\u5174\u661f\u60fa\u7329\u8165\u5211\u884c\u90a2\u5f62\u9649\u578b\u784e\u9192\u64e4\u674f\u59d3\u5e78\u6027\u8347\u60bb\u51f6\u5144\u5308\u828e\u6c79\u80f8\u96c4\u718a\u4f11\u4fee\u54bb\u5ea5\u7f9e\u9e3a\u8c85\u9990\u9af9\u673d\u79c0\u5cab\u7ee3\u8896\u9508\u6eb4\u620c\u76f1\u7809\u80e5\u987b\u987c\u865a\u5618\u9700\u589f\u5f90\u8bb8\u8be9\u6829\u7cc8\u9191\u65ed\u5e8f\u53d9\u6064\u6d2b\u755c\u52d6\u7eea\u7eed\u9157\u5a7f\u6e86\u7d6e\u55c5\u7166\u84c4\u84ff\u8f69\u5ba3\u8c16\u55a7\u63ce\u8431\u6684\u714a\u5107\u7384\u75c3\u60ac\u65cb\u6f29\u7487\u9009\u7663\u6ceb\u70ab\u7eda\u7729\u94c9\u6e32\u6966\u78b9\u955f\u9774\u859b\u7a74\u5b66\u6cf6\u8e05\u96ea\u9cd5\u8840\u8c11\u52cb\u57d9\u718f\u7aa8\u736f\u85b0\u66db\u91ba\u5bfb\u5de1\u65ec\u9a6f\u8be2\u5ccb\u6042\u6d35\u6d54\u8340\u5faa\u9c9f\u8bad\u8baf\u6c5b\u8fc5\u5f87\u900a\u6b89\u5dfd\u8548\u4e2b\u538b\u5440\u62bc\u9e26\u6860\u9e2d\u7259\u4f22\u5c88\u82bd\u740a\u869c\u5d16\u6daf\u775a\u8859\u758b\u54d1\u75d6\u96c5\u4e9a\u8bb6\u8fd3\u57ad\u5a05\u7811\u6c29\u63e0\u54bd\u6079\u70df\u80ed\u5d26\u6df9\u7109\u83f8\u9609\u6e6e\u814c\u9122\u5ae3\u852b\u5ef6\u95eb\u4e25\u598d\u82ab\u8a00\u5ca9\u6cbf\u708e\u7814\u76d0\u960e\u7b75\u8712\u989c\u6a90\u5156\u5944\u4fe8\u884d\u5043\u53a3\u63a9\u773c\u90fe\u7430\u7f68\u6f14\u9b47\u9f39\u538c\u5f66\u781a\u5501\u5bb4\u664f\u8273\u9a8c\u8c1a\u5830\u7130\u7131\u96c1\u6edf\u917d\u8c33\u990d\u71d5\u8d5d\u592e\u6cf1\u6b83\u79e7\u9e2f\u9785\u626c\u7f8a\u9633\u6768\u7080\u4f6f\u75a1\u5f89\u6d0b\u70ca\u86d8\u4ef0\u517b\u6c27\u75d2\u600f\u6059\u6837\u6f3e\u5e7a\u592d\u5406\u5996\u8170\u9080\u723b\u5c27\u80b4\u59da\u8f7a\u73e7\u7a91\u8c23\u5fad\u6447\u9065\u7476\u7e47\u9cd0\u6773\u54ac\u7a88\u8200\u5d3e\u836f\u8981\u9e5e\u66dc\u8000\u6930\u564e\u7237\u8036\u63f6\u94d8\u4e5f\u51b6\u91ce\u4e1a\u53f6\u66f3\u9875\u90ba\u591c\u6654\u70e8\u6396\u6db2\u8c12\u814b\u9765\u4e00\u4f0a\u8863\u533b\u4f9d\u54bf\u7317\u94f1\u58f9\u63d6\u6b39\u6f2a\u566b\u9edf\u4eea\u572f\u5937\u6c82\u8bd2\u5b9c\u6021\u8fe4\u9974\u54a6\u59e8\u8351\u8d3b\u7719\u80f0\u914f\u75cd\u79fb\u9057\u9890\u7591\u5db7\u5f5d\u4e59\u5df2\u4ee5\u9487\u77e3\u82e1\u8223\u8681\u501a\u6905\u65d6\u4e49\u4ebf\u5f0b\u5208\u5fc6\u827a\u4ee1\u8bae\u4ea6\u5c79\u5f02\u4f5a\u5453\u5f79\u6291\u8bd1\u9091\u4f7e\u5cc4\u603f\u6613\u7ece\u8be3\u9a7f\u5955\u5f08\u75ab\u7fbf\u8f76\u6092\u6339\u76ca\u8c0a\u57f8\u7fca\u7fcc\u9038\u610f\u6ea2\u7f22\u8084\u88d4\u7617\u8734\u6bc5\u71a0\u9552\u5293\u6baa\u858f\u7ff3\u7ffc\u81c6\u7654\u9571\u61ff\u56e0\u9634\u59fb\u6d07\u8335\u836b\u97f3\u6bb7\u6c24\u94df\u5591\u5819\u541f\u57a0\u72fa\u5bc5\u6deb\u94f6\u911e\u5924\u9f88\u972a\u5c39\u5f15\u5432\u996e\u8693\u9690\u763e\u5370\u831a\u80e4\u5e94\u82f1\u83ba\u5a74\u745b\u5624\u6484\u7f28\u7f42\u6a31\u748e\u9e66\u81ba\u9e70\u8fce\u8314\u76c8\u8365\u8367\u83b9\u8424\u8425\u8426\u6979\u6ee2\u84e5\u6f46\u8747\u5b34\u8d62\u701b\u90e2\u988d\u9896\u5f71\u763f\u6620\u786c\u5ab5\u54df\u5537\u4f63\u62e5\u75c8\u9095\u5eb8\u96cd\u5889\u6175\u58c5\u955b\u81c3\u9cd9\u9954\u5581\u6c38\u752c\u548f\u6cf3\u4fd1\u52c7\u6d8c\u607f\u86f9\u8e0a\u7528\u4f18\u5fe7\u6538\u5466\u5e7d\u60a0\u5c24\u7531\u72b9\u90ae\u6cb9\u67da\u75a3\u839c\u83b8\u94c0\u86b0\u6e38\u9c7f\u7337\u8763\u53cb\u6709\u5363\u9149\u83a0\u94d5\u7256\u9edd\u53c8\u53f3\u5e7c\u4f51\u4f91\u56ff\u5ba5\u8bf1\u86b4\u91c9\u9f2c\u7ea1\u8fc2\u6de4\u6e1d\u7600\u4e8e\u4e88\u4f59\u59a4\u6b24\u65bc\u76c2\u81fe\u9c7c\u4fde\u79ba\u7afd\u8201\u5a31\u72f3\u8c00\u9980\u6e14\u8438\u9685\u96e9\u5d5b\u6109\u63c4\u8174\u903e\u611a\u6986\u745c\u865e\u89ce\u7aac\u8206\u8753\u4e0e\u4f1b\u5b87\u5c7f\u7fbd\u96e8\u4fe3\u79b9\u8bed\u5704\u5709\u5ebe\u7610\u7ab3\u9f89\u7389\u9a6d\u5401\u807f\u828b\u59aa\u996b\u80b2\u90c1\u6631\u72f1\u5cea\u6d74\u94b0\u9884\u57df\u6b32\u8c15\u9608\u55bb\u5bd3\u5fa1\u88d5\u9047\u9e46\u6108\u715c\u84e3\u8a89\u6bd3\u872e\u8c6b\u71e0\u9e6c\u9b3b\u9e22\u51a4\u7722\u9e33\u6e0a\u7ba2\u5143\u5458\u56ed\u6c85\u57a3\u7230\u539f\u5706\u8881\u63f4\u7f18\u9f0b\u586c\u6e90\u733f\u8f95\u571c\u6a7c\u8788\u8fdc\u82d1\u6028\u9662\u57b8\u5a9b\u63be\u7457\u613f\u66f0\u7ea6\u6708\u5216\u5cb3\u94a5\u60a6\u94ba\u9605\u8dc3\u7ca4\u8d8a\u6a3e\u9fa0\u7039\u4e91\u5300\u7ead\u82b8\u6600\u90e7\u8018\u6c32\u5141\u72c1\u9668\u6b92\u5b55\u8fd0\u90d3\u607d\u6655\u915d\u6120\u97eb\u97f5\u71a8\u8574\u531d\u5482\u62f6\u6742\u7838\u707e\u753e\u54c9\u683d\u5bb0\u8f7d\u5d3d\u518d\u5728\u7ccc\u7c2a\u54b1\u661d\u6512\u8db1\u6682\u8d5e\u933e\u74d2\u8d43\u81e7\u9a75\u5958\u810f\u846c\u906d\u7cdf\u51ff\u65e9\u67a3\u86a4\u6fa1\u85fb\u7076\u7682\u5523\u9020\u566a\u71e5\u8e81\u5219\u62e9\u6cfd\u8d23\u8fee\u5567\u5e3b\u7b2e\u8234\u7ba6\u8d5c\u4ec4\u6603\u8d3c\u600e\u8c2e\u66fe\u589e\u618e\u7f2f\u7f7e\u9503\u7511\u8d60\u5412\u548b\u54f3\u55b3\u63f8\u6e23\u6942\u9f44\u624e\u672d\u8f67\u95f8\u94e1\u7728\u781f\u4e4d\u8bc8\u54a4\u6805\u70b8\u75c4\u86b1\u69a8\u81aa\u658b\u6458\u5b85\u7fdf\u7a84\u503a\u7826\u5be8\u7635\u6cbe\u6be1\u65c3\u7c98\u8a79\u8c35\u6fb6\u77bb\u65a9\u5c55\u76cf\u5d2d\u640c\u8f97\u5360\u6218\u6808\u7ad9\u7efd\u6e5b\u9aa3\u8638\u5f20\u7ae0\u9123\u5adc\u5f70\u6f33\u7350\u6a1f\u748b\u87d1\u4ec9\u6da8\u638c\u4e08\u4ed7\u5e10\u6756\u80c0\u8d26\u969c\u5d82\u5e5b\u7634\u948a\u62db\u662d\u5541\u627e\u6cbc\u53ec\u5146\u8bcf\u8d75\u7b0a\u68f9\u7167\u7f69\u8087\u8707\u906e\u6298\u54f2\u8f84\u86f0\u8c2a\u647a\u78d4\u8f99\u8005\u9517\u8d6d\u8936\u8fd9\u67d8\u6d59\u8517\u9e67\u8d1e\u9488\u4fa6\u6d48\u73cd\u6862\u771f\u7827\u796f\u659f\u7504\u84c1\u699b\u7bb4\u81fb\u8bca\u6795\u80d7\u8f78\u755b\u75b9\u7f1c\u7a39\u5733\u9635\u9e29\u632f\u6715\u8d48\u9547\u9707\u4e89\u5f81\u6014\u5ce5\u6323\u72f0\u94b2\u7741\u94ee\u7b5d\u84b8\u5fb5\u62ef\u6574\u6b63\u8bc1\u8be4\u90d1\u5e27\u653f\u75c7\u4e4b\u652f\u536e\u6c41\u829d\u5431\u679d\u77e5\u7ec7\u80a2\u6800\u7957\u80dd\u8102\u8718\u6267\u4f84\u76f4\u503c\u57f4\u804c\u690d\u6b96\u7d77\u8dd6\u646d\u8e2f\u6b62\u53ea\u65e8\u5740\u7eb8\u82b7\u7949\u54ab\u6307\u67b3\u8f75\u8dbe\u9ef9\u916f\u81f3\u5fd7\u5fee\u8c78\u5236\u5e19\u5e1c\u6cbb\u7099\u8d28\u90c5\u5cd9\u6809\u965f\u631a\u684e\u79e9\u81f4\u8d3d\u8f7e\u63b7\u75d4\u7a92\u9e37\u5f58\u667a\u6ede\u75e3\u86ed\u9a98\u7a1a\u7f6e\u96c9\u81a3\u89ef\u8e2c\u4e2d\u5fe0\u7ec8\u76c5\u949f\u822f\u8877\u953a\u87bd\u80bf\u79cd\u51a2\u8e35\u4ef2\u4f17\u91cd\u5dde\u821f\u8bcc\u5468\u6d32\u7ca5\u59af\u8f74\u78a1\u8098\u5e1a\u7ea3\u5492\u5b99\u7ec9\u663c\u80c4\u836e\u76b1\u914e\u9aa4\u7c40\u6731\u4f8f\u8bdb\u90be\u6d19\u8331\u682a\u73e0\u8bf8\u732a\u94e2\u86db\u69e0\u6f74\u6a65\u7af9\u7afa\u70db\u9010\u8233\u7603\u8e85\u4e3b\u62c4\u6e1a\u5c5e\u716e\u5631\u9e88\u77a9\u4f2b\u4f4f\u52a9\u82ce\u677c\u6ce8\u8d2e\u9a7b\u67f1\u70b7\u795d\u75b0\u8457\u86c0\u7b51\u94f8\u7bb8\u7fe5\u6293\u722a\u62fd\u4e13\u7816\u989b\u8f6c\u556d\u8d5a\u64b0\u7bc6\u9994\u5986\u5e84\u6869\u88c5\u58ee\u72b6\u5e62\u649e\u96b9\u8ffd\u9a93\u690e\u9525\u5760\u7f00\u60f4\u7f12\u8d58\u80ab\u7a80\u8c06\u51c6\u5353\u62d9\u502c\u6349\u684c\u6dbf\u707c\u8301\u65ab\u6d4a\u6d5e\u8bfc\u914c\u5544\u7740\u7422\u799a\u64e2\u6fef\u956f\u4ed4\u5b5c\u5179\u54a8\u59ff\u8d40\u8d44\u6dc4\u7f01\u8c18\u5b73\u5d6b\u6ecb\u7ca2\u8f8e\u89dc\u8d91\u9531\u9f87\u9aed\u9cbb\u7c7d\u5b50\u59ca\u79ed\u8014\u7b2b\u6893\u7d2b\u6ed3\u8a3e\u5b57\u81ea\u6063\u6e0d\u7726\u5b97\u7efc\u68d5\u8159\u8e2a\u9b03\u603b\u506c\u7eb5\u7cbd\u90b9\u9a7a\u8bf9\u966c\u9139\u9cb0\u8d70\u594f\u63cd\u79df\u83f9\u8db3\u5352\u65cf\u955e\u8bc5\u963b\u7ec4\u4fce\u7956\u8e9c\u7f35\u7e82\u94bb\u6525\u5634\u6700\u7f6a\u855e\u9189\u5c0a\u9075\u6a3d\u9cdf\u6499\u6628\u5de6\u4f50\u4f5c\u5750\u963c\u600d\u67de\u795a\u80d9\u5511\u5ea7\u505a";
var qswhSpell = ["a", 0, "sha", 4, "ai", 5, "yi", 22, "ai", 23, "an", 27,
		"ang", 45, "ao", 48, "niu", 61, "ao", 62, "ba", 71, "pa", 74, "ba", 75,
		"bai", 96, "bei", 103, "bai", 104, "ban", 107, "bang", 128, "pang",
		134, "bang", 135, "bao", 142, "bei", 164, "ben", 188, "beng", 196,
		"bi", 204, "pi", 242, "bi", 243, "bian", 257, "pan", 276, "bian", 277,
		"biao", 284, "bian", 288, "biao", 289, "bie", 300, "bin", 305, "bing",
		320, "bo", 332, "bei", 343, "bo", 344, "po", 346, "bo", 347, "bu", 365,
		"ca", 383, "cai", 386, "shen", 397, "can", 398, "cang", 408, "zang",
		413, "cao", 414, "ce", 423, "cen", 429, "ceng", 431, "cha", 434, "zha",
		439, "cha", 440, "zha", 443, "cha", 444, "chai", 455, "cuo", 461,
		"chan", 462, "can", 463, "chan", 464, "can", 467, "chan", 468, "zhan",
		484, "chan", 485, "chang", 486, "chao", 512, "zhuo", 515, "chao", 516,
		"che", 525, "chen", 533, "chuang", 547, "chen", 548, "cheng", 554,
		"dang", 556, "cheng", 557, "chen", 575, "cheng", 576, "chi", 579,
		"shi", 596, "chi", 597, "chong", 617, "chou", 628, "chu", 645, "zhu",
		663, "chu", 664, "chuai", 673, "chuo", 675, "chuai", 676, "chuan", 678,
		"cong", 691, "chuang", 692, "chui", 697, "chun", 705, "chuo", 715,
		"ci", 720, "zi", 724, "ci", 725, "cong", 737, "zong", 740, "cong", 741,
		"cou", 748, "cu", 752, "cuan", 763, "cui", 770, "cun", 784, "cuo", 789,
		"da", 803, "ta", 811, "da", 812, "dai", 819, "tai", 820, "dai", 821,
		"dan", 839, "shan", 852, "dan", 853, "dang", 864, "dao", 875, "tao",
		887, "dao", 888, "de", 892, "deng", 896, "di", 909, "dia", 945, "dian",
		946, "diao", 971, "die", 983, "ding", 999, "diu", 1016, "dong", 1018,
		"dou", 1037, "tou", 1043, "dou", 1044, "du", 1050, "duan", 1073, "dui",
		1082, "dun", 1089, "tun", 1097, "dun", 1098, "duo", 1105, "e", 1124,
		"yan", 1145, "e", 1146, "en", 1155, "er", 1158, "fa", 1172, "fan",
		1182, "fang", 1206, "pang", 1219, "fang", 1220, "fei", 1223, "fen",
		1251, "feng", 1272, "fo", 1293, "fou", 1294, "pi", 1295, "fu", 1296,
		"m", 1342, "fu", 1343, "pu", 1350, "fu", 1351, "ga", 1379, "gai", 1387,
		"gan", 1398, "gang", 1422, "gao", 1434, "hao", 1447, "gao", 1448, "ge",
		1453, "he", 1455, "ge", 1456, "ha", 1469, "ge", 1470, "gei", 1484,
		"gen", 1485, "geng", 1491, "gong", 1502, "gou", 1521, "gu", 1542, "hu",
		1568, "gu", 1569, "jia", 1570, "gu", 1571, "gua", 1583, "guai", 1594,
		"guan", 1597, "guang", 1615, "gui", 1622, "gun", 1649, "guo", 1656,
		"ha", 1674, "hai", 1676, "han", 1686, "ben", 1715, "hang", 1716, "hao",
		1721, "he", 1740, "ke", 1758, "ge", 1759, "he", 1760, "hei", 1768,
		"hen", 1770, "heng", 1774, "hang", 1778, "heng", 1779, "hong", 1782,
		"hou", 1799, "hu", 1814, "hua", 1856, "huai", 1868, "huan", 1874,
		"hai", 1876, "huan", 1877, "xun", 1878, "huan", 1879, "huang", 1902,
		"hui", 1927, "hun", 1934, "hui", 1935, "gui", 1954, "hui", 1955, "hun",
		1967, "huo", 1977, "ji", 1997, "qi", 2040, "ji", 2041, "jie", 2082,
		"ji", 2083, "jia", 2097, "qia", 2108, "jia", 2109, "jian", 2132,
		"qian", 2145, "jian", 2146, "kan", 2198, "jian", 2199, "jiang", 2201,
		"xiang", 2217, "jiang", 2218, "jiao", 2223, "jue", 2241, "jiao", 2242,
		"qiu", 2253, "jiao", 2254, "jie", 2267, "ta", 2295, "jie", 2296, "xie",
		2297, "jie", 2298, "jin", 2309, "jing", 2343, "liang", 2377, "jing",
		2378, "jiong", 2383, "jiu", 2387, "ju", 2413, "qie", 2422, "ju", 2423,
		"zui", 2432, "ju", 2433, "qu", 2463, "ju", 2464, "juan", 2465, "jue",
		2480, "jiao", 2504, "jue", 2505, "jun", 2508, "ka", 2523, "kai", 2529,
		"kan", 2542, "kang", 2554, "kao", 2564, "ke", 2572, "hai", 2590, "ke",
		2591, "ken", 2605, "keng", 2610, "kong", 2613, "kou", 2620, "ku", 2629,
		"kua", 2641, "kuai", 2647, "kuan", 2656, "kuang", 2659, "kui", 2675,
		"li", 2677, "kui", 2678, "kun", 2702, "kuo", 2713, "la", 2719, "lai",
		2731, "lan", 2743, "lang", 2765, "liang", 2768, "lang", 2769, "lao",
		2779, "liao", 2792, "lao", 2793, "le", 2797, "lei", 2801, "le", 2802,
		"lei", 2803, "leng", 2822, "li", 2827, "liang", 2903, "lian", 2904,
		"luan", 2924, "lian", 2925, "liang", 2931, "liao", 2946, "lie", 2966,
		"lin", 2979, "ling", 3004, "liu", 3031, "ge", 3052, "long", 3053,
		"lou", 3070, "lu", 3085, "lv", 3115, "lu", 3116, "lv", 3127, "shuai",
		3142, "lv", 3143, "luan", 3145, "lue", 3155, "lun", 3158, "lv", 3166,
		"luo", 3167, "lao", 3184, "luo", 3185, "ma", 3192, "mai", 3206, "man",
		3215, "mang", 3233, "mao", 3242, "mou", 3248, "mao", 3249, "me", 3269,
		"mei", 3270, "men", 3296, "mang", 3303, "meng", 3304, "mi", 3323,
		"mian", 3352, "miao", 3366, "mie", 3381, "min", 3387, "ming", 3402,
		"miu", 3414, "miao", 3415, "mo", 3416, "ma", 3428, "mo", 3429, "mou",
		3446, "mu", 3453, "na", 3474, "nei", 3477, "na", 3478, "nai", 3485,
		"nan", 3494, "nang", 3503, "nao", 3508, "ne", 3521, "na", 3522, "ne",
		3523, "nei", 3524, "nen", 3525, "neng", 3526, "n", 3527, "ni", 3528,
		"nian", 3548, "niang", 3560, "niao", 3562, "nie", 3568, "nin", 3581,
		"ning", 3582, "niu", 3592, "nong", 3599, "long", 3604, "nou", 3605,
		"nu", 3606, "nv", 3613, "nue", 3617, "nuan", 3619, "nuo", 3620, "o",
		3628, "e", 3629, "ou", 3630, "pa", 3641, "pai", 3651, "pan", 3660,
		"pang", 3674, "pan", 3681, "pao", 3682, "pei", 3694, "pen", 3709,
		"peng", 3712, "pi", 3730, "bi", 3742, "pi", 3743, "pian", 3771, "piao",
		3781, "pie", 3792, "pin", 3796, "ping", 3805, "pin", 3806, "ping",
		3807, "po", 3819, "bo", 3833, "pou", 3834, "pu", 3837, "po", 3838,
		"pu", 3839, "piao", 3850, "pu", 3851, "qi", 3862, "xi", 3867, "qi",
		3868, "qing", 3916, "qi", 3917, "ji", 3926, "qi", 3927, "qia", 3931,
		"qian", 3936, "xi", 3973, "qian", 3974, "qiang", 3979, "qiao", 3999,
		"qie", 4025, "qin", 4035, "qing", 4056, "qiong", 4079, "qiu", 4088,
		"qu", 4110, "qu", 4111, "quan", 4142, "que", 4163, "qun", 4174, "ran",
		4177, "rang", 4184, "rao", 4191, "re", 4197, "ren", 4199, "nen", 4215,
		"shen", 4216, "reng", 4217, "ri", 4219, "rong", 4220, "rou", 4235,
		"ru", 4241, "ruan", 4261, "rui", 4264, "run", 4272, "ruo", 4274, "sa",
		4278, "sai", 4285, "san", 4290, "sang", 4297, "sao", 4303, "se", 4312,
		"sen", 4318, "seng", 4319, "sha", 4320, "shai", 4336, "shan", 4338,
		"shang", 4370, "shao", 4383, "sao", 4384, "shao", 4385, "she", 4400,
		"shen", 4418, "zhen", 4440, "shen", 4441, "sheng", 4442, "sheng", 4451,
		"sheng", 4452, "shi", 4458, "shai", 4467, "shi", 4468, "shou", 4521,
		"shu", 4534, "shou", 4556, "shu", 4557, "shua", 4578, "shuai", 4581,
		"shuan", 4586, "shuang", 4590, "shei", 4594, "shui", 4595, "shun",
		4598, "shuo", 4602, "suo", 4608, "shuo", 4609, "sou", 4611, "shuo",
		4612, "si", 4613, "shi", 4634, "si", 4635, "qi", 4641, "si", 4642,
		"song", 4646, "sou", 4662, "su", 4675, "suan", 4696, "sui", 4700,
		"sun", 4718, "suo", 4726, "ta", 4741, "tai", 4756, "tan", 4773, "qin",
		4782, "tan", 4783, "dan", 4796, "tan", 4797, "tang", 4798, "tao", 4824,
		"te", 4840, "teng", 4845, "ti", 4850, "tian", 4873, "tiao", 4886,
		"yao", 4899, "tiao", 4900, "tie", 4901, "ting", 4906, "tong", 4924,
		"zhuang", 4936, "tong", 4937, "tou", 4945, "tu", 4950, "tuan", 4966,
		"tui", 4971, "tun", 4978, "tuo", 4985, "wa", 5009, "wai", 5019, "wei",
		5020, "wai", 5021, "wan", 5022, "wang", 5048, "wei", 5062, "xu", 5074,
		"wei", 5075, "kui", 5100, "wei", 5101, "wen", 5121, "weng", 5136, "wo",
		5141, "wu", 5158, "xi", 5212, "ei", 5222, "xi", 5223, "xian", 5271,
		"xi", 5272, "qie", 5281, "xi", 5282, "xia", 5286, "sha", 5305, "xia",
		5306, "xian", 5307, "qian", 5309, "xian", 5310, "san", 5352, "xiang",
		5353, "xiao", 5382, "xie", 5411, "xin", 5448, "xing", 5464, "xiong",
		5484, "xiu", 5492, "xu", 5508, "hua", 5510, "xu", 5511, "xiu", 5537,
		"xu", 5538, "xuan", 5541, "xue", 5567, "nue", 5576, "xun", 5577, "yin",
		5580, "xun", 5581, "ya", 5606, "yan", 5635, "nian", 5648, "yan", 5649,
		"yuan", 5653, "yan", 5654, "yang", 5698, "yao", 5723, "you", 5741,
		"yao", 5742, "ye", 5753, "yi", 5775, "qi", 5785, "yi", 5786, "yin",
		5879, "ying", 5911, "yo", 5950, "yong", 5952, "you", 5977, "yu", 6017,
		"wu", 6027, "yu", 6028, "xu", 6073, "yu", 6074, "yuan", 6106, "huan",
		6128, "yuan", 6129, "yue", 6140, "yao", 6145, "yue", 6146, "yun", 6155,
		"za", 6178, "zai", 6183, "zan", 6192, "zang", 6202, "zao", 6208, "ze",
		6223, "zuo", 6230, "ze", 6231, "zei", 6236, "zen", 6237, "zeng", 6239,
		"zha", 6247, "za", 6248, "zha", 6249, "za", 6255, "zha", 6256, "shan",
		6265, "zha", 6266, "chuai", 6270, "zhai", 6271, "zhan", 6280, "chan",
		6286, "zhan", 6287, "chan", 6300, "zhan", 6301, "zhang", 6302, "zhao",
		6325, "zhe", 6340, "zhen", 6359, "zheng", 6390, "zhi", 6411, "qi",
		6422, "zhi", 6423, "zhong", 6488, "chong", 6503, "zhou", 6504, "zhu",
		6526, "shu", 6551, "zhu", 6552, "zhua", 6574, "zhao", 6575, "zhuai",
		6576, "zhuan", 6577, "zhuang", 6586, "zhui", 6594, "zhun", 6604,
		"zhuo", 6608, "zhao", 6622, "zhuo", 6623, "zi", 6628, "zui", 6643,
		"zi", 6644, "zong", 6664, "zou", 6674, "zu", 6683, "zuan", 6694, "zui",
		6699, "zun", 6704, "zuo", 6709, "zha", 6716, "zuo", 6717];
function getSpell(strObject, hypyId) {
	/** *******qiushuiwuhen(2002-9-16)******* */
	var i, c, t, p, ret = "", strToHypy = "";
	var str = strObject.value;
	strToHypy = document.getElementById(hypyId);
	for (i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) >= 19968) {
			p = strGB.indexOf(str.charAt(i));
			if (p > -1 && p < 6725) {
				for (t = qswhSpell.length - 1; t > 0; t = t - 2) {
					if (qswhSpell[t] <= p) {
						break;
					}
				}
				if (t > 0) {
					ret += qswhSpell[t - 1];
				}
			}
		}
	}
	strToHypy.value = ret.substr(0, ret.length);
}
/*******************************************************************************
 * 检查字符串中是否含有某字段 用于检验注册证编号等是否含有必要字段
 ******************************************************************************/
function IndexDemo(strObject, str_Std, str_Std_Pre) {
	var str = strObject.value;
	var newDate = new Date();
	var s = str.indexOf(str_Std);
	if (s < 0) {
		alert("\u8f93\u5165\u4e0d\u5408\u6cd5\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u65b0\u8f93\u5165");
		if (str_Std == "\u5305\u5b57") {
			if (newDate.getMonth() + 1 < 10) {
				str_Std_Pre = MonthCompareSmall(newDate, str_Std_Pre);
			} else {
				str_Std_Pre = MonthCompareBig(newDate, str_Std_Pre);
			}
		}
		strObject.value = str_Std_Pre;
	}
}
function MonthCompareSmall(newDate, str_Std_Pre) {
	if (newDate.getDate() < 10) {
		str_Std_Pre = str_Std_Pre + newDate.getYear() + "0"
				+ (newDate.getMonth() + 1) + "0" + newDate.getDate();
	} else {
		str_Std_Pre = str_Std_Pre + newDate.getYear() + "0"
				+ (newDate.getMonth() + 1) + newDate.getDate();
	}
	return str_Std_Pre;
}
function MonthCompareBig(newDate, str_Std_Pre) {
	if (newDate.getDate() < 10) {
		str_Std_Pre = str_Std_Pre + newDate.getYear()
				+ (newDate.getMonth() + 1) + "0" + newDate.getDate();
	} else {
		str_Std_Pre = str_Std_Pre + newDate.getYear()
				+ (newDate.getMonth() + 1) + newDate.getDate();
	}
	return str_Std_Pre;
}
/*******************************************************************************
 * 验证医疗器械生产企业许可证编号
 ******************************************************************************/
function validateCard(inputText, firstChar, endChar) {
	var inputValue, reg;
	inputValue = inputText.value;
	reg = /^\d{3}$/;
	var firstCharLen = firstChar.length;
	var endCharIndex = inputValue.lastIndexOf(endChar);
	var numberContext = inputValue.substring(firstCharLen, endCharIndex);
	if (inputText.readOnly == false) {
		if (inputValue.substring(0, firstCharLen) == firstChar
				&& inputValue.substring(endCharIndex, inputValue.length) == endChar) {
			if (numberContext.match(reg) == null) {
				alert("\u8bf7\u8f93\u5165\u4e09\u4f4d\u6570\u5b57,\u4e0d\u80fd\u6709\u7a7a\u683c");
				inputText.focus();
				return false;
			}
		} else {
			inputText.value = "\u7ca4\u836f\u7ba1\u68b0\u751f\u4ea7\u8bb8   \u53f7";
			inputText.focus();
			alert("\u8bf7\u6309\u6b64\u89c4\u5219\u586b\u5199:\u7ca4\u836f\u7ba1\u68b0\u751f\u4ea7\u8bb8+3\u4f4d\u6d41\u6c34+\u53f7");
			return false;
		}
		return true;
	}
}
/*******************************************************************************
 * 验证药品生产企业gmp证书编号
 ******************************************************************************/
function validateGmp(inputText, firstChar) {
	var inputValue, reg;
	inputValue = inputText.value;
	reg = /^\d{4}$/;
	var firstCharSub = firstChar.substring(0, 2);
	var numberContext = inputValue.substring(firstCharSub.length,
			inputValue.length);
	if (inputText.readOnly == false) {
		if (inputValue.substring(0, firstCharSub.length) == firstCharSub) {
			if (numberContext.match(reg) == null) {
				alert("\u8bf7\u8f93\u5165\u56db\u4f4d\u6570\u5b57,\u4e0d\u80fd\u6709\u7a7a\u683c");
				inputText.focus();
				return false;
			}
		} else {
			inputText.value = firstCharSub;
			alert("\u8f93\u5165\u6709\u8bef!");
			inputText.focus();
			return false;
		}
		return true;
	}
}
/*******************************************************************************
 * author:zhongyi 根据检验规则，检验被校验的表达式，提示自定义的提示信息 patrn 校验规则（正则表达式） bechecked
 * 被校验的字符串 prompt 自定义的提示信息
 ******************************************************************************/
function chkBy_rule(patrn, bechecked, prompt) {
	if (bechecked != '' && !patrn.test(bechecked)) {
	    if(prompt != '')
		alert(prompt);
		return false;
	}
	return true;
}
/*******************************************************************************
 * author:zhongyi 检查仓库的总面积是否大于等于各个仓库的面积和 params： total 仓库总面积 shady 阴凉库面积 normal
 * 常温库面积 cold 冷库面积 low_temperature 低温库面积、 special 特殊管理药品专库面积
 ******************************************************************************/
function chk_depositoryArea(total, shady, normal, cold, low_temperature,
		special) {
	var patrn = /^\d{1,8}(\.(\d{1,2}))?$/;// number(10,2)
	var constant_prompt = "\n\u6700\u591a\u662f8\u4e3a\u6574\u6570\uff0c2\u4e3a\u5c0f\u6570:99999999.99";
	var sum = 0;
	var total_value = 0;
	if (total != "") {
		var prompt = "\u8f93\u5165\u7684\u4ed3\u5e93\u603b\u9762\u79ef\u7684\u683c\u5f0f\u4e0d\u6b63\u786e\uff01"
				+ constant_prompt;
		if (!chkBy_rule(patrn, total, prompt)) {
			return false;
		}
		total_value = total;
	}
	if (shady != "") {
		var prompt = "\u8f93\u5165\u7684\u9634\u51c9\u5e93\u9762\u79ef\u7684\u683c\u5f0f\u4e0d\u6b63\u786e\uff01"
				+ constant_prompt;
		if (!chkBy_rule(patrn, shady, prompt)) {
			return false;
		}
		sum = sum + parseFloat(shady);
	}
	if (normal != "") {
		if (!chkBy_rule(patrn, normal, prompt)) {
			var prompt = "\u8f93\u5165\u7684\u5e38\u6e29\u5e93\u9762\u79ef\u7684\u683c\u5f0f\u4e0d\u6b63\u786e\uff01"
					+ constant_prompt;
			return false;
		}
		sum = sum + parseFloat(normal);
	}
	if (cold != "") {
		var prompt = "\u8f93\u5165\u7684\u51b7\u5e93\u9762\u79ef\u7684\u683c\u5f0f\u4e0d\u6b63\u786e\uff01"
				+ constant_prompt;
		if (!chkBy_rule(patrn, cold, prompt)) {
			return false;
		}
		sum = sum + parseFloat(cold);
	}
	if (low_temperature != "") {
		var prompt = "\u8f93\u5165\u7684\u4f4e\u6e29\u5e93\u9762\u79ef\u7684\u683c\u5f0f\u4e0d\u6b63\u786e\uff01"
				+ constant_prompt;
		if (!chkBy_rule(patrn, low_temperature, prompt)) {
			return false;
		}
		sum = sum + parseFloat(low_temperature);
	}
	if (special != "") {
		var prompt = "\u8f93\u5165\u7684\u7279\u6b8a\u7ba1\u7406\u836f\u54c1\u4e13\u5e93\u9762\u79ef\u7684\u683c\u5f0f\u4e0d\u6b63\u786e\uff01"
				+ constant_prompt;
		if (!chkBy_rule(patrn, special, prompt)) {
			return false;
		}
		sum = sum + parseFloat(special);
	}
	if (total == "" && sum > 0) {
		alert("\u68c0\u67e5\u4ed3\u5e93\u7684\u603b\u9762\u79ef\u662f\u5426\u5927\u4e8e\u7b49\u4e8e\u5404\u4e2a\u4ed3\u5e93\u7684\u9762\u79ef\u548c!");
		return false;
	}
	if ((total - sum) < 0) {
		alert("\u68c0\u67e5\u4ed3\u5e93\u7684\u603b\u9762\u79ef\u662f\u5426\u5927\u4e8e\u7b49\u4e8e\u5404\u4e2a\u4ed3\u5e93\u7684\u9762\u79ef\u548c!");
		return false;
	}
	return true;
}
/**
 * 身份证校验
 * 
 * @param id
 *            身份证号
 * @return boolean 是否是有效的身份证号
 */
function checkId(id) {
	if (id == null || id.length == 0) {
		return true;
	}
	var weights = [0, 2, 4, 8, 5, 10, 9, 7, 3, 6, 1, 2, 4, 8, 5, 10, 9, 7];
	var sumBites = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

	// 检查字符
	if (id.length == 15) {
		var exp = /[^0-9]*/;
		var exp = /([0-9]){15}/;
		if (!exp.test(id)) {
			return false;
		}
	}
	// 检查校验位
	if (id.length == 18) {
		sum = 0;
		for (i = 17; i >= 1; i--) {
			var number = id.substring(18 - i, 17 - i);
			var weight = weights[i];
			sum += number * weight;
		}
		var sumBite = sumBites[sum % 11];
		var realSumBite = id.substring(17, 18);
		if (sumBite != realSumBite) {
			return false;
		}
	}

	// 检查出生日期
	var year, month, day;
	if (id.length == 15) {
		year = "19" + id.substring(6, 8);
		month = id.substring(8, 10);
		day = id.substring(10, 12);
		birthday = year + "-" + month + "-" + day;
		if (!checkBirthday(year, month, day)) {
			return false;
		}
	} else if (id.length == 18) {
		year = id.substring(6, 10);
		month = id.substring(10, 12);
		day = id.substring(12, 14);
		birthday = year + "-" + month + "-" + day;
		if (!checkBirthday(year, month, day)) {
			return false;
		}
	}
	return true;
}
/**
 * 校验出生日期
 * 
 * @param year
 *            年
 * @param month
 *            月
 * @param day
 *            日
 * @return boolean 是否是有效的出生日期
 */
function checkBirthday(year, month, day) {
	var dayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var date = new Date();
	if (year > date.getFullYear()) {
		return false;
	} else {
		if (month > 12 || month < 1) {
			return false;
		} else {
			if (day < 1) {
				return false;
			}
			if (month == 2) {
				if (isLeapYear(year)) {
					return month <= 29;
				} else {
					return month <= 28;
				}
			} else {
				return month <= dayNum[month - 1];
			}
		}
	}
	var year = (new Date()).getFullYear();
}
/**
 * 是否是闰年
 * 
 * @param year
 *            年
 * @return boolean 是否是闰年
 */
function isLeapYear(year) {
	if (year % 100 != 0) {
		return year % 4 == 0;
	} else {
		return year % 400 == 0;
	}
}
/**
 * 从身份证中取生日和性别 注：日期格式功能待实现
 * 
 * @param idInput
 *            身份证输入框的Input对象
 * @param birthdayInputId
 *            出生日期输入框的id
 * @param datePattern
 *            日期格式
 * @param sexInputId
 *            性别选择框的id
 * @return boolean 是否成功
 */
function getBirthdayAndSex(idInput, birthdayInputId, datePattern, sexInputId) {
	var id = idInput.value.trim();
	if (id == "") {
		return;
	}
	if (checkId(id)) {
		if (id.length == 15) {
			document.getElementById(birthdayInputId).value = "19"
					+ id.substring(6, 8) + "-" + id.substring(8, 10) + "-"
					+ id.substring(10, 12);
		} else {
			document.getElementById(birthdayInputId).value = id
					.substring(6, 10)
					+ "-" + id.substring(10, 12) + "-" + id.substring(12, 14);
			document.getElementById(sexInputId).value = id.charAt(16) % 2 == 0
					? 2
					: 1;
		}
		return true;
	} else {
		alert("\u8eab\u4efd\u8bc1\u53f7\u7801\u4e0d\u6b63\u786e\uff01\u8bf7\u91cd\u65b0\u8f93\u5165\uff01");

		return false;
	}
}
function getBirthdaySexAndAge(idInput, birthdayInputId, datePattern,
		sexInputId, ageInputId) {
	var id = idInput.value.trim();
	if (id == "") {
		return;
	}
	var date = new Date();
	if (checkId(id)) {
		if (id.length == 15) {
			document.getElementById(birthdayInputId).value = "19"
					+ id.substring(6, 8) + "-" + id.substring(8, 10) + "-"
					+ id.substring(10, 12);
			var bir = document.getElementById(birthdayInputId).value;
			var birInt = parseInt(bir.substring(0, 4));
			var systime = date.getFullYear();
			document.getElementById(ageInputId).value = (String)(systime
					- birInt);
		} else {
			document.getElementById(birthdayInputId).value = id
					.substring(6, 10)
					+ "-" + id.substring(10, 12) + "-" + id.substring(12, 14);
			var bir = document.getElementById(birthdayInputId).value;
			var birInt = parseInt(bir.substring(0, 4));
			var systime = date.getFullYear();
			document.getElementById(ageInputId).value = (String)(systime
					- birInt);
			document.getElementById(sexInputId).value = id.charAt(16) % 2 == 0
					? 2
					: 1;
		}
		return true;
	} else {
		alert("\u8eab\u4efd\u8bc1\u53f7\u7801\u4e0d\u6b63\u786e\uff01\u8bf7\u91cd\u65b0\u8f93\u5165\uff01");
		idInput.focus();
		return false;
	}
}

function getBirthdaySexAndAgeAutoClick(idInput, birthdayInputId, datePattern,
		sexInputId, ageInputId, buttonId) {

	var id = idInput.value.trim();
	if (id == "") {
		return;
	}
	var date = new Date();
	if (checkId(id)) {
		if (id.length == 15) {
			document.getElementById(birthdayInputId).value = "19"
					+ id.substring(6, 8) + "-" + id.substring(8, 10) + "-"
					+ id.substring(10, 12);
			var bir = document.getElementById(birthdayInputId).value;
			var birInt = parseInt(bir.substring(0, 4));
			var systime = date.getFullYear();
			document.getElementById(ageInputId).value = (String)(systime
					- birInt);
			document.getElementById(sexInputId).value = id.charAt(14) % 2 == 0
					? 2
					: 1;
			autoOnClick(buttonId);
		} else {
			document.getElementById(birthdayInputId).value = id
					.substring(6, 10)
					+ "-" + id.substring(10, 12) + "-" + id.substring(12, 14);
			var bir = document.getElementById(birthdayInputId).value;
			var birInt = parseInt(bir.substring(0, 4));
			var systime = date.getFullYear();
			document.getElementById(ageInputId).value = (String)(systime
					- birInt);
			document.getElementById(sexInputId).value = id.charAt(16) % 2 == 0
					? 2
					: 1;
			autoOnClick(buttonId);
		}
		return true;
	} else {
		alert("\u8eab\u4efd\u8bc1\u53f7\u7801\u4e0d\u6b63\u786e\uff01\u8bf7\u91cd\u65b0\u8f93\u5165\uff01");
		idInput.focus();
		return false;
	}
}
//校验身份证号并获取出生日期、年龄和性别，身份证格式不对时提醒
function getBirthdaySexAndAgeAutoClickTx(idInput, birthdayInputId, datePattern,
		sexInputId, ageInputId, buttonId) {

	var id = idInput.value.trim();
	if (id == "") {
		return;
	}
	var date = new Date();
	if (checkId(id)) {
		if (id.length == 15) {
			document.getElementById(birthdayInputId).value = "19"
					+ id.substring(6, 8) + "-" + id.substring(8, 10) + "-"
					+ id.substring(10, 12);
			var bir = document.getElementById(birthdayInputId).value;
			var birInt = parseInt(bir.substring(0, 4));
			var systime = date.getFullYear();
			document.getElementById(ageInputId).value = (String)(systime
					- birInt);
			document.getElementById(sexInputId).value = id.charAt(14) % 2 == 0
					? 2
					: 1;
			autoOnClick(buttonId);
		} else {
			document.getElementById(birthdayInputId).value = id
					.substring(6, 10)
					+ "-" + id.substring(10, 12) + "-" + id.substring(12, 14);
			var bir = document.getElementById(birthdayInputId).value;
			var birInt = parseInt(bir.substring(0, 4));
			var systime = date.getFullYear();
			document.getElementById(ageInputId).value = (String)(systime
					- birInt);
			document.getElementById(sexInputId).value = id.charAt(16) % 2 == 0
					? 2
					: 1;
			autoOnClick(buttonId);
		}
		return true;
	} else {
		alert("\u8eab\u4efd\u8bc1\u53f7\u7801\u4e0d\u6b63\u786e\uff01\u8bf7\u91cd\u65b0\u8f93\u5165\uff01");
		return false;
	}
}
/**
 * edited by ChenYiFan 2008-6-6 全年度的值自动生成 验证上半年产值 + 下半年产值 是否等于 全年度产值
 * 
 * @param sbnczId
 * @param xbnczId
 * @param qndczObj
 *            对象
 */
function checkMoney(sbnczId, xbnczId, qndczObj) {
	var sbncz = document.getElementById(sbnczId).value;
	var xbncz = document.getElementById(xbnczId).value;
	var qndcz = document.getElementById(qndczObj).value;
	if (sbncz != "" && xbncz != "" && !isNaN(parseInt(xbncz) + parseInt(sbncz))) {
		qndcz = parseInt(xbncz) + parseInt(sbncz);
		document.getElementById(qndczObj).value = qndcz;

	}
}

// 控制查询已有信息按钮
function controlReadOnly() {
	var inputIds = new Array();
	for (var z = 0; z < arguments.length - 4; z++) {
		inputIds.push(arguments[z]);
	}
	var buttonOperateValue = arguments[arguments.length - 3];// 修改按钮操作
	var telephoneObj = document.getElementById(arguments[arguments.length - 4]);// 电话
	var telephoneValue = telephoneObj.value;
	var postObj = document.getElementById(arguments[arguments.length - 2]);// 注册地邮政编码
	var postValue = document.getElementById(arguments[arguments.length - 2]).value;// 注册地邮政编码值
	var enterName = document.getElementById(arguments[arguments.length - 1]);// 企业名称
	var reg = /^\d{6}$/;
	// var patrn=/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
	var telephoneReg = /^(\d)|[-]+$/;// 电话校验规则
	if (buttonOperateValue == "false") {// 新增
		if (postValue.match(reg) != null) {
			postObj.readOnly = false;// 设置注册地邮政编码为只读
		}
		if (telephoneValue.match(telephoneReg) != null) {
			telephoneObj.readOnly = false;// 设置电话为只读
		}

		for (var i = 0; i < inputIds.length; i++) {
			var inputObj = document.getElementById(inputIds[i]);
			var inputValue = inputObj.value;
			if (inputValue != null && inputValue != NaN && inputValue != "") {
				inputObj.readOnly = true;
			}
		}
	} else {// 修改
		// enterName.readOnly = true; //设置企业名称只读
		// document.getElementById(arguments[arguments.length-4]).disabled
		// =true;//设置查询已有信息按钮为不可用
		postObj.readOnly = false;// 注册地邮政编码为只读
		telephoneObj.readOnly = false;// 电话为只读
		for (var j = 0; j < inputIds.length; j++) {
			var inputObj = document.getElementById(inputIds[j]);
			inputObj.readOnly = true;
		}
	}
}

// 值改变时触发查询已有信息按钮
function autoOnClick(formName) {
	document.getElementById(formName).click();
}

// ////////////////////////////////////////////
// 以下方法因为2个LIST页面 改变 输出excel的位置
// 公用方法，根据标记名称，模糊查找匹配的
function findObjToTagName(mobj, mtagName, objidLikeStr) {
	var tmpObj = mobj.getElementsByTagName(mtagName);
	for (var i = 0; i < tmpObj.length; i++) {
		if (tmpObj[i].id.indexOf(objidLikeStr) != -1) {// 取得要 单增加的checkbox
			return tmpObj[i];
		}
	}
}
// 移动
function MoveObj(objid, yobjid) {
	var mdiv = document.getElementById(objid);
	var mobj = findObjToTagName(document, "a", yobjid);
	if (mdiv) {
		if (mobj) {
			mdiv.insertAdjacentElement("beforeEnd", mobj); // 加入节点
		}
	}
}
// 重写insertAdjacentElement()方法，因为firefox中没有该方法
if (typeof HTMLElement != "undefined"
		&& !HTMLElement.prototype.insertAdjacentElement) {
	HTMLElement.prototype.insertAdjacentElement = function(where, parsedNode) {
		switch (where) {
			case 'beforeBegin' :
				this.parentNode.insertBefore(parsedNode, this)
				break;
			case 'afterBegin' :
				this.insertBefore(parsedNode, this.firstChild);
				break;
			case 'beforeEnd' :
				this.appendChild(parsedNode);
				break;
			case 'afterEnd' :
				if (this.nextSibling)
					this.parentNode.insertBefore(parsedNode, this.nextSibling);
				else
					this.parentNode.appendChild(parsedNode);
				break;
		}
	}

	HTMLElement.prototype.insertAdjacentHTML = function(where, htmlStr) {
		var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var parsedHTML = r.createContextualFragment(htmlStr);
		this.insertAdjacentElement(where, parsedHTML)
	}

	HTMLElement.prototype.insertAdjacentText = function(where, txtStr) {
		var parsedText = document.createTextNode(txtStr)
		this.insertAdjacentElement(where, parsedText)
	}
}
// 查看赋值方法
function NextLookJs(objid, ovalue) {
	var mobj = document.getElementById(objid);
	if (mobj) {
		mobj.value = ovalue;
	}
}

// 改变日期控件位置的方法
/*******************************************************************************
 * 文件上传控件需要用以下方法设置定位标签页的参数
 ******************************************************************************/
function setHiddenValue(field, value) {
	document.getElementById(field).value = value;

}

/**
 * 自动调整按钮的位置
 * 
 * @param tableDivId
 *            详表DIV的ID
 * @param tableId
 *            详表TABLE的ID
 * @param margin
 *            预留的空白高度，用于放置按钮和其他页面元素，默认为150像素 即：页面可见区域高度＝详表DIV高度＋预留的空白高度
 */
function adjustHeight(tabId, margin) {
	margin = margin ? margin : 150;
	if (Browser.IE6) {
		var clientHeight = document.body.clientHeight - margin;
	} else if (Browser.IE7) {
		var clientHeight = document.documentElement.clientHeight - margin;
	}
	var tableDiv = document.getElementById(tabId + "_div");
	var table = document.getElementById(tabId + "_table");
	if (tableDiv == null || table == null) {
		return;
	}
	if (table.scrollHeight == 0 || table.scrollHeight > clientHeight) {
		tableDiv.style.pixelHeight = clientHeight;
	} else {
		tableDiv.style.pixelHeight = table.scrollHeight + 5;
	}
}

function adjustHeightAuto(tabId, margin) {
	if (document.getElementById(tabId + "_table").scrollHeight == 0) {
		Element.show(tabId);
		adjustHeight(tabId, margin);
	}

}
/** 根据DIV内的TABLE高度调整DIV的高度 */
function adjustDIVHeight(id) {
	var tableDiv = document.getElementById(id + "_div");
	var table = document.getElementById(id + "_table");
	if (table && tableDiv) {
	    if(table.scrollHeight)
		tableDiv.style.pixelHeight = table.scrollHeight;
	}/*
		 * else{ alert(" TABLE 对象没设置好 ！！！"); }
		 */
}

// 改变日期控件位置的
function PoPClass() {
	this.PoPClassTop = "";
	this.PoPClassLeft = "";
	this.PoPClassTxtObj = "";
	this.PoPClassBntObj = "";
	this.PoPClassFormat = "";
	this.PoPClassLoad = function(ctl, ctl2, format) {
		this.PoPClassBntObj = ctl;
		this.PoPClassTxtObj = ctl2;
		this.PoPClassFormat = format;
	};
	this.PoPChange = function(iframeObj, popupObj) { // 改变位置
		// 确定是否要改变
		var changType = this.isChangePoP();
		if (changType == 1) {
			this.PoPChangOne(iframeObj, popupObj);
		}
	};
	this.PoPChangOne = function(iframeObj, popupObj) {
		if (this.PoPClassBntObj) {// 改变
			var tmpTop = "";
			var tmpLeft = "";
			var fatchLeft = parseInt(this.PoPClassBntObj.parentElement.offsetLeft);// TD的LEFT
			var bntWidth = parseInt(this.PoPClassBntObj.offsetWidth);// 本身按钮的宽度
			var txtWidth = parseInt(this.PoPClassTxtObj.offsetWidth);// 文本框的宽度
			tmpLeft = fatchLeft + bntWidth + txtWidth;// 日期框的LEFT
			var fatchTop = parseInt(this.PoPClassBntObj.parentElement.offsetTop);// TD的LEFT
			tmpTop = fatchTop + bntWidth + 10;
			this.PoPClassTop = tmpTop;
			this.PoPClassLeft = tmpLeft;

			// 判断LEFT是否超出了范围
			this.PoPSetLeft(this.PoPClassBntObj, iframeObj);
			// 判断TOP是否超出了范围
			this.PoPSetTop(this.PoPClassBntObj, iframeObj);

			popupObj.style.left = parseInt(this.PoPClassLeft);// 重新设置LEFT
			popupObj.style.top = parseInt(this.PoPClassTop);// 重新设置TOP
			this.PoPClear();// 清除数据，下次使用
		}
	};
	this.PoPSetLeft = function(mobj, iframeObj) {// 超出了Left范围
		try {
			var fatch = mobj.parentElement;
			if (fatch.tagName == "TR") {
				var iframeObjWidth = parseInt(iframeObj.offsetWidth);
				if (!iframeObjWidth) {
					iframeObjWidth = parseInt(iframeObj.style.width);
				}
				var offsetLeft = parseInt(this.PoPClassLeft) + iframeObjWidth;
				if (offsetLeft > fatch.offsetWidth) {
					// 重新设置Left
					this.PoPClassLeft = parseInt(this.PoPClassLeft)
							- iframeObjWidth;
					return true;
				} else {
					return false;
				}
			} else {
				this.PoPSetLeft(fatch, iframeObj);
			}
		} catch (e) {
			// alert(e);
		}
	};
	this.PoPSetTop = function(mobj, iframeObj) {// 超出了Left范围
		try {
			var fatch = mobj.parentElement;
			if (fatch.tagName == "TR") {
				this.PoPSetTopTmp(fatch, iframeObj, fatch);
			} else {
				this.PoPSetTop(fatch, iframeObj);
			}
		} catch (e) {
			// /alert(e);
		}
	};
	this.PoPSetTopTmp = function(mobj, iframeObj, yobj) {// 超出了Left范围
		try {
			var fatch = mobj.parentElement;
			if (fatch.tagName == "TABLE") {
				var iframeObjHeight = parseInt(iframeObj.offsetHeight);
				if (!iframeObjHeight) {
					iframeObjHeight = parseInt(iframeObj.style.height);
				}
				var offsetTop = parseInt(this.PoPClassTop) + iframeObjHeight;
				var bntHeight = parseInt(this.PoPClassBntObj.offsetHeight);
				var tableHeight = fatch.offsetHeight;
				if (offsetTop > tableHeight && iframeObjHeight < tableHeight) {
					this.PoPClassTop = this.PoPClassTop - iframeObjHeight
							- bntHeight;
				}
				return true;
			} else {
				this.PoPSetTopTmp(fatch, iframeObj, fatch);
			}
		} catch (e) {
			// alert(e);
		}
	};
	this.isChangePoP = function() {// 确定是否要改变
		var tmp = 0;
		var fatch = this.PoPClassBntObj.parentElement;
		if (fatch.tagName == "TD") {
			var bnts = fatch.getElementsByTagName("input");
			for (var i = 0; i < bnts.length; i++) {
				var tname = bnts[i].type;
				if (tname == "button" || tname == "BUTTON") {
					if (bnts[i].value == "...") {
						tmp = parseInt(tmp) + 1;
					}
				}
			}
		}
		return tmp;
	};
	this.PoPClear = function() { // 清除
		this.PoPClassTop = "";
		this.PoPClassLeft = "";
		this.PoPClassTxtObj = "";
		this.PoPClassBntObj = "";
		this.PoPClassFormat = "";
	};
}
var PoPObj = new PoPClass();

/*******************************************************************************
 * author:zhongyi 审核按钮的确认JS
 ******************************************************************************/
function invokeAuditProcedure(url, audit_status, audit_tabId, id) {
	// Modify By Xu Siyuan
	var returnValue = showDialog(url, '150px', '300px', true, "");
	if (returnValue == undefined) {
		return false
	}
	document.getElementById(audit_tabId).value = id;
	document.getElementById(audit_status).value = returnValue;
	return true;
}

/*******************************************************************************
 * author:zhongyi 审核按钮的确认JS
 ******************************************************************************/
function invokeAuditProcedure_navigation(url, audit_status) {
	// Modify By Xu Siyuan
	var returnValue = showDialog(url, '150px', '300px', true, "");
	if (returnValue == undefined) {
		return false;
	}
	document.getElementById(audit_status).value = returnValue;
	return true;
}

/*******************************************************************************
 * 打印补正通知
 ******************************************************************************/
function printNotice(url) {
	showDialog(url, '800px', '900px');
}

/*******************************************************************************
 * 打印弹出窗口 LCC
 ******************************************************************************/
function XZSPrintNotice(url) {
	showDialog(url, '800px', '1000px');
	return false;
}
/*******************************************************************************
 * 执业药师不予备案通知
 ******************************************************************************/
function BYBAPrintNotice(url) {
	showDialog(url, '300px', '600px');
	return false;
}


/*******************************************************************************
 * 用在叉圃写的弹出页面 关闭按钮，返回undefine
 ******************************************************************************/
function closeAndReturnValue() {
	var returnValue = undefined;
	window.close();
}

// 详细位置 用户管理
function selectcode() {
	var id = "";
	var murl = "";
	try {
		if (arguments.length > 1) {
			id = arguments[0];// 获得ID
			murl = arguments[1];// 获得地址
			murl = murl + "?cuserId=" + id;
			openNewWindow(murl, "更换岗位", 250, 250);
		}
	} catch (e) {
		return false;
	}
	return false;
}

// 更换岗位
function chagework() {
	var id = "";
	var murl = "";
	try {
		if (arguments.length > 1) {
			id = arguments[0];// 获得ID
			murl = arguments[1];// 获得地址
			murl = murl + "?cuserId=" + id;
			openNewWindow(murl, "更换岗位", 450, 350);
		}
	} catch (e) {
		return false;
	}
	return false;
}

/*******************************************************************************
 * 全选按钮
 ******************************************************************************/
function selectAllCheckBox() {
	var checkBoxObj = document.getElementsByTagName('input');
	if (arguments[0].value == "全选") {
		for (var i = 0; i < checkBoxObj.length; i++) {
			if (checkBoxObj[i].type == 'checkbox') {
				checkBoxObj[i].checked = true;
			}
		}
		arguments[0].value = "取消";
	} else {
		for (var i = 0; i < checkBoxObj.length; i++) {
			if (checkBoxObj[i].type == 'checkbox') {
				checkBoxObj[i].checked = false;
			}
		}
		arguments[0].value = "全选";
	}
	return false;
}

/*******************************************************************************
 * 全选同时赋值给某字段
 ******************************************************************************/
function selectAllCheckBoxSetValue() {
	var checkBoxObj = document.getElementsByTagName('input');
	var updateValue = "";// 保存全选的值
	var j = 0;
	if (arguments[3].value == "全选") {
		for (var i = 0; i < checkBoxObj.length; i++) {
			if (checkBoxObj[i].type == 'checkbox') {
				checkBoxObj[i].checked = true;
				var getValueId = arguments[1] + j + ':' + arguments[2];
				var objTd = document.getElementById(getValueId);
				updateValue += objTd.innerText + ',';
				j += 1;
			}
		}
		document.getElementById(arguments[0]).value = updateValue;
		arguments[3].value = "取消";
	} else {
		for (var i = 0; i < checkBoxObj.length; i++) {
			if (checkBoxObj[i].type == 'checkbox') {
				checkBoxObj[i].checked = false;
			}
		}
		document.getElementById(arguments[0]).value = "";
		arguments[3].value = "全选";
	}

	return false;
}

/*******************************************************************************
 * 选择多选时自动赋值
 ******************************************************************************/
function autoSetValue(updateID, currentObj, clmcValueId) {
	var td = document.getElementById(clmcValueId);
	if (currentObj.checked) {// 如果选择了，则赋值
		document.getElementById(updateID).value = document
				.getElementById(updateID).value
				+ td.innerText + ',';
	} else {
		if (document.getElementById(updateID).value.indexOf(td.innerText) >= 0) {// 如果取消了，则删除
			document.getElementById(updateID).value = document
					.getElementById(updateID).value.replace(td.innerText + ',',
					'');
		}
	}
}

// 弹出地图
function FrameClass() {
	this.url = "/sendHttpImg";
	this.title = "查看流程图";
	this.height = "400";
	this.width = "700";
	this.top = "250";
	this.left = "250";
	this.scrollbars = "";
	this.show_Graphgic = function() { // 显示
		if (arguments.length > 1) {
			var gid = arguments[0];// 获得图象ID
			var lcname = arguments[1];// 获得流程名字
			this.url = this.addUrlParam(this.url, "gid", gid);
			this.url = this.addUrlParam(this.url, "lcname", lcname);
		}
		this.show();
	}
	this.show = function() {
		openNewWindow(this.url, this.title, this.height, this.width);
	}
	this.addUrlParam = function(url, name, value) {// 增加参数的方法
		var tmpurl = "";
		if (url) {
			if (url.indexOf("?") > 0) {
				tmpurl = url + "&" + name + "=" + value;
			} else {
				tmpurl = url + "?" + name + "=" + value;
			}
		}
		return tmpurl;
	}
}

var Framem = new FrameClass();

// TABLE类
function TableClass() {
	// 点击TAB事件
	this.click = function() {
		try {
			var tableid = "";
			var pc = "";
			if (arguments.length > 0) {
				tableid = arguments[0];
				try {
					pc = arguments[1];
				} catch (e) {
				}
			}
			mScroll.click_loadMove(tableid, pc);// 注册浮动事件
		} catch (e) {
		}
	}
}
var Table_h = new TableClass();

// /////////////////浮动按钮
var isload = "";// 表示加栽
function ScrollClass() {
	// this.move_Obj = "";//移动对象ID
	// this.moveold_jl="";//前一次的距离
	// this.ifameName="d_ifame";

	this.click_loadMove = function() {// 单击加载注册浮动事件
		try {
			var tableid = arguments[0];
			var pc = "";
			try {
				pc = arguments[1];
			} catch (e) {
			}
			var table = document.getElementById(tableid);
			var div = table.getElementsByTagName("div");
			for (var i = 0; i < div.length; i++) {
				if (div[i].id == "bnt_fd_1") {
					this.zc_Move(div[i], "", "");
				}
			}

			// /////自己定义组件的浮动按钮注册

			var span = table.getElementsByTagName("span");
			for (var j = 0; j < span.length; j++) {
				var tmep = span[j];
				if (tmep.id) {
					var idtemp = "";
					var bindex = tmep.id.indexOf(":");
					var eindex = tmep.id.length;
					var len = parseInt(eindex - bindex);
					idtemp = tmep.id.substr(bindex + 1, len);
					if (idtemp == "UIFloatingButtonGroupSpan") {

						this.zc_Move(tmep, pc, "");
					}

				}

			}

		} catch (e) {
		}
	}

	this.init_loadMove = function() {// 初始化加载浮动事件
		try {
			var moveObj = document.getElementById("bnt_fd_1");
			var size = arguments[0];
			if (size == undefined) {
				this.zc_Move(moveObj, "", "");
			} else {
				// 子表的样式初始化
				// this.zc_Movec_child(moveObj,size);
				this.zc_Move(moveObj, "", size);
			}
		} catch (e) {
		}
	}

	this.init_move = function() {// 单击加载注册浮动事件
		try {
			var tableid = arguments[0];
			if (tableid) {
				var table = document.getElementById(tableid);
				if (table) {
					var div = table.getElementsByTagName("div");
					var isdiv = false;
					for (var i = 0; i < div.length; i++) {
						if (div[i].id == "bnt_fd_1") {
							isdiv = true;
							this.zc_Move(div[i], "", "");
						}
					}

					// 数据上报 浮动按钮初始化注册
					this.spanMoveInit(table);

					// 特殊的注册产品注册 ////////////////////////////table 页 包含 table处理
					var page = arguments[1];
					if (page) {
						var index = "";
						var tableId = "";

						try {
							index = page
									.indexOf('/sjsb/ylqx/cpzc/OtherTypeProductRegister_MainEditPage');
							if (index > -1) {// 如果是注册产品
								if (getTableID() != '')
									tableId = getTableID();
								else
									tableId = "ylqx_sjsb_cpjbxx";

								this.spanMoveInitTwo(tableId);// 数据上报
								// TABLE包含TABLE的浮动按钮注册
								// 注册产品
							}
						} catch (e) {

						}

						try {
							index = page
									.indexOf('sjsb/ylqx/jbxx/PractEdit_mainPage');
							if (index > -1) {// 如果是注册产品
								if (getTableID() != '')
									tableId = getTableID();
								else
									tableId = "ylqx_sjsb_ryxx";
								this.spanMoveInitTwo(tableId);// 数据上报
								// TABLE包含TABLE的浮动按钮注册
								// 企业人员
							}
						} catch (e) {

						}

						// ////////////监管系统产品注册的特殊处理
						try {
							index = page
									.indexOf('/ylqxjgxt/jcsj/cpzc/OtherTypeProductRegister_MainEditPage.xhtml');
							if (index > -1) {// 如果是注册产品
								if (getTableID())
									tableId = getTableID();
								else
									tableId = "ylqx_cpzc_cpjbxx";
								this.spanMoveInitTwo(tableId);// 数据上报
								// TABLE包含TABLE的浮动按钮注册
								// 企业人员
							}
						} catch (e) {

						}

					}

				} else {
					var moveObj = document.getElementById("bnt_fd_1");
					if (moveObj) {
						this.zc_Move(moveObj, "", "");
					}
					// 数据上报 TABLE包含TABLE的浮动按钮注册
					this.spanMoveInitTwo();
				}
			} else {// 加栽
				var moveObj = document.getElementById("bnt_fd_1");
				if (moveObj) {
					this.zc_Move(moveObj, "", "");
				}
				// 数据上报 TABLE包含TABLE的浮动按钮注册
				this.spanMoveInitTwo();
			}
		} catch (e) {
		}
	}
	// 数据上报 TABLE包含TABLE的浮动按钮注册 注册产品
	this.spanMoveInitTwo = function(id) {
		try {
			var table = document.getElementById(id);
			this.spanMoveInit(table);

		} catch (e) {

		}
	}

	// 数据上报 浮动按钮初始化注册
	this.spanMoveInit = function(table, pc) {
		try {
			var span = document.getElementsByTagName("span");
			for (var j = 0; j < span.length; j++) {
				var tmep = span[j];
				if (tmep.id) {
					var idtemp = "";
					var bindex = tmep.id.indexOf(":");
					var eindex = tmep.id.length;
					var len = parseInt(eindex - bindex);
					idtemp = tmep.id.substr(bindex + 1, len);
					if (idtemp == "UIFloatingButtonGroupSpan") {
						this.zc_Move(tmep, pc, "");
						break;
					}

				}

			}

		} catch (e) {

		}
	}

	this.zc_Move = function(moveObj, pc, zdyHeight) {// 注册事件
		try {

			ScrollClass.move_Obj = moveObj;
			if (ScrollClass.move_Obj) {
				ScrollClass.moveobjold_top = ScrollClass.move_Obj.offsetTop;
			}
			ScrollClass.moveold_jl = -1;
			ScrollClass.ifameName = "d_ifame";
			var mIfame = document.createElement("iframe");
			mIfame.setAttribute("frameborder", 0);
			mIfame.setAttribute("src", "javascript:false;");
			mIfame.setAttribute("scrolling", "no");
			mIfame.setAttribute("id", ScrollClass.ifameName);
			mIfame.style.cssText = "position:absolute;z-index:-2;width:100%;height:100%;top:0;left:-10px;";
			ScrollClass.move_Obj.insertAdjacentElement("beforeEnd", mIfame);

			var mdiv = document.createElement("div");
			mdiv.style.cssText = "position:absolute;z-index:-1;background-color: #CFECFF;width:100%;height:200px;top:0;left:-10px;";
			ScrollClass.move_Obj.insertAdjacentElement("beforeEnd", mdiv);

			// 定位自己的高度

			var top = "400";
			if (zdyHeight) {
				top = zdyHeight;
			} else {
				var leftFrame = self.parent.document.getElementById("leftFrame");

				if (leftFrame) {
					top = leftFrame.document.body.clientHeight;
					if (!pc) {
						if (Browser.IE8 || Browser.IE7) {
							pc = 147;// 87;//默认是127
						} else {
							pc = 147;// 87;//默认是127
						}
					}
				} else {
					if (Browser.IE8 || Browser.IE7) {
						tmpTop = document.documentElement.clientHeight;
					} else {
						// if(parseInt(tmpTop)<0){
						tmpTop = document.body.clientHeight;
						// }
					}
					tmpTop = parseInt(tmpTop);
					if (tmpTop <= 0) {
						tmpTop = 500;
					}
                    if (Browser.IE8 || Browser.IE7) {
						pc = 40;
                    	if(window.opener || window.dialogArguments){
							top = tmpTop - 47;
                    	}else{
							top = tmpTop - 87;
                    	}
					} else {
						top = tmpTop - 107;
						pc = 127;
					}
				}
			}
			top = parseInt(top - pc) + 'px';
			var oBody = document.getElementById("bodyid");
			if (oBody) {
				if (Browser.Mozilla) {
					moveObj.style.right = '10px';
					moveObj.style.bottom = '0px';
					moveObj.style.position = 'fixed';
				} else if (Browser.IE7 || Browser.IE8||Browser.IE9) {
					moveObj.style.top = top;
					moveObj.style.right = '10px';
					moveObj.style.bottom = '0px';
					moveObj.style.position = 'fixed';
				} else {
					if (!oBody.onscroll) {
						moveObj.style.top = top;
						oBody.onscroll = this.move;
					}
				}
			}

			// //增加页面body 的 onResize 事件

			window.onresize = function() {
				if (document.body) {
					document.body.scrollTop = 0;
				}
				ScrollClass.move_Obj.style.position = 'absolute';

				mScroll.zc_Move(moveObj, pc, zdyHeight);
			}
		} catch (e) {
			// alert(e);
		}
	}

	this.move = function() {
		try {
			var top = "";
			if (document.documentElement && document.documentElement.scrollTop) {
				top = document.documentElement.scrollTop;
			} else if (document.body) {
				top = document.body.scrollTop;
			}

			if (ScrollClass.move_Obj) {
				var jl = 0;
				if (top >= ScrollClass.moveold_jl) {
					jl = top - ScrollClass.moveold_jl;
					ScrollClass.move_Obj.style.top = ScrollClass.move_Obj.offsetTop
							+ jl;
				} else {
					jl = ScrollClass.moveold_jl - top;
					ScrollClass.move_Obj.style.top = ScrollClass.move_Obj.offsetTop
							- jl;
				}
				ScrollClass.moveold_jl = top;

			}
		} catch (e) {
		}
	}
	this.init = function() {
		this.move_Obj = "";// 移动对象ID
		this.moveold_jl = "";// 前一次的距离
		this.ifameName = "d_ifame";

		this.moveObj = "";
		this.pc = "";
	}
}

var mScroll = new ScrollClass();
mScroll.init();

function getTabId(isForward, type) {
	if (type == '1') {
		// 如果是受理页面
		if (isForward == 'true') {
			return "tb_tab2";
		} else {
			return "tb_tab1";
		}
	} else {
		// 如果是业务信息页面
		if (isForward == 'true') {
			return "tb_tab1";
		} else {
			return "tb_tab2";
		}
	}
}

// 弹出意见
function OpiniontClass() {

	this.url = CONTEXT + "/workflow/opiniont/opiniont.faces";
	this.title = "查看意见";
	this.height = "400";
	this.width = "700";
	this.top = "250";
	this.left = "250";
	this.scrollbars = "";
	// 业务对象
	this.updateID = "";// 参数赋值对象的ID
	this.show = function(updateID) { // 显示 参数赋值对象的ID
		this.init();
		this.url = this.addUrlParam(this.url, "updateID", updateID);
		this.show_tmp();

	}
	this.show_tmp = function() {
		openNewWindow(this.url, this.title, this.height, this.width);
	}
	this.load = function(updateid) {
		if (updateid) {
			this.updateID = updateid;
		}
	}
	this.save_parent = function(update_Id, upate_value) {
		var updateobj = document.getElementById(update_Id);
		if (updateobj) {
			updateobj.value = "";
			updateobj.value = upate_value;
		}
	}
	this.save = function() {// 确定，更新父对象的值
		if (this.updateID) {
			try {
				var update_value = this.getValue();
				self.opener.JS_opiniont
						.save_parent(this.updateID, update_value);
			} catch (e) {
				alert("赋值错误：" + e);
			}
			window.close();
		}
	}
	this.getValue = function() {// 获得值
		var tables = document.getElementById("opiniont:opiniontTable");
		var inputs = tables.getElementsByTagName("input");
		var update_value = "";
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].getAttribute("type") == "checkbox") {
				if (inputs[i].checked) {
					if (inputs[i].name == "update_value") {
						update_value = update_value + inputs[i].value + ",";
					}
				}
			}
		}
		if (update_value.length > 2) {
			update_value = update_value.substring(0, update_value.length - 1)
		}
		return update_value;
	}
	this.opiniont_div_show = function(divid) {// 显示添加新意见图层
		var div = document.getElementById(divid);
		div.style.visibility = "visible";
	}
	this.opiniont_div_hide = function(divid) {// 隐藏添加新意见图层
		var div = document.getElementById(divid);
		div.style.visibility = "hidden";
	}
	this.init = function() {
		this.url = CONTEXT + "/gdyj/workflow/opiniont/opiniont.faces";
		this.title = "查看意见";
		this.height = "400";
		this.width = "400";
		this.top = "250";
		this.left = "250";
		this.scrollbars = "";

		this.updateID = "";
	}

	this.addUrlParam = function(url, name, value) {// 增加参数的方法
		var tmpurl = "";
		if (url) {
			if (url.indexOf("?") > 0) {
				tmpurl = url + "&" + name + "=" + value;
			} else {
				tmpurl = url + "?" + name + "=" + value;
			}
		}
		return tmpurl;
	}
}

var JS_opiniont = new OpiniontClass();

// 查看是否选取需要打印清单的记录
function selectCheckBox() {
	var checkBoxObj = document.getElementsByTagName('input');
	var idList = new Array();
	for (var i = 0; i < checkBoxObj.length; i++) {
		if (checkBoxObj[i].type == 'checkbox' && checkBoxObj[i].checked == true) {
			idList.push(checkBoxObj[i].value);
		}
	}
	if (idList.length > 0) {
		return true;
	} else {
		alert(arguments[0]);
		return false;
	}
}
/*******************************************************************************
 * 提示某字段必须填写
 ******************************************************************************/
function IsFiledRequired() {
	var obj = document.getElementById(arguments[0]);
	if (obj.value == "" || obj.value == NaN || obj.value == null) {
		alert(arguments[1] + '必须填写');
		return false;
	}
	return true;
}

/*******************************************************************************
 * 设置默认值
 ******************************************************************************/
function opiniontSetDefaultValue(hid, newValue) {
	var obj = document.getElementById(hid);
	obj.value = newValue;
	return true;
}

/*******************************************************************************
 * 如果页面选择"是",判断某字段是否为空，如果为空则提示必填
 ******************************************************************************/
function isYESSetRequired() {
	var obj1 = document.getElementById(arguments[1]);// 判断是否有值的对象

	if (1 == arguments[0].value) {
		var obj1Value = obj1.value;
		if (obj1Value == "" || obj1Value == null) {
			alert(arguments[3]);
		} else {
			if (!confirm(arguments[2] + "\"" + obj1Value + "\"，请确认")) {
				// obj1.focus();
			}
		}
	}
	return true;
}
/*******************************************************************************
 * 判断某值是否为空
 ******************************************************************************/
function isNullValue(objValue) {
	if (objValue == NaN || objValue == "" || objValue == null) {
		return true;
	} else {
		return false;
	}
}
// 比较与当前日期的大小
function validateDate(dateID) {
	var dateValue = "";
	var currentDate = new Date();
	var str = currentDate.getYear() + "-"
			+ ((currentDate.getMonth().valueOf() + 1) > 9 ? "" : "0")
			+ (currentDate.getMonth().valueOf() + 1) + "-"
			+ (currentDate.getDate().valueOf() > 9 ? "" : "0")
			+ currentDate.getDate().valueOf();
	if (dateID) {
		dateValue = dateID.value;
	}
	if (dateValue && str) {
		dateValue = new Date(dateValue.replace("-", ","));
		str = new Date(str.replace("-", ","));
		if (dateValue - str < 0) {
			alert(arguments[1]);
			return false;
		}
	}
	return true;
}

function validateDateb(dateID) {
	var dateValue = "";
	var currentDate = new Date();
	var str = currentDate.getYear() + "-"
			+ ((currentDate.getMonth().valueOf() + 1) > 9 ? "" : "0")
			+ (currentDate.getMonth().valueOf() + 1) + "-"
			+ (currentDate.getDate().valueOf() > 9 ? "" : "0")
			+ currentDate.getDate().valueOf();
	if (dateID) {
		dateValue = dateID.value;
	}
	if (dateValue && str) {
		dateValue = new Date(dateValue.replace("-", ","));
		str = new Date(str.replace("-", ","));
		if (dateValue - str > 0) {
			alert(arguments[1]);
			return false;
		}
	}
	return true;
}

/*******************************************************************************
 * 医疗制剂弹出窗口
 ******************************************************************************/
function ylzjShowModalDialog(url) {
	var returnValue = showDialog(url, '700px', '900px');
	return false;
}
/*******************************************************************************
 * 模式弹出窗口2
 ******************************************************************************/
function ShowModalDialogTwo(url) {
	var returnValue = showDialog(url,'600px', '860px');
	return false;
}

/*******************************************************************************
 * 隐藏TD
 ******************************************************************************/
function hiddenTD() {
	var objOne = document.getElementById(arguments[1]);
	var objTwo = document.getElementById(arguments[2]);
	var objvalue = arguments[0].value;
	if (objvalue != null && objvalue != NaN && objvalue == "2") {
		objOne.style.display = "";
		objTwo.style.display = "";
	} else {
		objOne.style.display = "none";
		objTwo.style.display = "none";
	}
}
/*******************************************************************************
 * 附件上传 iframe 引用
 ******************************************************************************/
function iframeClass() {
	this.url = "/uploadServer";
	this.height = "500";
	this.width = "99.5%";
	this.top = "";
	this.left = "";
	this.id = "myiframe";
	this.stlx = "stlx";
	this.selectTab = "selectTab";
	this.disabled = "disabled";
	this.clid = "";// 材料ID
	this.addObj = "";// 插入指定的对象
	this.clmc = "";// 材料名称
	this.nextUrl = "";
	this.mainid = "";
	this.clfl = "";
	this.selvert = "/uploadServer";
	this.init = function() {
		this.url = "";
		this.height = "500";
		this.width = "100%";
		this.top = "";
		this.left = "overflow-x: hidden; overflow-y: scroll";
		this.id = "myiframe";
		this.stlx = "stlx";
		this.selectTab = "selectTab";
		this.disabled = "disabled";
		this.addObj = "";// 插入指定的对象
		this.clid = "";// 材料ID
		this.clmc = "";// 材料名称
		this.nextUrl = "";
		this.mainid = "";
		this.clfl = "";
	}

	this.loadFrame = function() {
		// showModelessDialog
		openNewWindow(this.loadUrl(), null, this.height, this.width);
	}

	// 弹出框属性设置
	this.loadAuttiics = function() {
		var ifm = "";
		ifm = ifm + " dialogHeight:" + this.height + "; ";
		ifm = ifm + " dialogWidth:" + this.width + "; ";
		ifm = ifm + " center:yes; ";
		return ifm;
	}
	this.loadOpenAuutiics = function() {
		var ifm = "";
		ifm = ifm + "height=" + this.height
		ifm = ifm + ",width=" + this.width
		ifm = ifm + ",top=" + this.top
		ifm = ifm + ",left=" + this.left
		ifm = ifm + ",scrollbars=overflow-x: hidden; overflow-y: scroll"
		ifm = ifm + ",location=no"
		ifm = ifm + ",status=no"
		ifm = ifm + ",modal=yes"
		return ifm;
	}
	this.loadUrl = function() {
		try {
			this.url = this.url + this.selvert;
			this.url = this.addUrlParam(this.url, "id", this.id);
			this.url = this.addUrlParam(this.url, "mainid", this.mainid);
			this.url = this.addUrlParam(this.url, "stlx", this.stlx);
			this.url = this.addUrlParam(this.url, "disabled", this.disabled);
			this.url = this.addUrlParam(this.url, "clid", this.clid);
			this.url = this.addUrlParam(this.url, "clmc", this.clmc);
			this.url = this.addUrlParam(this.url, "addObj", this.addObj);// 当前操作对象ID
			this.url = this.addUrlParam(this.url, "fileType", this.fileType);
			this.url = this.addUrlParam(this.url, "fileSize", this.fileSize);
			this.url = this.addUrlParam(this.url, "maxFile", this.maxFile);
			this.url = this.addUrlParam(this.url, "title", this.title);
			this.url = this.addUrlParam(this.url, "download", this.download);
			this.url = this.addUrlParam(this.url, "preview", this.preview);
			this.url = this.addUrlParam(this.url, "nextUrl", this.nextUrl);
			this.url = this.addUrlParam(this.url, "clfl", this.clfl);

		} catch (e) {
		}
		return this.url;
	}
	this.addUrlParam = function(url, name, value) {// 增加参数的方法
		var tmpurl = "";
		if (url) {
			if (url.indexOf("?") > 0) {
				tmpurl = url + "&" + name + "=" + value;
			} else {
				tmpurl = url + "?" + name + "=" + value;
			}
		}
		return tmpurl;
	}

	this.load = function() {
		var ifm = "";
		ifm = ifm
				+ " <iframe  id='" + this.id + "'  style = 'overflow-x:scroll'   border='0' frameborder='0'   id='myiframe'  ";
		ifm = ifm + " width='" + this.width + "'";
		ifm = ifm + " height='" + this.height + "'";
		ifm = ifm + " src='" + encodeURI(encodeURI(this.loadUrl())) + "'";
		ifm = ifm + "   /></iframe> ";
		document.write(ifm);
		// this.addObj.innerHTML = ifm;
	}
	this.loadTr = function() {// 增加在对象的下面，而不是弹出对话框
		try {
			var ifm = document.createElement("iframe");
			ifm.setAttribute("name", "myAddFjIframe");
			this.loadUrl();
			ifm.src = this.url;
			this.addObj.appendChild(ifm);
		} catch (e) {
			alert(" newiframeClass newiframeClass 错误： " + e);
		}

	}
	this.getTrIframe = function(objtr, fobj) {// 先判断是否有没有 如果有则返回找到的对象
		var isHave = false;
		if (objtr) {
			if (objtr.name == "haveIfameTr") {// 代表有
				fobj.removeChild(objtr);
			}
		}
		return isHave;
	}

}
var miframe = new iframeClass();
miframe.init();

/**
 * 文件是否不超过允许的最大SIZE
 */
function checkFileSize(filePath, maxSize) {
	try {
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var fl = fso.GetFile(filePath);
		if (fl.Size > maxSize) {
			return false;
		} else {
			return true;
		}
	} catch (e) {
		return true;
	}
}

/*
 * 检验文件类型
 */
function checkFileType(filePath) {
	var tail = filePath.substring(filePath.length - 3, filePath.length);
	var pa = /pdf|jpg|jpeg|doc|xls/;
	if (!pa.test(tail)) {
		return false;
	} else {
		return true;
	}
}

/**
 * 文件上传前的检验
 */
function checkUploadFile(fieldId) {
	var filePath = document.getElementById(fieldId).value;
	if (filePath == "") {
		alert("请选择文件！");
		return false;
	}
	var filename = filePath.toLowerCase();
	if (!checkFileType(filename)) {
		alert("不是合法的 pdf、jpg、jpeg、word、excel的文件！");
		return false;
	}
	if (!checkFileSize(filePath, 10850000)) {
		alert("文件大小不能超过10M！");
		return false;
	}
	uploading();
	return true;
}
// ///////////////////////////////////////////////////////////////////////////
// ///////////////////////////////添加附件
function newIfameAddFjClass(obj, webRoot) {
	this.mwebRoot = "";// 根目录
	this.mdisabled = "true";// 是否只读
	this.mstlx = "29";// 实体类型
	this.mcurrObj = "";// 被单击的对象
	this.clid = "";// 材料ID
	this.clmc = "";// 材料名称
	this.mainid="";//主键
	this.clfl = "";//材料分类
	this.init = function() {// 初始化
		this.mwebRoot = "";// 根目录
		this.mdisabled = "true";// 是否只读
		this.mstlx = "29";// 实体类型
		this.mcurrObj = "";// 被单击的对象
		this.clid = "";// 材料ID
		this.clmc = "";// 材料名称
		this.mainid="";//主键
		this.clfl="";//材料分类
	}
	this.getTdValue = function(ftr, mc) {
		var clmc = "";// 材料名称
		if (ftr) {
			var tds = ftr.getElementsByTagName("td");
			for (var i = 0; i < tds.length; i++) {
				var id = tds[i].id;
				if (id) {
					var index = id.lastIndexOf(":");
					if (index) {
						var tmp = id.substring(index + 1, id.length);
						if (tmp == mc) {
							// alert(id);
							clmc = tds[i].innerText;
						}
					}
				}

			}
		}
		return clmc;
	}
	this.getTdValueById = function(ftr, mc) {
		var clmc = "";// 材料名称
		if (ftr) {
				var id = ftr.id;
				if (id) {
					var index = id.lastIndexOf(":");
					if (index) {
						var tmp = id.substring(0, index+1);
						var clmcObj = document.getElementById(tmp+mc);
						if (clmcObj) {
							clmc = clmcObj.innerText;
						}
					}
				}
		}
		return clmc;
	}
	this.madd = function() {
		try {

			var newiframe = new iframeClass();
			newiframe.init();// 初始化
			// 构造IFARME属性 和业务参数
			//newiframe.height = "400px";// 高度
			//newiframe.width = "700px";// 宽度
			//newiframe.top = "300";// 宽度
			//newiframe.left = "300";// 宽度
			newiframe.mainid = this.mainid;//mainid
			newiframe.height = "600";
			newiframe.width = "800";
			newiframe.top = (window.screen.availHeight-30-600)/2; //获得窗口的垂直位置;
			newiframe.left = (window.screen.availWidth-10-800)/2; //获得窗口的水平位置;
			newiframe.stlx = this.mstlx;// 实体类型
			newiframe.disabled = this.mdisabled;// 是否只读
			newiframe.url = this.mwebRoot;// 根目录
			newiframe.clid = this.clid;// 材料ID
			newiframe.clmc = this.clmc;// 材料名称
			newiframe.clfl = this.clfl;// 材料分类
			newiframe.addObj = this.mcurrObj;// 获得当前对象的ID
			newiframe.loadFrame();

		} catch (e) {
			// alert(" newIfameAddFjClass 类的 madd 方法 错误："+e);
		}
	}
	this.getObj = function(mname) {
		// 根据名称获得对象
		var tables = document.getElementsByTagName("table");

	}
}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////// 验证码 IFRAME
function yziframeClass() {
	this.url = "/uploadServer";
	this.color = "";
	this.height = "20px";
	this.width = "99.5%";
	this.top = "";
	this.left = "";
	this.addObj = "";
	this.id = "";
	this.frameborder = "0";
	this.scrolling = "no";
	this.allowTransparency = "false";
	this.init = function() {
		this.height = "20px";
		this.width = "99.5%";
		this.top = "";
		this.left = "";
		this.addObj = "";
		this.color = "";
		this.id = "myAddFjIframe";
		this.frameborder = "0";
		this.scrolling = "no";
		this.allowTransparency = "false";
	}
	this.load = function() {
		try {
			var ifm = "";
			ifm = ifm + " <iframe       ";
			ifm = ifm + " frameborder='" + this.frameborder + "'  ";
			ifm = ifm + " scrolling='" + this.scrolling + "'  ";
			ifm = ifm + " id='" + this.id + "' ";
			ifm = ifm + " name='" + this.id + "' ";
			ifm = ifm + " style='" + this.laodstyle() + "' ";
			ifm = ifm + " src='" + this.loadUrl() + "' ";

			ifm = ifm + " allowTransparency='" + this.allowTransparency + "' ";
			ifm = ifm + "   /></iframe> ";
			this.addObj.innerHTML = ifm;

		} catch (e) {
			// alert(" yziframeClass newiframeClass 错误： "+e);
		}
	}
	this.setBodyTM = function() {// 设置透明
		try {
			// var tmp = "#{param['color']}"; JSF页面获得页面传过来的值
			var color = "";
			color = "transparent";
			document.body.style.backgroundColor = color;
		} catch (e) {
			// alert(e);
		}
	}
	this.laodstyle = function() {
		var mstyle = "";
		mstyle = mstyle + "height:" + this.height + ";";
		mstyle = mstyle + "width:" + this.width + ";";
		mstyle = mstyle + "top:" + this.top + ";";
		mstyle = mstyle + "left:" + this.left + ";";
		return mstyle;
	}

	this.load2 = function() {
		try {
			var ifm = document.createElement("iframe");
			ifm.setAttribute("name", this.id);
			ifm.setAttribute("id", this.id);
			ifm.setAttribute("scrolling", "no");
			ifm.setAttribute("frameborder", 0);

			this.loadUrl();
			ifm.src = this.url;
			this.addObj.appendChild(ifm);
			ifm.style.height = this.height;
			ifm.style.width = this.width;
			ifm.style.top = this.top;
			ifm.style.left = this.left;
			ifm.style.border = "0px";
			ifm.style.margin = "0px";
			ifm.style.padding = "0px";
		} catch (e) {
			// alert(" yziframeClass newiframeClass 错误： "+e);
		}
	}
	this.loadUrl = function() {
		try {
			this.url = this.addUrlParam(this.url, "color", this.color);

		} catch (e) {
		}
		return this.url;
	}
	this.addUrlParam = function(url, name, value) {// 增加参数的方法
		var tmpurl = "";
		if (url) {
			if (url.indexOf("?") > 0) {
				tmpurl = url + "&" + name + "=" + value;
			} else {
				tmpurl = url + "?" + name + "=" + value;
			}
		}
		return tmpurl;
	}
	this.getTrIframe = function(objtr, fobj) {// 先判断是否有没有 如果有则返回找到的对象
		var isHave = false;
		if (objtr) {
			if (objtr.name == "haveIfameTr") {// 代表有
				fobj.removeChild(objtr);
			}
		}
		return isHave;
	}

}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 全选触发的事件
function fileSelectAll(obj) {
	try {

		var mtable = obj.parentNode.parentNode.parentNode.parentNode;// 获得TABLE
		if (mtable) {
			var checkBoxObj = mtable.getElementsByTagName('input');
			for (var i = 0; i < checkBoxObj.length; i++) {
				if (checkBoxObj[i].type == 'checkbox') {
					if (checkBoxObj[i].id != "selectAll") {
						checkBoxObj[i].checked = obj.checked;
					}
				}
			}
		}

	} catch (e) {
		alert(" 调全选按钮位置 moveSelectAll 错误：" + e);
	}
}
// ////////////////////////////////////////////////////////////////////////////////////////

// ///////////////////////////////////////////////////////////////////////////
// //////////// 附件上传后，对于材料页面的影响，此JS类在 WXzspAdminAccrela.xml 实力化
// 子窗口新增或者删除影响到本身的方法
function ChildAddFjClass() {
	this.mtable = "";
	this.mid = "";
	this.init = function() {// 初始化
		this.mtable = "";
		this.mid = "";
	}
	
	
	this.getSum = function(objid,newValue){
		if (objid) {
				var obj = document.getElementById(objid);
				var value = obj.value;
				var begian = value.indexOf("(") + 1;
				var end = value.indexOf(")");
				var strB = value.substring(0, begian);
				var strE = value.substring(end, value.length);
				if (obj) {
					obj.value = strB + newValue + strE;
				}
		}
	}
	
	this.add = function(obj) {// 新增对父窗口的影响
		try {
			this.addOrDelete(obj, "1");
			/*
			 * if(obj){ obj.checked = "checked"; }
			 */
		} catch (e) {

		}
	}
	this.detele = function(obj) {// 删除对父窗口的影响
		try {

			this.addOrDelete(obj, "2");
			/*
			 * if(obj){ obj.checked = ""; }
			 */
		} catch (e) {

		}
	}
	this.addOrDelete = function(objid, type) {
		if (objid) {
			var obj = document.getElementById(objid);
			if (obj) {
				var value = obj.value;// 获得对应的值
				var sum = 0;
				var strB = "";
				var strE = "";
				if (value) {

					var begian = value.indexOf("(") + 1;
					var end = value.indexOf(")");
					sum = value.substring(begian, end);
					strB = value.substring(0, begian);
					strE = value.substring(end, value.length);
					if (sum) {
						if (type == "1") {// 增加
							sum = parseInt(sum) + 1;
						}
						if (type == "2") {// 删除
							sum = parseInt(sum) - 1;
						}
						if (parseInt(sum) < 0) {
							sum = 0;
						}
						obj.value = strB + sum + strE;
					}
				}
			}

		}

	}
	this.getObj = function(clmc) {
		var tab = document.getElementById(this.mtable);
		var checkm = "";
		if (tab) {
			var tds = tab.getElementsByTagName("td");
			for (var i = 0; i < tds.length; i++) {
				var id = tds[i].id;
				if (id) {
					var index = id.lastIndexOf(":");
					if (index) {
						var tmp = id.substring(index + 1, id.length);
						if (tmp == this.mid) {
							var td = tds[i];
							if (td.innerText == clmc) { // 找到了这列
								var tr = td.parentNode;// 找到这行
								var inputs = tr.getElementsByTagName("input");
								for (var k = 0; k < inputs.length; k++) {
									var chek = inputs[k];
									if (chek.type == "checkbox"
											|| chek.type == "CHECKBOX") {
										checkm = chek;
										break;
									}
								}
							}

						}
					}
				}
			}
		}
		return checkm;
	}

}

// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////

function afterClose(cascade) {
	if (cascade != '') {
		eval('var _Cascade = new ' + cascade + '();');
		if (_Cascade) {
			for (var p in _Cascade) {
				if (typeof _Cascade[p] == "function") {
					_Cascade[p]();
				}
			}
		} else {
			eval(cascade + '();');
		}
	}
}

// ////////////////////////////////////////////////////////////////////
// ////////////////// 查询已有信息

function SelectAjaxInfoClass() {

	this.url = "";// 访问的URL
	this.beanName = "";// 后台BEAN名
	this.functionName = "";// 后台BEAN 执行方法名
	this.cxWhereID = "";// 查询条件 ID
	this.childCxWhere = "";// 子窗直接传参数查询
	this.isChild = false;// 是否是子窗口
	this.redirectUrl = "";// this.showConfirm 跳转的页面
	this.isInternetAjaxRequest = "isInternetAjaxRequest1";// 查询几次 //二次
															// isInternetAjaxRequest2
	this.selectImgName = "ajaxSelectImgName";
	this.webRoot = "";
	this.returnFunction = "";
	// 构造方法
	this.init = function() {
		this.url = "";// 访问的URL
		this.beanName = "";// 后台BEAN名
		this.functionName = "";// 后台BEAN 执行方法名
		this.cxWhereID = "";// 查询条件
		this.childCxWhere = "";// 子窗直接传参数查询
		this.isChild = false;// 是否是子窗口
		this.isInternetAjaxRequest = "isInternetAjaxRequest1";// 查询几次 //二次
																// isInternetAjaxRequest2
		this.selectImgName = "ajaxSelectImgName";
		this.webRoot = "";
		this.returnFunction = "";
	}
	// 子窗体调用父窗口体方法 查询数据 返回
	this.getAjaxValue_Fatch = function() {
		self.opener.selectAjaxInfo.isChild = true;// 是否是子窗口
		self.opener.selectAjaxInfo.beanName = this.beanName;
		self.opener.selectAjaxInfo.functionName = this.functionName;
		self.opener.selectAjaxInfo.childCxWhere = this.childCxWhere;
		self.opener.selectAjaxInfo.isInternetAjaxRequest = this.isInternetAjaxRequest;
		self.opener.selectAjaxInfo.getAjaxValue();
		window.close();// 关闭窗口
	}

	// 获得值
	this.getAjaxValue = function() {
		try {
			var ajaxReuqest = new AjaxReuqestClass();
			ajaxReuqest.init();
			ajaxReuqest.url = this.url;
			ajaxReuqest.beanName = this.beanName;
			ajaxReuqest.functionName = this.functionName;
			ajaxReuqest.cxWhere = "";
			if (this.isChild) {
				ajaxReuqest.cxWhere = this.childCxWhere;// 比值获得这个值 子窗口传过来的
				this.isChild = false;
			} else {
				var cxWhereObj = document.getElementById(this.cxWhereID);// 查询条件
																			// ID
																			// 获得查询条件
				if (cxWhereObj) {
					ajaxReuqest.cxWhere = cxWhereObj.value;
				}

			}
			ajaxReuqest.isInternetAjaxRequest = this.isInternetAjaxRequest;

			var objXml = "";

			objXml = ajaxReuqest.sendAjax(arguments);// 获得信息

			if (!objXml) {
				objXml = ajaxReuqest.sendAjax(arguments);// 获得信息
			}
			if (objXml) {

				var root = objXml.getElementsByTagName("root");
				if (!root) {

					objXml = ajaxReuqest.sendAjax(arguments);// 再获得一次信息
				} else {
					if (objXml.getElementsByTagName("root").length == 0) {
						objXml = ajaxReuqest.sendAjax(arguments);// 再获得一次信息
					}
				}
			}
			// 删除图片显示一张图片
			// this.deletSelectImg(this.cxWhereID,this.selectImgName);
			
			this.forAjaxValue(objXml);
			if (this.returnFunction != '') {
				afterClose(this.returnFunction);
			}
		} catch (e) {
			alert(e);
			return false;
		}
		return false;
	}
	this.getFunctionArguments = function() {

	}
	// 赋值 传从后台获得的XML文档 遍历
	this.forAjaxValue = function(mdata) {
		try {
			var mchildren = "";
			var mtitle = "没有查询到信息";// 标题
			var mcolor = "red";// 颜色
			var mfobj = "";
			var cxWhereObj = document.getElementById(this.cxWhereID);// 查询条件的标记
			if (cxWhereObj) {// 获得查询条件的标记的父标记
				mfobj = cxWhereObj.parentNode;
			}
			this.hideTitle(mfobj, "seltitle"); // 把以前的提示删除
			if (mdata) {
				if (mdata.getElementsByTagName("root").length > 0) {
					mchildren = mdata.getElementsByTagName("root")[0].childNodes;
					if (mchildren) { // fireFox下 会将空格，换行一并作为childNodes
						for (var i = 0; i < mchildren.length; i++) {
							var mchild = mchildren[i];// 获得节点

							var value = "";
							var id = "";
							var type = "";
							try {
								value = mchild.firstChild.data;// 获得显示值
								id = mchild.getAttribute("id");// 获得 ID 属性
								type = mchild.getAttribute("type");// 获得 ID 属性
							} catch (e) {// fireFox下 保证childNode取ID和TYPE不出错！
								value = mchild.data;// 获得显示值
								id = "";// 获得 ID 属性
								type = "";// 获得 ID 属性
							}
							if (value == null)
								value = "";
							if (type == "0") {// 将数据赋到当前页
								if (id != this.cxWhereID) {
									this.setAjaxValue(id, value);
									if(value=='show'){										
										this.setAjaxStyle(id,value);										
									}else if(value=='hide'){										
										this.setAjaxStyle(id,value);
									}
								}
							} else if (type == "1") {// 用红颜色显示返回结果
								mtitle = value;
								mcolor = "red";
								this.showText(mtitle, mcolor, mfobj);
							} else if (type == "11") {// 用黑颜色显示返回结果
								mtitle = value;
								mcolor = "#000000";
								this.showText(mtitle, mcolor, mfobj);
							} else if (type == "2") {// 用 消息框 显示返回结果
								this.showMessage(value);
							} else if (type == "3") {
								this.showFrame(value);
							} else if (type == "4") {
								this.setAjaxValue(id, value);
							} else if (type == "5") {
								mtitle = value;
								mcolor = "red";
								nameTitle = mtitle;
								if (nameTitle == "可以注册!") {
									nameIsOk = true;
								} else {
									nameIsOk = false;
								}
								this.showText(mtitle, mcolor, mfobj);
							} else if (type == "6") {// 将数据 转化HTML 作为节点
														// 市级独立用到
								if (id != this.cxWhereID) {
									this.setAjaxHtml(value);
								}
							} else if (type == "7") {// 弹出 confirm对话框
								this.showConfirm(id, value);
							} else if (type == "8") {// 设为只读

								this.setValueAndReadOnly(id, value);

							} else if (type == "9") {// 将子表的记录数改变
								this.changeChildSum(id, value);
							} else if (type == "10") {

								this.setValueAndReadOnlyIncludeWhereID(id,
										value);
							} else if (type == "12") {// 将数据赋值给多选框控件
								this.setValueManyCheckbox(id, value);
							} else if (type == "13") {// 将数据赋值给多选框控件
								this.setValueForRadio(id, value);
							}

						}
					} else {
						this.showText(mtitle, mcolor, mfobj);
					}
				} else {
					this.showText(mtitle, mcolor, mfobj);
				}
			}
		} catch (e) {
			alert(e)
		}
	}

	// 赋值
	this.setAjaxValue = function(id, value) {
		try {
			var obj = document.getElementById(id);
			if (obj) {
				if (value == "null") {
					value = "";
				}
				obj.value = value;
				if(id == 'dgfq'){
				obj.innerHTML = value;
				}
			}
		} catch (e) {
			// alert("赋值错误："+e);
		}
	}
	//是否显示
	this.setAjaxStyle = function(id,value) {
		try {
			var obj = document.getElementById(id);			
			if (obj) {
				if(value=='show'){
					document.getElementById(id).style.display='';
				}else if(value=='hide'){
					document.getElementById(id).style.display='none';
				}
			}
		} catch (e) {
			alert("隐藏对象出错："+e);
		}
	}
	
	// 将数据赋值给多选框控件(仅限以“,”隔开的数据)
	this.setValueManyCheckbox = function(id, value) {
		try {
			var obj = document.getElementsByName(id);
			if (obj) {
				var result = value.split(",");
				for(var i=1;i<obj.length;i++){
					for(var j=0;j<result.length;j++){
						if(result[j] != ""){
							if(obj[i].value == result[j]){
								obj[i].checked = true;
								break;
							}else{
								obj[i].checked = false;
							}
						}
					}
				}
			}
		} catch (e) {
			// alert("this.setValueManyCheckbox 错误：id="+id+" value="+value+"
			// "+e);
		}
	}
	
	// 将数据赋值给单选框控件
	this.setValueForRadio = function(id, value) {
		try {
			var obj = document.getElementsByName(id);
			if (obj) {
				for(var i=1;i<obj.length;i++){
					if(value != ""){
						if(obj[i].value == value){
							obj[i].checked = true;
							break;
						}else{
							obj[i].checked = false;
						}
					}else{
						obj[i].checked = false;
					}
				}
			}
		} catch (e) {
		}
	}

	/***************************************************************************
	 * 医疗器械监管 查询已有 没有查询到信息时 提示是否新增
	 * 
	 **************************************************************************/
	this.showConfirm = function(id, value) {
		if (confirm(value)) {
			if (id == "appcheckScProduceListBean") {// 首营产品、首次生产品种特殊处理
				showDialog(this.redirectUrl, '200px', '300px');
				return false;
			} else {
				selectAjaxInfo.beanName = id;
				selectAjaxInfo.functionName = 'addNew';
				selectAjaxInfo.cxWhereID = '';
				selectAjaxInfo.isInternetAjaxRequest = "isInternetAjaxRequest1";
				selectAjaxInfo.getAjaxValue()
			}
			uifjs.noYzSubmit();
		} else {
			return false;
		}
	}

	this.setValueAndReadOnly = function(id, value) {
		try {
			var obj = document.getElementById(id);
			if (id != this.cxWhereID) {
				this.setAjaxValue(id, value);
				if (obj) {
					if (obj.tagName == "INPUT" || obj.tagName == "input") {
						obj.readOnly = "true";
						obj.className = 'readonlyTextInput';
					} else if (obj.tagName == "SELECT"
							|| obj.tagName == "select") {
						obj.disabled = "true";
					} else if(obj.tagName == "textarea" || obj.tagName == "TEXTAREA"){
						obj.readOnly = "true";
					    obj.className = "readonlyTextArea";
					}
					// ///根据区域类别显示相应的区域或者地区
					if (id == "exchangeCorpBean_form:quylb") {
						var tds = document.getElementsByTagName("td");
						var trs = document.getElementsByTagName("tr");
						if (value == 0) {
							trs["_ssdq"].style.display = "";
							tds["_wldwssdq"].className = "rich-table-fiverow6-pic";
							qyyz.ssdqRequired = true;
							trs["_ssqy"].style.display = "none";
							qyyz.qyRequired = false;

						} else {
							trs["_ssqy"].style.display = "";
							tds["_qy"].className = "rich-table-fiverow6-pic";
							qyyz.qyRequired = true;

							trs["_ssdq"].style.display = "none";
							qyyz.ssdqRequired = false;
						}

					} else if (id == "exchangeCorpBean_form:wldwssdq") {
						// /清楚所属地区的选择事件
						var childNodes = obj.parentNode.childNodes;
						for (var j = 0; j < childNodes.length; j++) {
							if (childNodes[j].onclick) {
								childNodes[j].onclick = "function(){}";
							}
						}
						// obj.className = '';
						obj.disabled = "true";
					}

				}

			}
		} catch (e) {
			// alert("this.setValueAndReadOnly 错误：id="+id+" value="+value+"
			// "+e);
		}
	}
	this.setValueAndReadOnlyIncludeWhereID = function(id, value) {
		try {
			var obj = document.getElementById(id);
			this.setAjaxValue(id, value);
			if (obj) {
				if (obj.tagName == "INPUT" || obj.tagName == "input") {
					obj.readOnly = "true";
					obj.className = 'readonlyTextInput';
				} else if (obj.tagName == "SELECT" || obj.tagName == "select") {
					obj.disabled = "true";
				}
			}
		} catch (e) {
			// alert("this.setValueAndReadOnly 错误：id="+id+" value="+value+"
			// "+e);
		}
	}
	// 市级独立 事项 根据注册地 显示可申报的药监局
	this.setAjaxHtml = function(value) {
		try {
			var yjjArray = "";
			var trObj = document.getElementById("sbyjjList");
			var tdObj = "";
			var radioObj = "";
			var textObj = "";
			if (value == "null") {
				for (var i = 0; i < 5; i++) {
					if (trObj.firstChild) {
						trObj.removeChild(trObj.firstChild);
					}
				}
				document.getElementById("xzspAcceptSelectXzqhForm:comfirm").disabled = "false";
				selected(this, "");
			} else {
				yjjArray = value.split("$#");
				if (trObj) {
					for (var i = 0; i < 5; i++) {
						if (trObj.firstChild) {
							trObj.removeChild(trObj.firstChild);
						}
					}
					for (var j = 0; j < yjjArray.length - 1; j++) {
						if (j % 2 == 0) {
							tdObj = document.createElement("td");
							if (j == yjjArray.length - 3) {
								try {
									radioObj = document
											.createElement("<input name='sbyjj' id='yjjchecked' checked onclick=selected(this,'"
													+ yjjArray[j] + "')>");
									selected(this, yjjArray[j]);
								} catch (e) {//ie9 以上 无法.createElement("<input>") 无法在dom未完成时添加onclick，在页面添加了绑定onclick方法。
									radioObj = document.createElement("input");
									radioObj.setAttribute("id", "yjjchecked");
									radioObj.setAttribute("name", "sbyjj");
									radioObj.checked = true;	
								}

								
							} else {
								try {
									radioObj = document
											.createElement("<input name='sbyjj' onclick=selected(this,'"
													+ yjjArray[j] + "')>");
								} catch (e) {//ie9 以上 无法.createElement("<input>") 无法在dom未完成时添加onclick，在页面添加了绑定onclick方法。
									radioObj = document.createElement("input");
									radioObj.setAttribute("name", "sbyjj");	
								}
							}
							textObj = document.createTextNode(yjjArray[j]);
							tdObj.setAttribute("className",
									"rich-table-fiverow6-notbt")
							tdObj.setAttribute("class",
									"rich-table-fiverow6-notbt")
							radioObj.setAttribute("type", "radio");
							radioObj.value = yjjArray[j + 1];
							tdObj.appendChild(radioObj);
							tdObj.appendChild(textObj);
							trObj.appendChild(tdObj);
						}
					}
				}
				var sbyjjs = document.getElementsByName("sbyjj");
				document.getElementById("xzspAcceptSelectXzqhForm:sbyjj").value = sbyjjs["yjjchecked"].value;
				// document.getElementById("xzspAcceptSelectXzqhForm:comfirm").removeAttribute("disabled");
				// 添加复选框的设置
				document.getElementById("prom").removeAttribute("disabled");
			}
		} catch (e) {
			alert("赋值错误：" + e);
		}
	}
	// 用消息框 显示提示信息
	this.showMessage = function(mtitle) {
		alert(mtitle);
	}
	// 显示提示
	this.showText = function(mtitle, mcolor, mfobj) {
		try {
			if (mfobj) {
				var text = document.createTextNode(mtitle);
				var span = document.createElement("span");
				span.setAttribute("name", "seltitle");
				span.style.color = mcolor;
				span.appendChild(text);
				var obj = document.getElementsByName("seltitle");
				if (obj) {
					for (var i = 0; i < obj.length; i++) {
						obj[i].remove(obj[i].firstChild);
					}
				}
				mfobj.appendChild(span);
			}
		} catch (e) {
			alert("this.showText() 显示错误：" + e);
		};
	}
	// 用弹出框提示
	this.showFrame = function(murl) {
		var obj = document.getElementsByName("seltitle");
		if (obj) {
			for (var i = 0; i < obj.length; i++) {
				obj[i].remove(obj[i].firstChild);
			}
		}
		openNewWindow(murl, "查询信息");
	}
	// /改变子表记录数
	this.changeChildSum = function(spaname, spavalue) {
		try {
			var spa = document.getElementById(spaname);
			if (spa) {
				if (spa.firstChild) {
					spa.removeChild(spa.firstChild);
				}
				var textNode = document.createTextNode(spavalue);
				spa.appendChild(textNode);

			}
		} catch (e) {
			alert("改变父窗的某个 标记 的值: " + e);
		}
	}

	this.loadOpenAuutiics = function() {
		// //////////计算TOP和LEFT的位置
		var left = 0;
		var top = 50;
		var height = 600;
		var width = 800;
		try {
			var availWidth = window.screen.availWidth;// 返回当前屏幕宽度(空白空间)
			var availHeight = window.screen.availHeight;// 返回当前屏幕高度(空白空间)
			left = (availWidth - width) / 2;
			if (height < availHeight) {
				top = (availHeight - height) / 2;
			}
		} catch (e) {

		}

		var ifm = "";
		ifm = ifm + "height=" + height
		ifm = ifm + ",width=" + width
		ifm = ifm + ",top=" + top
		ifm = ifm + ",left=" + left
		ifm = ifm + ",scrollbars=yes"
		ifm = ifm + ",location=no"
		ifm = ifm + ",status=no"
		ifm = ifm + ",modal=yes"
		return ifm;
	}

	// 删除提示
	this.hideTitle = function(mfobj, name) {
		try {
			if (mfobj) {
				for (var j = 0; j < mfobj.childNodes.length; j++) {
					var chlidobj = mfobj.childNodes[j];
					if (chlidobj.name == name) {
						mfobj.removeChild(chlidobj);
					}
				}
			}
		} catch (e) {
			alert(" this.hideTitle() 删除错误：" + e);
		}
	}
	this.showSelectImg = function() {
		this.showSelectImgTwo(this.cxWhereID, this.selectImgName, this.webRoot)
	}
	// /显示一张图片
	this.showSelectImgTwo = function(id, imgName, webRoot) {
		try {
			var cxWhereObj = document.getElementById(id);// 查询条件的标记
			if (cxWhereObj) {// 获得查询条件的标记的父标记
				var mfobj = cxWhereObj.parentNode;
				if (mfobj) {
					// 看是否有这个IMG，有的话先删除
					this.deletSelectImg(id, imgName);
					var img = "";
					// <img id='imgSelect' style='display:none'
					// src='#{facesSourceBean.webRoot}/images/loading/blue-loading.gif'
					// alt="查询已有" />
					// alert("新增图品");
					img = document.createElement("img");
					img.setAttribute("name", imgName);
					img.setAttribute("alt", "查询中");
					img.setAttribute("src", webRoot
									+ "/images/loading/blue-loading.gif");
					mfobj.appendChild(img);

				}
			}
		} catch (e) {

		}
	}
	// 删除图片
	this.deletSelectImg = function(id, imgName) {
		try {
			var cxWhereObj = document.getElementById(id);// 查询条件的标记
			if (cxWhereObj) {// 获得查询条件的标记的父标记
				var mfobj = cxWhereObj.parentNode;
				if (mfobj) {
					var img = this.selectSelectImg(mfobj, imgName);
					if (img) {
						mfobj.removeChild(img);
					}
				}
			}
		} catch (e) {
			alert(" this.deletSelectImg() 删除图片 错误：" + e);
		}
	}
	// 寻找图片
	this.selectSelectImg = function(obj, name) {
		var backObj = "";
		try {
			if (obj) {
				for (var j = 0; j < obj.childNodes.length; j++) {
					var chlidobj = obj.childNodes[j];
					if (chlidobj.name == name) {
						backObj = chlidobj;
					}
				}
			}
		} catch (e) {
			alert(" this.hideTitle() 删除错误：" + e);
		}
		return backObj;
	}
}
var selectAjaxInfo = new SelectAjaxInfoClass();
selectAjaxInfo.init();

// //////////////////////////////////////////////////////////////////
// ////////////////// AJAX 请求
function AjaxReuqestClass() {
	this.url = "";// 访问的URL
	this.beanName = "";// 后台BEAN名
	this.functionName = "";// 后台BEAN 执行方法名
	this.cxWhere = "";// 查询条件
	this.isInternetAjaxRequest = "isInternetAjaxRequest1";// 查询几次 //二次
															// isInternetAjaxRequest2
	// 构造方法
	this.init = function() {
		this.url = "";// 访问的URL
		this.beanName = "";// 后台BEAN名
		this.functionName = "";// 后台BEAN 执行方法名
		this.cxWhere = "";// 查询条件
		this.isInternetAjaxRequest = "isInternetAjaxRequest1";// 查询几次 //二次
																// isInternetAjaxRequest2
	}
	this.newXmlRequest = function() {
		var xhr = "";
		if (window.XMLHttpRequest) { // Mozilla 浏览器
			xhr = new XMLHttpRequest();
			if (xhr.overrideMimeType) {// 设置MiME类别
				xhr.overrideMimeType('text/xml');
			}
		} else if (window.ActiveXObject) { // IE浏览器
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
				}
			}
		}
		return xhr;
	}
	// 传个FROM
	this.sendAjax = function(paranmes) {
		var xhr = this.newXmlRequest();

		var murl = this.loadUrl(paranmes);
		xhr.open("POST", murl, false);
		xhr.setRequestHeader("context-type", "text/xml;charset=GBK");
		xhr.send();
		var backdata = "";
		switch (xhr.status) {
			case 200 :
				// responseText responseXML
				// alert(xhr.responseText);
				backdata = xhr.responseXML;
				break;
			case 401 :
				break;
			default :
		}
		return backdata;
	}

	// 构造执行URL
	this.loadUrl = function(paranmes) {
		if (!this.url) {
			this.url = document.URL;
		}
		var tmpurl = "";
		tmpurl = this.addParam(this.url, "isInternetAjaxRequest="
						+ this.isInternetAjaxRequest);// 表示为 ajax执行
		tmpurl = this.addParam(tmpurl, "beanName" + "=" + this.beanName);// 增加参数执行
																			// BEAN名
		tmpurl = this
				.addParam(tmpurl, "functionName" + "=" + this.functionName);// 增加参数
																			// 方法名
		tmpurl = this.addParam(tmpurl, "cxWhere" + "=" + this.cxWhere);// 增加参数
																		// 查询条件
		// //根据参数集，构造其他查询条件

		try {
			for (var i = 0; i < paranmes.length; i++) {
				tmpurl = this.addParam(tmpurl, "functionParam" + (i + 1) + "="
								+ paranmes[i]);
			}
		} catch (e) {
		}

		return tmpurl;
	}

	// 增加参数的方法
	this.addParam = function(url, pram) {
		var tmpurl = "";
		if (url) {
			if (url.indexOf("?") > 0) {
				tmpurl = url + "&" + pram;
			} else {
				tmpurl = url + "?" + pram;
			}
		}
		return tmpurl;
	}

}

// //////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////
// 弹出框显示数据后，点击一条数据，刷新父窗口的数据，处理方式
this.showFrame_toFathValue = function() {

}
// ////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////
// /////////////////////// 修改传值
function toBackBeeaValue(name, mvalue) {
	var obj = document.getElementById(name);
	if (obj) {
		obj.value = mvalue;
	}
}
// ////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////弹出提示框
var sbTitle = "是否确定上报药监局，上报后将不可修改！"
function showMessage(title) {
	try {
		if (typeof(sbConfirm)!="undefined") {///bug[Q130152319531]
			if(typeof(eval(sbConfirm)) == "function"){
				return sbConfirm(title);
			}else{
				return confirm(title);
			}
        }else{
        	  return confirm(title);
        }
    } catch(e) {alert(e);}
  
	
	
}
// /////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////// 验证
function saveYzCalss() {
	this.ok = false;
	this.title = "";
	this.init = function() {
		this.ok = false;
		this.title = "";
	}
	this.yz_Length = function(id, size, mtitle) { // 验证长度和非空，字符串
		try {
			var obj = document.getElementById(id);
			if (obj) {
				if (!obj.value) {
					this.title_notNull(mtitle);
				} else {
					this.textCounter(obj.value,mtitle, size);
				}
			} else {
				// alert("未取到验证对象！！！！");
			}
		} catch (e) {

		}
	}

	this.yz_Length_dy = function(id, size, mtitle) { // 验证长度，字符串
		try {
			var obj = document.getElementById(id);
			if (obj) {
				if (obj.value) {
					this.textCounter(obj.value,mtitle, size);
				}
			} else {
				// alert("未取到验证对象！！！！");
			}
		} catch (e) {

		}
	}

	this.yz_is_Sum = function(id, mtitle, yzNull) { // 验证是否是数字
		var obj = document.getElementById(id);
		var oNum = "";
		if (obj)
			oNum = obj.value;
		if (!oNum) {
			if (yzNull) {
				this.title_notNull(mtitle);
			}

		} else {
			var strP = /^\d+(\.\d+)?$/;
			if (!strP.test(oNum)) {
				this.title_sum(mtitle);
				return;
			}
			try {
				if (parseFloat(oNum) != oNum) {
					this.title_sum(mtitle);
				}
			} catch (e) {
				this.title_sum(mtitle);
			}
		}
	}
	this.yz_is_Sum_two = function(id, mtitle, yzNull, msize) { // 验证是否是数字
																// 不做非空判断
		var obj = document.getElementById(id);
		var oNum = "";
		if (obj)
			oNum = obj.value;
		var strP = /^\d+(\.\d+)?$/;
		if (!oNum) {
			return;
		}
		if (!strP.test(oNum)) {
			this.title_sum(mtitle);
			return;
		}
		try {
			var msum = parseFloat(oNum);
			if (msum != oNum) {
				this.title_sum(mtitle);
			}
		} catch (e) {
			this.title_sum(mtitle);
		}

	}

	this.yz_is_Sum_size = function(id, mtitle, msize) { // 验证是否是数字 和数字大小
		var obj = document.getElementById(id);
		var oNum = "";
		if (obj)
			oNum = obj.value;
		var strP = /^\d+(\.\d+)?$/;
		if (!oNum) {
			return;
		}
		if (!strP.test(oNum)) {
			this.title_sum(mtitle);
			return;
		}
		try {
			var msum = parseFloat(oNum);
			if (msum != oNum) {
				this.title_sum(mtitle);
			} else {// 将数字验证长度
				if (msize) {
					if (msum > msize) {
						this.title_sum_dy(mtitle, msize);
					}
				}
			}
		} catch (e) {
			this.title_sum(mtitle);
		}

	}

	this.title_notNull = function(mtitle) {
		this.title = this.title + " 必填项 \"" + mtitle + "\" 没有填写, 请填写！" + "\n";
	}
	this.title_xySize = function(mtitle, size) {
		this.title = this.title + "\"" + mtitle + "\" 长度不能超过 " + size/2 + " 个汉字或 " + size + " 个字符"
				+ "\n";
	}
	this.title_sum = function(mtitle) {
		this.title = this.title + "\"" + mtitle + "\" 必须是数字 " + "\n";
	}

	this.title_sum_dy = function(mtitle, msize) {
		this.title = this.title + " " + mtitle + "  大于 " + msize + "\n";
	}

	this.save = function() {
		if (this.title) {
			this.ok = false;
			alert(this.title);
		} else {
			this.ok = true;
		}
		return this.ok;
	}
	this.check_value = function(id, size, mtitle) {
		var obj = document.getElementById(id);
		if (obj) {
			if (obj.value)
				this.textCounter(obj.value,mtitle, size);
		}
	}
	this.textCounter = function(field,mtitle,maxlimit){
		var counts = 0;
		var newStr;
		for(var i = 0;i < field.length;i ++){
		if(field.substr(i,1).charCodeAt(i)>255){
		counts += 2;
		}else{
		counts += 1;
		}
		if(counts > maxlimit){
		this.title_xySize(mtitle, maxlimit);
		break;
		}
		}
	}

	
}
// //////////////////////////////////////////////////////
// //////////////////////根据制剂类别控制子表显示
/** *******WangQiang******* */
function onzjlbchange(formname) {
	hybz = document.getElementById(formname + ":hybz");
	zybz = document.getElementById(formname + ":zybz");
	zjlb = document.getElementById(formname + ":zjlb");
	if (zjlb.value == 0) {
		zybz.style.display = "inline";
		hybz.style.display = "none";
	} else if (zjlb.value == 1) {
		zybz.style.display = "none";
		hybz.style.display = "inline";
	}
	if (zjlb.value == "") {
		zybz.style.display = "inline";
		hybz.style.display = "inline";
	}
}
// //////////////////////////////////////////////////////
// //////////////////////根据原有效时间默认有效期截止时间 默认为4年
function Yxqx(yfzrqId, yxjzrqId) {
	/** *******WangQiang(2008-11-04)******* */
	var yfzrq = document.getElementById(yfzrqId).value;
	ToYxjzrq = document.getElementById(yxjzrqId);
	var K = 0;
	var F = 0;
	var s = parseInt(yfzrq) + 4;
	var date = yfzrq.substring(8, 10);
	var date2 = yfzrq.substring(9, 10);
	var jihao2 = date2 - 1;
	var month = yfzrq.substring(5, 7);
	var month2 = yfzrq.substring(6, 7);
	var month3 = month2 - 1
	var yueshu = month - 1;
	var yxsj = ""
	if (yfzrq) {
		if (yfzrq != "" || yfzrq != Null) {
			if (date - 1 >= 10) {
				var jihao = date - 1;
				yxsj = s + yfzrq.substring(4, 8) + jihao;
			} else if (date == 10) {
				yxsj = s + yfzrq.substring(4, 8) + "0" + 9;
			} else if (jihao2 != 0) {
				s = parseInt(yfzrq) + 4;
				yxsj = s + yfzrq.substring(4, 8) + "0" + jihao2;
			} else {
				K = 1;
			}
			if (K == 1 && month == 11) {
				yxsj = s + "-" + 10 + "-" + 31;
			}
			if (K == 1 && month == 12) {
				yxsj = s + "-" + 11 + "-" + 30;
			}
			if (K == 1 && month > 1 && month <= 10) {
				if (yueshu == 1 || yueshu == 3 || yueshu == 5 || yueshu == 7
						|| yueshu == 8) {
					yxsj = s + "-" + "0" + yueshu + "-" + 31;
				} else if (yueshu != 2) {
					yxsj = s + "-" + "0" + yueshu + "-" + 30;
				} else if (yueshu == 2 && s % 4 == 0) {
					yxsj = s + "-" + "0" + yueshu + "-" + 29;
				} else if (yueshu == 2 && s % 4 != 0) {
					yxsj = s + "-" + "0" + yueshu + "-" + 28;
				}
			}
			if (K == 1 && month != 11 && month3 == 0) {
				var year = s - 1;
				yxsj = year + "-" + "12" + "-" + 31;
			}
		}
	}
	// if(ToYxjzrq.value==""||ToYxjzrq.value==Null){
	ToYxjzrq.value = yxsj;
	// }
}

// //////////////////////////////////////////////
// /外网申报 保健品注册 申请单位信息 新增后刷新总记录数
// //lixiaowen
function changeTotal(changeId, total) {
	document.getElementById(changeId).innerHTML = total;
}

// //////////////////////////////////////////////
// /外网申报 保健品注册 申请单位信息 改变相应的value
// //lixiaowen
function changeValue(changeId, total) {
	document.getElementById(changeId).value = total;
}

// ////////////////////////////////////////////////////////////
// ////// 改变父窗的某个 标记 的值 已解决与firefox的兼容问题
function changeFacthchsum(spaname, spavalue) {
	try {
		try {
			var obj = window.dialogArguments.document;
		} catch (e) {
			var obj = window.opener.document;
		}
		if (obj) {
			var spa = obj.getElementById(spaname);
			if (spa) {
				spa.removeChild(spa.firstChild);
				var textNode = obj.createTextNode(spavalue);
				spa.appendChild(textNode);
				
			}
		}
	} catch (e) {
		alert("改变父窗的某个 标记 的值: " + e);
	}
}

//改变父窗的某个标记的值
function changeScfwValue() {
	try {
		try {
			var obj = window.dialogArguments.document;
		} catch (e) {
			var obj = window.opener.document;
		}
		if (obj) {
			var object = obj.getElementById("refreshForm:hidden");
			if (object) {
				object.click();
			}
		}
	} catch (e) {
		alert("改变父窗的某个 标记 的值: " + e);
	}
}

//将有个标签加上 style.color='red' 否则为黑
function changeFacthchsumToRed(id,isChange) {
	try {
		
		var change =false;
		if(isChange==='true'){
			change =true;
		}else if (isChange === true){
			change =true;
		}
		
		try {
			var obj = window.dialogArguments.document;
		} catch (e) {
			var obj = window.opener.document;
		}
		if (obj) {
			var spa = obj.getElementById(id);
			if(!change){
				spa.style.color='black';
			}else{
				spa.style.color='red';
			}
		}
	} catch (e) {
	}
}
function validSubTable(ids){
//	try{
		if( ids ){
			var idArry=ids.split(",");
			for (var i = 0; i < idArry.length; i++) {
				var id = idArry[i];
				var obj =document.getElementById(id);
				if(obj){
					var num=obj.innerHTML+'';
					if(num=='0'){
						return false;
					}
				}
				
			}
		}
//	}catch (e) {
//	}
	return true;
}

// ////////////////////////////////////////////////////////////
// ////// 改变父窗口的父窗口的某个 标记 的值
function changeFacthchsumTwo(spaname, spavalue) {
	try {
		var obj = window.dialogArguments.window.dialogArguments.document;
		if (obj) {
			var spa = obj.getElementById(spaname);
			if (spa) {
				spa.removeChild(spa.firstChild);
				var textNode = obj.createTextNode(spavalue);
				spa.appendChild(textNode);

			}
		}
	} catch (e) {
		alert("改变父窗的某个 标记 的值: " + e);
	}
}
/*******************************************************************************
 * 校验输入的字段是否为英文 author:ChenYiFan params: name:需校验的字段object
 ******************************************************************************/
function englishName(name) {
	engName = name.value;
	var pattern = /[\u4e00-\u9fa5]/;// 建立正则表达式
	var letters = engName.match(pattern);
	var valuenew = "";
	if (letters != null) {
		alert("此处只能输入英文字母!");
		for (var i = 0; i < engName.length; i++) {
			value = engName.substring(i - 1, i);
			letters = value.match(pattern);
			if (letters != null)
				value = "";
			valuenew = valuenew + value;
		}
		name.value = valuenew;
		// name.value="";//把英文名字段清空
	}
}

/*******************************************************************************
 * 校验输入的地址是否为英文 author:ChenYiFan params: name:需校验的字段object
 ******************************************************************************/
function englishAddress(name) {
	engName = name.value;
	var pattern = /[\u4e00-\u9fa5]/;// 建立正则表达式
	var letters = engName.match(pattern);
	var valuenew = "";
	if (letters != null) {
		alert("此处只能输入英文字母!");
		for (var i = 0; i < engName.length; i++) {
			value = engName.substring(i - 1, i);
			letters = value.match(pattern);
			if (letters != null)
				value = "";
			valuenew = valuenew + value;
		}
		name.value = valuenew;
		// name.value="";//把英文名字段清空
	}
}

/*******************************************************************************
 * 校验输入的字段是否为中文 author:ChenYiFan params: name:需校验的字段object
 ******************************************************************************/
function chineseName(name) {
	Name = name.value;
	var pattern = /[^\u0391-\uFFE5]/;// 建立正则表达式
	var letters = Name.match(pattern);
	if (letters != null) {
		alert("请输入中文!");
		name.value = "";// 把英文名字段清空
	}
}
/*******************************************************************************
 * ****原有效期截止日期+4年(日期后退1天) ****param obj:发证日期object yxqjzrq_id:有效期截止日期id
 ******************************************************************************/
function default_yxjzrq(obj, yxqjzrq_id) {
	var yyxqjzrq = document.getElementById(yxqjzrq_id);
	if (obj.value != "") {
		var yfzrq = obj.value;
		var date = yfzrq.split("-");
		var default_year = 4;
		if (arguments[2])
			default_year = arguments[2];

		var year_string = date[0];// 取出日期值里的"年"
		var month_string = date[1];// 取出日期值里的"月"
		var day_string = date[2];// 取出日期值里的"日"

		var month_int = 0;
		var day_int = 0;
		var year_int = parseInt(year_string);// 年转换成int

		// 第一位为0时，转换第二位
		if (month_string.charAt(0) == 0)
			month_int = parseInt(month_string.charAt(1));
		else
			month_int = parseInt(month_string);// 月转换成int

		if (day_string.charAt(0) == 0)
			day_int = parseInt(day_string.charAt(1));// 日转换成int
		else
			day_int = parseInt(day_string);

		var dateObj = new Date();

		// 如果为年初，做特殊处理
		if (month_int == 1 && day_int == 1) {
			// if(default_year-1<=0)
			// default_year =default_year-2;
			// else
			// default_year =default_year-1;
			dateObj.setFullYear(year_int + default_year - 1);
			dateObj.setMonth(11);
			dateObj.setDate(31);
			var lds = dateObj.toLocaleDateString();
			var month_lds = lds.substring(5, 7);
			var day_lds = dateObj.getDate();
		} else {
			dateObj.setFullYear(year_int + default_year);
			dateObj.setMonth(month_int - 1);
			dateObj.setDate(day_int - 1);

			var lds = dateObj.toLocaleDateString();
			// alert("月："+dateObj.getMonth());
			if (dateObj.getMonth() < 9) {
				// alert(lds);
				var tmpMonth = lds.substring(5, 6);
				if (tmpMonth == "0") {
					var month_lds = lds.substring(5, 7);
				} else {
					var month_lds = "0" + tmpMonth;
				}
				// alert("1:"+month_lds+'********'+lds.substring(5,6));
			} else
				var month_lds = lds.substring(5, 7);
			// alert("2:"+year_lds+"-"+month_lds+"-"+day_lds);
			if (dateObj.getDate() < 10) {
				var day_lds = "0" + dateObj.getDate();
			} else {
				var day_lds = dateObj.getDate();
			}
		}
		var year_lds = lds.substring(0, 4);
		// alert("4:"+year_lds+"-"+month_lds+"-"+day_lds);
		// 重组格式并赋值
		yyxqjzrq.value = year_lds + "-" + month_lds + "-" + day_lds;

	}
}

/*
 * 和当前时间进行比较
 */
function compareCurrentDate(smallId, showMessage) {
	var smallObj = document.getElementById(smallId);
	var myDate = new Date();
	var smallValue = "";
	if (smallObj) {
		smallValue = smallObj.value;
	}
	if (smallValue) {
		smallValue = new Date(smallValue.replace("-", ","));
		if (myDate - smallValue > 0) {
			return true;
		} else {
			alert(showMessage);
			smallObj.value = "";
			return false;
		}

	}
}
/**
 * 管代用的 两个日期之间进行比较 smallId 小值ID bigId 大值ID showMessage 提示信息
 * 
 * @author liangchichang 2008-11-18
 */
function compareDateOfPage(smallId, bigId, showMessage, obj) {
	var smallObj = document.getElementById(smallId);
	var bigObj = document.getElementById(bigId);
	var smallValue = "";
	var bigValue = "";
	if (smallObj) {
		smallValue = smallObj.value;
	}
	if (bigObj) {
		bigValue = bigObj.value;
	}
	if (smallValue && bigValue) {
		smallValue = new Date(smallValue.replace("-", ","));
		bigValue = new Date(bigValue.replace("-", ","));
		if (bigValue - smallValue >= 0) {
			return true;
		} else {
			alert(showMessage);
			if(obj)
			    obj.value = "";
			return false;
		}

	}
	return true;
}
// 验证开始和结束日期 都在上报周期起始和截止日期之间
function compareStart(startId, beginId, endId, stopId, Message1, Message2,
		Message3, obj) {
	compareDateOfPage(startId, stopId, Message1, obj);
	compareDateOfPageStart(startId, beginId, endId, Message2, Message3, obj);
}
//
function compareStop(startId, beginId, endId, stopId, Message1, Message2,
		Message3, obj) {
	compareDateOfPage(startId, stopId, Message1, obj);
	compareDateOfPageStop(stopId, beginId, endId, Message2, Message3, obj);
}

function compareDateOfPageStart(startId, beginId, endId, Message1, Message2,
		obj) {
	var showMessage = "";
	var flag = true;

	var startObj = document.getElementById(startId); // **开始时间
	var beginObj = document.getElementById(beginId); // 上报周期开始时间
	var endObj = document.getElementById(endId); // 上报周期结束时间

	var startValue = "";
	var beginValue = "";
	var endValue = "";

	if (startObj) {
		startValue = startObj.value;
	}
	if (beginObj) {
		beginValue = beginObj.value;
	}
	if (endObj) {
		endValue = endObj.value;
	}

	// 开始时间大于等于周期开始时间，小于等于周期结束时间
	if (startValue) {
		startValue = new Date(startValue.replace("-", ","));
		beginValue = new Date(beginValue.replace("-", ","));
		endValue = new Date(endValue.replace("-", ","));
		if (startValue - beginValue < 0) {
			showMessage = showMessage + Message1 + "\n";
			obj.value = "";
			flag = false;
		}
		if (endValue - startValue < 0) {
			showMessage = showMessage + Message2 + "\n";
			obj.value = "";
			flag = false;
		}
	}
	if (!flag) {
		alert(showMessage);
	}
}
function compareDateOfPageStop(stopId, beginId, endId, Message1, Message2, obj) {
	var showMessage = "";
	var flag = true;

	var stopObj = document.getElementById(stopId); // **开始时间
	var beginObj = document.getElementById(beginId); // 上报周期开始时间
	var endObj = document.getElementById(endId); // 上报周期结束时间

	var stopValue = "";
	var beginValue = "";
	var endValue = "";

	if (stopObj) {
		stopValue = stopObj.value;
	}
	if (beginObj) {
		beginValue = beginObj.value;
	}
	if (endObj) {
		endValue = endObj.value;
	}

	// 结束时间大于等于周期开始时间，小于等于周期结束时间
	if (stopValue) {
		stopValue = new Date(stopValue.replace("-", ","));
		beginValue = new Date(beginValue.replace("-", ","));
		endValue = new Date(endValue.replace("-", ","));
		if (stopValue - beginValue < 0) {
			showMessage = showMessage + Message1 + "\n";
			obj.value = "";
			flag = false;
		}
		if (endValue - stopValue < 0) {
			showMessage = showMessage + Message2 + "\n";
			obj.value = "";
			flag = false;
		}
	}
	if (!flag) {
		alert(showMessage);
	}
}
/**
 * 与当前日期之间进行比较 smallId 小值ID message 提示信息 小于当前日期
 * 
 * @author machuangpeng 2009-07-07
 */
function compareNowDateOfSmall(smallId, message) {
	try {
		var dateValue = document.getElementById(smallId);
		if (dateValue) {
			dateValue1 = new Date(dateValue.value.replace("-", ","));
			var today = new Date();
			if (dateValue1 - today > 0) {
				alert(message);
				dateValue.value = '';
				return false;
			} else {
				return true;
			}
		}
	} catch (e) {
		alert(e);
	}
}
/**
 * 与当前日期之间进行比较 bigId 大值ID message 提示信息 大于当前日期
 * 
 * @author machuangpeng 2009-07-07
 */
function compareNowDateOfBig(bigId, message) {
	try {
		var dateValue = document.getElementById(bigId);
		if (dateValue) {
			dateValue1 = new Date(dateValue.value.replace("-", ","));
			var today = new Date();
			today1 = new Date(today.getYear() + "," + (today.getMonth() + 1)
					+ "-" + today.getDate());
			if (dateValue1 - today1 < 0) {
				alert(message);
				dateValue.value = '';
				return false;
			} else {
				return true;
			}
		}
	} catch (e) {
		alert(e);
	}
}
// 每一行增加跳转 FROM名字，TBALE名字，索引，A名称
function trAddRect(fromname, tablename, index, aid,ParamOne) {
	try {
		var aidtmp = fromname + ":" + tablename + ":" + index;
		if (aid) {
			aidtmp = aidtmp + ":" + aid;
		}
		var a = document.getElementById(aidtmp);
		if (a) {// 增加事件
			try {
				var tr = a.parentElement.parentElement;// 获得TR
			} catch (e) {
				var tr = a.parentNode.parentNode;// 获得TR
			}
			if (tr) {
				tr.onclick = function newClick() {
					if(validateCA(ParamOne)){
						if (a) {
							a.onclick();
						}
					}

				}
			}

		}

	} catch (e) {
	}
}

function sbBack() {
	var ok = confirm("您是否确定离开本页面?");
	return ok;
}

// 一次性上报 上一步提示 ADD BY LIXIAOWEN 2009-04-01
function upUIF() {
	var ok = confirm("请确认当前页面是否有未保存的信息,您确定离开吗");
	return ok;
}
// 一次性上报 返回提示 ADD BY LIXIAOWEN 2009-04-01
function backUIF() {
	var ok = confirm("请确认当前页面是否有未保存的信息,您确定离开吗");
	return ok;
}

// 一次性上报 列表 返回提示 ADD BY LIXIAOWEN 2009-04-17
function listBackUIF() {
	var ok = confirm("您尚未填写完毕并申报至药监局，是否需要返回至“申报列表”？");
	return ok;
}

function backSxlb() {
	var ok = true;

	return ok;
}

function backSxlb() {
	var ok = true;

	return ok;
}
function ylzjOpen(url, title) {
	var date = new Date();
	var url_R = url + "&tmpDate=" + date.getTime() + "&";
	window
			.open(
					url_R,
					title,
					'toolbars=0, scrollbars=0, location=0, statusbars=0, menubars=0, resizable=0, width=800, height=600, left = 112, top = 84');
	return false;
}

/**
 * 数据上报 内网审核 历史列表 查看详细信息 弹出页面
 */
function sjsbpopUp_look(url, newId, oldId) {
	url = url + "idAbstractSjsbCommonRequest=" + newId
			+ "&oldidAbstractSjsbCommonRequest=" + oldId
			 + "&NORESTORESTATE=TRUE";
	openNewWindow(url);
	return false;
}

/**
 * 数据上报 刷新页面
 */
function sjsbReflesh(url) {
	// window.location.href = url;;
	props = window
			.open(
					url,
					'poppage',
					'toolbars=0, scrollbars=1, location=0, statusbars=0, menubars=0, resizable=0, width=800, height=600, left = 250, top = 30');
	return false;
}

/**
 * 数据上报 刷新页面
 */
function sjsbpopUp(url, newId, oldId) {
	url = url + "?idAbstractSjsbCommonRequest=" + newId
			+ "&oldidAbstractSjsbCommonRequest=" + oldId;
	props = window
			.open(
					url,
					'poppage',
					'toolbars=0, scrollbars=1, location=0, statusbars=0, menubars=0, resizable=0, width=800, height=600, left = 250, top = 30');
	// window.location.href = url;
	return false;
}

// 刷新页面
function histaorybackList(url) {
	window.location.href = url;
	return false;
}

/*
 * 验证码用IFARME的 function loadFrame(){
 * 
 * var yzmIfame = document.getElementById("yzmIfame"); if(yzmIfame){ var
 * newifame = new yziframeClass(); newifame.init();//初始化 //构造IFARME属性 和业务参数
 * newifame.height = "30px";//高度 newifame.width = "280px";//宽度 newifame.top =
 * "0";//宽度 newifame.left = "0";//宽度 newifame.url =
 * "#{facesSourceBean.webRoot}/yzm.faces"; newifame.color = "2";
 * newifame.allowtransparency="true"; newifame.addObj=yzmIfame; newifame.load(); }
 *  }
 * 
 */

// 弹出意见
function OpiniontClassTwo() {
	this.url = "/gdyj/internet/opiniont/opiniontTwo.faces";
	this.title = "查看意见";
	this.height = "400";
	this.width = "700";
	this.top = "250";
	this.left = "250";
	this.scrollbars = "";
	// 业务对象
	this.updateID = "";// 参数赋值对象的ID
	this.show = function(pp, url, updateID) { // 显示 参数赋值对象的ID
		this.init();
		this.url = url + this.addUrlParam(this.url, "updateID", pp);
		this.url = this.addUrlParam(this.url, "yjtype", updateID);
		this.show_tmp();
	}
	this.show_tmp = function() {
		openNewWindow(this.url, this.title, this.height, this.width);
	}
	this.load = function(updateid) {
		if (updateid) {
			this.updateID = updateid;
		}
	}
	this.save_parent = function(update_Id, upate_value) {
		var updateobj = document.getElementById(update_Id);
		if (updateobj) {
			updateobj.value = upate_value;
		}
	}
	this.save = function() {// 确定，更新父对象的值
		if (this.updateID) {
			try {
				var update_value = this.getValue();
				self.opener.JS_opiniontTwo.save_parent(this.updateID,
						update_value);
			} catch (e) {
				alert("赋值错误：" + e);
			}
			window.close();
		}
	}
	this.getValue = function() {// 获得值
		var tables = document.getElementById("opiniont:opiniontTable");
		var inputs = tables.getElementsByTagName("input");
		var update_value = "";
		for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].getAttribute("type") == "checkbox") {
				if (inputs[i].checked) {
					if (inputs[i].name == "update_value") {
						update_value = update_value + inputs[i].value + ",";
					}
				}
			}
		}
		if (update_value.length > 2) {
			update_value = update_value.substring(0, update_value.length - 1)
		}
		return update_value;
	}
	this.init = function() {
		this.url = "/gdyj/internet/opiniont/opiniontTwo.faces";
		this.title = "查看意见";
		this.height = "400";
		this.width = "400";
		this.top = "250";
		this.left = "250";
		this.scrollbars = "yes";

		this.updateID = "";
	}

	this.addUrlParam = function(url, name, value) {// 增加参数的方法
		var tmpurl = "";
		if (url) {
			if (url.indexOf("?") > 0) {
				tmpurl = url + "&" + name + "=" + value;
			} else {
				tmpurl = url + "?" + name + "=" + value;
			}
		}
		return tmpurl;
	}
}

var JS_opiniontTwo = new OpiniontClassTwo();

// 增加一个校验 ，“是否有产品批件有效期”选择“是”时，“产品批件有效期”必填
function yxqjy(dbz, ckobj, haveobj) {

	var sfycpok = true;
	try {
		var sfycp = document.getElementById(ckobj);
		if (sfycp) {

			if (sfycp.value == dbz) {
				// 获得有效期
				var yxq = document.getElementById(haveobj);
				if (yxq) {

					if (!yxq.value) {
						sfycpok = false;
						alert("产品批件有效期 必填！");
					}
				}
			}
		}
	} catch (e) {
	}
	return sfycpok;
}

// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////
/*
 * 外网申报和内网，国产保健食品注册审核(技术审查)、报国家局、转让、变更、再注册事项，业务界面，子表“申请单位信息”修改为“其它申请单位信息”，
 * 主界面“是否为多家企业联合申办”为“否”时不允话录入子表“其它申请单位信息”，可提示“您填写“是否为多家企业联合申办”为“否”，请检查！”；
 * 否则，如果不录入子表“其它申请单位信息”，可提示“您填写“是否为多家企业联合申办”为“是”，请填写“其它申请单位信息”！”
 */
// ////////////////////////////////////////////////////////////////////////////////////
// 填子表的时增加一个校验
// “是否为多家企业联合申办”为“否”时不允话录入子表“其它申请单位信息”，可提示“您填写“是否为多家企业联合申办”为“否”，请检查！”；
function txzb(zbselectobjid, pdvalue, nextpage) {
	var ok = false;
	try {
		var zbselectobj = document.getElementById(zbselectobjid);
		if (zbselectobj) {

			if (zbselectobj.value == pdvalue) {
				ok = ylzjShowModalDialog(nextpage);
			} else {
				alert('您填写“是否为多家企业联合申办”为“否”，请检查！');
			}
		}
	} catch (e) {
	}
	return ok;

}
// 保存的时候对应的判断
function savepdzb(zbselectobjid, pdvalue, zbobjid, havevalue) {
	var ok = true;

	try {
		var zbselectobj = document.getElementById(zbselectobjid);

		if (zbselectobj) {
			if (zbselectobj.value == pdvalue) {

				var zbobj = document.getElementById(zbobjid);

				if (zbobj) {

					if (zbobj.firstChild.nodeValue.trim() == havevalue) {
						ok = false;
						alert('您填写“是否为多家企业联合申办”为“是”，请填写“其它申请单位信息”！');
					}
				}
			}
		}
	} catch (e) {
		// alert(e);
	}
	return ok;
}

// 保存时子表必填
function savepdzbishave(zbobjid, havevalue, title) {
	var ok = true;

	try {
		var zbobj = document.getElementById(zbobjid);
		if (zbobj) {
			if (zbobj.firstChild.nodeValue.trim() == havevalue) {
				ok = false;
				alert(title);
			}
		}
	} catch (e) {
		// alert(e);
	}
	return ok;
}

// //////////////选择原有效期的事件
function showorhidenrq(objid, value, hidenid1) {
	var ok = false;
	try {
		var obj = document.getElementById(objid);

		if (obj) {
			var value = obj.value;

			var hidenobj1 = document.getElementById(hidenid1);

			if (value == "1") {// 选择了是 ,显示

				if (hidenobj1) {
					hidenobj1.style.display = "block";

				}

			} else {
				if (hidenobj1) {
					hidenobj1.style.display = "none";
				}

			}
		}
	} catch (e) {

	}

	return ok;
}

// //////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////弹出子表，组件脚本
function myopenWindow(id, url, isNotNull, mainid, isNotNullTitle,width,heiht) {
	try {
		var ok = true;
		try {
			if (id == "smstotal") {
				ok = true;
			} else {
				ok = nextPagePd(id);// 如果有自己的判断，加一个 nextPagePd()方法
			}
		} catch (e) {
			ok = true;
		}
		if (ok) {
			var notOK = openWindowNextPageBool(mainid);
			if (notOK) {
				if(width&&heiht){
					showDialog(url, heiht, width);
					return false;
				}else{
					ylzjShowModalDialog(url);
				}
				
			} else {
				var notDateTitle = isNotNullTitle;
				if (!notDateTitle) {
					notDateTitle = "请先填写主表数据，再填子表数据！";
				}
				alert(notDateTitle);
			}
		}

	} catch (e) {

	}
	return false;
}

function openWindowNextPageBool(mainid) {
	var ok = true;

	if (mainid) {
		ok = true;
	} else {
		ok = false;
	}

	return ok;

}
// 申报前子表必填判断类
/*
 * 参照例子 var childMust = new ChildMust(); childMust.init(); childMust.saveid =
 * "spywCurrencyFacmerHZSPForm:bacterinCorpation_saveOrUpdate";
 * childMust.addJudge("jls1","0","子表\"企业质量负责人基本信息\"还没有填写，请先填写子表\"企业质量负责人基本信息\"
 * \n"); childMust.addJudge("jls4","0","子表\"换证自查项目表\"还没有填写，请先填写子表\"换证自查项目表\"
 * \n"); ok = childMust.judge();//判断
 */
function ChildMust() {
	this.saveid = "";
	this.judgeList = "";
	this.init = function() {
		this.saveid = "";
		this.judgeList = new Array();
	}
	this.addJudge = function(id, value, title) {
		try {
			var cv = new this.judgeVo();
			cv.id = id;
			cv.value = value;
			cv.title = title;
			var index = this.judgeList.length;
			if (!index) {
				index = 0;
			}
			this.judgeList[index] = cv;
		} catch (e) {
			alert(" 增加判断参数错误 addJudge方法：" + e);
		}
	}
	this.judge = function() {
		var ok = true;
		try {
			var title = "";
			for (var i = 0; i < this.judgeList.length; i++) {
				var cv = this.judgeList[i];
				title = title + this.mustHaveValue(cv.id, cv.value, cv.title);
			}
			if (title) {// 提示
				alert(title);
				ok = false;
			}

			if (!ok) {
				var savebnt = document.getElementById(this.saveid);// 信息保存
				if (savebnt) {
					savebnt.click();
				}
			}
		} catch (e) {

		}
		return ok;
	}

	/* to set the invalid fields' class */
	function setInvalidTextClass(obj) {
		if (obj.type == 'checkbox' || obj.type == 'radio') {
			obj.className = 'invalidCheckOrRadio';
		} else {
			if (obj.className == 'calendar_common') {
				obj.className = 'invalidcalendar_common';
			} else if (obj.className == 'readonlyTextInputFix') {
				obj.className = 'invalidTextInputFix';
			} else {
				obj.className = 'invalidTextInput';
			}
		}
	}
	/* to set the valid fields' class */
	function setCommonTextInputClass(obj) {
		if (obj.type == 'checkbox' || obj.type == 'radio') {
			obj.className = '';
		} else if ((obj.className != 'calendar_common')
				&& (obj.className != 'readonlyTextInputFix')) {
			obj.className = 'commonTextInput';
		}
	}

	// 子表必填判断
	this.mustHaveValue = function(id, value, title) {
		var tmp = "";
		try {
			var obj = document.getElementById(id);
			if (obj) {
			   if(value == "0"){
					if (obj.firstChild.nodeValue == value) {
						tmp = title;
					}
			   }else{
			        if (obj.firstChild.nodeValue < value) {
						tmp = title;
					}
			   }
			}
		} catch (e) {
		}
		return tmp;
	}
	// 判断条件VO类
	this.judgeVo = function() {
		this.id = "";
		this.value = "";
		this.title = "";
	}
}

// 药品再注册变更历史弹出框
function ypzzcOpen(url, title, form, bgqid, bgid) {
	try {
		var date = new Date();
		var url_R = url + "&tmpDate=" + date.getTime() + "&";
		// 变更前的id
		var id = document.getElementById(formid + "bgqid");
		id.value = bgqid;
		// 弹出框title
		var title1 = document.getElementById(formid + "title");
		title1.value = title;

		var returnValue = showDialog(url_R, '800px', '900px', true);
		var bg = document.getElementById(formid + bgid);
		var bgt = document.getElementById(bgid + "t");
		bg.value = returnValue;
		bgt.innerHTML = returnValue;
		return false;
	} catch (e) {
		alert(e + " " + e.message);
	}
}

/**
 * 变更项点击后页面字段操作判断 checkBox 页面传入“this” 三个id 页面ID
 * 
 * @author wangqiang 2009.08.31
 */
function onSelectInputThree(checkBox, FormId, id1, id2, id3) {
	onSelectInputOne(checkBox, FormId, id1);
	onSelectInputOne(checkBox, FormId, id2);
	onSelectInputOne(checkBox, FormId, id3);
}
/**
 * 变更项点击后页面字段操作判断 checkBox 页面传入“this” 两个id 页面ID
 * 
 * @author wangqiang 2009.08.31
 */
function onSelectInputTwo(checkBox, FormId, id1, id2) {
	onSelectInputOne(checkBox, FormId, id1);
	onSelectInputOne(checkBox, FormId, id2);
}
/**
 * 变更项点击后页面字段操作判断 checkBox 页面传入“this” 一个id 页面ID
 * 
 * @author wangqiang 2009.08.31 modified by chenyifan 2009.11.27 增加了可以控制多个
 */
function onSelectInputOne(checkBox, FormId, id) {
	for (var i = 2; i < arguments.length; i++) {
		var putid = FormId + ":" + arguments[i];
		var input = document.getElementById(putid);
		if (checkBox.checked) {
			input.readOnly = false;
			input.disabled = false;
			input.className = 'commonTextInput';
		} else {
			input.value = '';
			input.readOnly = true;
			input.disabled = true;
			input.className = 'readonlyTextInput';
		}
	}
}

/* to set the invalid fields' class */
function setInvalidTextClass(obj) {
	if (obj.type == 'checkbox' || obj.type == 'radio') {
		obj.className = 'invalidCheckOrRadio';
	} else {
		if (obj.className == 'calendar_common') {
			obj.className = 'invalidcalendar_common';
		} else if (obj.className == 'readonlyTextInputFix') {
			obj.className = 'invalidTextInputFix';
		} else {
			obj.className = 'invalidTextInput';
		}
	}
}
/**
 * 判断日期之间的大小 (若第4个参数存在，才比较 当前日期和obj，否则只比较 obj和smallId) 若 当前日期>obj>smallId
 * 则返回真否则提示信息并返回假
 */
function dateCompare(obj, smallId) {
	var ok = false;
	var smallObj = document.getElementById(smallId);
	var objValue = "";
	var smallValue = "";
	if (smallObj) {
		smallValue = smallObj.value;
	}
	if (obj) {
		objValue = obj.value;
	}
	if (smallValue && objValue) {
		var smallvalue = getDateValue(smallValue);
		var objvalue = getDateValue(objValue);
		if (objvalue - smallvalue > 0)
			ok = true;
		else {
			alert(arguments[2]);
			obj.value = "";
			ok = false;
		}
	}
	if (arguments[3] != undefined) {
		var objvalue = getDateValue(objValue);
		var today = new Date();
		if (objvalue - today < 0)
			ok = true;
		else {
			alert(arguments[3]);
			obj.value = "";
			ok = false;
		}
	}
	return ok;
}
/**
 * 为兼容浏览器 获得时间方法 王强 2009-12-08
 */
function getDateValue(obj) {
	var Val = obj.replace(/-/g, ",");
	var s = Val.split(",");
	var datevalue = new Date(s[0], s[1] - 1, s[2]);
	return datevalue;
}
/**
 * 判断日期之间的大小 (若第5个参数存在，才比较 当前日期和bigId，否则只比较 bigId和smallId) 若
 * 当前日期>=bigId>=smallId 则返回真，否则提示信息并返回假
 */
function dateCompare2(obj, bigId, smallId) {
	var ok = false;
	try {
		var bigObj = document.getElementById(bigId);
		var smallObj = document.getElementById(smallId);
		var bigValue = "";
		var smallValue = "";
		if (bigObj) {
			bigValue = bigObj.value;
		}
		if (smallObj) {
			smallValue = smallObj.value;
		}
		if (smallValue && bigValue) {
			var smallvalue = getDateValue(smallValue);
			var bigvalue = getDateValue(bigValue);
			if (bigValue >= smallValue)
				ok = true;
			else {
				alert(arguments[3]);
				obj.value = "";
				ok = false;
			}
		}
		if (arguments[4] != undefined) {
			var bigvalue = getDateValue(bigValue);
			var today = new Date();
			if (bigvalue - today <= 0)
				ok = true;
			else {
				alert(arguments[4]);
				obj.value = "";
				ok = false;
			}
		}
	} catch (e) {
		// alert(e);
	}
	return ok;
}

/**
 * 上传文件大小判断
 * 
 * @param {}
 *            id 上传文件file ID
 * @param {}
 *            fileMaxSize 文件最大值：以B为单位
 * @return {Boolean}
 */
function filepd(id, fileMaxSize) {
	var ok = false;
	try {
		var obj = document.getElementById(id);
		if (obj) {
			var image = new Image();
			image.dynsrc = obj.value;
			var size = image.fileSize;
			if (size > fileMaxSize) {
				image = null;
				return false;
			}
		}
	} catch (e) {
		alert(e.message);
	}
	image = null;
	return true;
}
/**
 * * *查询已有，失去焦点触发事件
 */
function queryExsit(formName, id, thisObj) {
	var oldValue = document.getElementById(formName + ":queryExsitOld").value;// 取出原来的值
	var btObj = document.getElementById(formName + ":" + id);
	if (btObj.disabled != true) {
		if (thisObj.value == "") {
			document.getElementById(formName + ":" + id).onclick();
		} else {
			if (thisObj.value != oldValue) {// 如果值改变时才触发事件
				document.getElementById(formName + ":" + id).onclick();
			}
		}
	}
}

/** 验证两个参数对象不能都为空值。若都为空值，提示信息。忽略空白字符串（如空格） */
function isBothEmpty(id1, id2, msg) {
	var ok = true;
	var obj1 = document.getElementById(id1);
	var obj2 = document.getElementById(id2);
	var v1 = "";
	var v2 = "";
	if (obj1 && obj2) {
		v1 = obj1.value.trim();
		v2 = obj2.value.trim();
	}
	if (v1 == "" && v2 == "") {
		alert(msg);
		ok = false;
	}
	return ok;
}

// ///////////////////增加事件的类
function AddEventUtilClass() {
	this.onLoad = function(func) {// 页面加载事件
		var oldonload = window.onload;
		if (typeof oldonload != 'function') {
			window.onload = func;
		} else {
			window.onload = function() {
				oldonload();
				func();
			}
		}
	}

	this.onResize = function(func) {// 页面当浏览器的窗口大小被改变时触发的事件
		try {
			var oldonresize = window.onresize;
			if (typeof oldonresize != 'function') {
				window.onresize = func;// eval(func);
			} else {
				window.onresize = function() {
					oldonresize();
					func();
				}
			}
		} catch (e) {
			alert(e);
		}
	}
	this.onResizeTwo = function(func) {// 页面当浏览器的窗口大小被改变时触发的事件
		try {
			window.onresize = func;// eval(func);
		} catch (e) {
			alert(e);
		}
	}

}
/*
 * function addLoadEvent(func){ var oldonload = window.onload; if(typeof
 * window.onload !='function'){ window.onload = func; }else{ window.onload =
 * function(){ oldonload(); func(); } } }
 */

/**
 * 检查页面对象的值不为空
 * 
 * @param {}
 *            formid 表单id
 * @param {}
 *            objid 对象id
 * @param {}
 *            objName 对象名称
 * @return {}
 */
function checkNull(formid, objid, objName, objType) {
	if (objType != "1") {
		var obj = document.getElementById(formid + objid);
		if (obj) {
			if (obj.value == "") {
				return "必填项“" + objName + "”没有填写，请填写\n";
			}
		}
	} else {
		var objs = document.getElementsByName(formid + objid);
		if (objs) {
			var isOk = true;
			for (var i = 0; i < objs.length; i++) {
				if (objs[i]) {
					if (objs[i].checked) {
						isOk = false;
						break;
					}
				}
			}
			if (isOk) {
				return "必填项“" + objName + "”没有填写，请填写\n";
			}
		}
	}
	return "";
}

/*******************************************************************************
 * 校验输入的值为四位证书
 ******************************************************************************/
function validateNd(obj) {
	inputValue = obj.value;
	var pattern = /^\d{4}$/;// 建立正则表达式
	var letters = inputValue.match(pattern);
	if (letters == null) {
		alert("\"年度\"必须是四位整数");
		return false;
	}
}
var globalDisabledButton = false;

/**
 * 控制按钮多次点击时，只有一次有效
 */
function disableButton() {
	if (globalDisabledButton) {
		return false;
	} else {
		globalDisabledButton = true;
		loading(box);
		return true;
	}
	// obj.className="disable";
	// obj.onclick="function disabledButtonFalse(){return false;}";
	return true;
}

/**
 * 将指定的字段去掉空格
 * 
 * @param {}
 *            formid 必须是表单名加上":"
 * @param {}
 *            obj 需要去空格的字段id列表
 */
function requiredTrim(formid, obj) {
	for (var i = 0; i < obj.length; i++) {
		var ele = document.getElementById(formid + obj[i]);
		if (ele) {
			ele.value = ele.value.trim();
		}
	}
}
/**
 * 点击列表中行 按钮
 */
function listRowButtonOnclick() {
	globalButtonEventForOnRowClick = true;
}

function rowButtonClick(hiddenId, hiddenValue) {
	listRowButtonOnclick();
	var obj = document.getElementById(hiddenId);
	if (obj && hiddenValue && hiddenValue != "") {
		obj.value = hiddenValue;
		loading(box);
		return true;
	} else {
		alert('点击对象不存在，请检查“隐藏对象id”或者“行id”是否配置正确')
		return false;
	}
}
function rowButtonOnlyClick() {
	listRowButtonOnclick();
	loading(box);
	return true;
}

/**
 * 实现特殊字符的编码和解码，暂时只对直径字符代号转化
 * 
 * @param {}
 *            objList
 * @param {}
 *            formid
 */
function encode(objList, formid) {
	for (var i = 0; i < objList.length; i++) {
		var obj = document.getElementById(formid + objList[i]);
		if (obj) {
			var tmp = encodeURIComponent(obj.value, 'ISO8859-1');
			if (tmp.indexOf('%C3%98') >= 0) {
				obj.value = tmp;
			}
		}
	}
}
function undecode(objList, formid) {
	for (var i = 0; i < objList.length; i++) {
		var obj = document.getElementById(formid + objList[i]);
		if (obj) {
			if (obj.value.indexOf('%C3%98') >= 0) {
				obj.value = decodeURIComponent(obj.value, 'ISO8859-1');
			}
		}
	}
}

/**
 * 实现特殊字符的编码和解码，暂时只对直径字符代号转化
 * 
 * @param {}
 *            objList
 * @param {}
 *            formid
 */
function encode(objList, formid) {
	if (objList.constructor != Array) {
		objList = new Array(objList);
	}
	for (var i = 0; i < objList.length; i++) {
		var obj = document.getElementById(formid + objList[i]);
		if (obj) {
			var tmp = encodeURIComponent(obj.value, 'ISO8859-1');
			if (tmp.indexOf('%C3%98') >= 0) {
				obj.value = tmp;
			}
		}
	}
}
function undecode(objList, formid) {
	if (objList.constructor != Array) {
		objList = new Array(objList);
	}
	for (var i = 0; i < objList.length; i++) {
		var obj = document.getElementById(formid + objList[i]);
		if (obj) {
			if (obj.value.indexOf('%C3%98') >= 0) {
				obj.value = decodeURIComponent(obj.value, 'ISO8859-1');
			}
		}
	}
}
var submiting = false;
function onRowClick(currentRowObj) {
	try {
		if (globalButtonEventForOnRowClick) {
			globalButtonEventForOnRowClick = false;
			return;
		}
		if (submiting && submiting == true) {
			return false;
		}
		var childNodesObj = currentRowObj.childNodes;
		if (childNodesObj) {
			for (var f = 0; f < childNodesObj.length; f++) {
				var childChildNodesObj = childNodesObj[f].childNodes;
				if (childChildNodesObj) {
					for (var i = 0; i < childChildNodesObj.length; i++) {
						var obj = childChildNodesObj[i];
						if (obj.nodeName == 'CENTER') {
							obj = childChildNodesObj[i].firstChild;
						}
						if ('A' == obj.nodeName) {
							// childChildNodesObj[i].click();
							if (document.all) {
								// For IE
								obj.click();
							} else if (document.createEvent) {
								// For FF
								var ev = document.createEvent('MouseEvents');
								ev.initEvent('click', false, true);
								obj.dispatchEvent(ev);
							}
							submiting = true;
							loading();
							return;
						}
					}
				}
			}
		}
	} catch (e) {
		// alert(e.message);
	}
}

function fill(id, newvalue) {
	var flg = false;
	var obj = document.getElementById(id);
	if (obj) {
		obj.value = newvalue;
		flg = true;
	} else {
		alert("\u5bf9\u8c61\u4e0d\u5b58\u5728!!!\u8bf7\u786e\u5b9aid\u4e3a "
				+ id + " \u6807\u7b7e\u662f\u5426\u5b58\u5728!");
		flg = false;
	}
	return flg;
}

//全选
function selectAllCheckBox1() {
	var checkBoxObj = document.getElementsByTagName('input');
	var id = arguments[1];
	var selectObj;
	var select;
	if (id) {
		selectObj = document.getElementById(id);
		select = selectObj.value;
	}
	try{
	if (arguments[0].value == "全选") {
		for (var i = 0; i < checkBoxObj.length; i++) {
			if (checkBoxObj[i].type == 'checkbox'
					&& checkBoxObj[i].id.indexOf("selectCheckBox") >= 0) {
				var inputId = checkBoxObj[i].id.replace("selectCheckBox",
						"selectInput");
				var selectId = document.getElementById(inputId).value;
				select = select.replace(new RegExp(selectId + "-", "gm"), '');
				select += selectId + "-";
				selectObj.value = select;
				checkBoxObj[i].checked = true;
			}
		}
		arguments[0].value = "取消";
	} else {
		for (var i = 0; i < checkBoxObj.length; i++) {
			if (checkBoxObj[i].type == 'checkbox'
					&& checkBoxObj[i].id.indexOf("selectCheckBox") >= 0) {
				var inputId = checkBoxObj[i].id.replace("selectCheckBox",
						"selectInput");
				var selectId = document.getElementById(inputId).value;
				select = select.replace(new RegExp(selectId + "-", "gm"), '');
				selectObj.value = select;
				checkBoxObj[i].checked = false;
			}
		}
		arguments[0].value = "全选";
	}
	}catch(e){alert(e);}
	return false;
}

/**
 * 刷新页面时根据已经勾选的初始化
 * 
 * @param {}
 *            saveId
 */
function initCheck(saveId) {
	var selected = document.getElementById(saveId);
	select = selected.value;
	var selectIds = document.getElementsByTagName("input");
	for (var i = 0; i < selectIds.length; i++) {
		if (selectIds[i].type == "checkbox"
				&& selectIds[i].id.indexOf("selectCheckBox") >= 0) {
			var inputId = selectIds[i].id.replace("selectCheckBox",
					"selectInput");
			var selectId = document.getElementById(inputId).value;
			if (select.indexOf(selectId) >= 0) {
				selectIds[i].checked = true;
			} else {
				selectIds[i].checked = false;
			}
		}
	}
}


//全选所有查询的数据
function selectAllCheckBoxAll() {
	if(arguments[2]>50){
		alert('您选择的数据量超过了50条,请使用查询条件过滤!');
		return false;
	}
	var checkBoxObj = document.getElementsByTagName('input');
	var id = arguments[1];
	var selectObj;
	var select;
	if (id) {
		selectObj = document.getElementById(id);
		select = selectObj.value;
	}
	if (arguments[0].value == "全选") {
		if(arguments[3]){
			document.getElementById(arguments[3]).value='0';//标志为全选
		}
		for (var i = 0; i < checkBoxObj.length; i++) {
			if (checkBoxObj[i].type == 'checkbox'
					&& checkBoxObj[i].id.indexOf("selectCheckBox") >= 0) {
				var inputId = checkBoxObj[i].id.replace("selectCheckBox",
						"selectInput");
				var selectId = document.getElementById(inputId).value;
				select = select.replace(new RegExp(selectId + "-", "gm"), '');
				select += selectId + "-";
				selectObj.value = select;
				checkBoxObj[i].checked = true;
			}
		}
		arguments[0].value = "取消";
	} else {
		for (var i = 0; i < checkBoxObj.length; i++) {
			if (checkBoxObj[i].type == 'checkbox'
					&& checkBoxObj[i].id.indexOf("selectCheckBox") >= 0) {
				var inputId = checkBoxObj[i].id.replace("selectCheckBox",
						"selectInput");
				var selectId = document.getElementById(inputId).value;
				select = select.replace(new RegExp(selectId + "-", "gm"), '');
				selectObj.value = select;
				checkBoxObj[i].checked = false;
			}
		}
		if(arguments[3]){
			document.getElementById(arguments[3]).value='1';//标志为取消
			selectObj.value="";//清空选择的数据
		}
		arguments[0].value = "全选";
	}
	return true;
}

/*******************************************************************************
 * 全选 ==全选时for循环单个多选框的onclick方法，这样避免只读状态的多选被勾选
 ******************************************************************************/
function selectAllCheckBoxOnclick(){
    var checkBoxObj = document.getElementsByTagName('input');
    if (arguments[0].value == "全选") {
      for (var i = 0; i < checkBoxObj.length; i++) {
        if (checkBoxObj[i].type == 'checkbox') {
          	checkBoxObj[i].click();
        }
      }
      arguments[0].value = "取消";
    } else {
      for (var i = 0; i < checkBoxObj.length; i++) {
        if (checkBoxObj[i].type == 'checkbox') {
          	checkBoxObj[i].checked = false;
        }
      }
      document.getElementById(arguments[1]).value = "";//清空选择的数据
      arguments[0].value = "全选";
    }
    return false;
}

/**
 * 单个选择多选框
 */
function selectedCheck(saveId, obj, checkId) {
	var selected = document.getElementById(saveId);
	var select = selected.value;
	if (obj.checked) {
		select = select.replace(new RegExp(checkId + "-", "gm"), '');
		select += checkId + "-";
	} else {
		select = select.replace(new RegExp(checkId + "-", "gm"), '');
	}
	selected.value = select;
}

/**
 * 刷新页面时根据已经勾选的初始化,同时勾选
 * 
 * @param {}
 *            saveId
 */
function initCheckAll(saveId,allId,selectedAllName,selectedAllsValue) {
	var selected = document.getElementById(saveId);
	var allIdObject = document.getElementById(allId);//全选按钮
	var selectedAllNameObject = document.getElementById(selectedAllName);//是否已经点击了全选
	if (selectedAllNameObject.value == "0") {//点击全选
		allIdObject.value="取消";
		selectedAllNameObject.value="0";
		if(selectedAllsValue){
			selected.value=selectedAllsValue;
		}
	}else{//点击取消
		//allIdObject.value="取消";
	}
	selectValue = selected.value;
	var selectIds = document.getElementsByTagName("input");
	for (var i = 0; i < selectIds.length; i++) {
		if (selectIds[i].type == "checkbox"
				&& selectIds[i].id.indexOf("selectCheckBox") >= 0) {
			var inputId = selectIds[i].id.replace("selectCheckBox",
					"selectInput");
			var selectId = document.getElementById(inputId).value;
			if (selectValue.indexOf(selectId) >= 0) {
				selectIds[i].checked = true;
			} else {
				selectIds[i].checked = false;
			}
		}
	}
}
/**
 * js触发链接点击事件，兼容ie、firefox
 */
function linkClick(link) {
	if (document.all) {
		// For IE
		link.click();
	} else if (document.createEvent) {
		// For FF
		var ev = document.createEvent('MouseEvents');
		ev.initEvent('click', false, true);
		link.dispatchEvent(ev);
	}
}

/**
 * 查询已有弹出窗口
 */
function selectAndGetInfo(queryId, formName, url) {
	var queryIdVal = document.getElementById(formName + ":" + queryId).value;
	var link = "";
	// 有带参数的情况
	queryIdVal = encodeURIComponent(queryIdVal);// 编码
	queryIdVal = encodeURIComponent(queryIdVal);// 编码
	if (url.indexOf("?") > 0) {
		link = url + '&NORESTORESTATE=true&queryId=' + queryIdVal
				+ "&formName=" + formName;
	} else
		link = url + '?NORESTORESTATE=true&queryId=' + queryIdVal
				+ "&formName=" + formName;
	link += '&hiddenRyId=' + queryId;

	if (arguments[3]) {// 企业基本信息ID
		link += '&qyjbxxid=' + arguments[3];
	}

	if (arguments[4]) {// 人员类别
		link += '&rylb=' + arguments[4];
	}

	if (arguments[5]) {// 人员ID
		link += '&ryidValue=' + arguments[5];
	}

	// var x,y;
	// var obj=event.srcElement;//数据源
	// var oRect = obj.getBoundingClientRect();
	// x=oRect.left;
	// y=oRect.top;
	//   
	// var top=event.clientY;
	// var left=event.clientX;
	//	
	// top = top+obj.offsetWidth;//event.clientX;//x+obj.offsetWidth;
	// left =
	// left+obj.offsetHeight;//event.clientY-heightPC;//y+obj.offsetHeight;//event.clientY-heightPC;//this.heightPC;
	if ('false' == arguments[6]) {
		showDialog(link, '768px', '1024px');
	} else {
		openNewWindow(link, null, 900, 900);
	}
	return false;
}

/**
* window.open公用弹出窗口公用方法
* url:链接地址
* title:弹出窗口标题
* height:高度，默认600
* width：宽度，默认800
*/
function openNewWindow(url, title, height, width) {
	try{
		if(!title){
			title = "newWindow";
		}
		if (!height) {
			height = 800;
		}
		if (!width) {
			width = 1000;
		}
		if (url.indexOf("NORESTORESTATE") < 0) {
			var tmpStr = "&tmpDate=" + new Date().valueOf();
			if (url.indexOf("?") > 0) {
				url = url + "&NORESTORESTATE=TRUE" + tmpStr;
			} else {
				url = url + "?NORESTORESTATE=TRUE" + tmpStr;
			}
		}
		var top = (window.screen.availHeight - 30 - height) / 2;
		var left = (window.screen.availWidth - 10 - width) / 2;
		var openArguments = "height=" + height + ",width=" + width + ",top=" + top + ",left=" + left + ",toolbars=0, menubars=0, resizable=0,scrollbars=1,location=0,status=0";
		window.open(url, title, openArguments);
	}catch(e){
		alert(e);
	}
}

/**
* window.showModalDialog公用弹出窗口公用方法
* url:链接地址
* back:是否需要返回值
* param:传递参数值
* height:高度，默认600
* width：宽度，默认800
*/
function showDialog(url, height, width, back, param) {
	try{
		if(!back){
			back = false;
		}
		if(!param){
			param = window;
		}
		if (!height) {
			height = '600px';
		}
		if (!width) {
			width = '800px';
		}
		if (url.indexOf("NORESTORESTATE") < 0) {
			var tmpStr = "&tmpDate=" + new Date().valueOf();
			if (url.indexOf("?") > 0) {
				url = url + "&NORESTORESTATE=TRUE" + tmpStr;
			} else {
				url = url + "?NORESTORESTATE=TRUE" + tmpStr;
			}
		}
		var openArguments = "dialogHeight=" + height + ";dialogWidth=" + width + ";status=0;center=1";
		var returnValue = showModalDialog(url, param, openArguments);
		if(back){
			return returnValue;
		}
		return false;
	}catch(e){
		alert(e);
	}
}

/**
 * 通过id获取页面元素
 * @param {} id
 * @return {}
 */
function $ById(id){
	return document.getElementById(id);	
}
/**
 通过判断产品类别是国产还是进口，来决定批准文号的格式
*/
function checkPzwh(pzwhObj,value_cplb) {
	var value_pzwh = pzwhObj.value.replace(/([\s]*$)/g, "");
	var patrn1 = /卫食健字（\d{4}）第\d{3,4}号$/;
	var patrn2 = /国食健字G\d{8}$/;
	var patrn3 = /卫食健进字（\d{4}）第\d{3,4}号$/;
	var patrn4 = /卫进食健字（\d{4}）第\d{3,4}号$/;
	var patrn5 = /国食健字J\d{8}$/;

	var prompt1 = "批准文号格式有误，正确格式为：\n卫食健字（2012）第246号、卫食健字（2012）第2346号\n国食健字G10234567";
	var prompt2 = "批准文号格式有误，正确格式为：\n卫食健进字（2012）第135号、卫食健进字（2012）第1235号\n卫进食健字（2012）第135号、卫进食健字（2012）第1235号\n国食健字J10234567";

	if(value_cplb == '0') {
		if(chkBy_rule(patrn1,value_pzwh,'') || chkBy_rule(patrn2,value_pzwh,'')) {
      					return true;
    				}else{ 
      					alert(prompt1); 
      					return false;
   	  				}
	} 
	if(value_cplb == '1') {
		if(chkBy_rule(patrn3,value_pzwh,'') || chkBy_rule(patrn4,value_pzwh,'')|| chkBy_rule(patrn5,value_pzwh,'')) {
      					return true;
    				}else{ 
      					alert(prompt2); 
      					return false;
   	  				}
	}
}

/**
  * 校验二类医疗器械产品注册证号
  * 参数为值对象
*/
function checkCpzczbm(cpzczbmObj){
   var value_cpzczbm = cpzczbmObj.value.replace(/([\s]*$)/g, "");
	var patrn1 = /粤食药监械（准）字\d{4}第\d{7}号$/;
	var patrn2 = /粤食药监械（准）字\d{4}第\d{7}号（更）$/;
	var patrn3 = /[粤,国]{1}械注[准,进,许]{1}\d{11}/;
	var prompt1 = "原注册证号格式有误，旧证正确格式为：\n粤食药监械（准）字2012第0000001号、粤食药监械（准）字2012第0000001号（更）\n新证正确格式为\n粤械注#20120000000、国械注#20120000000(#为(准,进,许,其中一个))";
	if(chkBy_rule(patrn1,value_cpzczbm,'') || chkBy_rule(patrn2,value_cpzczbm,'')||chkBy_rule(patrn3,value_cpzczbm,'')) {
     	return true;
	}else{ 
		alert(prompt1); 
		return false;
	}
}


/**
  * 校验二类医疗器械产品注册证号 106-002,003,004,006,007,008
  * 参数为值对象
*/
function checkCpzczbm02(cpzczbmObj,sxbh){
     var value_cpzczbm = cpzczbmObj.value.replace(/([\s]*$)/g, "");
	 var patrn1 = /粤食药监械（准）字\d{4}第\d{7}号$/;
	 var patrn2 = /粤食药监械（准）字\d{4}第\d{7}号（更）$/;
	 var patrn3 = /国食药监械（准）字\d{4}第\d{7}号$/;
	 var patrn4 = /国食药监械（准）字\d{4}第\d{7}号（更）$/;
	 var patrn5 = /粤[\u4e00-\u9fa5]{1}食药监械（准）字\d{4}第\d{7}号$/;
	 var patrn6 = /粤[\u4e00-\u9fa5]{1}食药监械（准）字\d{4}第\d{7}号（更）$/;
	 var patrn7 = /粤深药监械（准）字\d{4}第\d{7}号$/;
	 var patrn8 = /粤深药监械（准）字\d{4}第\d{7}号（更）$/;
	 var patrn9 = /[粤,国]{1}械注[准,进,许]{1}\d{11}/;
	if(sxbh =='106-002' || sxbh == '106-003'||sxbh == '106-004' || sxbh =='106-009'||sxbh =='106-006'){
		    
			var prompt1 = "原注册证号格式有误，旧证正确格式为：\n粤食药监械（准）字2012第0000001号、粤食药监械（准）字2012第0000001号（更）\n粤深药监械（准）字....第*******号、粤深药监械（准）字....第*******号（更）\n国食药监械（准）字2012第0000001号、国食药监械（准）字2012第0000001号（更）\n粤#食药监械（准）字2012第0000001号、粤#食药监械（准）字2012第0000001号（更）\n(#为市的简称)\n新证正确格式为\n粤械注#20120000000、国械注#20120000000(#为(准,进,许,其中一个))";
			
			if(chkBy_rule(patrn9,value_cpzczbm,'')||chkBy_rule(patrn1,value_cpzczbm,'') || chkBy_rule(patrn2,value_cpzczbm,'')||chkBy_rule(patrn3,value_cpzczbm,'')||chkBy_rule(patrn4,value_cpzczbm,'')||chkBy_rule(patrn5,value_cpzczbm,'')||chkBy_rule(patrn6,value_cpzczbm,'')||chkBy_rule(patrn7,value_cpzczbm,'')||chkBy_rule(patrn8,value_cpzczbm,'')) {
		     	return true;
			}else{ 
				alert(prompt1); 
				return false;
			}	
	
	
	}else{
			var prompt2 = "原注册证号格式有误，旧证正确格式为：\n粤食药监械（准）字2012第0000001号\n粤深药监械（准）字....第*******号 \n国食药监械（准）字2012第0000001号\n粤#食药监械（准）字2012第0000001号\n (#为市的简称)\n新证正确格式为\n粤械注#20120000000、国械注#20120000000(#为(准,进,许,其中一个))";
			if(chkBy_rule(patrn9,value_cpzczbm,'')||chkBy_rule(patrn1,value_cpzczbm,'') ||chkBy_rule(patrn3,value_cpzczbm,'')||chkBy_rule(patrn5,value_cpzczbm,'')||chkBy_rule(patrn7,value_cpzczbm,'')) {
     			return true;	
			}else{ 
				alert(prompt2); 
				return false;
			}
	
	
	}

}