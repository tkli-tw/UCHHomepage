
//-------------------------------------------------------
//  主功能磚 的動作
//  獨立出來，方便 管理 brick 的各種動作表現 
//-------------------------------------------------------
var BrickMotion = {

	
	//-------------------------------------------------------
	//  成員變數，
	//  大寫 表 常數，請於 程式中 勿變更內容，
	//  小寫開頭 表 一般成員變數，程式中會變動。
	//  javascript 並非嚴格的物件導向程式語言，所以，為了便於程式碼管理，要請 程式撰寫者，能儘量自我要求，遵守約定。
	//-------------------------------------------------------
	HIGHT_LIGHT_COLOR : '#ffaaaa',
	NORMAL_COLOR : '#ddffdd',
	SELECTED_COLOR : '#ffffdd',

	selectedBrick : null,
	
	//-------------------------------------------------------
	//  移上之後，變色
	//-------------------------------------------------------
	hightlight : function(event){
		if (BrickMotion.selectedBrick) return;
		
		//console.log('event.target: ' +event.target);
		var brick= event.target.theBrick;
		brick.bindComponent.style.backgroundColor = BrickMotion.HIGHT_LIGHT_COLOR;
		
		// 將 bindShadowPanel 顯示出來
		if (brick.bindShadowPanel) {
			var swaptemp = brick.bindShadowPanel.style.left;
			//console.log(brick.bindShadowPanel.style.left);
			//console.log('brick.bindMainPanels.style.left:' +brick.bindMainPanels.style.left);
			brick.bindShadowPanel.style.left = brick.bindMainPanels.style.left;
			brick.bindMainPanels.style.left = swaptemp;
			
		}
	},

	//-------------------------------------------------------
	//  移開後，變回原色
	//-------------------------------------------------------
	normal : function(event){
		if (BrickMotion.selectedBrick) return;

		var brick= event.target.theBrick;
		brick.bindComponent.style.backgroundColor = BrickMotion.NORMAL_COLOR;

		// 將 bindShadowPanel 隱藏出來 (用 left 來移動 div，做到隱藏的效果，這種方式似乎 比較順暢，因為，瀏覽器不用初始化 div，
		// 但不曉得會不會比較 吃資源( 又，吃的多不多)
		if (brick.bindShadowPanel) {
			var swaptemp = brick.bindShadowPanel.style.left;
			brick.bindShadowPanel.style.left = brick.bindMainPanels.style.left;
			brick.bindMainPanels.style.left = swaptemp;
		}
	},
		
	//-------------------------------------------------------
	//  點選 某個磚，主顯示區 會凍結
	//-------------------------------------------------------
	select : function(event){
		var brick= event.target.theBrick;

		// 若 已凍結 則解除，否則，就凍結 主顯示區。
		if (BrickMotion.selectedBrick ) {            
			if (BrickMotion.selectedBrick == brick){   //如果 已點選 ，則必需再點一次才能解除
				BrickMotion.selectedBrick = null;
				brick.bindComponent.style.backgroundColor = BrickMotion.HIGHT_LIGHT_COLOR;
				//normal(event);
			}
			return;        // 如果是 已點選的情況，點到別的 功能 ，則為無效。
		} 
		else {
			BrickMotion.selectedBrick = brick;
			brick.bindComponent.style.backgroundColor = BrickMotion.SELECTED_COLOR;
			
			// 如果 這個 panel 有 iframe 則把 focus 跳過去
			if (brick.bindShadowPanel.innerframe) brick.bindShadowPanel.innerframe.contentWindow.focus();
		}
	},
	
	//-------------------------------------------------------
	//   點選 default，主顯示區 會 解凍
	//-------------------------------------------------------
	release : function(event){
		BrickMotion.selectedBrick.bindComponent.style.backgroundColor = BrickMotion.NORMAL_COLOR;

		with (BrickMotion.selectedBrick){
			var swaptemp = bindShadowPanel.style.left;
			bindShadowPanel.style.left = bindMainPanels.style.left;
			bindMainPanels.style.left = swaptemp;
		}

		BrickMotion.selectedBrick = null;
		
		var brick= event.target.theBrick;
		brick.bindComponent.style.backgroundColor = BrickMotion.HIGHT_LIGHT_COLOR;
		
	},
	

}