const axios = require('axios');
const cheerio = require('cheerio'); // defining cherio app 
const fs = require('fs');
const file = 'data.txt';


const eItems = []; // array that stores objects of class iPhone
class eItem { // ebay Item
	constructor(model, storage, link) {
		this.model = model;
		this.storage = storage;
		this.used = 3000;
		this.neverused = 1500;
		this.link = link;
		this.prices = [];
	}
	
	avgPrice(){
		if(this.prices.length === 0 )
			return 0;
		
		let pricesSum = this.prices.reduce((acc, currV) => acc + currV, 0);
		pricesSum /= this.prices.length;
		return pricesSum.toFixed(2);
	}
}

async function LoadPrices() {
	console.log(eItems.length);
	if(eItems.length === 0) {
		return Promise.reject('eItems array is not loaded with an objects');
	}
	for(const item of eItems ) {
		
		response = await axios.get(item.link);
		
		if(response.status === 200){
			
			const $ = cheerio.load(response.data);
			const prices = [];
			$('.s-item').each((index, element) => {
				const price = $(element).find('.s-item__price').text();
				if(price[0] !== '$') {
					prices.push(Number(price.replace(/£/g, '')));	
				}
			});				
			item.prices = prices;
	
		}
		else {
			reject('Axsio:Err: HTTP request unsucessful');
		}
		
	}
	return Promise.resolve('Prices Loaded');
}

function loadFromStringToItemList (args = null , argc = null, file = 0) {
	return new Promise((resolve, reject) => {
		if(file === 0 && argc <= 0) reject('Err: Function needs arguments in parameter');
		function LoadClassToObjectList(data)
		{
			let model;
			let phone;
			let storage;
			let link;
			
			const lines = data.split(' ');
			for (const line of lines) {
				let parts = line.split('-');
				/* Data.txt file tags
					'd-' Device
					'm-' Model
					's-' Storage
					'l-' link
				*/
				if(line.includes('d-')) {
					phone = parts[1].trim();
					model = '';
				}
				if(line.includes('m-')) {
					model = parts[1].trim();
				}
				if(line.includes('s-')) {
					storage = parts[1].trim();
				}
				if(line.includes('l-')) {
					link = parts[1].trim();
					eItems.push(new eItem(phone + ' ' + model, storage, link));
				}	
			}
			resolve('Data successfully loaded to a class');
		}
		if(file != 0) {
			fs.readFile(file, 'utf8', function(err, data) {
				if (err) {
					console.log('Err: Error reading file.');
					reject(err);
				}
				
				// Create an object that contains 
				LoadClassToObjectList(data);
				
			});
		}
		console.log(args);
		if(argc > 0) LoadClassToObjectList(args); // load arguments to a list 
		
	});
}
/*
async function loadWscrapDefaultObjects () {
	const resolve1 = await loadObjectsToItemList(file);
	console.log(resolve1);
	const resolve2 = await LoadPrices();
	console.log(resolve2);

}
*/
// need to build function that sorts array*
const args = "load d-Lenovo m-T40 l-https://www.ebay.co.uk/sch/i.html?_nkw=Lenovo+t460&LH_Complete=1&LH_Sold=1&LH_BO=1&_salic=3&LH_LocatedIn=1";
const argc = args.length;
async function loadWscrapManualObjects(args, argc) {
	const resolve1 = await loadObjectsToItemList(args, argc);
	console.log(resolve1);
	const resolve2 = await LoadPrices();
	console.log(resolve2);
	
	
	console.log(eItems[0].model);
	console.log(eItems[0].avgPrice());
}


async function wscrap(args, argc) {
	const lines = args.split(' ');
	
	for(const line of lines) {
		
		switch(line) { 
			case 'load': // has to 
			
			case 'loadall': 
			
			case 'read': // read from server or file 
			
			case 'insert': // return changed data 
			
			case 'del': 
			
			case 'delall': 
			
			case 'modify': 
		}
	}
}

module.exports = {
	wscrap: wscrap,
	eItems: eItems
}

