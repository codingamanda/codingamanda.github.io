var w=1000;
var h=700;
let datarows;
let tooltip;
let colors;
let mainConferences;

function preload(){
}


function setup() {

	cnv = createCanvas(w,h);
	background(210);

}


function draw() {
	oCountry = new CountryNetwork(w,h, "Thailand")
	oCountry.draw();
}


class CountryNetwork{
	
	constructor(canvasW, canvasH, countryName){	
		this.canvasX = 0
		this.canvasY = 0
		this.canvasW = canvasW
		this.canvasH = canvasH
		this.width = 25
		this.height = this.canvasH * 0.8
		this.xPos = this.canvasX + (canvasW-this.width)/2
		this.yPos = this.canvasY + (canvasH-this.height)/2
		this.countryName = countryName
		this.xMargin = 20
	}
	
	drawPrimaryLines(isExport, xRanges){
		var x1 = this.canvasW/2
		var x2 = this.canvasW
		var yMargin = 80;
		for (var i=1; i<xRanges.length; i++){
			var bPosX = this.width/2 + 
						map(xRanges[i],
							xRanges[i],
							xRanges[i+1],
							(x2-x1)*i/xRanges.length, 
							(x2-x1)*(i+1)/xRanges.length) + this.xMargin;
			if(isExport){
				bPosX = this.xPos + bPosX;
			}else{
				bPosX = this.xPos - bPosX;
			}
			for(var k=0; k<200;k++){
				if(yMargin+5*(k+1) < this.canvasH - yMargin){
					line(bPosX, yMargin+5*k, bPosX, yMargin+5*(k+1))
					k +=1;
				}else{
					break;
				}				
			}
			textAlign(CENTER, CENTER); 
			fill(20)
			text(xRanges[i], bPosX,this.canvasH - yMargin+20);
		}
		var x = 0;
		if(isExport){
			x = this.canvasW*3/4;
		}else{
			x = this.canvasW/4;
		}
			text("Millions (US$)", x,this.canvasH - yMargin + 45);
	}
	draw(){
		
		textSize(30);
		fill(0);
		noStroke();
		textAlign(CENTER, CENTER);
		text("IMPORTS", this.canvasW/4,50);
		text("EXPORTS", this.canvasW*3/4,50);
		
		textSize(15);
		stroke(color(150,120,250));
		fill(color(150,150,250)); 
		rect(this.xPos, this.yPos, this.width, this.height);
		
		line(this.canvasW/2, 0, this.canvasW/2, this.canvasH)
		
		
		var xRanges = [600, 500, 400, 300, 200, 100, 0]
		//var bubblesCountries = [120, 480, 220,390]
		var bubblesExpo = [120, 480, 220,390]
		var bubblesExpoTotal = [1200, 4800, 2200,3900]
		var bubblesImpo = [170, 599, 450,120]
		var bubblesImpoTotal = [1700, 5990, 4500,1200]
		var countriesExpo = ['Vietnam', 'Japan', 'India', 'Egypt']
		
		this.drawPrimaryLines(false, xRanges)
		this.drawPrimaryLines(true, xRanges)
		
		var numberOfBubbles = bubblesExpo.length;
		for(var i = 0; i<bubblesExpo.length;i++){ 
			this.drawComercialCountry(false, bubblesImpo[i], xRanges, bubblesImpo.length, i, countriesExpo[i],bubblesExpoTotal[i]);
			
		}
		for(var i = 0; i<bubblesExpo.length;i++){ 
			this.drawComercialCountry(true, bubblesExpo[i], xRanges, bubblesExpo.length, i, countriesExpo[i], bubblesImpoTotal[i]);
		
			/*var bExpoPosX = 0
			var bImpoPosX = 0
			var bPosY = 0
			
			var xRangeExpo = 0
			var xRangeImpo = 0
			for(var e= 0; e<xRanges.length-1;e++){ 
				if(bubblesExpo[i] < xRanges[e] && bubblesExpo[i] >= xRanges[e+1]){
					xRangeExpo = e;
					break;
				}
			}
			
			for(var im= 0; im<xRanges.length;im++){ 
				if(bubblesExpo[i] < xRanges[im] && bubblesExpo[i] >= xRanges[im+1]){
					xRangeImpo = im;
					break;
				}
			}
			
			bExpoPosX = this.xPos + this.width/2 + map(bubblesExpo[i],xRanges[xRangeExpo],xRanges[xRangeExpo+1],(x2-x1)*xRangeExpo/xRanges.length, (x2-x1)*(xRangeExpo+1)/xRanges.length) + this.xMargin
			bImpoPosX = this.xPos - this.width/2 - map(bubblesExpo[i],xRanges[xRangeImpo],xRanges[xRangeImpo+1],(x2-x1)*xRangeImpo/xRanges.length, (x2-x1)*(xRangeImpo+1)/xRanges.length) - this.xMargin 
			 
			if (numberOfBubbles >=5 && i==0){
				bPosY = this.yPos;
			}else if (numberOfBubbles >=5 && i==numberOfBubbles-1){
				bPosY = this.yPos + this.height				
			}else if (numberOfBubbles >=5){
				bPosY = this.yPos + (i)/(numberOfBubbles-1) * this.height				
			}else{
				bPosY = this.yPos + (i+1)/(numberOfBubbles+1) * this.height
			}
			
			var b1 = new BubbleCountry(bExpoPosX, bPosY,50,i)
			b1.draw();
			var b2 = new BubbleCountry(bImpoPosX, bPosY,50,4)
			b2.draw();
			*/
		}
		
		
		fill(color(150,50,0)); 
		translate(this.xPos,this.yPos);
		rotate(radians(-90));
		textAlign(CENTER, CENTER);
		text(this.countryName, -this.height/2,this.width/2);
		rotate(radians(90));
		translate(-this.xPos,-this.yPos);
	}
	
	drawComercialCountry(isExpo, value, xRanges, numberOfBubbles, bubblePos, countryName, size){
			var x1 = this.canvasW/2
			var x2 = this.canvasW
			var xRangeIndex = 0
			for(var i= 0; i<xRanges.length-1;i++){ 
				if(value < xRanges[i] && value >= xRanges[i+1]){
					xRangeIndex = i;
					break;
				}
			}
			
			var bPosX = this.width/2 + 
						map(value,
							xRanges[xRangeIndex],
							xRanges[xRangeIndex+1],
							(x2-x1)*xRangeIndex/xRanges.length, 
							(x2-x1)*(xRangeIndex+1)/xRanges.length) + 
						this.xMargin;
					
			if(isExpo){
				bPosX = this.xPos + bPosX;
			}else{
				bPosX = this.xPos - bPosX;
			}
			
			var bPosY = 0;
			if (numberOfBubbles >=5 && bubblePos==0){
				bPosY = this.yPos;
			}else if (numberOfBubbles >=5 && i==numberOfBubbles-1){
				bPosY = this.yPos + this.height				
			}else if (numberOfBubbles >=5){
				bPosY = this.yPos + (bubblePos)/(numberOfBubbles-1) * this.height				
			}else{
				bPosY = this.yPos + (bubblePos+1)/(numberOfBubbles+1) * this.height
			}
			
			var b1 = new BubbleCountry(bPosX, bPosY, size, bubblePos, countryName)
			b1.draw();
			
	}
}
class BubbleCountry{
	constructor(xPos, yPos, diameter, colorIndex, countryName){
		colors = [color("blue"), color("red"),color("Green"),color("Purple"),color("Brown")];
		this.xPos = xPos
		this.yPos = yPos
		this.diameter = diameter/50
		this.color = colors[colorIndex%colors.length]
		this.colorIndex= colorIndex;
		this.alpha = 150
		this.countryName = countryName;
	}
	mouseIn(){
		if(dist(this.xPos,this.yPos,mouseX, mouseY)<this.diameter/2){
			this.color = color("grey");
		}else{
			this.color = colors[this.colorIndex%colors.length]
		}
	}
	draw(){
		this.mouseIn();
		stroke(this.color,0);
		fill(this.color, this.alpha); 
		ellipse(this.xPos, this.yPos, this.diameter);
		stroke(0);
		fill(0);
		textAlign(CENTER, CENTER);
		text(this.countryName, this.xPos,this.yPos);
		
	}
	
	
}