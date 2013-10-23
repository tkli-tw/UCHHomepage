
//-------------------------------------------------------
//  嘗試 每個 html 對應一個 同名 js，
//  裡面嘗試 寫成一個 類別(物件) 把 本頁面特定的處理包起來，以方便管理。
//  基本上，這裡的函數 只會在 同名的那個 html 裡面用到，而且應該只被叫用一次，
//  從再用性上看，是沒什麼用處的，
//  單純從 管理的角度， 讓 寫程式的人 看起來比較爽。
//-------------------------------------------------------

var pageLayout = null;

//-------------------------------------------------------
//  初始化頁面各項 圖形化介面，包括大小及位置等。
//-------------------------------------------------------
initGUI = function (callback){
	//initGlobalComponent(callback);
	logMessage( "begin to load pageLayout.json ." );
	
	//改用 LayoutManager
	$.getJSON( "json/pageLayout.json").done(function(data) {
		logMessage( "load pageLayout.json success" );

		var _body = document.getElementsByTagName('body') [0];
		
		// LayoutManager(configure, parent)
		pageLayout = new LayoutManager(data, _body);
		pageLayout.set();

		callback();
	})
	.fail(function() {     //handle the error...
		logMessage( "error: can not load pageLayout.json." );
	});
};

//-------------------------------------------------------
//  主要載入 頁面的靜態資料，然後放到對應的位置
//-------------------------------------------------------
loadData = function(callback){
	// 這些函數 基本上，可以 平行運作，故不需 序列化呼叫
	logMessage('loadData ....  begin' );

	this.loadMainfunction();
	this.loadLink();
	this.loadImageLink();
	
	logMessage('loadStaticData ....  end' );
};

//-------------------------------------------------------
//  載入 主功能 內容
//-------------------------------------------------------
loadMainfunction = function(){

	$.getJSON( "json/mainfunction.json").done(function(data) {
		logMessage( "load mainfunction.json success" );
		
		var _body = document.getElementsByTagName('body')[0];
		var _maindisplay = document.getElementById('maindisplay');
		var _secondarydisplay = document.getElementById('secondarydisplay');
		var _mainoperate = document.getElementById('mainoperate');
		
		// 原則上，主功能區是一個 3*4 的表格，總共 12 個磚，一樣大小
		// 分為 預設狀態 和 按下狀態，
		// 滑鼠移上去時，主顯示區 顯示訊息，移開，恢復，
		// 滑鼠點下，呈現 按下狀態，則主顯示區 顯示該磚 對應的內容(常駐狀態)，再按一次，則變回預設
		var settings = {
			'brickSize': {'width' :80, 'height' : 30}
		};

		var theHolder = _mainoperate;
		
		theHolder.width = parseInt(theHolder.style.width);
		theHolder.height = parseInt(theHolder.style.height);
		
		var flowHolder = new FlowHolder(theHolder, settings);
		
		$.each(data.items, function(brickCount, item){

			settings.normalColor =  BrickMotion.NORMAL_COLOR ;
			settings.maindisplay = _maindisplay;
			settings.parent = _body;
			settings.hiddenLeft = pageLayout.HIDDEN_LEFT;
			settings.secondarydisplay = _secondarydisplay;
			settings.type = item.type;
			settings.title = item.title;
			
			if (item.outerLink) settings.outerLink = item.outerLink;
			else settings.outerLink = null;
			
			var brick = new SwitchBrick(settings);
			flowHolder.place(brick.bindComponent);

			brickCount++;
		});	

		logMessage('loadMainfunction ....  end' );
	})
	.fail(function() {     //handle the error...
		logMessage( "error: can not load mainfunction.json." );
	});
	
	
};  // end of  loadMainfunction

//-------------------------------------------------------
//  載入 各項連結 內容
//-------------------------------------------------------
loadLink = function(){

	logMessage('loadLink ....  begin' );
	$.getJSON( "json/link.json").done(function(data) {
		logMessage( "load link.json success" );
		$.each(data.groups, function(i, group){  
			document.getElementById('secondarydisplay').innerHTML += "<br/><a href=\"javascript:goRelatedLink(' .....')\" >" + group.groupTitle +'</a>' ;
			
			$.each(group.links, function(j, item){
				document.getElementById('secondarydisplay').innerHTML += "<br/><a href=\"javascript:goRelatedLink(' "+ item.link + "')\" >" + item.title +'</a>' ;
			}); //end of each group.links
			
		}); //end of each data.groups
		
		logMessage('loadLink ....  end' );

	})
	.fail(function() {     //handle the error...
		logMessage( "error: can not load link.json." );
	});
	
};  // end of  loadLink

//-------------------------------------------------------
//  載入 相關連結
//-------------------------------------------------------
loadImageLink = function(){

	// 底下的方式從 http://api.jquery.com/jQuery.getJSON/ 複製出來的，
	// 原則上，本範例都儘量這種方式(統一) 來實作 擷取json 文件內容，並轉出呈現GUI的工作。
	$.getJSON( "json/imageLink.json").done(function(data) {
		logMessage( "load imageLink.json success" );
		
		var settings = {
			'brickSize': {'width' :100, 'height' : 35}
		};
		var theHolder = document.getElementById('iconlink');
		theHolder.width = parseInt(theHolder.style.width);
		theHolder.height = parseInt(theHolder.style.height);
		var flowHolder = new FlowHolder(theHolder, settings);
		
		$.each(data.items, function(i, item){
			//var imageLink = '<a href="' + item.link + '" target="_blank"><img src="' + item.image + '" border="0" alt="' + item.alt + '" width="100" height="35" /></a>';
			var imageLink = document.createElement('a');
			with(imageLink) {
				href = item.link;
				target='_blank';
				// td 的 width似乎 不能限制其內的 image 的寬度。
				// 所以，暫時先在這裡設定。
				innerHTML = '<img src="' + item.image + '" border="0" alt="' + item.alt + '" width="' + settings.brickSize.width + 'px" height="' + settings.brickSize.height + 'px" />';
			}
			
			flowHolder.place(imageLink);
		});

	})
	.fail(function() {     //handle the error...
		logMessage( "error: can not load imageLink.json." );
	});
	
};


//-------------------------------------------------------
//  點擊 功能
//-------------------------------------------------------
goFunction = function(url){
	//var win=window.open(url, '_blank');
	//win.focus();
	alert(url);

};

//-------------------------------------------------------
//  點擊 相關連結
//-------------------------------------------------------
goRelatedLink = function(url){
	var win=window.open(url, '_blank');
	win.focus();
};




