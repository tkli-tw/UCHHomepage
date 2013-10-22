
//-------------------------------------------------------
//  Main function for init the page.
//  主要是呼叫一些函數，儘量不寫程式在這裡面。
//-------------------------------------------------------
function init(){
/*
	initGUI();
	loadData();
*/
	//上面的呼叫方式是不可行的，
	// 因為 initGUI()裡面 有用到非同步呼叫，有用到 ajax，
	// 所以，在 ajax 的處理完成前，就會往下執行後面的函數呼叫，如 loadStaticData() ，
	// 結果就是， loadStaticData() 裡面需要initGUI() 裡初始化的元件，並沒有初始化出來，
	// 會造成 loadStaticData() 裡的程式執行有問題。
	// 因此，必需使用 非同步處理的叫用，不然，所有 函數是同步執行的，不會等前一個完成才執行下一個，
	
	// 使用 async.js 模組來處理這個部份 

	async.series([initGUI, loadData]);
	
}


