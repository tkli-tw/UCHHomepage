
//-------------------------------------------------------
// SwitchBrick 類別，
// 主要建立一個 可以切換 主顯示區內容的 brick，主要功能：
// 1.  滑鼠移上去，對應的主顯示區 內容 會切換成 該 brick 對應的內容。移走後，切換回來。並且自己會 "高顯"(hightlight)
// 2. 在其上點擊滑鼠左鍵，會固主顯示區內容 為其對應的內容，不因滑鼠移走而切換回去。並且自己會變 按下狀態。
// 3. 基本上要是一個群組，當某個被按下，其他的brick 都 失能(disable)，另需一個解除用的 brick。
//-------------------------------------------------------
function SwitchBrick(settings){

	this.bindComponent = document.createElement('div');
	this.bindComponent.theBrick = this;
	with(this.bindComponent) {
		innerHTML = settings.title;

		style.width = settings.brickSize.width + 'px';
		style.height = settings.brickSize.height + 'px';
		
		style.backgroundColor = settings.normalColor ;
		style.textAlign = 'center';
		style.verticalAlign = 'middle';

		addEventListener('mouseover', BrickMotion.hightlight);
		addEventListener('mouseout', BrickMotion.normal);
	}

	//設定給 theBrick 以便 到 Brick.methods() 中做切換
	this.bindMainPanels = settings.maindisplay;
	this.bindShadowPanel = document.createElement('Div');

	settings.parent.appendChild(this.bindShadowPanel);
	with (this.bindShadowPanel.style) {
		position ='absolute';
		left = settings.hiddenLeft;       //隱藏 shadowPanel 用
		top  = this.bindMainPanels.style.top;
		height = this.bindMainPanels.style.height;
		width  = this.bindMainPanels.style.width;
		overflow = 'overflow';        //這裡可以選擇，當 div 內容超出區塊時要如何處理。
	}

	// default 為返回 主頁面，需特別處理
	if (settings.type === 'default') {    							
		this.bindComponent.addEventListener('click', BrickMotion.release);
		// default 不需要 對應一個 shadow panel
		this.bindShadowPanel = null;
	}
	else {
		this.bindComponent.addEventListener('click', BrickMotion.select);
	}

	if (settings.outerLink) {
		var innerPanel = document.createElement('iframe');
		innerPanel.src = settings.outerLink;
		//this.theBrick.bindShadowPanel.innerHTML = '';
		this.bindShadowPanel.appendChild(innerPanel);
		this.bindShadowPanel.innerframe = innerPanel;  //建立一個 連結，指向這個 iframe，供 Brick.select() 中使用
		with (innerPanel.style) {
			position = 'absolute';
			left = '0px';
			top = '0px';
			width = this.bindShadowPanel.style.width;
			height = this.bindShadowPanel.style.height;
		}
	}
	
	//底下這種要 另寫一個 類別 
	if (settings.type === 'extendLinkSet'){
		//this.theBrick.bindShadowPanel.innerHTML = '';
		
		//這種 磚，對應的 主顯示區 將擴展 把 次顯示區也吃掉，整個一起運用
		this.bindShadowPanel.style.width = parseInt(this.bindShadowPanel.style.width) 
		                                             + parseInt(settings.secondarydisplay.style.width) + 'px';
		
		var descriptionPanel = document.createElement('div');
		var linkPanel = document.createElement('div');
		this.bindShadowPanel.appendChild(descriptionPanel);
		this.bindShadowPanel.appendChild(linkPanel);
		
		with(linkPanel.style){
			width = '400px';
			height = this.bindShadowPanel.style.height;
			position = 'absolute';
			top = '0px';
			backgroundColor = '#ddddff';  //for test;
		}			
		with(descriptionPanel.style){
			width = parseInt(this.bindShadowPanel.style.width) - parseInt(linkPanel.style.width) + 'px';
			height = this.bindShadowPanel.style.height;
			backgroundColor = '#ffdddd';
		}			
		linkPanel.style.left = descriptionPanel.style.width;
	
	
	}
	
}




