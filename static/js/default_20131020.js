
//-------------------------------------------------------
//  嘗試 每個 html 對應一個 同名 js，
//  裡面嘗試 寫成一個 類別(物件) 把 本頁面特定的處理包起來，以方便管理。
//  基本上，這裡的函數 只會在 同名的那個 html 裡面用到，而且應該只被叫用一次，
//  從再用性上看，是沒什麼用處的，
//  單純從 管理的角度， 讓 寫程式的人 看起來比較爽。
//-------------------------------------------------------

//function defaultPage() {    // 剛好 default 是保留字，改用 defaultPage

	// 隱藏 DIV 用
	HIDDEN_LEFT = '-2000px';

	//-------------------------------------------------------
	//  初始化頁面各項 圖形化介面，包括大小及位置等。
	//-------------------------------------------------------
	initGUI = function (callback){
		//initGlobalComponent(callback);
		
		//改用 LayoutManager
		$.getJSON( "json/pageLayout.json").done(function(data) {
			console.log( "load pageLayout.json success" );

			var _body = document.getElementsByTagName('body') [0];
			(new LayoutManager(data, _body)).set();

			callback();
		})
		.fail(function() {     //handle the error...
			console.log( "error: can not load pageLayout.json." );
		});
	};

	//-------------------------------------------------------
	//  主要載入 頁面的靜態資料，然後放到對應的位置
	//-------------------------------------------------------
	loadData = function(callback){
		// 這些函數 基本上，可以 平行運作，故不需 序列化呼叫
		logMessage('loadStaticData ....  begin' );

		this.loadMainfunction();
		this.loadLink();
		this.loadImageLink();
		
		logMessage('loadStaticData ....  end' );
	};

	//-------------------------------------------------------
	//  初始化 頁面 一開始的各種元件...... 這裡是考慮到未來或許會加很多其他的東西，
	//  所以，這個函數只是 初始化 一些簡單的元件，未來另外加的東西，放到別的函數中，
	//  避免 一個函數做太多事，不好 debug。
	//-------------------------------------------------------
	initGlobalComponent = function (callback){

		logMessage('initGlobalComponent ....  begin' );
		//有使用 jquery 時，可用，
		//懶得寫一堆 code 了，因為，要處理不同的瀏覽器，通常是 IE 跟別人不一樣，而且 不同版本IE 也有差異。
		var windowSize = {
			height : $(window).height(),   // returns height of browser viewport
			width  : $(window).width()   // returns width of browser viewport
		};
		
		console.log('width = ' + windowSize.width + ' , height = ' + windowSize.height );   // for testing...
		
		// 底下的方式從 http://api.jquery.com/jQuery.getJSON/ 複製出來的，
		// 原則上，本範例都儘量這種方式(統一) 來實作 擷取json 文件內容，並轉出呈現GUI的工作。
		var jqxhr = $.getJSON( "json/pageLayout.json").done(function(data) {
			console.log( "load relatedLink.json success" );

			var _body = document.getElementsByTagName('body') [0];

			//each 是一種 流程控制 的函數，能夠對 傳入的第一個參數(一個陣列)內的所有元素 個別傳入到第二個參數(一個函數)，然後執行，
			// 例如，底下的 data.items 內若有 五個元素{a,b,c,d,e}，則 會呼叫後面的 function 五次，其中 item 會依次代入 a,b,c,d,e ，而 i 應該 則是 0,1,2,3,4
			//底下，一個一個區塊處理
			$.each(data.items, function(i, item){  
				//document.getElementById('related_ink_panel').innerHTML += "<br/><a href=\"javascript:goRelatedLink(' "+ item.link + "')\" >" + item.title +'</a><br/>' ;
				//alert(JSON.stringify(item));
				var component;
				if (item.type === "image"){
					component = document.createElement("img");
					component.src = item.src;
				}
				if (item.type === "line"){
					component = document.createElement("div");
					component.style.backgroundColor = item.color;
					//component.innerHTML = "test";
				}
				if (item.type === "zone"){
					component = document.createElement("div");
					component.innerHTML = item.title;
					if (item.backgroundColor) component.style.backgroundColor = item.backgroundColor;
				}

				if (component){
					//alert('test: ' + item.title);
					_body.appendChild(component);
					component.style.position ='absolute';
					component.style.left = item.location.left+'px';
					component.style.top  = item.location.top+'px';
					component.style.height = item.size.height+'px';
					component.style.width  = item.size.width+'px';
					
					if (item.id){
						component.id = item.id;
					}
				}
				
			});  //end of each

			logMessage('initGlobalComponent ....  end' );

			// 非同步處理 序列化 呼叫
			callback();

		})
		.fail(function() {     //handle the error...
			console.log( "error: can not load pageLayout.json." );
		});
		
	};  // end of initGlobalComponent

	//-------------------------------------------------------
	//  載入 主功能 內容
	//-------------------------------------------------------
	loadMainfunction = function(){

		logMessage('loadMainfunction ....  begin' );
		var jqxhr = $.getJSON( "json/mainfunction.json").done(function(data) {
			logMessage( "load mainfunction.json success" );
			
			//這裡產生 12 個 主顯示區的影分身，用來切換顯示用。
			var _body = document.getElementsByTagName('body')[0];
			var _maindisplay = document.getElementById('maindisplay');
			var _secondarydisplay = document.getElementById('secondarydisplay');
			var _mainoperate = document.getElementById('mainoperate');
			_maindisplay.shadowPanels = new Array();
			for (i =0; i<12; i++){
				var shadowPanel = document.createElement('Div');
				_maindisplay.shadowPanels.push(shadowPanel);

				_body.appendChild(shadowPanel);
				with (shadowPanel.style) {
					position ='absolute';
					left = HIDDEN_LEFT;       //隱藏 shadowPanel
					top  = _maindisplay.style.top;
					height = _maindisplay.style.height;
					width  = _maindisplay.style.width;
					overflow = 'overflow';        //這裡可以選擇，當 div 內容超出區塊時要如何處理。
				}
				
				shadowPanel.innerHTML = 'shadowPanel' + i;
			}		
			
			// 原則上，主功能區是一個 3*4 的表格，總共 12 個磚，一樣大小
			// 分為 預設狀態 和 按下狀態，
			// 滑鼠移上去時，主顯示區 顯示訊息，不移動經過兩秒，恢復，(這個效果看看要怎麼做)
			// 滑鼠點下，呈現 按下狀態，則主顯示區 顯示該磚 對應的內容(常駐狀態)，再按一次，則變回預設
			var brickTable = document.createElement('table'); 
			document.getElementById('mainoperate').appendChild(brickTable);
			
			var brickCount  = 0;
			var BRICKWIDTH  = 80;
			var BRICKHEIGHT = 30;
			var maxCountInRow = Math.floor((parseInt(document.getElementById('mainoperate').style.width) -30) /BRICKWIDTH);  
			brickTable.style.left = (parseInt(document.getElementById('mainoperate').style.width) - maxCountInRow*BRICKWIDTH)/2 -5 + 'px';
			brickTable.style.top  ='20px';
			brickTable.style.position ='absolute';

			var _row, _cell;
			
			$.each(data.items, function(i, item){
				if (brickCount % maxCountInRow ==0) _row = brickTable.insertRow(-1);    //一行 maxCountInRow  個 格子
				_cell = _row.insertCell(-1);
				//var brickLink = '<a href="' + item.link + '" target="_blank" >' + item.title + '</a>';
				_cell.innerHTML = item.title;
				_cell.style.width = BRICKWIDTH + 'px';
				_cell.style.height = BRICKHEIGHT + 'px';
				_cell.style.backgroundColor = BrickMotion.NORMAL_COLOR ;
				_cell.style.textAlign = 'center';
				_cell.addEventListener('mouseover', BrickMotion.hightlight);
				_cell.addEventListener('mouseout', BrickMotion.normal);
				
				//設定給 _cell 以便 到 Brick.methods() 中做切換
				_cell.bindMainPanels = _maindisplay;
				_cell.bindShadowPanel = _maindisplay.shadowPanels[brickCount];
				
				// default 為返回 主頁面，需特別處理
				if (item.type === 'default') {    							
					_cell.addEventListener('click', BrickMotion.release);
					// default 不需要 對應一個 shadow panel
					_cell.bindShadowPanel = null;
				}
				else {
					_cell.addEventListener('click', BrickMotion.select);
				}
				
				if (item.outerLink) {
					var innerPanel = document.createElement('iframe');
					innerPanel.src = item.outerLink;
					_cell.bindShadowPanel.innerHTML = '';
					_cell.bindShadowPanel.appendChild(innerPanel);
					_cell.bindShadowPanel.innerframe = innerPanel;  //建立一個 連結，指向這個 iframe，供 Brick.select() 中使用
					with (innerPanel.style) {
						position = 'absolute';
						left = '0px';
						top = '0px';
						width = _cell.bindShadowPanel.style.width;
						height = _cell.bindShadowPanel.style.height;
					}
				}
				
				if (item.type === 'extendLinkSet'){
					_cell.bindShadowPanel.innerHTML = '';
					
					//這種 磚，對應的 主顯示區 將擴展 把 次顯示區也吃掉，整個一起運用
					with (_cell.bindShadowPanel.style) {
						width = parseInt(width) + parseInt(_secondarydisplay.style.width) + 'px';
						//backgroundColor = '#ffffff';
					}
					
					var descriptionPanel = document.createElement('div');
					var linkPanel = document.createElement('div');
					_cell.bindShadowPanel.appendChild(descriptionPanel);
					_cell.bindShadowPanel.appendChild(linkPanel);
					
					with(linkPanel.style){
						width = '400px';
						height = _cell.bindShadowPanel.style.height;
						position = 'absolute';
						top = '0px';
						backgroundColor = '#ddddff';  //for test;
					}			
					with(descriptionPanel.style){
						width = parseInt(_cell.bindShadowPanel.style.width) - parseInt(linkPanel.style.width) + 'px';
						height = _cell.bindShadowPanel.style.height;
						backgroundColor = '#ffdddd';
					}			
					linkPanel.style.left = descriptionPanel.style.width;
				
				
				}
				
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
		var jqxhr = $.getJSON( "json/link.json").done(function(data) {
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
		//
		// Assign handlers immediately after making the request,
		// and remember the jqxhr object for this request
		var jqxhr = $.getJSON( "json/imageLink.json").done(function(data) {
			logMessage( "load imageLink.json success" );
			
			var imageLinkTable = document.createElement('table'); 
			imageLinkTable.style.left ='30px';
			imageLinkTable.style.top ='10px';
			imageLinkTable.style.position ='absolute';
			document.getElementById('iconlink').appendChild(imageLinkTable);
			
			var imageCount = 0;
			var maxCountInRow = Math.floor((parseInt(document.getElementById('iconlink').style.width) -60) /100);  
			var _row, _cell;
			
			$.each(data.items, function(i, item){
				if (imageCount % maxCountInRow ==0) _row = imageLinkTable.insertRow(-1);    //一行 maxCountInRow  個 格子
				_cell = _row.insertCell(-1);
				var imageLink = '<a href="' + item.link + '" target="_blank"><img src="' + item.image + '" border="0" alt="' + item.alt + '" width="100" height="35" /></a>';
				_cell.innerHTML = imageLink;
				imageCount++;
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
	


//}   // end of default

