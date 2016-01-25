$(document).ready(function(){
	
	/*var sprite = new Sprite(200, 200, 100, 200);
	sprite.graphics.fillStyle = "rgb(255, 255, 255)";
	sprite.graphics.strokeStyle = "rgb(0, 0, 0)";
	sprite.graphics.lineWidth = 1;
	sprite.graphics.beginPath();
	sprite.graphics.moveTo(20, 20);
	sprite.graphics.lineTo(100, 20);
	sprite.graphics.lineTo(100, 100);
	sprite.graphics.lineTo(20, 100);
	sprite.graphics.lineTo(20, 20);
	sprite.graphics.closePath();
	sprite.graphics.fill();
	sprite.graphics.stroke();
	sprite.appendTo($('#strokeContainer')); */

	var strokeArr = [];
	var currentStrokeIndex = 0;
	var numOfStrokes = 0;
	var timer = 0;
	var duration = 600;
	var gap = 400;
	var scale = 0.85;

	$.ajax({
		url : "bairiyishannew.xml",
		dataType : 'xml',
		type : 'GET',
		timeout : 2000,
		error : function(err){
			console.log('获取字信息失败！:(', err);
		},
		success : function(xml){
			var mycharacter = xml.getElementsByTagName('character');
			// debugger
			for (var i = 0, l = mycharacter.length; i < l; i++) {
				$(mycharacter[i]).find('points').each(function(){
					// debugger
					var stroke = new Stroke($(this), scale, 700, 700);
					stroke.itself.appendTo($("#strokeContainer" + i));
					strokeArr.push(stroke);
				});
			};
			
			numOfStrokes = strokeArr.length;
		}
	});

	function initStrokes(){
		for(var i = 0; i < strokeArr.length; i++){
			var stroke = strokeArr[i];
			stroke.endFill();
			stroke.clearFill();
		}
		
		currentStrokeIndex = 0;
		
		if(timer){
			clearInterval(timer);
		}
	}

	$(document).click(function(){
		initStrokes();
		strokeArr[currentStrokeIndex++].playFill(duration);
		if(numOfStrokes > 1)
		{
			timer = setInterval(function(){
				strokeArr[currentStrokeIndex++].playFill(duration);
				if(currentStrokeIndex == numOfStrokes){
					clearInterval(timer);
				}
			}, duration+gap);
		}
		
	});
});