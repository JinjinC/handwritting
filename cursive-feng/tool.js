function Point(x, y){
	this.x = x;
	this.y = y;
}

function Line(p1, p2){
	this.point1 = p1;
	this.point2 = p2;
	this.length = Math.sqrt((p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y));
}

Line.prototype.getPercentPoint = function(percent){
	var px = (this.point2.x - this.point1.x)*percent + this.point1.x;
	var py = (this.point2.y - this.point1.y)*percent + this.point1.y;
	return new Point(px, py);
}

function Path(ps){
	this.points = ps;
	this.lines = [];
	this.length = 0;

	for(var i = 0; i < ps.length - 1; i++)
	{
		var line = new Line(ps[i], ps[i+1]);
		this.lines.push(line);
		this.length += line.length;
	}
}

Path.prototype.getPercentPath = function(percent){
	var i = 0;
	var l = this.length*percent;
	var percentPath = [];
	
	while(l > 0)
	{
		if(this.lines[i].length < l)
		{
			l -= this.lines[i].length;
			
			if(i == 0)
			{
				percentPath.push(this.lines[i].point1);
			}
			percentPath.push(this.lines[i].point2);
		}
		else
		{
			var leftPercent = l/this.lines[i].length;
			var runner = this.lines[i].getPercentPoint(leftPercent);
			
			if(i == 0)
			{
				percentPath.push(this.lines[i].point1);
			}
			percentPath.push(runner);
			
			l = 0;
		}
		
		i++;
	}
	
	return percentPath;
}