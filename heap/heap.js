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
	array_ele.style.height = `${value * 3}px`;
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

// Function to generate the indexes
var count_container = document.getElementById("count");
function generate_idx() {
for (var i = 0; i < 20; i++) {

	// Creating element div
	var array_ele2 = document.createElement("div");

	// Adding class 'block2' to div
	array_ele2.classList.add("block2");

	// Adding style to div
	array_ele2.style.height = `${20}px`;
	array_ele2.style.transform = `translate(${i * 30}px)`;

	// Giving indexes
	var array_ele_label2 = document.createElement("label");
	array_ele_label2.classList.add("block_id3");
	array_ele_label2.innerText = i;

	// Appending created elements to index.html
	array_ele2.appendChild(array_ele_label2);
	count_container.appendChild(array_ele2);
}
}

// Asynchronous Heapify function
async function Heapify(n, i) {
var blocks = document.querySelectorAll(".block");
var largest = i; // Initialize largest as root
var l = 2 * i + 1; // left = 2*i + 1
var r = 2 * i + 2; // right = 2*i + 2

// If left child is larger than root
if (
	l < n &&
	Number(blocks[l].childNodes[0].innerHTML) >
	Number(blocks[largest].childNodes[0].innerHTML)
)
	largest = l;

// If right child is larger than largest so far
if (
	r < n &&
	Number(blocks[r].childNodes[0].innerHTML) >
	Number(blocks[largest].childNodes[0].innerHTML)
)
	largest = r;

// If largest is not root
if (largest != i) {
	var temp1 = blocks[i].style.height;
	var temp2 = blocks[i].childNodes[0].innerText;
	blocks[i].style.height = blocks[largest].style.height;
	blocks[largest].style.height = temp1;
	blocks[i].childNodes[0].innerText =
	blocks[largest].childNodes[0].innerText;
	blocks[largest].childNodes[0].innerText = temp2;

	await new Promise((resolve) =>
	setTimeout(() => {
		resolve();
	}, 250)
	);

	// Recursively Hapify the affected sub-tree
	await Heapify(n, largest);
}
}

// Asynchronous HeapSort function
async function HeapSort(n) {
var blocks = document.querySelectorAll(".block");

// Build heap (rearrange array)
for (var i = n / 2 - 1; i >= 0; i--) {
	await Heapify(n, i);
}

// One by one extract an element from heap
for (var i = n - 1; i > 0; i--) {

	// Move current root to end
	var temp1 = blocks[i].style.height;
	var temp2 = blocks[i].childNodes[0].innerText;
	blocks[i].style.height = blocks[0].style.height;
	blocks[0].style.height = temp1;
	blocks[i].childNodes[0].innerText =
	blocks[0].childNodes[0].innerText;
	blocks[0].childNodes[0].innerText = temp2;

	await new Promise((resolve) =>
	setTimeout(() => {
		resolve();
	}, 250)
	);

	// Call max Heapify on the reduced heap
	await Heapify(i, 0);
}
}
function sort( arr)
{
	var N = arr.length;

	// Build heap (rearrange array)
	for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
		heapify(arr, N, i);

	// One by one extract an element from heap
	for (var i = N - 1; i > 0; i--) {
		// Move current root to end
		var temp = arr[0];
		arr[0] = arr[i];
		arr[i] = temp;

		// call max heapify on the reduced heap
		heapify(arr, i, 0);
	}
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(arr, N, i)
{
	var start = new Date().getTime();
	var largest = i; // Initialize largest as root
	var l = 2 * i + 1; // left = 2*i + 1
	var r = 2 * i + 2; // right = 2*i + 2

	// If left child is larger than root
	if (l < N && arr[l] > arr[largest])
		largest = l;

	// If right child is larger than largest so far
	if (r < N && arr[r] > arr[largest])
		largest = r;

	// If largest is not root
	if (largest != i) {
		var swap = arr[i];
		arr[i] = arr[largest];
		arr[largest] = swap;

		// Recursively heapify the affected sub-tree
		heapify(arr, N, largest);
	}
	var end = new Date().getTime();
	var tottime=end-start+1;
	document.getElementById('time').textContent="time taken:"+tottime+" S"
}


btn.addEventListener('click', async function()
{
	sort(arr);
// Calling generatearray function
generatearray();

// Calling generate_idx function
generate_idx();

// Calling HeapSort function
HeapSort(20);


});



