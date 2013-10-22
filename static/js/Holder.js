
//-------------------------------------------------------
// 定義一個 Holder 類別
// 用來放置 brick，
// 基本上就是一個 div，
// 傳入一個 div，在這裡面去綁定一些參數及一些方法，
// 讓 brick 能方便 放進來，
// 主要 要定義一個 放置的方式(style)，然後，寫一些相對應的方法去執行。
// tkli ......20131021
//-------------------------------------------------------
function Holder(theHolder, style){
	// 注意哦！
	// 有加 this.XXXXX 的是 物件變數，
	// 沒加的，或 加 類別名如 Holder.XXXX 的是類別變數，(要記得)
	this._style = style;
	this._theHolder = theHolder;
	
	//-------------------------------------------------------
	// 執行 放置 brick 的動作
	// 按理，這邊應該 使用 物件導向裡(OO) 的多型(polynormial) 來實作的，
	// 但，懶得這麼麻煩了，
	// 如果未來 這個類別越來越大，需要擴展，那就改成透過 繼承和多型的方式來實作。
	//-------------------------------------------------------
	this.place = function(theBrick){
		if (this._style === 'flow') placeByFlow(theBrick);     // 橫向列出的方式，列到底 就換列 繼續。
		if (this._style === 'table') placeByTable(theBrick);   // 二維表格式 放法
		if (this._style === 'list') placeByList(theBrick);     // 縱向列出
		if (this._style === 'group') placeByGroup(theBrick);   // 群組式的列出，每群內以 flow 方式列出。
		if (this._style === 'tree') placeByTree(theBrick);     // 樹狀式的列出。(暫無實作)
		if (this._style === 'tab-group') placeByTabGroup(theBrick);    // 群組式的列出，每群有一個頁籤，以頁籤切換群組。(暫無實作)
	}

	//-------------------------------------------------------
	// 執行 放置 brick 的動作
	// 橫向列出的方式，列到底 就換列 繼續。
	// 1 2 3 4 5 6 7 8
	// 9 10 ........
	//-------------------------------------------------------
	this.placeByFlow = function(theBrick){
		// 寫到這裡 發現 ，
		// 還是要用繼承的方式來實作，
		// 因為 不僅放置的方法會有所不同，放置時所需要的參數 各不相同的，
		// 因此，要個別寫，繼承在一個 大的 Holder 類別下，才行。
		// tkli ......  20131021.
	}
	
	
}




