function getIEVersion(){
	var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    if (window.ActiveXObject)
        Sys.ie = ua.match(/msie ([\d.]+)/)[1]
    else if (document.getBoxObjectFor)
        Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
    else if (window.MessageEvent&&!document.getBoxObjectFor)
        Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
    else if (window.opera)
        Sys.opera = ua.match(/opera.([\d.]+)/)[1]
    else if (window.openDatabase)
        Sys.safari = ua.match(/version\/([\d.]+)/)[1];
    if(Sys.ie) return Sys.ie;
    if(Sys.firefox) return  Sys.firefox;
    if(Sys.chrome) return  Sys.chrome;
    if(Sys.opera) return  Sys.opera;
    if(Sys.safari) return  Sys.safari;
}

/**
 * 浏览器兼容
 */
function browserCompatible(ulId,rightDivId,leftDivId){
	var IEVersion = getIEVersion();
	var ulObj=document.getElementById(ulId);
	var rightDivObj=document.getElementById(rightDivId);
	var leftDivId=document.getElementById(leftDivId);
	if(IEVersion.indexOf("6")>=0){
		ulObj.style.cssText="margin-left: -60px;margin-right: -10px;";
		rightDivObj.style.width="580px";
		rightDivObj.style.height="478px";
		leftDivId.style.height="478px";
	}
	if(IEVersion.indexOf("7")>=0){
		rightDivObj.style.width="578px";
		
		rightDivObj.style.height="478px";
		leftDivId.style.height="478px";
		ulObj.style.cssText="margin-left: -1px;margin-right: -10px;margin-top:20px";
	}
	if(IEVersion.indexOf("8")>=0){
		rightDivObj.style.width="578px";
		//rightDivObj.style.width="708px";
		rightDivObj.style.height="478px";
		leftDivId.style.height="478px";
		ulObj.style.cssText="margin-left: -1px;margin-right: -10px;";
	}
}
/**
 * 控制首頁的table高度
 * */
function tableHeightCompatible(tableId){

	var IEVersion = getIEVersion();

	var tableObjId=document.getElementById(tableId);
	if(IEVersion.indexOf("6")>=0){
		tableObjId.style.height="428px";
	}
	if(IEVersion.indexOf("7")>=0){
		tableObjId.style.height="478px";
	}
	if(IEVersion.indexOf("8")>=0){
		tableObjId.style.height="478px";
	}
}


/**
 * 为指定的id设置样式style
 */
function browserCompatibleStyleOfId(targetId,targetStyleForIE6,targetStyleForIE7,targetStyleForIE8){
	var IEVersion = getIEVersion();
	var targetObj=document.getElementById(targetId);
	if(IEVersion.indexOf("6")>=0){
		targetObj.style.cssText=targetStyleForIE6;
	}
	if(IEVersion.indexOf("7")>=0){
		targetObj.style.cssText=targetStyleForIE7;
	}
	if(IEVersion.indexOf("8")>=0){
		targetObj.style.cssText=targetStyleForIE8;
	}
}
/**
 * init()函数是用来定位导航栏菜单；initData()函数用来定位具体菜单栏下的子菜单
 * 在url后加menuId参数定位导航栏菜单，navId定位子菜单；定位示例：/gdyj/sjwz/Main.faces?menuId=3&navId=2  这样就定位到第三个菜单下的第二个子菜单。
 *
 */
function initData(){
	var url = location.search; //获取url中"?"符后的字串   
			var navId;//左菜单
	   	    var menuId;//导航栏
	   	    
			if(url.indexOf("?") != -1) {
				var theRequest = new Object();   
	  			var strs;
	  			var str = url.substr(1);   
	  				strs = str.split("&");   
	 				for(var i = 0; i < strs.length; i ++){   
						if(strs[i].indexOf("navId") != -1){//如果导航参数不为空，取得导航参数
							navId = strs[i].substr(6); 
						}
						if(strs[i].indexOf("menuId") != -1){//如果菜单参数不为空，取得菜单参数
							menuId = strs[i].substr(7); 
						}
	  				 }    				 
			}

		if(navId){
		  		if(navId==1&&menuId==1){
		  			document.getElementById("bjp_leftMenu1").onclick();
		  		}else if(navId==2&&menuId==1){
		  			document.getElementById("bjp_leftMenu2").onclick();
		  		}else if(navId==3&&menuId==1){
		  			document.getElementById("bjp_leftMenu3").onclick();
		  		}else if(navId==4&&menuId==1){
		  			document.getElementById("bjp_leftMenu4").onclick();
		  		}else if(navId==5&&menuId==1){
		  			
		  		}else if(navId==6&&menuId==1){
		  			
		  		}else if(navId==7&&menuId==1){
		  			
		  		}else if(navId==8&&menuId==1){
		  			
		  		}else if(navId==9&&menuId==1){
		  			
		  		}else if(navId==1&&menuId==2){
		  			document.getElementById("ylqx_leftMenu1").onclick();
		  		}else if(navId==2&&menuId==2){
		  			document.getElementById("ylqx_leftMenu2").onclick();
		  		}else if(navId==3&&menuId==2){
		  			document.getElementById("ylqx_leftMenu3").onclick();
		  		}else if(navId==4&&menuId==2){
		  			document.getElementById("ylqx_leftMenu4").onclick();
		  		}else if(navId==5&&menuId==2){
		  			document.getElementById("ylqx_leftMenu5").onclick();
		  		}else if(navId==6&&menuId==2){
		  			document.getElementById("ylqx_leftMenu6").onclick();
		  		}else if(navId==7&&menuId==2){
		  			document.getElementById("ylqx_leftMenu7").onclick();
		  		}else if(navId==8&&menuId==2){
		  			document.getElementById("ylqx_leftMenu8").onclick();
		  		}else if(navId==9&&menuId==2){
		  			
		  		}else if(navId==1&&menuId==3){
		  			document.getElementById("yp_leftMenu1").onclick();
		  		}else if(navId==2&&menuId==3){
		  			document.getElementById("yp_leftMenu2").onclick();
		  		}else if(navId==3&&menuId==3){
		  			document.getElementById("yp_leftMenu3").onclick();
		  		}else if(navId==4&&menuId==3){
		  			document.getElementById("yp_leftMenu4").onclick();
		  		}else if(navId==5&&menuId==3){
		  			document.getElementById("yp_leftMenu5").onclick();
		  		}else if(navId==6&&menuId==3){
		  			document.getElementById("yp_leftMenu6").onclick();
		  		}else if(navId==7&&menuId==3){
		  			document.getElementById("yp_leftMenu7").onclick();
		  		}else if(navId==8&&menuId==3){
		  			document.getElementById("yp_leftMenu8").onclick();
		  		}else if(navId==9&&menuId==3){
		  			document.getElementById("yp_leftMenu9").onclick();
		  		}else if(navId==10&&menuId==3){
		  			document.getElementById("yp_leftMenu10").onclick();
		  		}else if(navId==11&&menuId==3){
		  			document.getElementById("yp_leftMenu11").onclick();
		  		}else if(navId==12&&menuId==3){
		  			document.getElementById("yp_leftMenu12").onclick();
		  		}else if(navId==1&&menuId==4){
		  			document.getElementById("hzp_leftMenu1").onclick();
		  		}else if(navId==2&&menuId==4){
		  			
		  		}else if(navId==3&&menuId==4){
		  			
		  		}else if(navId==4&&menuId==4){
		  		
		  		}else if(navId==5&&menuId==4){
		  			
		  		}else if(navId==6&&menuId==4){
		  			
		  		}else if(navId==7&&menuId==4){
		  			
		  		}else if(navId==8&&menuId==4){
		  			
		  		}else if(navId==9&&menuId==4){
		  			
		  		}else if(navId==1&&menuId==5){
		  			document.getElementById("zyys_leftMenu1").onclick();
		  		}else if(navId==2&&menuId==5){
		  			document.getElementById("zyys_leftMenu2").onclick();
		  		}else if(navId==3&&menuId==5){
		  			document.getElementById("zyys_leftMenu3").onclick();
		  		}else if(navId==4&&menuId==5){
		  			document.getElementById("zyys_leftMenu4").onclick();
		  		}else if(navId==5&&menuId==5){
		  			document.getElementById("zyys_leftMenu5").onclick();
		  		}else if(navId==6&&menuId==5){
		  			document.getElementById("zyys_leftMenu6").onclick();
		  		}else if(navId==7&&menuId==5){
		  			document.getElementById("zyys_leftMenu7").onclick();
		  		}else if(navId==8&&menuId==5){
		  			document.getElementById("zyys_leftMenu8").onclick();
		  		}else if(navId==9&&menuId==5){
		  			document.getElementById("zyys_leftMenu9").onclick();
		  		}else if(navId==1&&menuId==6){
		  			document.getElementById("jkz_leftMenu1").onclick();
		  		}else if(navId==2&&menuId==6){
		  			document.getElementById("cyfw_leftMenu1").onclick();
		  		}else if(navId==3&&menuId==6){
		  			
		  		}else if(navId==4&&menuId==6){
		  			
		  		}else if(navId==5&&menuId==6){
		  			
		  		}else if(navId==6&&menuId==6){
		  			
		  		}else if(navId==7&&menuId==6){
		  			document.getElementById("yp_leftMenu9").onclick();
		  		}else if(navId==8&&menuId==6){
		  			document.getElementById("yp_leftMenu9").onclick();
		  		}else if(navId==9&&menuId==6){
		  			document.getElementById("yp_leftMenu9").onclick();
		  		}else{
		  			document.getElementById("bjp_leftMenu1").onclick();
		  		}
		  	}else{
		  		//默认显示第一个导航项
		  			document.getElementById("bjp_leftMenu1").onclick();
		  	}
}

function init(){
		var url = location.search; //获取url中"?"符后的字串   
		var navId;//导航栏
   	    var menuId;//左菜单
   	    var navtableVisible;
   	   // alert(url);
		if(url.indexOf("?") != -1) {
			var theRequest = new Object();   
  			var strs;
  			var str = url.substr(1);   
  			strs = str.split("&");  
 				for(var i = 0; i < strs.length; i ++){   
					if(strs[i].indexOf("navId") != -1){//如果导航参数不为空，取得导航参数
						
						navId = strs[i].substr(6); 
					
					}
					if(strs[i].indexOf("menuId") != -1){//如果菜单参数不为空，取得菜单参数
						
						menuId = strs[i].substr(7); 
						
					
					}
					if(strs[i].indexOf("navtable") != -1){
						
						navtableVisible = strs[i].substr(9);
						//alert("--navtableVisible="+navtableVisible);
						document.getElementById("navtable").style.display=navtableVisible;
					
					}
  				 }    				 
		}else{
			document.all.nav0.style.display="block";
			document.all.text0.style.display="none";
		}
	
	  	if(menuId){
	  		if(menuId==1){
				document.getElementById("td0").onclick();
	  		}else if(menuId==2){
  				document.getElementById("td1").onclick();
	  		}else if(menuId==3){
  				document.getElementById("td2").onclick();
	  		}else if(menuId==4){
  				document.getElementById("td3").onclick();
	  		}else if(menuId==5){
  				document.getElementById("td4").onclick();
	  		}else if(menuId==6){
  				document.getElementById("td5").onclick();
	  		}else{
	  			document.getElementById("td0").onclick();
	  		}
	  	}else{
	  		//默认显示第一个左菜单项
 			document.getElementById("td0").onclick();
	  	}
	}

function show(aa,bb,cc,n){
		//alert(n);
		document.all.div0.style.display="none";
		document.all.div1.style.display="none";
		document.all.div2.style.display="none";
		document.all.div3.style.display="none";
		document.all.div4.style.display="none";
		document.all.div5.style.display="none";
		//document.all.div6.style.display="none";
		//document.all.div7.style.display="none";
		
		
		//bb.style.background="images/fda_index_bg5.gif";
		document.all.nav0.style.display="none";
		document.all.nav1.style.display="none";
		document.all.nav2.style.display="none";
		document.all.nav3.style.display="none";
		document.all.nav4.style.display="none";
		document.all.nav5.style.display="none";
		//document.all.nav6.style.display="none";
		//document.all.nav7.style.display="none";
		
		document.all.text0.style.display="block";
		document.all.text1.style.display="block";
		document.all.text2.style.display="block";
		document.all.text3.style.display="block";
		document.all.text4.style.display="block";
		document.all.text5.style.display="block";
		//document.all.text6.style.display="block";
		//document.all.text7.style.display="block";

		//document.getElementById("td"+n).style.backgroundColor="yellow";
		//document.getElementById("td"+n).style.background="url(#{facesContext.externalContext.requestContextPath}/gdyj/sjwz/images/tabsS.gif)";
		//div0 nav0  text0 0 
		aa.style.display="block";
		bb.style.display="block";
		cc.style.display="none";
							}
function initYp(){
		  		//默认显示第一个左菜单项
	 			document.all.yp_leftStyle1.style.display="none";
				document.all.yp_leftStyle2.style.display="none";
			    document.all.yp_leftStyle3.style.display="none";
				document.all.yp_leftStyle4.style.display="none"; 
				document.all.yp_leftStyle5.style.display="none";
				document.all.yp_leftStyle6.style.display="none";
				document.all.yp_leftStyle7.style.display="none";
				document.all.yp_leftStyle8.style.display="none";
				document.all.yp_leftStyle9.style.display="none";
				document.all.yp_leftStyle10.style.display="none";
				document.all.yp_leftStyle11.style.display="none";
				document.all.yp_leftStyle12.style.display="none";
						
				document.all.yp_leftMenu1.style.display="none";
				document.all.yp_leftMenu2.style.display="none";
			    document.all.yp_leftMenu3.style.display="none";
				document.all.yp_leftMenu4.style.display="none";
				document.all.yp_leftMenu5.style.display="block";
				document.all.yp_leftMenu6.style.display="block";
				document.all.yp_leftMenu7.style.display="none";
				document.all.yp_leftMenu8.style.display="none";
				document.all.yp_leftMenu9.style.display="none";
				document.all.yp_leftMenu10.style.display="block";
				document.all.yp_leftMenu11.style.display="block";
				document.all.yp_leftMenu12.style.display="block";
				
				document.all.yp1.style.display="none";
				document.all.yp2.style.display="none";
			    document.all.yp3.style.display="none";
			    document.all.yp4.style.display="none";
			    document.all.yp5.style.display="none";
			    document.all.yp6.style.display="none";
			    document.all.yp7.style.display="none";
			    document.all.yp8.style.display="none";
			    document.all.yp9.style.display="none";
			    document.all.yp10.style.display="none";
			    document.all.yp11.style.display="none";
			    document.all.yp12.style.display="none";
			    
			    document.all.yp_leftStyle5.style.display="block";
			    document.all.yp_leftMenu5.style.display="none";
			    document.all.yp5.style.display="block";
}		

function initYlqx(){
		  		//默认显示第一个左菜单项
	 			document.all.ylqx_leftStyle1.style.display="none";
				document.all.ylqx_leftStyle2.style.display="none";
			    document.all.ylqx_leftStyle3.style.display="none";
				document.all.ylqx_leftStyle4.style.display="none"; 
				document.all.ylqx_leftStyle5.style.display="none";
				document.all.ylqx_leftStyle6.style.display="none";
				document.all.ylqx_leftStyle7.style.display="none";

						
				document.all.ylqx_leftMenu1.style.display="block";
				document.all.ylqx_leftMenu2.style.display="block";
			    document.all.ylqx_leftMenu3.style.display="none";
				document.all.ylqx_leftMenu4.style.display="none";
				document.all.ylqx_leftMenu5.style.display="block";
				document.all.ylqx_leftMenu6.style.display="block";
				document.all.ylqx_leftMenu7.style.display="none";

				
				document.all.ylqx1.style.display="none";
				document.all.ylqx2.style.display="none";
			    document.all.ylqx3.style.display="none";
			    document.all.ylqx4.style.display="none";
			    document.all.ylqx5.style.display="none";
			    document.all.ylqx6.style.display="none";
			    document.all.ylqx7.style.display="none";

			    
			    document.all.ylqx_leftStyle1.style.display="block";
			    document.all.ylqx_leftMenu1.style.display="none";
			    document.all.ylqx1.style.display="block";
}

function initYscx(){
		  		//默认显示第一个左菜单项
	 			document.all.zyys_leftStyle1.style.display="none";
				document.all.zyys_leftStyle2.style.display="none";
			    document.all.zyys_leftStyle3.style.display="none";
				document.all.zyys_leftStyle4.style.display="none"; 
				document.all.zyys_leftStyle5.style.display="none";
				document.all.zyys_leftStyle6.style.display="none";
				
				document.all.zyys_leftMenu1.style.display="block";
				document.all.zyys_leftMenu2.style.display="none";
			    document.all.zyys_leftMenu3.style.display="none";
				document.all.zyys_leftMenu4.style.display="none";
				document.all.zyys_leftMenu5.style.display="none";
				document.all.zyys_leftMenu6.style.display="none";
		
				document.all.zyys1.style.display="none";
				document.all.zyys2.style.display="none";
			    document.all.zyys3.style.display="none";
			    document.all.zyys4.style.display="none";
			    document.all.zyys5.style.display="none";
			    document.all.zyys6.style.display="none";
    
			    document.all.zyys_leftStyle1.style.display="block";
			    document.all.zyys_leftMenu1.style.display="none";
			    document.all.zyys1.style.display="block";
}

function initBjp(){
	//默认显示第一个左菜单项
	document.all.bjp_leftStyle1.style.display="block";//有样式的左菜单
	document.all.bjp_leftStyle2.style.display="none";//有样式的左菜单
	document.all.bjp_leftStyle3.style.display="none";//有样式的左菜单
	document.all.bjp_leftStyle4.style.display="none";//有样式的左菜单
	
	document.all.bjp_leftMenu1.style.display="none";//无样式的左菜单
	document.all.bjp_leftMenu2.style.display="block";//无样式的左菜单
	document.all.bjp_leftMenu3.style.display="block";//无样式的左菜单
	document.all.bjp_leftMenu4.style.display="block";//无样式的左菜单
	
	document.all.bjp1.style.display="block";
	document.all.bjp2.style.display="none";
	document.all.bjp3.style.display="none";
	document.all.bjp4.style.display="none";
}		

function initCyfw(){
	//默认显示第一个左菜单项
	document.all.cyfw_leftStyle1.style.display = "none";
	document.all.jkz_leftStyle1.style.display = "block";
	
	document.all.cyfw_leftMenu1.style.display = "block";
	document.all.jkz_leftMenu1.style.display = "none";
	
	document.all.cyfw1.style.display = "none";
	document.all.jkz1.style.display = "block";
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

function getParamValue(paramValues,fatherFormId,childId){
							var paramValue = paramValues.split(",");
							var hmtlText ="";						
							for(var i=0;i<paramValue.length;i++){	
								 	hmtlText +="document.getElementById(\'"+fatherFormId+":"+paramValue[i]+"\').value=window.opener.document.getElementById(\'"+childId+":"+paramValue[i]+"\').value;";
									hmtlText += "<br/>";

							}
							document.write(hmtlText);
	
}