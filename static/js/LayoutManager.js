
//-------------------------------------------------------
// layout manager 主要是 要設定頁面的元件配置，
// 目前沒什麼特別的想法，也暫時沒有太完整的構想，
// 所以，暫時用簡單直接的方法，
// 就是一個頁面一個 layoutmanager，要怎麼配置 就加這裡吧，
// 但是，基本上這裡面儘量寫的 通用化一些，
// 再透過傳入的一個 layout.json 文件來 真正配置 元件，
// 這樣比較方便 一般的網站管理者做一些臨時的調整。
// tkli....20131020
//-------------------------------------------------------

function LayoutManager(layoutConfige, parent) {

	this._layoutConfige = layoutConfige;
	
	//this._parent = parent;
	// 由於暫時想不到要怎麼將 parent 傳給 $each(){.....} 內使用，只好改用 static 變數
	LayoutManager._parent = parent;

	this.HIDDEN_LEFT = (layoutConfige.hidden_left)? this._layoutConfige.hidden_left : '-2000px';
	
	//-------------------------------------------------------
	//執行 元件配置工作
	//-------------------------------------------------------
	this.set = function (){

		logMessage('layout component ....  begin' );

		//有使用 jquery 時，可用，
		//懶得寫一堆 code 了，因為，要處理不同的瀏覽器，通常是 IE 跟別人不一樣，而且 不同版本IE 也有差異。
		var windowSize = {
			height : $(window).height(),   // returns height of browser viewport
			width  : $(window).width()   // returns width of browser viewport
		};
		
		console.log('width = ' + windowSize.width + ' , height = ' + windowSize.height );   // for testing...
		
		//each 是一種 流程控制 的函數，能夠對 傳入的第一個參數(一個陣列)內的所有元素 個別傳入到第二個參數(一個函數)，然後執行，
		// 例如，底下的 data.items 內若有 五個元素{a,b,c,d,e}，則 會呼叫後面的 function 五次，其中 item 會依次代入 a,b,c,d,e ，而 i 應該 則是 0,1,2,3,4
		//底下，一個一個區塊處理
		$.each(this._layoutConfige.items, function(i, item){  
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
			if (item.type === "panel"){
				component = document.createElement("div");
				//component.innerHTML = item.title;
				if (item.backgroundColor) component.style.backgroundColor = item.backgroundColor;
			}
			
			
			// 最後 將元件的 其他 共通內容 補上
			if (component){
				//alert('test: ' + item.title);
				//console.log(this);
				LayoutManager._parent.appendChild(component);
				
				component.style.position ='absolute';
				component.style.left = item.location.left+'px';
				component.style.top  = item.location.top+'px';
				component.style.height = item.size.height+'px';
				component.style.width  = item.size.width+'px';
				if (item.padding) component.style.padding  = item.padding;
				
				if (item.id){
					component.id = item.id;
				}
			}
			
		});  //end of each

		logMessage('layout component ....  end' );

	};  // end of initGlobalComponent


} //end of LayoutManager



