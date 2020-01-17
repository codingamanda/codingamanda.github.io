

class CountryNetwork{
	
	constructor(canvasW, canvasH, countryName, countryId, borderLands, year){	
		this.canvasX = 0
		this.canvasY = 0
		this.canvasW = canvasW
		this.canvasH = canvasH *0.85
		this.width = 25
		this.height = this.canvasH * 0.8
		this.xGap = 20;
		this.xPos = this.xGap + this.canvasX + (canvasW-this.width)/2
		this.yPos = this.canvasY + (canvasH-this.height)/2
		this.countryName = countryName;
		this.id = countryId;
		this.borderLands = borderLands;
		this.xMargin = 5
		this.importPartners = []
		this.exportPartners = []
		this.rangesExport = []
		this.rangesImport = []
		this.divisorExpo = 1;
		this.divisorImpo =1;
		this.countriesImportStatus = []
		this.countriesExportStatus = []
		this.maxNumberOfPartners = 15;
		this.minimumImport=0;
		this.minimumExport=0;
		this.totalCountries =0;
		this.currentAddedCountry =5;
		this.year = year; 
	}
	
	cloneNetwork(){
		var oCountryNew = new CountryNetwork(this.canvasW,this.canvasH, this.countryName, this.id, this.borderLands, this.year);
		oCountryNew.canvasX = this.canvasX;
		oCountryNew.canvasY = this.canvasY;
		oCountryNew.canvasW = this.canvasW;
		oCountryNew.canvasH = this.canvasH;
		oCountryNew.width = this.width;
		oCountryNew.height = this.height;
		oCountryNew.xPos = this.xPos; 
		oCountryNew.yPos = this.yPos;
		oCountryNew.countryName = this.countryName;
		oCountryNew.xMargin = this.xMargin;
		oCountryNew.borderLands = this.borderLands;
		oCountryNew.id = this.id;
	
		
		//oCountryNew.importPartners= this.arrayCopy2(this.importPartners ,oCountryNew.importPartners);
		//oCountryNew.exportPartners= this.arrayCopy2(this.exportPartners ,oCountryNew.exportPartners);
		//oCountryNew.rangesExport= this.arrayCopy2(this.rangesExport ,oCountryNew.rangesExport);
    //oCountryNew.rangesImport= this.arrayCopy2(this.rangesImport ,oCountryNew.rangesImport);
    
    		tradeGraph.arrayCopy(this.importPartners ,oCountryNew.importPartners);
		tradeGraph.arrayCopy(this.exportPartners ,oCountryNew.exportPartners);
		tradeGraph.arrayCopy(this.rangesExport ,oCountryNew.rangesExport);
		tradeGraph.arrayCopy(this.rangesImport ,oCountryNew.rangesImport);
		
		oCountryNew.divisorExpo = this.divisorExpo;
		oCountryNew.divisorImpo = this.divisorImpo;
		oCountryNew.countriesImportStatus = this.countriesImportStatus;
		oCountryNew.countriesExportStatus = this.countriesExportStatus;
		oCountryNew.maxNumberOfPartners = this.maxNumberOfPartners;
		oCountryNew.minimumImport = this.minimumImport;
		oCountryNew.minimumExport = this.minimumExport;
		oCountryNew.totalCountries = this.totalCountries;
    oCountryNew.currentAddedCountry = this.currentAddedCountry;

		return oCountryNew;
  }

  arrayCopy2(arraySource, arrayDest){
    for(var i =0; i<arraySource.length; i++){
      arrayDest.push(arraySource[i]);
    }
    return arrayDest;
  }

	
	replaceNetwork(oCountryNew){
		this.canvasX = oCountryNew.canvasX;
		this.canvasY= oCountryNew.canvasY;
		this.canvasW = oCountryNew.canvasW;
		this.canvasH = oCountryNew.canvasH;
		this.width = oCountryNew.width;
		this.height = oCountryNew.height;
		this.xPos = oCountryNew.xPos; 
		this.yPos = oCountryNew.yPos;
		this.countryName = oCountryNew.countryName;
		this.xMargin = oCountryNew.xMargin;
		this.borderLands = oCountryNew.borderLands;
		this.id = oCountryNew.id;
		this.year = oCountryNew.year;
		tradeGraph.arrayCopy(oCountryNew.importPartners, this.importPartners);
		tradeGraph.arrayCopy(oCountryNew.exportPartners, this.exportPartners );
		tradeGraph.arrayCopy(oCountryNew.rangesExport, this.rangesExport);
		tradeGraph.arrayCopy(oCountryNew.rangesImport, this.rangesImport);	
    //this.importPartners=	this.arrayCopy2(oCountryNew.importPartners, this.importPartners);
//		this.exportPartners=this.arrayCopy2(oCountryNew.exportPartners, this.exportPartners );
    //this.rangesExport= 	this.arrayCopy2(oCountryNew.rangesExport, this.rangesExport);
//		this.rangesImport = this.arrayCopy2(oCountryNew.rangesImport, this.rangesImport);
		
		this.divisorExpo = oCountryNew.divisorExpo;
		this.divisorImpo = oCountryNew.divisorImpo;
		this.countriesImportStatus = oCountryNew.countriesImportStatus;
		this.countriesExportStatus = oCountryNew.countriesExportStatus;
		this.maxNumberOfPartners = oCountryNew.maxNumberOfPartners;
		this.minimumImport = oCountryNew.minimumImport;
		this.minimumExport = oCountryNew.minimumExport;
		this.totalCountries = oCountryNew.totalCountries;
		this.currentAddedCountry = oCountryNew.currentAddedCountry;
		//this.drawNetwork();
	}
	
	drawPrimaryLines(isImport, xRanges){
		var x1 = this.canvasW/2
		var x2 = this.canvasW*0.95
		var yMargin = 80;
		tradeGraph.textSize(10);
		
		var drawXrange = []
		tradeGraph.arrayCopy(xRanges,drawXrange);
		if (!isImport){
			drawXrange = [];
			for(var m =1; m<=xRanges.length ; m++){
				//print("i " + m + " "+xRanges[m]);
				drawXrange.push(xRanges[xRanges.length  - m]);
			} 
		}
		
		//print(drawXrange);
		var divisor = 1000000;
		var textQty = "Millions (US$)";
		var valueToEval = drawXrange[drawXrange.length-1]	
		if(!isImport){
			valueToEval = drawXrange[0]
		}

		if(valueToEval/divisor < 10){
			divisor = 1000;
			textQty = "Thousands (US$)";
			if(drawXrange[i]/divisor < 10){
				divisor = 100;
				textQty = "Hundreds (US$)";
			}
		}
			
		for (var i=1; i<drawXrange.length; i++){
			var valueToPlot = drawXrange[i];
			if(isImport){
				valueToPlot = drawXrange[drawXrange.length-i-1];
			}
			var bPosX = this.width/2 + 
			tradeGraph.map(valueToPlot,
							drawXrange[i],
							drawXrange[i+1],
							(x2-x1)*i/drawXrange.length, 
							(x2-x1)*(i+1)/drawXrange.length) + this.xMargin;
			
			if(!isImport){ 
				bPosX = this.xPos + bPosX;
			}else{
				bPosX = this.xPos - bPosX;
			}
			
			for(var k=0; k<200;k++){
				if(yMargin+5*(k+1) < this.canvasH - yMargin){
					tradeGraph.line(bPosX, yMargin+5*k, bPosX, yMargin+5*(k+1))
					k +=1;
				}else{
					break;
				}				
			}
			
			tradeGraph.textAlign(tradeGraph.CENTER, tradeGraph.CENTER); 
			tradeGraph.fill(20);
			
			var textValue = tradeGraph.round(drawXrange[i]/divisor);
			if(isImport){
				this.divisorImpo = divisor;
			}else{
				this.divisorExpo = divisor;				
			}
			tradeGraph.text(textValue,bPosX,this.canvasH - yMargin + 20);
		}
		var x = 0;
		if(isImport){
			x = this.canvasW*3/4;
		}else{
			x = this.canvasW/4;
		}
		tradeGraph.textSize(15);
		tradeGraph.text(textQty, x,this.canvasH - yMargin + 45);
	}
	
	addCommercialPartner(comercialCountry, isImport){ 
		if(isImport){  
			this.importPartners.push(comercialCountry);			
			
		}else{
			this.exportPartners.push(comercialCountry);
		}
	}
	
	isReadyForDraw(){
		//print("" + this.currentAddedCountry  + " /  " + this.totalCountries)
		if(this.currentAddedCountry < this.totalCountries*0.9){
			return false;
		}else{
			return true;
		}

	}
	calculateRanges(isImport, numberOfRanges){
		/*if(this.currentAddedCountry <this.totalCountries){
			return;
		} */
		if(!this.isReadyForDraw()){
			return;
		}
		var max = 0;
		var min = Number.MAX_VALUE;
		var value = 0; 
		
		if(isImport){
			for(var i =0; i<this.importPartners.length;i++){
				//for(var j=0; j<this.countriesImportStatus.length; j++){
					//if(i==this.countriesImportStatus[j]){						
						value = (this.importPartners[i].avianTradeAmount + this.importPartners[i].eggsTradeAmount);
						//print("Value IMpo " + value);
						if(value > max){
							max = value;
						}
						if(value < min){
							min = value;
						}
					//}
				//}
			}
		}else{
			
			for(var i =0; i<this.exportPartners.length;i++){
				//for(var j=0; j<this.countriesExportStatus.length; j++){
					//if(i==this.countriesExportStatus[j]){							
						value = (this.exportPartners[i].avianTradeAmount + this.exportPartners[i].eggsTradeAmount);
						//print("Value Expo " + value);
						if(value > max){
							max = value;
						}
						if(value<min){
							min = value;
						}
					//}
				//}
			}
		}
		
		min = min * 0.9;
		max = max * 1.1;
		
		
		var range = []
		value = min;
		for(var i=1; i<=numberOfRanges; i++){
			range.push(Math.round(value));
			value = value + (max-min)/(numberOfRanges-1);
		}
		if(isImport){
			this.rangesImport = range; 
		}else{
			this.rangesExport = range; 
		} 
	}
	drawNetwork(){ 
		//print("Drawing " + this.countriesExpo.length);
		if (this.rangesImport.length == 0 || this.rangesExport.length ==0){
			return;
		} 
		tradeGraph.textSize(25);
		tradeGraph.noStroke();
		tradeGraph.textAlign(tradeGraph.CENTER, tradeGraph.CENTER);
		tradeGraph.fill("Brown")
		tradeGraph.text(this.countryName + " Imports, Exports and Trade Partners", this.canvasW/2,15);
		tradeGraph.text(this.year, this.canvasW/2,40);
		tradeGraph.fill(0,0,200);
		tradeGraph.textSize(22);
		tradeGraph.text("IMPORTS", this.canvasW/4,60);
		tradeGraph.text("EXPORTS", this.canvasW*3/4,60);
		
		tradeGraph.textSize(15);
		tradeGraph.stroke(tradeGraph.color(150,120,250));
		tradeGraph.fill(tradeGraph.color(150,150,250)); 
		//print("Start drawing");
		tradeGraph.rect(this.xPos - this.xGap/2, this.yPos-20, this.width, this.height-20);
		
		tradeGraph.line(this.xGap*2/4 + this.canvasW/2, 60, this.xGap*2/4 + this.canvasW/2, this.canvasH-20)
		
		//var numberOfRanges = 5;
		
		//var xRangesExpo = this.calculateRanges(false, numberOfRanges);//[1600, 1500, 400, 300, 200, 100, 0]
		//var xRangesImpo = this.calculateRanges(true, numberOfRanges);
		//var bubblesCountries = [120, 480, 220,390]
		
		var bubblesExpo = []//[120, 480, 220,390]		
		var bubblesExpoPoultry = []		
		var bubblesExpoEggs = []
		var bubblesExpoTotal = []//[1200, 4800, 2200,3900]
		var countriesExpo = [];
		var regionIndexesExpo =[]
		var regionIndexesImpo = []
		var isBorderExpo = []
		var isBorderImpo = []
		var countriesIdImpo = []
		var countriesIdExpo = []
		
		for(var i=0;i<this.exportPartners.length;i++){
			//print("Export: " + this.exportPartners[i].name);
			bubblesExpo.push(this.exportPartners[i].avianTradeAmount + this.exportPartners[i].eggsTradeAmount);
			bubblesExpoPoultry.push(this.exportPartners[i].avianTradeAmount);
			bubblesExpoEggs.push(this.exportPartners[i].eggsTradeAmount);
			bubblesExpoTotal.push(this.exportPartners[i].totalTradeAmount);
			countriesExpo.push(this.exportPartners[i].name);
			regionIndexesExpo.push(this.exportPartners[i].regionIndex);
			isBorderExpo.push(this.exportPartners[i].isBorder);
			countriesIdExpo.push(this.exportPartners[i].code);
		
		}
		
		var bubblesImpo = []//[170, 599, 450,120]
		var bubblesImpoPoultry = []
		var bubblesImpoEggs = []
		var bubblesImpoTotal = []//[1700, 5990, 4500,1200]
		var countriesImpo = []//'Vietnam', 'Japan', 'India', 'Egypt']
		
		//var maxImpo = 0;  
		for(var i=0;i<this.importPartners.length;i++){ 
			/*if(maxImpo < this.importPartners[i].avianTradeAmount + this.importPartners[i].eggsTradeAmount){
				maxImpo = this.importPartners[i].avianTradeAmount + this.importPartners[i].eggsTradeAmount;
			}*/

			//print("IMport: " + this.importPartners[i].name);
			bubblesImpo.push(this.importPartners[i].avianTradeAmount + this.importPartners[i].eggsTradeAmount);
			bubblesImpoPoultry.push(this.importPartners[i].avianTradeAmount);
			bubblesImpoEggs.push(this.importPartners[i].eggsTradeAmount);
			bubblesImpoTotal.push(this.importPartners[i].totalTradeAmount);
			countriesImpo.push(this.importPartners[i].name);
			regionIndexesImpo.push(this.importPartners[i].regionIndex);
			isBorderImpo.push(this.importPartners[i].isBorder);
			countriesIdImpo.push(this.importPartners[i].code);
		} 		
		//print("Max Impo: " + maxImpo);
		this.drawPrimaryLines(true, this.rangesImport)
		this.drawPrimaryLines(false, this.rangesExport)
		  
		var numberOfBubblesImpo = bubblesImpo.length;
		var numberOfBubblesExpo = bubblesImpo.length;

		var tradingInfo = this.getHTMLCommercialInfo();

		for(var i = 0; i<numberOfBubblesImpo;i++){ //bubblesImpo.length 
			var htmlInformation = tradingInfo;
			var totalExport = 0;
			var poultryExport = 0;
			var eggsExport = 0;
			for(var j=0;j<this.exportPartners.length;j++){ 
				if(countriesIdExpo[j]==countriesIdImpo[i]){
					totalExport= bubblesExpoTotal[j];
					poultryExport = bubblesExpoPoultry[j];
					eggsExport = bubblesExpoEggs[j];
					break;
				}
			}
			htmlInformation = this.fillDetailInformation(htmlInformation,countriesIdImpo[i],countriesImpo[i],tradeGraph.regionNames[regionIndexesImpo[i]],bubblesImpoTotal[i],totalExport,bubblesImpoPoultry[i],poultryExport,bubblesImpoEggs[i],eggsExport, isBorderImpo[i], 0, 0, tradeGraph.getCountryPicture(countriesIdImpo[i]));
			this.drawComercialCountry(true, bubblesImpo[i], this.rangesImport, numberOfBubblesImpo+2, i, countriesImpo[i],bubblesImpoTotal[i],i, regionIndexesImpo[i], isBorderImpo[i], htmlInformation);
			//break;
		}
		for(var i = 0; i<numberOfBubblesExpo;i++){ //bubblesExpo.length
			var htmlInformation = tradingInfo;
			var totalImport = 0;
			var poultryImport = 0;
			var eggsImport = 0;
			for(var j=0;j<this.importPartners.length;j++){ 
				if(countriesIdImpo[j]==countriesIdExpo[i]){
					totalImport= bubblesImpoTotal[j];
					poultryImport = bubblesImpoPoultry[j];
					eggsImport = bubblesImpoEggs[j];
					break;
				}
			}
			htmlInformation = this.fillDetailInformation(htmlInformation,countriesIdExpo[i],countriesExpo[i],tradeGraph.regionNames[regionIndexesExpo[i]],totalImport,bubblesExpoTotal[i],poultryImport,bubblesExpoPoultry[i],eggsImport,bubblesExpoEggs[i], isBorderExpo[i], 0, 0, tradeGraph.getCountryPicture(countriesIdExpo[i]));
	
			this.drawComercialCountry(false, bubblesExpo[i], this.rangesExport, numberOfBubblesExpo+2, i, countriesExpo[i], bubblesExpoTotal[i],i, regionIndexesExpo[i], isBorderExpo[i], htmlInformation);
			//break;
		}
		
		
		tradeGraph.fill(tradeGraph.color(150,50,0)); 
		tradeGraph.translate(this.xPos-this.xGap/2,this.yPos);
		tradeGraph.rotate(tradeGraph.radians(-90));
		tradeGraph.textAlign(tradeGraph.CENTER, tradeGraph.CENTER);
		tradeGraph.text(this.countryName, -this.height/2,this.width/2);
		tradeGraph.rotate(tradeGraph.radians(90));
		tradeGraph.translate(-this.xPos+this.xGap/2,-this.yPos);
	}
	
	filterCountries(numberOfResultants){ 
		var newListImport = this.removeCountries(this.importPartners,numberOfResultants);
		if(newListImport !=null){
			this.importPartners = newListImport;
		}
		var newListExport = this.removeCountries(this.exportPartners,numberOfResultants);
		if(newListExport !=null){
			this.exportPartners = newListExport;
		}
	}
	
	removeCountries(listToProcess, numberOfResultants){
		//print(this.currentAddedCountry+ "/" + this.totalCountries)
		
		if(!this.isReadyForDraw()){
			return;
		} 
		var importValue = 0;
		var amountsList = [];
		var indexList = [];
		var countriesList = []
		
		for(var i=0;i<listToProcess.length;i++){
			importValue= listToProcess[i].avianTradeAmount + listToProcess[i].eggsTradeAmount;
			amountsList.push(importValue);
			indexList.push(i);
			countriesList.push(listToProcess[i].name);
		} 
		
		for(var i=0;i<amountsList.length;i++){
			for(var j=0;j<amountsList.length;j++){
				if(amountsList[i] > amountsList[j]){
					var temp = amountsList[i];
					amountsList[i] = amountsList[j];
					amountsList[j] = temp;
		
					
					var tempIndex = indexList[i];
					indexList[i] = indexList[j];
					indexList[j] = tempIndex;

					var n = countriesList[i];
					countriesList[i] = countriesList[j];
					countriesList[j] = n;  
				}
			}
		}
		
		var newList = []
		//Look for neighbours borders
		var borders = this.id;
	if(this.borderLands!=null){	
		for(var i=0;i<listToProcess.length;i++){ 
			//var m = match(this.borderLands, listToProcess[i].code);
			var m = this.borderLands.includes(listToProcess[i].code);
			//if(m!=null){ 
      if(m){
				listToProcess[i].setIsBorder(true); 
				newList.push(listToProcess[i]); 
			}
		}
		}
		
		//Look for top profiles
		for(var i=0;i<this.maxNumberOfPartners-newList.length;i++){
			var exists = false; 
			for(var j=0; j<newList.length;j++){ 
				var indexP = indexList[i];  
				var code = listToProcess[indexP].getCode();
				if(newList[j].getCode() == code){ 
					exists = true;
					break;
				}
			}			
			if(!exists){
				listToProcess[indexList[i]].setIsBorder(false);
				newList.push(listToProcess[indexList[i]]);
			}
		}
		
		return newList;
		//listToProcess = newList;
		/*
		var indexes = []
		var values = []
		var countriesStatus = []
		for (var i= 0; i<listToProcess.length; i++){
			indexes.push(i);
			values.push(listToProcess[i].eggsTradeAmount + listToProcess[i].avianTradeAmount);
		}
		
		for(var i=0; i<values.length; i++){
			for(var j=0; j<values.length ; j++){
				if(values[i] > values[j]){
					var temp = values[j];
					values[j] = values[i];
					values[i] = temp;
					
					var tempIndex = indexes[j];
					indexes[j] = indexes[i];
					indexes[i] = tempIndex;
				}
			}
		} 
		
		var finalList = [];
		for(var i=0; i<numberOfResultants;i++){
			finalList.push(values[i]);
			countriesStatus.push(indexes[i]);
		}
		return countriesStatus;*/
	}
	
		
	getHTMLCommercialInfo(){ 
		var currentInformation = tradeGraph.informationTemplate.join();
		currentInformation = currentInformation.replace(/,/g, '');
		currentInformation = currentInformation.replace(/baseCountryId/g,this.id);
		currentInformation = currentInformation.replace(/baseCountryName/g,this.countryName);
		currentInformation = currentInformation.replace(/baseCountryRegion/g,tradeGraph.regionNames[tradeGraph.getRegionIndex(tradeGraph.mainCountryId)]);  
        currentInformation = currentInformation.replace(/baseCountryFlag/g,tradeGraph.getCountryPicture(this.id));
		currentInformation = currentInformation.replace(/year/g,this.year);
		 
		return currentInformation;
	}
	drawComercialCountry(isImpo, value, xRanges, numberOfBubbles, bubblePos, countryName, size,index, regionIndex, isBorder, htmlInformation){ 
			var x1 = this.canvasW/2
			var x2 = this.canvasW
			var xRangeIndex = 0
			
			var drawRanges = [];
			tradeGraph.arrayCopy(xRanges, drawRanges);
			if(!isImpo){
				drawRanges = [];
				for(var i=1;i<=xRanges.length;i++){ 
					drawRanges.push(xRanges[xRanges.length-i]);
				} 
			}			
			
			//print(countryName)
			for(var i= 0; i<drawRanges.length-1;i++){ 
				if(isImpo){
					//print("IMPO country " + countryName + " i " + i + " value " + value + " range min " + drawRanges[i] + " max " + drawRanges[i+1]  + " size : " + size); 
					if(value > drawRanges[i] && value <= drawRanges[i+1]){
						xRangeIndex = i;
						//print("Selected impo " + xRangeIndex);
						//print(drawRanges);
						break;
					}
				}else{
					//print("EXPO country " + countryName + " i " + i + " value " + value + " range min " + drawRanges[i+1] + " max " + drawRanges[i]   + " size : " + size);
					if(value <= drawRanges[i] && value > drawRanges[i+1]){
						xRangeIndex = i;
						//print("Selected Expo " + xRangeIndex);
						//print(drawRanges);
						break;
					}
				}
			}
			 
			var valueDraw = 0
			var sizeDraw = tradeGraph.round(size)/20; 
			if(!isImpo){
				valueDraw = value / this.divisorExpo;
				sizeDraw = sizeDraw /this.divisorExpo; 
			}else{
				valueDraw = value / this.divisorImpo;
				sizeDraw = sizeDraw /this.divisorImpo;	 			
			} 
			/*if(sizeDraw < 10){
				return;
			}*/
			
			//sizeDraw = 1000;
			var bPosX = 0;
			if(!isImpo){
				bPosX = this.width/2 + 
				tradeGraph.map(valueDraw,
							drawRanges[xRangeIndex]/this.divisorExpo,
							drawRanges[xRangeIndex+1]/this.divisorExpo,
							(x2-x1)*xRangeIndex/drawRanges.length, 
							(x2-x1)*(xRangeIndex+1)/drawRanges.length) + 
						this.xMargin;
				bPosX = this.xPos + bPosX;
			}else{
				//print("draw "  +  drawRanges)
				//print("value " +valueDraw + " index " + xRangeIndex )
				/*bPosX = this.width/2 + 
						map(valueDraw,
							drawRanges[xRangeIndex]/this.divisorImpo,
							drawRanges[xRangeIndex+1]/this.divisorImpo,
							(x2-x1)*xRangeIndex/drawRanges.length, 
							(x2-x1)*(xRangeIndex+1)/drawRanges.length) + 
						this.xMargin;
				
				*/
				bPosX = this.width/2 + 
				tradeGraph.map(valueDraw,
							drawRanges[drawRanges.length - 1 - xRangeIndex]/this.divisorImpo,
							drawRanges[drawRanges.length - 2 - xRangeIndex]/this.divisorImpo,
							(x2-x1)*xRangeIndex/drawRanges.length, 
							(x2-x1)*(xRangeIndex+1)/drawRanges.length) + 
						this.xMargin;
						
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
			
			
			var b1 = new BubbleCountry(bPosX, bPosY, sizeDraw/10, regionIndex, countryName, isBorder, htmlInformation)
			b1.draw();
			
	}
	
	fillDetailInformation(htmlInformation,partnerCountryId,partnerCountryName,partnerCountryRegion,baseTotalImportation,baseTotalExportation,poultryImportation,poultryExportation,eggsImportation,eggsExportation, isBorder,importPerc, exportPerc, countryPic){
		var currentInformation = htmlInformation + ""; 
		currentInformation = currentInformation.replace(/partnerCountryId/g,partnerCountryId); 
		currentInformation = currentInformation.replace(/partnerCountryName/g, partnerCountryName);
		currentInformation = currentInformation.replace(/partnerCountryFlag/g, countryPic);
		if(partnerCountryRegion==null){
			partnerCountryRegion='';
		}
		currentInformation = currentInformation.replace(/partnerCountryRegion/g,partnerCountryRegion);
		baseTotalExportation = this.getFormattedAmount(baseTotalExportation);
		currentInformation = currentInformation.replace(/TotalExportation/g, baseTotalExportation);
		baseTotalImportation = this.getFormattedAmount(baseTotalImportation);
		currentInformation = currentInformation.replace(/TotalImportation/g,baseTotalImportation);
		poultryExportation = this.getFormattedAmount(poultryExportation);
		currentInformation = currentInformation.replace(/PoultryExportation/g,poultryExportation);
		poultryImportation = this.getFormattedAmount(poultryImportation);
		currentInformation = currentInformation.replace(/PoultryImportation/g,poultryImportation);
		eggsExportation = this.getFormattedAmount(eggsExportation);
		currentInformation = currentInformation.replace(/EggsExportation/g,eggsExportation);
		eggsImportation = this.getFormattedAmount(eggsImportation);
		currentInformation = currentInformation.replace(/EggsImportation/g,eggsImportation); 
		if(isBorder){
			currentInformation = currentInformation.replace(/do_not_share/g,'shares');
		}else{
			currentInformation = currentInformation.replace(/do_not_share/g,'don\'t share');
		}
		currentInformation = currentInformation.replace(/exportPerc/g,exportPerc);
		currentInformation = currentInformation.replace(/importPerc/g,importPerc);
		return currentInformation;
	}

	getFormattedAmount(amount){
		if(amount==null){ 
			return 0;
		}
		var regexNumber = /\B(?=(\d{3})+(?!\d))/g;
		amount = Math.round(amount);
		var divisor = 1000000
		if(amount/divisor>1){
			return Math.round(amount/divisor).toString().replace(regexNumber, ",") + " Millions (US $)";
		}else{
			divisor = divisor *100;
			if(amount/divisor >1){
				return Math.round(amount/divisor).toString().replace(regexNumber, "," + " Thousands (US $)");
			}else{
				divisor = divisor *100;
				return Math.round(amount/divisor).toString().replace(regexNumber, "," + " Hundreds (US $)");
			}
		}
	}
}
