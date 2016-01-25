function Stroke(xml, scale, w, h){
	this.strokeXML = xml;
	this.scale = scale;
	this.currentFillPoints = [];
	this.outlinePoints = [];

	this.track1 = null;
	this.track2 = null;

	this.startIndex = 0;
	this.endIndex = 0;

	this.startTime = 0;
	this.duration = 0;
	this.intervalIndex = 0;

	this.fillColor = "#99CCFF";

	this.itself = new Sprite(w, h);
	this.fillSprite = new Sprite(w, h);
	this.itself.addChild(this.fillSprite);

	this.drawStroke();
	this.buildPath();
}

Stroke.prototype.drawStroke = function(){
	this.outlinePoints = [];
	//draw outline
	this.itself.graphics.lineWidth = 1;
	this.itself.graphics.beginPath();
	var myself = this;
	this.strokeXML.find("point").each(function(i){
		var pointXML = $(this);
		
		var p = new Point();
		p.x = pointXML.attr('x') * myself.scale;
		p.y = pointXML.attr('y') * myself.scale;
		
		if(pointXML.attr('pos') == 1){
			myself.startIndex = i;
		}
		
		if(pointXML.attr('pos') == 2){
			myself.endIndex = i;
		}
		
		myself.outlinePoints.push(p);
		
		if(i == 0){
			myself.itself.graphics.moveTo(p.x, p.y);
		}else{
			myself.itself.graphics.lineTo(p.x, p.y);//ÍâÂÖÀª
		}
	});
	myself.itself.graphics.closePath();
	myself.itself.graphics.stroke();
}

Stroke.prototype.buildPath = function(){
	var i;
	var path1 = [];
	var path2 = [];
	
	if(this.startIndex < this.endIndex){
		i = this.startIndex;
		while(i <= this.endIndex){
			path1.push(this.outlinePoints[i++]);
		}
		
		i = this.endIndex;
		while(i != this.startIndex){
			path2.unshift(this.outlinePoints[i]);
			i = (i+1)%this.outlinePoints.length;
		}
		path2.unshift(this.outlinePoints[i]);
	}else{
		i = this.startIndex;
		while(i != this.endIndex){
			path1.push(this.outlinePoints[i]);
			i = (i+1)%this.outlinePoints.length;
		}
		path1.push(this.outlinePoints[i]);
		
		i = this.endIndex;
		while(i <= this.startIndex){
			path2.unshift(this.outlinePoints[i++]);
		}
	}

	this.track1 = new Path(path1);
	this.track2 = new Path(path2);
}

Stroke.prototype.drawCurrentFill = function(){
	this.fillSprite.graphics.clearRect(0, 0, this.fillSprite.canvas.width, this.fillSprite.canvas.height);
	this.fillSprite.graphics.fillStyle = this.fillColor;
	this.fillSprite.graphics.strokeStyle = this.fillColor;
	this.fillSprite.graphics.lineWidth = 3;
	this.fillSprite.graphics.beginPath();
	
	for(var i = 0; i < this.currentFillPoints.length; i++){

		var p = this.currentFillPoints[i];
		
		if(i == 0){
			this.fillSprite.graphics.moveTo(p.x, p.y);
		}else{
			this.fillSprite.graphics.lineTo(p.x, p.y);
		}
	}
	
	this.fillSprite.graphics.closePath();
	this.fillSprite.graphics.fill();
	this.fillSprite.graphics.stroke();
}

Stroke.prototype.clearFill = function(){
	this.fillSprite.graphics.clearRect(0, 0, this.fillSprite.canvas.width, this.fillSprite.canvas.height);
}

Stroke.prototype.showFill = function(){
	this.currentFillPoints = this.outlinePoints;
	this.drawCurrentFill();
}

Stroke.prototype.playFill = function(time){
	this.startTime = new Date().getTime();
	this.duration = arguments[0]?arguments[0]:500;
	
	var myself = this;  //in callback function 'this' is window! not current instance
	this.intervalIndex = setInterval(function(){
		var elapsed = new Date().getTime() - myself.startTime;
		//console.log('this : ' + this + ' myself : ' + myself);
		var percentDone = elapsed/myself.duration;
		if(percentDone < 1){
			myself.updateFill(percentDone);
		}else{
			myself.endFill();
		}
	}, 1000/50);
}

Stroke.prototype.endFill = function(){
	this.showFill();
	
	if(this.intervalIndex){
		clearInterval(this.intervalIndex);
	}
}

Stroke.prototype.updateFill = function(percentDone){
	var childPath1 = this.track1.getPercentPath(percentDone);
	var childPath2 = this.track2.getPercentPath(percentDone);
	
	this.currentFillPoints = childPath1.concat(childPath2.reverse());
	this.drawCurrentFill();
}