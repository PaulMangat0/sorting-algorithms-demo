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
	// draw rect and just change attributes
	// assign name = index ?
	// ADD eventlisteners to update variables
	// bubbleSort should return 2D array?
	// FIX DOM Manipulation
	// .createElement(), appendChild(), append(),  removeChild()
	// OR backtick syntax ?
	//https://wesbos.com/javascript/04-the-dom/html-from-strings-and-xss
	// use query selector
	//*************************
	
	
// ************** randomizeData ********************	
// Resets and display the bar graph data
// data size is based on the myRange id#
randomizeData : function() {
this.reset();
this.sortData[0] = [];

//this.dataSize = (document.getElementById("size").value);
	this.dataSize = (document.getElementById("myRange").value);
	
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
	this.generateSVGBar(this.sortData[0].slice());
},

// **************** runSort *****************
// Starts the sort animation based on selected sort id
// and speed
runSort : function() {
	let choice = document.getElementById("sortSelector").value;
	//console.log(typeof(choice));
	switch(choice){
			case "selection":
				break;
			case "bubble":
				//console.log("bubble Sort Now");
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
//vars x4
let data = this.sortData[0].slice();//SortStats.unsortedData;
let data2 = [[]];
let row = 0;
let temp =0;
data2[row]=data.slice(); //initial value
row++;
	
	//Sort
	for(let i= 0;i<data.length;i++){
		//console.log("outloop i-"+i);
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
// *********** displayData
// used for debugging
displayData : function(adata) {
	for(let count = 0;count<adata.length;count++){
		console.log(adata[count]);
	}
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
		//console.log(all2Data);
	
		 this.intID = setInterval(() => { 
				//document.getElementById("sortDemo").innerHTML=all2Data[r];
			//temp
			this.generateSVGBar(all2Data[r]);
			//temp
				r++;
				if (r>=all2Data.length){
					window.clearInterval(this.intID);
				}
			},document.getElementById("mySpeed").value);
															//500);
},

// ******************** generateSVGbar
// Generates a bar graph for a 1D array. Adds <rect> to the
// innerHTML of the svg id="bargraph"
// bars are scaled to the size of the SVG window
// colors are automatically generated
generateSVGBar : function(graphData) {
  let svgWidth=parseInt(document.getElementById("bargraph").getAttribute("width"));
	//console.log(svgWidth);
	let x_step = svgWidth/graphData.length;
	let width = (x_step/1.25);
	let y_scale = svgWidth/(graphData.length+1);
	let rectHTML ="";
	
	/* Just change attribute values after creation ? 
				build an array? use child shit. */
	for(let i =0;i<graphData.length;i++) {
		//BAR
		rectHTML+="<rect y =\"" +((svgWidth-graphData[i]*y_scale)-2) + "\" x=\"" + x_step*i + "\" width=\"" + width + "\"  height=\"" + ((graphData[i]*y_scale)+2) + "\" fill=\"rgb(" +((graphData[i]*100)%255) +","+((graphData[i]*200)%255)+","+((graphData[i]*300)%255)+"\" style=\"stroke-width:1;stroke:black\")/>";
		//TEXT
 		rectHTML+="<text  x=\"" + (x_step*i+2) + "\" y =\"" +(svgWidth-5) + "\" fill=\"orange\" font-size=\""+svgWidth/(graphData.length*2)+"px\" >" +graphData[i]+ "</text>";
		document.getElementById("bargraph").innerHTML = rectHTML;
	}
}

}//end of object

/*
<g transform="translate(525,78.19999694824219)"><rect height="151.8" width="45" style="fill: rgb(173, 216, 230);"></rect><text dy=".35em" x="22.5" y="136.8">33</text></g>
*/

