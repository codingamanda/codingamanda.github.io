

class CountryInformation{
	constructor(code, name, regionIndex, avianTradeAmount, eggsTradeAmount, totalTradeAmount, avianTradeAmount2, eggsTradeAmount2, totalTradeAmount2, month, year, borderLands,picture){
		this.code = code; 
		this.name = name;
		this.regionIndex = regionIndex;
		this.avianTradeAmount = avianTradeAmount;
		this.eggsTradeAmount = eggsTradeAmount;
		this.totalTradeAmount = totalTradeAmount;
		this.avianTradeAmount2 = avianTradeAmount2;
		this.eggsTradeAmount2 = eggsTradeAmount2;
		this.totalTradeAmount2 = totalTradeAmount2;
		this.month = month;
		this.year = year;
		this.borders = borderLands;
		this.isBorder = false; 
		this.picture = picture;
	}
	
	getCode(){
		return this.code;
	}
	
	setIsBorder(isBorder){
		this.isBorder = isBorder;		
	}
}