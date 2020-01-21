var sketch_avianMap = function(a_map){
  a_map.myMap;
  a_map.canvas;
  a_map.mappa = new Mappa('Leaflet');
  a_map.dateSplit;
  a_map.sliderValue = 2003;
  a_map.count = 0;
  a_map.interval;
  a_map.countries;

  a_map.options = {
    lat: 34, //27, 
    lng: 69, //85, 
    zoom: 3,
    style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
  }

  a_map.setup = function(){
    //a_map.canvas = a_map.createCanvas(a_map.windowWidth/2, 550);
    a_map.canvas = a_map.createCanvas(a_map.windowWidth*3/5, 550);
    //a_map.canvas = a_map.createCanvas(a_map.windowWidth-30, 550);
    a_map.canvas.parent('sketch-holder');
    // Create both of your off-screen graphics buffers
    //leftBuffer = createGraphics(windowWidth/2, windowWidth/2);
    a_map.myMap = a_map.mappa.tileMap(a_map.options);
    a_map.myMap.overlay(a_map.canvas);
    a_map.countries = a_map.select('#countries');

    // Load the data
    a_map.avian_outbreak = a_map.loadTable('data/Processed_Outbreak_H5N1_H7N9.csv', 'csv', 'header');

    a_map.slide = document.getElementById('slide');
    a_map.sliderDiv = document.getElementById("sliderAmount");
    a_map.sliderDiv.innerHTML = 2003;

    a_map.slide.onchange = function() {
      a_map.sliderDiv.innerHTML = this.value;
      a_map.sliderValue = this.value;
      a_map.drawAvian();
    }

    a_map.myMap.onChange(a_map.drawAvian);

    a_map.fill(70, 203,31);
    a_map.stroke(100);
  }

  a_map.passVar = function(s){
    return a_map.window['avian_outbreak_' + s];
  }

  a_map.updateCountry = function(c) {
    // The text() function needs three parameters:
    // the text to draw, the horizontal position,
    // and the vertical position
    a_map.currentCountryPrint = a_map.countries.html().toString();
    if(a_map.currentCountryPrint == ''){
      a_map.countries.html("<a href='javascript:void(0)' onclick=\"callTrade(\'"  + c + "\');return false;\">" + c + "</a>");
    }
    else if(!a_map.currentCountryPrint.includes(c)){
      a_map.countries.html(a_map.currentCountryPrint+'->'+"<a href='javascript:void(0)' onclick=\"callTrade(\'"  + c + "\');return false; \">" + c + "</a>");
    }
  }

  callTrade = function(country){
    //setup2();
    //console.log(country);
    tradeGraph.loadDataImpoExpo(country);
  }

  a_map.drawAvian = function(){
    if(a_map.interval != null){
      clearInterval(a_map.interval);
      a_map.interval = null;
      a_map.count = 0;
    }
    // Clear the canvas
    a_map.clear();
    a_map.countries.html('');
  
    a_map.history = [];
    a_map.history_size = [];
    a_map.history_country = [];
  
    for (a_map.i = 0; a_map.i < a_map.avian_outbreak.getRowCount(); a_map.i++) {
      a_map.dateSplit = a_map.split(String(a_map.avian_outbreak.getString(a_map.i, 'observationDate')), '/');
      
      if(a_map.sliderValue == Number(a_map.dateSplit[2])){
      
        a_map.latitude = Number(a_map.avian_outbreak.getString(a_map.i, 'latitude'));
        a_map.longitude = Number(a_map.avian_outbreak.getString(a_map.i, 'longitude')); 
        
        if (a_map.myMap.map.getBounds().contains({lat: a_map.latitude, lng: a_map.longitude})) {
          // Transform lat/lng to pixel position
          a_map.pos = a_map.myMap.latLngToPixel(a_map.latitude, a_map.longitude);
          
          a_map.size = a_map.avian_outbreak.getString(a_map.i, 'sumCases') + a_map.avian_outbreak.getString(a_map.i, 'humansAffected')
          a_map.size = a_map.map(a_map.size, 1, 2955056, 1, 10) + a_map.myMap.zoom();
          //fill([255, 0, 0, 50]);
          //ellipse(pos.x, pos.y, size, size);
          a_map.v = a_map.createVector(a_map.pos.x, a_map.pos.y);
          a_map.history.push(a_map.v);
          a_map.history_size.push(a_map.size);
          a_map.history_country.push(a_map.avian_outbreak.getString(a_map.i, 'country'));
        }
      }
    }
  
    a_map.showSlow(a_map.history, a_map.history_size, a_map.history_country);
  }

  a_map.showSlow = function(history, history_size, history_country) {
    if(a_map.interval != null){
      clearInterval(a_map.interval);
      a_map.interval = null;
      a_map.count = 0;
    }
  
    if(history.length > 1500){
      a_map.interval = setInterval(() => {
        a_map.fill([255, 0, 0, 50]);
        a_map.new_history_point = history[a_map.count];
        a_map.new_history_size = history_size[a_map.count]; 
        a_map.ellipse(a_map.new_history_point.x, a_map.new_history_point.y, a_map.new_history_size, a_map.new_history_size);
        a_map.updateCountry(history_country[a_map.count]);
        a_map.count++;
          if(a_map.count >= history.length){
            clearInterval(a_map.interval);
            a_map.interval = null;
            a_map.count = 0;
          }
      }, 40);
    }
    else if(history.length <= 1500 && history.length > 600){
      a_map.interval = setInterval(() => {
        a_map.fill([255, 0, 0, 50]);
        a_map.new_history_point = history[a_map.count];
        a_map.new_history_size = history_size[a_map.count]; 
        a_map.ellipse(a_map.new_history_point.x, a_map.new_history_point.y, a_map.new_history_size, a_map.new_history_size);
        a_map.updateCountry(history_country[a_map.count]);
        a_map.count++;
          if(a_map.count >= history.length){
            clearInterval(a_map.interval);
            a_map.interval = null;
            a_map.count = 0;
          }
      }, 80);
    }
    else{
      a_map.interval = setInterval(() => {
        a_map.fill([255, 0, 0, 50]);
        a_map.new_history_point = history[a_map.count];
        a_map.new_history_size = history_size[a_map.count]; 
        a_map.ellipse(a_map.new_history_point.x, a_map.new_history_point.y, a_map.new_history_size, a_map.new_history_size);
        a_map.updateCountry(history_country[a_map.count]);
        a_map.count++;
          if(a_map.count >= history.length){
            clearInterval(a_map.interval);
            a_map.interval = null;
            a_map.count = 0;
          }
      }, 100);
    }
  }

}

var sketch_tradeGraph = function(t_graph){
  t_graph.wDraw=510;
  t_graph.hDraw=600;
  t_graph.w=510;
  t_graph.h=600;
  t_graph.datarows;
  t_graph.tooltip;
  t_graph.colors;
  t_graph.mainConferences;

  t_graph.base = 'https://oec.world/'
  t_graph.endpoint_countries = 'attr/country/'
  t_graph.endpoint_products = 'attr/hs92/'
  t_graph.endpoint_countries_export = t_graph.base + 'hs92/export/year/countryA/show/countryB/'
  t_graph.endpoint_trades_export = t_graph.base + 'hs92/export/year/countryA/countryB/show/'

  t_graph.regionCodes = ['as','af','eu','na','oc','sa','an']
  t_graph.regionNames = ['Asia','Africa','Europe','North America','Oceania','South America','Antarthic']
  t_graph.call_countries = t_graph.base + t_graph.endpoint_countries
  t_graph.call_products = t_graph.base + t_graph.endpoint_products

  t_graph.countries = []
  t_graph.countries_codes = []
  t_graph.countries_ids = []
  t_graph.countries_pics = []
  t_graph.borders_lands = []
  t_graph.products_poultry = []
  t_graph.products_eggs = []
  t_graph.products_codes_poultry = []
  t_graph.products_codes_eggs = []
  t_graph.products_ids_poultry = []
  t_graph.products_ids_eggs = []
  t_graph.mainCountryCode = '';
  //t_graph.mainCountrySelected = '';
  t_graph.backgroundColor = 	255
  t_graph.countrySelected = 	'China';
  t_graph.mainCountryId = '';

  t_graph.oCountryNetworkLoad;
  t_graph.oCountryNetworkDraw;

  t_graph.slider;
  t_graph.sliderStartY = 2003;
  t_graph.sliderEndY = 2017;
  t_graph.sliderXMargin = 100;
  t_graph.sliderYPos = t_graph.h-20;
  t_graph.isPlayingVideo = false;
  t_graph.interval;
  ///t_graph.buttonPlay;
  t_graph.cnv;

  t_graph.informationTemplate;

  t_graph.preload = function(){
    t_graph.informationTemplate = t_graph.loadStrings('informationTemplate.txt');
  }

  t_graph.setup = function() {
    t_graph.cnv = t_graph.createCanvas(t_graph.windowWidth/2-50,550);
    
    t_graph.cnv.parent('sketch-holder');
    t_graph.cnv.parent('sketch-holder2');
    //t_graph.cnv.position((t_graph.windowWidth/2)+30);
    t_graph.cnv.position(50);
    
    //t_graph.slider = t_graph.createSlider(t_graph.sliderStartY,t_graph.sliderEndY,(t_graph.sliderStartY)); 
    //t_graph.slider.position(t_graph.sliderXMargin,t_graph.sliderYPos)
    //t_graph.slider.style('width', (t_graph.w-2*t_graph.sliderXMargin)+'px');
    ///t_graph.buttonPlay = t_graph.createButton("play");
    ///t_graph.buttonPlay.mousePressed(t_graph.playVideo);
    t_graph.background(t_graph.backgroundColor);
    //t_graph.button = t_graph.select('#drawCountry');
    //t_graph.button.mousePressed(t_graph.loadDataImpoExpo);
    //t_graph.inputCountry = t_graph.select('#country');
    //t_graph.inputYear = t_graph.select('#year'); 
    t_graph.loadJSON(t_graph.call_countries, t_graph.loadListCountries);
    t_graph.loadJSON(t_graph.call_products, t_graph.loadListProducts);	
    //t_graph.drawSliderYears();
    //t_graph.rect(0,0,w,h)
  }

  t_graph.draw = function() {
	
    t_graph.drawSliderYears();
    if(t_graph.oCountryNetworkDraw!=null){
      t_graph.oCountryNetworkDraw.drawNetwork();
    }  
  }
  
  t_graph.callDraw = function(){
    t_graph.drawSliderYears();
    t_graph.loadDataImpoExpo();
    t_graph.drawSliderYears();
    if(t_graph.oCountryNetworkDraw!=null){
      //oCountryNetworkDraw.drawNetwork();
    } 
    if(t_graph.isPlayingVideo){
      if(t_graph.slider.value() == t_graph.sliderEndY){
        t_graph.slider.value(t_graph.sliderStartY);
      }
      else{
        t_graph.slider.value(t_graph.slider.value()+1);
      }
    }
  }
/*
  t_graph.playVideo = function(){
    if(!t_graph.isPlayingVideo){
      //print("Execute start");
      t_graph.callDraw();
      t_graph.isPlayingVideo = true;
      t_graph.buttonPlay.html('stop');
      t_graph.interval = setInterval(t_graph.callDraw,8000);	
    }else{
      t_graph.isPlayingVideo = false;
      clearInterval(t_graph.interval);
      t_graph.buttonPlay.html('play');
    }
  }
  */

  
  t_graph.loadListCountries = function(data){ 
    var countries_json = data; 
    for(var i=0;i<countries_json.data.length;i=i+1){
      if(countries_json.data[i].display_id !=null &&
		countries_json.data[i].id != null && 
		countries_json.data[i].comtrade_name !=null){ 
        t_graph.countries.push(countries_json.data[i].comtrade_name);
        t_graph.countries_codes.push(countries_json.data[i].display_id);
        t_graph.countries_ids.push(countries_json.data[i].id);
        t_graph.borders_lands.push(countries_json.data[i].borders_land);
	      t_graph.countries_pics.push(countries_json.data[i].icon);
      }
    } 
  }

  t_graph.loadListProducts = function(data){
    t_graph.products_json = data;  
    for(var i=0;i<t_graph.products_json.data.length;i=i+1){
      var m = t_graph.match(t_graph.products_json.data[i].name,'Poultry');
      if(m!=null){
        //t_graph.append(t_graph.products_poultry, t_graph.products_json.data[i].name);
        //t_graph.append(t_graph.products_codes_poultry, t_graph.products_json.data[i].display_id); 
        //t_graph.append(t_graph.products_ids_poultry, t_graph.products_json.data[i].id);
        t_graph.products_poultry.push(t_graph.products_json.data[i].name);
        t_graph.products_codes_poultry.push(t_graph.products_json.data[i].display_id); 
        t_graph.products_ids_poultry.push(t_graph.products_json.data[i].id);	
      }else{
        m = t_graph.match(t_graph.products_json.data[i].name,'Egg');
        if(m!=null){
          //t_graph.append(t_graph.products_eggs, t_graph.products_json.data[i].name);
          //t_graph.append(t_graph.products_codes_eggs, t_graph.products_json.data[i].display_id); 	
          //t_graph.append(t_graph.products_ids_eggs, t_graph.products_json.data[i].id);
          t_graph.products_eggs.push(t_graph.products_json.data[i].name);
          t_graph.products_codes_eggs.push(t_graph.products_json.data[i].display_id); 	
          t_graph.products_ids_eggs.push(t_graph.products_json.data[i].id); 	
        }
      }
    }
  }
  
  t_graph.loadDataImpoExpo = function(country){ 
    //print("Start querying");
    //console.log(t_graph.countries)
    var mainCountry = country;  
    if(mainCountry == 'Vietnam'){
      mainCountry = 'Viet Nam|Vietnam';
    }
    t_graph.countrySelected = mainCountry; 
    for(var i=0;i<t_graph.countries.length;i++){
      if(t_graph.countries[i]!=null){
         if(mainCountry.includes(t_graph.countries[i]) || t_graph.countries[i].includes(mainCountry)||t_graph.countries[i] == mainCountry){
            t_graph.mainCountryCode = t_graph.countries_codes[i];
            t_graph.mainCountryId = t_graph.countries_ids[i];
            break;
         }
      }
    }
    
    var year = avianMap.sliderValue;//inputYear.value();

    
    var borderLands = t_graph.getCountryBorders(t_graph.mainCountryCode);
	countryName = t_graph.affineCountryName(t_graph.countrySelected);
    t_graph.oCountryNetworkLoad = new CountryNetwork(t_graph.wDraw,t_graph.hDraw, countryName, t_graph.mainCountryId, borderLands,year);
    
    var endpoint_c_export = t_graph.endpoint_countries_export.replace("year",year); 
    endpoint_c_export = endpoint_c_export.replace("countryA",t_graph.mainCountryCode);
    endpoint_c_export = endpoint_c_export.replace("countryB",'all'); 
    //print("Enpoint 1: " + endpoint_c_export);
    t_graph.loadJSON(endpoint_c_export, t_graph.loadExportCountries);
    
  }
  
  t_graph.loadExportCountries = function(data){ 
    t_graph.year = avianMap.sliderValue;//inputYear.value();
    t_graph.oCountryNetworkLoad.totalCountries = data.data.length;
    for(var i=0;i<data.data.length;i++){
      //print("calling " + (i+1) + "/"+ data.data.length);
      t_graph.countryDest = data.data[i].dest_id;
      t_graph.countryDestCode = ''
    
      for(var c = 0;c<t_graph.countries_ids.length;c++)
      {
        if(t_graph.countries_ids[c] ==t_graph.countryDest){
          t_graph.countryDestCode = t_graph.countries_codes[c];
          break;
        }
      }
  
      if(t_graph.countryDestCode !== ''){
        var endpoint_export = t_graph.endpoint_trades_export.replace("year",t_graph.year);
        endpoint_export = endpoint_export.replace("countryA",t_graph.mainCountryCode);
        endpoint_export = endpoint_export.replace("countryB",t_graph.countryDestCode);
        //print(endpoint_export);
        t_graph.loadJSON(endpoint_export, t_graph.loadTradesPerCountry);
      }else{
        //print('Not found ' + t_graph.countryDest);
      }
    }
  }

  t_graph.loadTradesPerCountry = function(data){
    var totalExport = 0;
    var totalPoultryExport = 0;
    var totalEggsExport = 0;
    var totalImport= 0;
    var totalPoultryImport = 0;
    var totalEggsImport = 0;
    var countryCode = '';
    var year = 0;
    t_graph.oCountryNetworkLoad.currentAddedCountry = t_graph.oCountryNetworkLoad.currentAddedCountry+1;
    for(var i=0;i<data.data.length;i++){
      
      if(data.data[i].export_val!=null){ 
        totalExport += data.data[i].export_val; 
      }
      
      if (data.data[i].import_val != null){
        totalImport += data.data[i].import_val;
      }	
      
      countryCode = data.data[i].dest_id;
      year = data.data[i].year;
    
      for(var j=0;j<t_graph.products_ids_poultry.length;j++){
        if(data.data[i].hs92_id ==  t_graph.products_ids_poultry[j]){
          //print("EGGS hs92_id " + (data.data[i].hs92_id) + " " + products_ids_eggs[j] + " country " + countryCode)
        
          if(data.data[i].export_val!=null){
            totalPoultryExport += data.data[i].export_val;
          }
          if(data.data[i].import_val!=null){
            totalPoultryImport += data.data[i].import_val;
          }
        }
      }
      for(var j=0;j<t_graph.products_ids_eggs.length;j++){
        //print("POULTRY hs92_id " + (data.data[i].hs92_id)  + " " + products_ids_eggs[i] + " country " + countryCode)
        if(data.data[i].hs92_id ==  t_graph.products_ids_eggs[j]){
          if(data.data[i].export_val!=null){
            totalEggsExport += data.data[i].export_val;
          }
          if(data.data[i].import_val!=null){
            totalEggsImport += data.data[i].import_val;
          }
        }
      }
    }
    
    var name = t_graph.getCountryName(countryCode);
    var borderLands = t_graph.getCountryBorders(countryCode);
    var month = 0;
    var regionIndex = t_graph.getRegionIndex(countryCode); 
	var picture = t_graph.getCountryPicture(countryCode);
	//console.log(picture);
    if(totalPoultryExport + totalEggsExport > 0){
      var ci = new CountryInformation(countryCode, name,regionIndex, totalPoultryExport, totalEggsExport, totalExport, month, year,borderLands, picture); 
      t_graph.oCountryNetworkLoad.addCommercialPartner(ci, false);
    }
    
    if(totalPoultryImport + totalEggsImport > 0){
      var ci = new CountryInformation(countryCode, name,regionIndex, totalPoultryImport, totalEggsImport, totalImport, month, year,borderLands, picture); 
      t_graph.oCountryNetworkLoad.addCommercialPartner(ci, true);
    }
    
    t_graph.oCountryNetworkLoad.filterCountries(8);
      
    t_graph.oCountryNetworkLoad.calculateRanges(true,7);
    t_graph.oCountryNetworkLoad.calculateRanges(false,7);
  
    t_graph.background(t_graph.backgroundColor); 
    
    if(t_graph.oCountryNetworkLoad.isReadyForDraw()){
      var mainCountry = t_graph.countrySelected;
      var mainCountryId = '';
      var mainCountryCode = '';
      for(var i=0;i<t_graph.countries.length;i++){
        if(t_graph.countries[i] == mainCountry){
          mainCountryCode = t_graph.countries_codes[i];
          mainCountryId = t_graph.countries_ids[i];
          break;
        }
      }
      
      var borderLands = t_graph.getCountryBorders(mainCountryCode);
      
      var year = avianMap.sliderValue;//t_graph.slider.value();
    
      if(t_graph.oCountryNetworkDraw == null){	  
	  	mainCountry = t_graph.affineCountryName(mainCountry); 
        t_graph.oCountryNetworkDraw = new CountryNetwork(t_graph.wDraw,t_graph.hDraw, mainCountry, mainCountryId, borderLands, year);
      }
      t_graph.oCountryNetworkDraw.replaceNetwork(t_graph.oCountryNetworkLoad);
      t_graph.oCountryNetworkDraw.drawNetwork();
    }
  }
  
  t_graph.getCountryName = function(countryCode){
    for (var i=0; i< t_graph.countries_ids.length;i++){
      if(countryCode == t_graph.countries_ids[i]){ 
		var country = t_graph.affineCountryName(t_graph.countries[i]); 
        return country;
      }
    }
  }
  /*
  
  
  
        var m = t_graph.match(,'\\|');
        if(m!=null){ 
          var country = t_graph.countries[i].substr(0,t_graph.countries[i].indexOf("|"));
          return country;
        } 
		
		*/
  
  t_graph.affineCountryName = function(countryName){
	var m = t_graph.match(countryName,'\\|');
	if(m!=null){ 
		var country = countryName.substr(0,countryName.indexOf("|"));
		return country;
	}
	return countryName;
  }
  
  
  t_graph.getCountryBorders = function(countryCode){
    for (var i=0; i< t_graph.countries_codes.length;i++){
      if(countryCode == t_graph.countries_codes[i]){
        return t_graph.borders_lands[i];
      }
    }
  }
  
  
  t_graph.getRegionIndex = function(countryCodeP){
    if(countryCodeP==null){
      return 0;
    }
    for (var i=0;i<t_graph.regionCodes.length;i++){
      if(countryCodeP.substring(0, 2) == t_graph.regionCodes[i]){
        //print(countryCodeP.substring(0, 2))
        return i;
      }
    }
  }
  
  t_graph.drawSliderYears = function(){ 
    var x1 = t_graph.sliderXMargin;
    var x2 = t_graph.w - 1.55*t_graph.sliderXMargin;
    var numberOfPoints = (t_graph.sliderEndY - t_graph.sliderStartY );
    
    for (var i=0; i<=numberOfPoints; i++){
      var textValue = t_graph.sliderStartY+i;
      var bPosX = x1 +
        t_graph.map(textValue,
              t_graph.sliderStartY,
              t_graph.sliderEndY,
              (x2-x1)*i/numberOfPoints, 
              (x2-x1)*(i+1)/numberOfPoints);
      
      t_graph.textAlign(t_graph.CENTER, t_graph.CENTER);
      t_graph.textSize(15);
      t_graph.noStroke();
      t_graph.fill(50, 50, 100);
      t_graph.text(textValue, bPosX, t_graph.sliderYPos);
          }
      t_graph.drawColorLegend(x1-120,t_graph.sliderYPos-60);
  }
  
 t_graph.drawColorLegend = function(xPos, yPos){
	var regionColors = [t_graph.color(220,70,71),t_graph.color(249,168,37),t_graph.color(255,201,40),t_graph.color(124,178,66),t_graph.color(0,138,122), t_graph.color("Blue"), t_graph.color("Red"), t_graph.color("Cyan")];
	var regionWordsSize = [60,60,60,60,100,26,20];

	t_graph.textAlign(t_graph.LEFT, t_graph.TOP);
	t_graph.textSize(15);
	t_graph.noStroke();
	var xPosFinal = xPos;
	var rectWidth = 20;
	var rectHeight = 10;
	var xMargin1 = 05;
	var xMargin2 = 20;

	for(var i =0; i<t_graph.regionNames.length-2; i++){
		t_graph.fill(regionColors[i]);
		t_graph.rect(xPosFinal, yPos, rectWidth, rectHeight);
		xPosFinal += rectWidth + xMargin1;
		var textToDraw = 'Border country';
		if(i==0){
			t_graph.text(textToDraw, xPosFinal, yPos);
			xPosFinal += 120 + xMargin1;		
		}
		else{
			t_graph.text(t_graph.regionNames[i-1], xPosFinal, yPos);
			xPosFinal += regionWordsSize[i-1] + xMargin1;
		}
	}
	t_graph.fill(255);
}

t_graph.getCountryPicture = function(countryCode){ 
	for (var i=0; i< t_graph.countries_pics.length; i++){
		if(t_graph.countries_ids[i] == countryCode){
			return t_graph.countries_pics[i];
		}
	}
}  
      
}


var avianMap = new p5(sketch_avianMap);
var tradeGraph = new p5(sketch_tradeGraph);
