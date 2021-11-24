/** loading */
function useLoadingImage(imageSrc) {
	var loadingImage;
	if (imageSrc)
		loadingImage = imageSrc;
	else
		loadingImage = "images/loading/blue-loading.gif";
	dwr.engine.setPreHook(function() {
				var disabledImageZone = dwr.util.byId('disabledImageZone');
				if (!disabledImageZone) {
					disabledImageZone = document.createElement('div');
					disabledImageZone.setAttribute('id', 'disabledImageZone');
					disabledImageZone.style.position = "absolute";
					disabledImageZone.style.zIndex = "1000";
					disabledImageZone.style.left = "-500px";
					disabledImageZone.style.top = "300px";
					disabledImageZone.style.width = "100%";
					disabledImageZone.style.height = "100%";
					var imageZone = document.createElement('img');
					imageZone.setAttribute('id', 'imageZone');
					imageZone.setAttribute('src', imageSrc);
					imageZone.style.position = "absolute";
					imageZone.style.top = "0px";
					imageZone.style.right = "0px";
					disabledImageZone.appendChild(imageZone);
					document.documentElement.appendChild(disabledImageZone);

				} else {
					dwr.util.byId('imageZone').src = imageSrc;
					disabledImageZone.style.visibility = 'visible';
				}
			});
	dwr.engine.setPostHook(function() {
				dwr.util.byId('disabledImageZone').style.visibility = 'hidden';
			});
}

var isIE = (document.all) ? true : false;

var isIE6 = isIE && ([/MSIE (\d+)\.0/i.exec(navigator.userAgent)][0][1] == 6);

var $id = function(id) {
	// alert('a');
	return "string" == typeof id ? document.getElementById(id) : id;
};

var Class = {
	create : function() {
		return function() {
			this.initialize.apply(this, arguments);
		}
	}
}

var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}

var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
}

var Each = function(list, fun) {
	for (var i = 0, len = list.length; i < len; i++) {
		fun(list[i], i);
	}
};

var Contains = function(a, b) {
	return a.contains ? a != b && a.contains(b) : !!(a
			.compareDocumentPosition(b) & 16);
}

var OverLay = Class.create();
OverLay.prototype = {
	initialize : function(options) {

		this.SetOptions(options);

		this.Lay = $id(this.options.Lay)
				|| document.body.insertBefore(document.createElement("div"),
						document.body.childNodes[0]);

		this.Color = this.options.Color;
		this.Opacity = parseInt(this.options.Opacity);
		this.zIndex = parseInt(this.options.zIndex);

		with (this.Lay.style) {
			display = "none";
			zIndex = this.zIndex;
			left = top = 0;
			position = "fixed";
			width = height = "100%";
		}

		if (isIE6) {
			this.Lay.style.position = "absolute";
			// ie6���ø��ǲ��С����
			this._resize = Bind(this, function() {
						this.Lay.style.width = Math.max(document.body
										? document.body.scrollWidth
										: document.documentElement.scrollWidth,
								document.body
										? document.body.clientWidth
										: document.documentElement.clientWidth)
								+ "px";
						this.Lay.style.height = Math
								.max(
										document.body
												? document.body.scrollHeight
												: document.documentElement.scrollHeight,
										document.body
												? document.body.clientHeight
												: document.documentElement.clientHeight)
								+ "px";
					});
			// �ڸ�select
			// this.Lay.innerHTML = '<iframe
			// style="position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);"></iframe>'
		}
	},
	// ����Ĭ������
	SetOptions : function(options) {
		this.options = {// Ĭ��ֵ
			Lay : null,// ���ǲ����
			Color : "#fff",// ����ɫ
			Opacity : 20,// ͸����(0-100)
			zIndex : 1000
			// ���˳��
		};
		Extend(this.options, options || {});
	},
	// ��ʾ
	Show : function() {
		// ����ie6
		if (isIE6) {
			this._resize();
			window.attachEvent("onresize", this._resize);
		}
		// ������ʽ
		with (this.Lay.style) {
			// ����͸����
			isIE
					? filter = "alpha(opacity:" + this.Opacity + ")"
					: opacity = this.Opacity / 100;
			backgroundColor = this.Color;
			display = "block";
		}
	},
	// �ر�
	Close : function() {
		this.Lay.style.display = "none";
		if (isIE6) {
			window.detachEvent("onresize", this._resize);
		}
	}
};

var LightBox = Class.create();
LightBox.prototype = {
	initialize : function(box, options) {

		this.Box = $id(box);// ��ʾ��
		if (this.Box) {
			this.OverLay = new OverLay(options);// ���ǲ�

			this.SetOptions(options);

			this.Fixed = !!this.options.Fixed;
			this.Over = !!this.options.Over;
			this.Center = !!this.options.Center;
			this.onShow = this.options.onShow;

			this.Box.style.zIndex = this.OverLay.zIndex + 1;
			this.Box.style.display = "none";

			// ����ie6�õ�����
			if (isIE6) {
				this._top = this._left = 0;
				this._select = [];
				this._fixed = Bind(this, function() {
							this.Center ? this.SetCenter() : this.SetFixed();
						});
			}
		}
	},
	// ����Ĭ������
	SetOptions : function(options) {
		this.options = {// Ĭ��ֵ
			Over : false,// �Ƿ���ʾ���ǲ�
			Fixed : false,// �Ƿ�̶���λ
			Center : true,// �Ƿ����
			onShow : function() {
			}// ��ʾʱִ��
		};
		Extend(this.options, options || {});
	},
	// ����ie6�Ĺ̶���λ����
	SetFixed : function() {
		this.Box.style.top = document.documentElement.scrollTop - this._top
				+ this.Box.offsetTop + "px";
		this.Box.style.left = document.documentElement.scrollLeft - this._left
				+ this.Box.offsetLeft + "px";

		this._top = document.documentElement.scrollTop;
		this._left = document.documentElement.scrollLeft;
	},
	// ����ie6�ľ��ж�λ����
	SetCenter : function() {
		this.Box.style.marginTop = document.documentElement.scrollTop
				- this.Box.offsetHeight / 2 + "px";
		this.Box.style.marginLeft = document.documentElement.scrollLeft
				- this.Box.offsetWidth / 2 + "px";
	},
	// ��ʾ
	Show : function(options) {
		if (this.Box) {
			// �̶���λ
			this.Box.style.position = this.Fixed && !isIE6
					? "fixed"
					: "absolute";

			// ���ǲ�
			this.Over && this.OverLay.Show();

			this.Box.style.display = "block";

			// ����
			if (this.Center) {
				this.Box.style.top = this.Box.style.left = "50%";
				// ����margin
				if (this.Fixed) {
					this.Box.style.marginTop = -this.Box.offsetHeight / 2
							+ "px";
					this.Box.style.marginLeft = -this.Box.offsetWidth / 2
							+ "px";
				} else {
					this.SetCenter();
				}
			}

			// ����ie6
			if (isIE6) {
				if (!this.Over) {
					// û�и��ǲ�ie6��Ҫ�Ѳ���Box�ϵ�select����
					this._select.length = 0;
					Each(document.getElementsByTagName("select"), Bind(this,
									function(o) {
										if (!Contains(this.Box, o)) {
											o.style.visibility = "hidden";
											this._select.push(o);
										}
									}))
				}
				// ������ʾλ��
				this.Center ? this.SetCenter() : this.Fixed && this.SetFixed();
				// ���ö�λ
				this.Fixed && window.attachEvent("onscroll", this._fixed);
			}
			this.onShow();
		}
	},
	// �ر�
	Close : function() {
		this.Box.style.display = "none";
		this.OverLay.Close();
		if (isIE6) {
			window.detachEvent("onscroll", this._fixed);
			Each(this._select, function(o) {
						o.style.visibility = "visible";
					});
		}
	}
};

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}


/**
 * dwr��ѯ֮ǰ��ʾloadingҳ��,��ϸ���ݲ鿴loading.js
 * 
 * @param {}
 *            message
 */
var useLoading = function (message) {
	var loadingMessage;
	if (message) {
		loadingMessage = message;
	} else {
		loadingMessage = "Loading";
	}
	dwr.engine.setPreHook(function () {
		searching(box);
	});
	dwr.engine.setPostHook(function () {
		loadingClose();
	});
}

var isLoading = false;
function loadingShow(title, box) {
	try {
		if (isLoading) {
			return;
		}
		if (!title) {
			title = '';
		}
		if (document.getElementById('loadingImg')) {
			document.getElementById('loadingImg').setAttribute('alt', title);
		}
		if (document.getElementById('loadingImg')) {
			document.getElementById('loadingLabel').innerHTML = title;
		}
		if (!box) {
			box = new LightBox("idBox");
		}
		if (box.Box) {
			box.Over = true;
			box.OverLay.Color = "#fff";
			box.OverLay.Opacity = 30;
			box.Fixed = true;
			box.Center = true;
			box.Show();
			isLoading = true;
		}
	} catch (e) {
		alert(e.message);
	}
	return true;
}
function loadingClose() {
	if (box) {
		box.Close();
		box.Over = false;
		isLoading = false;
	}
}

function searching(box) {
	return loadingShow("�������ڲ�ѯ�У������ĵȴ�. . . . . .", box);
}

function loading(box) {
	return loadingShow("�������ڴ����У������ĵȴ�. . . . . .", box);
}
function downloading(box) {
	return loadingShow("�������������У������ĵȴ�. . . . . .", box);
}
function addEventSimple(obj, evt, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}
