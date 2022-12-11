var container = document.getElementById("array");
let upload = document.getElementById('upload');
let btn=  document.querySelector(".radixSortbtn");
let arr=[];
function fileupload()
{
    // let upload = document.getElementById('upload');
    
   
    let arrfile;
	let fr = new FileReader();
    fr.onload = function()
    {
        arrfile = JSON.parse(fr.result);
        arr = arrfile.split(",");
        console.log(arr);
    };
    fr.readAsText(upload.files[0]);
}
// const newfile = document.querySelector(".upload");
upload.addEventListener("change",function(){

    fileupload();
})
// Function to generate the array of blocks
function generatearray() {
for (var i = 0; i < 20; i++) {
	// Return a value from 1 to 100 (both inclusive)
	var value = arr[i];

	// Creating element div
	var array_ele = document.createElement("div");

	// Adding class 'block' to div
	array_ele.classList.add("block");

	// Adding style to div
	array_ele.style.height = `${value * 13}px`;
	array_ele.style.transform = `translate(${i * 30}px)`;

	// Creating label element for displaying
	// size of particular block
	var array_ele_label = document.createElement("label");
	array_ele_label.classList.add("block_id");
	array_ele_label.innerText = value;

	// Appending created elements to index.html
	array_ele.appendChild(array_ele_label);
	container.appendChild(array_ele);
}
}

// Function to generate the frequency array
var count_container = document.getElementById("count");
function generate_freq() {
for (var i = 0; i < 20; i++) {
	// Creating element div
	var array_ele2 = document.createElement("div");

	// Adding class 'block2' to div
	array_ele2.classList.add("block2");

	// Adding style to div
	array_ele2.style.height = `${20}px`;
	array_ele2.style.transform = `translate(${i * 30}px)`;

	// index of freq array
	var array_ele_idx = document.createElement("label");
	array_ele_idx.classList.add("block_id2");
	array_ele_idx.innerText = i + 1;

	//giving initial freq to all blocks as 0
	var array_ele_label2 = document.createElement("label");
	array_ele_label2.classList.add("block_id3");
	array_ele_label2.innerText = 0;

	// Appending created elements to index.html
	array_ele2.appendChild(array_ele_label2);
	array_ele2.appendChild(array_ele_idx);
	count_container.appendChild(array_ele2);
}
}

// Asynchronous CountingSort function
async function CountingSort(delay = 250) {
var blocks = document.querySelectorAll(".block");

// To store frequency of every block
for (var i = 0; i < blocks.length; i += 1) {
	//To highlight the current traversed block
	blocks[i].style.backgroundColor = "#FF4949";

	//Extracting the value of current block
	var value = Number(blocks[i].childNodes[0].innerHTML);

	var freq_array = document.getElementsByClassName("block_id3");

	freq_array[value - 1].innerText++;

	// To wait for .1 sec
	await new Promise((resolve) =>
	setTimeout(() => {
		resolve();
	}, delay)
	);

	//Changing to previous color
	blocks[i].style.backgroundColor = "##fc032c";
}

//Sorting by using frequency array
var idx = 0;
for (var i = 0; i < blocks.length; i += 1) {
	var freq = document.getElementsByClassName("block_id3");

	var temp = Number(freq[i].innerText);

	var freq_block = document.getElementsByClassName("block2");

	//changing color of freq block
	freq_block[i].style.backgroundColor = "#FF4949";

	// To wait for .1 sec
	await new Promise((resolve) =>
	setTimeout(() => {
		resolve();
	}, 2 * delay)
	);

	if (temp == 0) {
	//changing color of freq block to previous one
	freq_block[i].style.backgroundColor = "darkgray";
	continue;
	}

	var block_label = document.getElementsByClassName("block_id");

	//sorting the block array
	for (var j = 0; j < temp; j++) {
	blocks[idx].style.height = `${(i + 1) * 13}px`;
	block_label[idx].innerText = i + 1;
	idx++;
	}

	//changing color of freq block to previous one
	freq_block[i].style.backgroundColor = "darkgray";

	// To wait for .1 sec
	await new Promise((resolve) =>
	setTimeout(() => {
		resolve();
	}, 2 * delay)
	);
}
}

const countSort = (inputArr, n = inputArr.length) => {
	var start = new Date().getTime();
	let k = Math.max(...inputArr);
	let t;
	//Create a temporary with 0 zero value 
	//as the same length of max elemet + 1
	const temp = new Array(k + 1).fill(0);
	const count = new Array(k + 1).fill(0);
	
	//Count the frequency of each element in the original array
	//And store it in temp array
	for(let i = 0; i < n; i++){
	  t = inputArr[i];
	  temp[t]++;
	  count[t]++;
	}
	
	console.log(count);
  
	//Update the count based on the previous index
	for(let i = 1; i <= k; i++){
	  // Updating elements of count array 
	  temp[i] = temp[i] + temp[i - 1];  
	}

	//Output arr
	const outputArr = new Array(n).fill(0);
	
	for(let i = n - 1; i >= 0; i--) {
	  // Add elements of array A to array B
	  t = inputArr[i];
	  outputArr[temp[t] - 1] = t;  
		  
	  // Decrement the count value by 1
	  temp[t] = temp[t] - 1;		
	 }
	var end = new Date().getTime();
	var tottime=end-start+1;
	document.getElementById('time').textContent="time taken:"+tottime+" S"
	console.log(tottime)
	return outputArr;
  }

btn.addEventListener('click', async function()
{
	countSort(arr);
	// Calling generatearray function
generatearray();

// Calling generate_freq function
generate_freq();

// Calling CountingSort function
CountingSort();


});




