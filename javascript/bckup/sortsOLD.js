'use strict';

/*
//Object to hold sort data
const SortStats = {	
	
	//dataSize : 10,
	unsortedData : [],
	sortedData : [[]],
	executiontime: 0,
	sortApplied : "none",
	
	randomizeData : function(dataSize=10) {
		//fill with ordered nums
		for(let i=0;i<this.dataSize;i++) {
			this.unsortedData[i]=i;
		}
		//shuffle
 		for(let i=0;i<this.dataSize;i++) {
			let swap1 = Math.floor((Math.random())*this.dataSize);
			let swap2 = Math.floor((Math.random())*this.dataSize);
			let temp= this.unsortedData[swap1];
			this.unsortedData[swap1]=this.unsortedData[swap2];
			this.unsortedData[swap2]=temp;
		}
	
		this.sortedData=[[]];
		this.executionTime=0;
		this.sortApplied = "none";
	}

}*/
/*
function sortData(sortType, dataSize) {
	SortStats.randomizeData(dataSize);
	console.log(SortStats.unsortedData);
	bubbleSort(SortStats.unsortedData, SortStats.sortedData);
}*/
// [0] = unsorted data
//[0..length] = iterations
// [length] =sorted data
let sortData = [[0,1,2,3,4]];
let dataSize = 10;

function randomizeData() {
	reset();
sortData[0] = [];
console.log(document.getElementById("size").value);
dataSize = (document.getElementById("size").value);
	
		//fill with ordered nums
		for(let i=0;i<dataSize;i++) {
			sortData[0][i]=i;
		}
		//shuffle
 		for(let i=0;i<dataSize;i++) {
			let swap1 = Math.floor((Math.random())*dataSize);
			let swap2 = Math.floor((Math.random())*dataSize);
			let temp= sortData[0][swap1];
			sortData[0][swap1]=sortData[0][swap2];
			sortData[0][swap2]=temp;
		}
	generateSVGBar(sortData[0].slice());
}



function bubbleSort() {
	reset();
	//SortStats.randomizeData();
	//console.log(data);
	
	
	//display unsorted data
	//displayData(data);
var data = sortData[0].slice();//SortStats.unsortedData;
var data2 = [[]];
var row = 0;
var temp =0;
data2[row]=data.slice(); //initial value
row++;
	
	//Sort
	for(let i= 0;i<data.length;i++){
		//console.log("outloop i-"+i);
		for(let j = 0 ;j<data.length-1-i;j++){

		//	data2[row]=data.slice();
		//	row++;
			
			if(data[j]>data[j+1]) { //swap
				temp = data[j];
				data[j]=data[j+1];
				data[j+1]=temp;				
			}
			//console.log("jdata["+j+"]: " + data[j] + " j+1data["+(j+1)+"]: "+data[j+1]);
			
			data2[row]=data.slice();
			row++;
			
			//data2.push("x");
		}
	}
	//displaysorted data
	//displayData(data2);
	updateScreen(data2);
}

function displayData(adata) {
	for(let count = 0;count<adata.length;count++){
		console.log(adata[count]);
	}
}
var intID = 0;

function reset() {
		window.clearInterval(intID);

}

function updateScreen(all2Data) {
	
		var r = 0;
		console.log(all2Data);
	
		 intID = setInterval(() => { 
				document.getElementById("sortDemo").innerHTML=all2Data[r];
			//temp
			generateSVGBar(all2Data[r]);
			//temp
				r++;
				if (r>=all2Data.length){
					window.clearInterval(intID);
				}
			},500);
}

function generateSVGBar(graphData) {
  let svgWidth=parseInt(document.getElementById("bargraph").getAttribute("width"));
	console.log(svgWidth);
	let x_step = svgWidth/graphData.length;
	let width = (x_step/1.25);
	let y_scale = svgWidth/(graphData.length+1);
	let rectHTML ="";
	
	for(let i =0;i<graphData.length;i++) {
		//BAR
		rectHTML+="<rect y =\"" +((svgWidth-graphData[i]*y_scale)-2) + "\" x=\"" + x_step*i + "\" width=\"" + width + "\"  height=\"" + ((graphData[i]*y_scale)+20) + "\" fill=\"rgb(" +((graphData[i]*y_scale)%255) +","+((graphData[i]*y_scale)%255)+","+((graphData[i]*y_scale))+"\")/>";
		//TEXT
 		rectHTML+="<text  x=\"" + (x_step*i+2) + "\" y =\"" +(svgWidth-5) + "\" fill=\"orange\" font-size=\""+svgWidth/(graphData.length*2)+"px\" >" +graphData[i]+ "</text>";
		document.getElementById("bargraph").innerHTML = rectHTML;
	}
}

/*
function bubbleCaller(data) {
	const x = bubbleTwo(data);
	
let count=0;
	//while(count<10) {
		//x(data);
		//displayData(data);
		
		//setTimeout(() => {  
	
		var intID = setInterval(() => {  
			count = x(data);
			console.log("count:"+count);
		  displayData(data);
			
			document.getElementById("sortDemo").innerHTML=data;
			
			if (count === 5) {
				window.clearInterval(intID);
			}
			
			}, 3000);

	
//setInterval(x(data), 3);
//setInterval(displayData(data), 4);

}



//Javascript Closure
function bubbleTwo(data) {
	
	//displayData(data);
	
	let i = -1;
	return function innerLoop(data) {
		i=i+1;
		let temp=0;
			for(let j = i+1 ;j<data.length;j++){
				if(data[i]>data[j]) { //swap
					temp = data[i];
					data[i]=data[j];
					data[j]=temp;
				}
			}
		console.log("interation: " + i);
		return i;
	}
	
	//	displayData(data);
	//	console.log("interation: " + iteration);
}

*/


/* BACKUP


'use strict';

function bubbleSort(data) {
	
	//display unsorted data
	//displayData(data);

var data2 = [];
var temp =0;
	//Sort
	for(let i= 0;i<data.length;i++){
		for(let j = i+1 ;j<data.length;j++){
			if(data[i]>data[j]) { //swap
				temp = data[i];
				data[i]=data[j];
				data[j]=temp;				
			}
			data2=data2.concat(data)
			data2.push("x");
		}
	}
	//displaysorted data
	displayData(data2);
	updateScreen(data2);
}

function displayData(adata) {
	for(let count = 0;count<adata.length;count++){
		console.log(adata[count]);
	}
}

function updateScreen(allData) {
	
		var c = 0;
		var intID = setInterval(() => { 
			document.getElementById("sortDemo").innerHTML=allData.slice(c,allData.indexOf("x",c+1));
			c=c+5;
			if(allData.indexOf("x",c+1)==-1) {
				window.clearInterval(intID);
			}
		
			},2000);

	
} */
