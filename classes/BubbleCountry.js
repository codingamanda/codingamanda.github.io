class BubbleCountry{
	constructor(xPos, yPos, diameter, colorIndex, countryName, isBorder, htmlInformation){
		tradeGraph.colors = [tradeGraph.color(249,168,37),tradeGraph.color(255,201,40),tradeGraph.color(124,178,66),tradeGraph.color(0,138,122), tradeGraph.color("Blue"), tradeGraph.color("Red"), tradeGraph.color("Cyan")];
		this.xPos = xPos
		this.yPos = yPos
		this.diameter = diameter/2//50 
		if(isBorder){ 
			this.color = tradeGraph.color(220,70,71);
			this.colorIndex= 0;
		}else{
			this.color = tradeGraph.colors[colorIndex%tradeGraph.colors.length];
			this.colorIndex= colorIndex;
		}
		this.groupColor = this.color;
		this.alpha = 100
		this.countryName = countryName;
		this.htmlInformation = htmlInformation;
		
		if(this.diameter>70){
			if(this.diameter < 1000){
				this.diameter = (this.diameter-70)/(300-70)*(90-70);
			}else{				
				if(this.diameter < 6000){
					this.diameter = (this.diameter-90)/(700-90)*(100-90);
				}else{
					//console.log(this.diameter)
					this.diameter = 120;
				}
			}
		}
		if(this.diameter<100){
			this.diameter =8;
		}
	}
	
	
	mouseIn(){
		if(tradeGraph.dist(this.xPos,this.yPos,tradeGraph.mouseX, tradeGraph.mouseY)<this.diameter/2){
			this.color = tradeGraph.color("grey");

			var information = tradeGraph.select('#detail');
			information.position(700)
			if(this.htmlInformation!=null){
				information.html(this.htmlInformation, false);
			}
		}else{
			this.color = this.groupColor;
		}
	}
	mouseClicked(){
		
	}
	draw(){
		this.mouseIn();
		
		tradeGraph.stroke(this.color,0);
		tradeGraph.fill(this.color, this.alpha); 
		tradeGraph.ellipse(this.xPos, this.yPos, this.diameter);
		tradeGraph.stroke(this.color);
		tradeGraph.strokeWeight(1);
		tradeGraph.fill(0);
		tradeGraph.textAlign(tradeGraph.CENTER, tradeGraph.CENTER);
		tradeGraph.text(this.countryName, this.xPos,this.yPos);	
		
	}
		
}
