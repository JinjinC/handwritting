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
	var duration = 500;
	var gap = 200;
	var scale = 1;

	$.ajax({
		url : "feng.xml",
		dataType : 'xml',
		type : 'GET',
		timeout : 2000,
		error : function(){
			alert('获取字信息失败！:(');
		},
		success : function(xml){
			$(xml).find('points').each(function(){
				var stroke = new Stroke($(this), scale, 800, 800);
				stroke.itself.appendTo($("#strokeContainer"));
				strokeArr.push(stroke);
			});
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

	$("#strokeContainer").click(function(){
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