'use strict';

// ***************************************************
// **************** SortingAlogrithmGraphTool ********
// ***************************************************
// Tool which allows user to sort data via a bar graph
// To Use:
// 1. randomizeData(); - initialize data
// 2. Select size, speed, and sort type
//		- these are tied directly to id #s
// 3. click sort to begin
// 4. click abort to stop current sort
const SortingAlgorithGraphTool = {	

// **** Global Variables to Object ****
	
dataSize : 10,  //stores # items to be sorted
intID : 0,			//keeps interval reference used to display
sortData : [[0,1,2,3,4]], //2D array. [0] - unsorted day
													//[0-length] - iteration data
													//[length] - sorted data

	// ************** TO-DO ***
	// ADD eventlisteners to update variables
	//*************************
	
	
// ************** randomizeData ********************	
// Resets and display the bar graph data
// data size is based on the myRange id#
randomizeData : function() {
	this.reset();
	this.sortData[0] = [];
	this.dataSize = document.querySelector("#myRange").value;
	
		//fill with ordered nums
	for(let i=0;i<this.dataSize;i++) {
		this.sortData[0][i]=i;
	}
		//shuffle
 	for(let i=0;i<this.dataSize;i++) {
		let swap1 = Math.floor((Math.random())*this.dataSize);
		let swap2 = Math.floor((Math.random())*this.dataSize);
		let temp= this.sortData[0][swap1];
		this.sortData[0][swap1]=this.sortData[0][swap2];
		this.sortData[0][swap2]=temp;
	}
	this.createGraph(this.sortData[0].slice());
},

// **************** runSort *****************
// Starts the sort animation based on selected sort id
// and speed
runSort : function() {
	let choice = document.querySelector("#sortSelector").value;
	switch(choice){
			case "selection":
				break;
			case "bubble":
				this.bubbleSort();
				break;
			default:	
	}
},


// **************** bubbleSort algoriothm
// sorts the unsortedData[0]
// adds all interation data to the array
// calls the update method to display bars

bubbleSort : function() {
	this.reset();
	let data = this.sortData[0].slice();
	let data2 = [[]];
	let row = 0;
	let temp =0;
	data2[row]=data.slice(); //initial value
	row++;
	
	//Sort
	for(let i= 0;i<data.length;i++){
		for(let j = 0 ;j<data.length-1-i;j++){
	
			if(data[j]>data[j+1]) { //swap
				temp = data[j];
				data[j]=data[j+1];
				data[j+1]=temp;				
			}
			data2[row]=data.slice();
			row++;
		}
	}

	this.updateScreen(data2);
},

// *********** resets the interval
// activated via the abort button

reset: function() {
		window.clearInterval(this.intID);

},

	
// ****************** updateScreen
// uses and interval to call the displayGraph function
// on each 1D array contained in the sortData
// interval time is based on myspeed id#
updateScreen : function(all2Data) {
	
		let r = 0;

		 this.intID = setInterval(() => { 

			this.createGraph(all2Data[r]);
			r++;
			if (r>=all2Data.length){
				window.clearInterval(this.intID);
			}
		},document.querySelector("#mySpeed").value);
													
},

// ******************** createGraph
// Generates a bar graph for a 1D array. Adds <rect> to the
// innerHTML of the svg id="bargraph"
// bars are scaled to the size of the SVG window
// colors are automatically generated

createGraph :function(graphData1) {
	let svgWidth=parseInt(document.querySelector("#bargraph").getAttribute("width"));
	let x_step = svgWidth/graphData1.length;
	let width = x_step/1.25;
	let y_scale = svgWidth/(graphData1.length+1);

	document.getElementById("bargraph").innerHTML="";
	let documentHolder = document.createDocumentFragment();
	let barSVG = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	let textSVG = document.createElementNS("http://www.w3.org/2000/svg", "text");

	for(let i=0;i<graphData1.length;i++) {
		
		barSVG = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		textSVG = document.createElementNS("http://www.w3.org/2000/svg", "text");
;
		barSVG.setAttributeNS(null,"x",x_step*i);
		barSVG.setAttributeNS(null,"y",(svgWidth-graphData1[i]*y_scale)-2);
		barSVG.setAttributeNS(null,"width",width);
		barSVG.setAttributeNS(null,"height",(graphData1[i]*y_scale)+2);
		barSVG.setAttributeNS(null,"fill","rgb(" + ((graphData1[i]*100)%255) +","+((graphData1[i]*200)%255)+","+((graphData1[i]*300)%255)+")");
		barSVG.setAttributeNS(null,"style","stroke-width:1;stroke:black");

		textSVG.setAttributeNS(null,"x",(x_step*i+2));
		textSVG.setAttributeNS(null,"y",(svgWidth-5));
		textSVG.setAttributeNS(null,"fill","orange");
		textSVG.setAttributeNS(null,"font-size",svgWidth/(graphData1.length*2)+"px");
		textSVG.textContent=graphData1[i];

		documentHolder.appendChild(barSVG);
		documentHolder.appendChild(textSVG);
	}
		
	document.getElementById("bargraph").appendChild(documentHolder);
}


}//end of object
