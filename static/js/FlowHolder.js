
//-------------------------------------------------------
// 定義一個 FlowHolder 類別
// 用來放置 brick，
// 基本上就是一個 div，
// 傳入一個 div，在這裡面去綁定一些參數及一些方法，
// 讓 brick 能方便 放進來，
// 
// 基本上，會有很多種類的 holder，
// 按理應該用繼承的方式來實作，
// 但，目前先各自寫，未來覺得有需要再用 繼承整合，
// 不過，在 放置方法的名字上先統一，一律用 place(theBrick)，
// 此外，有相同功能的 儘量取相同名字。
// tkli ......20131021
//
// flow holder 的實作方式，
// 是利用 一個 table，放 row，在 row 中放 cell，放到滿，就再生一個 row ，依此類推放下去。
//
// FlowHolder(theHolder, settings) 參數：
// theHolder: 基本上是一個 div 或者 可以放進 table 的其他元件。
// settings : 目前只需要 brickSize，例： brickSize : {'width' : 200, 'height' : 50}; 
// 
// place(brick) 的參數：
// brick : 必需是一個可以放進 cell 的元件。
//-------------------------------------------------------
function FlowHolder(theHolder, settings){
	// 注意哦！
	// 有加 this.XXXXX 的是 物件變數，
	// 沒加的，或 加 類別名如 Holder.XXXX 的是類別變數，(要記得)
	this._style = 'flow';
	this._theHolder = theHolder;
	
	// 定義 brick 的大小，基本上，要求 holder.width > brick._brickSize.width
	this._brickSize = settings.brickSize;
	
	if (this._brickSize.width > this._theHolder.width) {
		logMessage('The brick width cannot larger than the holder width.');
		throw 'The brick width cannot larger than the holder width.';
	}
	
	// 這個 brickCount 很重要，用來記錄目前有幾個 brick 了，當 place 執行時，
	// 當 place 執行時，基本上，就是往後放，放到下一個，一列放滿，就往下一列放。
	this.brickCount = 0; 
	
	// 產生一個 table
	this.tableForPlace = document.createElement('table'); 
	// margin 的部份，原本想在這裡設定，後來，想說 div 本身就能設定了，這裡就不管了	
	//tableForPlace.style.left ='30px';
	//tableForPlace.style.top ='10px';
	//tableForPlace.style.position ='absolute';
	this._theHolder.appendChild(this.tableForPlace);
	this.tableForPlace.style.margin= "auto";
	
	this.maxCountInRow = Math.floor(this._theHolder.width/(this._brickSize.width+5));  // 這邊 +X 有點亂七八糟，但，暫時想不到解決方案，因為 cell 的外框有寬度，不曉得要怎麼處理
	this._row = null;
	this._cell = null;
	
	
	//-------------------------------------------------------
	// 執行 放置 brick 的動作
	// 按理，這邊應該 使用 物件導向裡(OO) 的多型(polynormial) 來實作的，
	// 但，懶得這麼麻煩了，
	// 如果未來 這個類別越來越大，需要擴展，那就改成透過 繼承和多型的方式來實作。
	//-------------------------------------------------------
	//-------------------------------------------------------
	// 執行 放置 brick 的動作
	// 橫向列出的方式，列到底 就換列 繼續。
	// 1 2 3 4 5 6 7 8
	// 9 10 ........
	//-------------------------------------------------------
	this.place = function(theBrick){
		if (this.brickCount % this.maxCountInRow === 0) this._row = this.tableForPlace.insertRow(-1);    //一行 maxCountInRow  個 格子
		this._cell = this._row.insertCell(-1);
		this._cell.style.width = this._brickSize.width + 'px';
		this._cell.style.height = this._brickSize.height + 'px';
		this._cell.style.verticalAlign = 'middle';
		
		this._cell.appendChild(theBrick);
		this.brickCount++;
	}

	
}




