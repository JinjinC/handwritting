function Sprite(w, h, x, y){
	this.width = w;
	this.height = h;
	this.x = arguments[2]?arguments[2]:0;
	this.y = arguments[3]?arguments[3]:0;

	var div = document.createElement('div');
	div.style.cssText = 'position: absolute;' + 
				'width:' + w + 'px;' + 
				'height:' + h + 'px;' + 
				'left: ' + this.x + 'px;' + 
				'top: ' + this.y +'px;';// + 'background-color: #eeeeee;';
	var canvas = document.createElement('canvas');
	canvas.width = w;
	canvas.height = h;
	var context = canvas.getContext('2d');
	div.appendChild(canvas);

	this.element = div;
	this.canvas = canvas;
	this.graphics = context;

}

Sprite.prototype.addChild = function(son){
	this.element.appendChild(son.element);   //son is a sprite!!!
}

Sprite.prototype.appendTo = function(parent){
	parent.append(this.element);    //parent is a jquery wrapped set!!!
}