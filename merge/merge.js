// Canvas variables
var canvas, canvaswidth, canvasheight, ctrl;

// Call canvasElements() to store height width
// in above canvas variables
canvasElements();

// 3 array are declared

//1) arr is for storing array element
//2) itmd for storing intermediate values
//3) visited is for element which has been sorted
var arr = [], itmd = [], visited = []


// Length of unsorted array
var len_of_arr = 20;

// Store random value in arr[]
// for (var i = 0; i < len_of_arr; i++) {
// 	arr.push(Math.round(Math.random() * 250) )
// }
let upload = document.getElementById('upload');
let btn=  document.querySelector(".radixSortbtn");
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

// Initialize itmd and visited array with 0
for (var i = 0; i < len_of_arr; i++) {
	itmd.push(0)
	visited.push(0)
}

// Merging of two sub array
// https://www.geeksforgeeks.org/merge-two-sorted-arrays/
function mergeArray(start, end) {
	let mid = parseInt((start + end) >> 1);
	let start1 = start, start2 = mid + 1
	let end1 = mid, end2 = end
	
	// Initial index of merged subarray
	let index = start

	while (start1 <= end1 && start2 <= end2) {
		if (arr[start1] <= arr[start2]) {
			itmd[index] = arr[start1]
			index = index + 1
			start1 = start1 + 1;
		}
		else if(arr[start1] > arr[start2]) {
			itmd[index] = arr[start2]
			index = index + 1
			start2 = start2 + 1;
		}
	}

	// Copy the remaining elements of
	// arr[], if there are any
	while (start1 <= end1) {
		itmd[index] = arr[start1]
		index = index + 1
		start1 = start1 + 1;
	}

	while (start2 <= end2) {
		itmd[index] = arr[start2]
		index = index + 1
		start2 = start2 + 1;
	}

	index = start
	while (index <= end) {
		arr[index] = itmd[index];
		index++;
	}
}

// Function for showing visualization
// effect
function drawBars(start, end) {

	// Clear previous unsorted bars
	ctrl.clearRect(0, 0, 1000, 1500)

	// Styling of bars
	for (let i = 0; i < len_of_arr; i++) {

		// Changing styles of bars
		ctrl.fillStyle = "black"
		ctrl.shadowOffsetX = 2
		ctrl.shadowColor = "chocolate";
		ctrl.shadowBlur = 3;
		ctrl.shadowOffsetY =5;
		
		
		// Size of rectangle of bars
		ctrl.fillRect(25 * i, 300 - arr[i], 20, arr[i])
		
		if (visited[i]) {
			ctrl.fillStyle = "#006d13"
			ctrl.fillRect(25 * i, 300 - arr[i], 20, arr[i])
			ctrl.shadowOffsetX = 2
		}
	}

	for (let i = start; i <= end; i++) {
		ctrl.fillStyle = "orange"
		ctrl.fillRect(25 * i, 300 - arr[i], 18, arr[i])
		ctrl.fillStyle = "#cdff6c"
		ctrl.fillRect(25 * i,300, 18, arr[i])
		visited[i] = 1
	}
}

// Waiting interval between two bars
function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


// Merge Sorting
const mergeSort = async (start, end) => {
	if (start < end) {
		let mid = parseInt((start + end) >> 1)
		await mergeSort(start, mid)
		await mergeSort(mid + 1, end)
		await mergeArray(start, end)
		await drawBars(start, end)

		// Waiting time is 800ms
		await timeout(800)
	}
}

// canvasElements function for storing
// width and height in canvas variable
function canvasElements() {
	canvas = document.getElementById("Canvas")
	canvas.width = canvas.height = 1000
	canvaswidth = canvas.width
	canvasheight = canvas.height
	ctrl = canvas.getContext("2d")
}

// Asynchronous MergeSort function
const performer = async () => {
	await mergeSort(0, len_of_arr - 1)
	await drawBars()

	// Code for change title1 text
	const title1_changer = document.querySelector(".title1")
	title1_changer.innerText = "Array is completely sorted"
	console.log(arr);
}

function merge(arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
 
    // Create temp arrays
    var L = new Array(n1);
    var R = new Array(n2);
 
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
 
    // Merge the temp arrays back into arr[l..r]
 
    // Initial index of first subarray
    var i = 0;
 
    // Initial index of second subarray
    var j = 0;
 
    // Initial index of merged subarray
    var k = l;
 
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
 
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
 
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
 
// l is for left index and r is
// right index of the sub-array
// of arr to be sorted */
function mergesort(arr,l, r){

    if(l>=r){
	
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    mergesort(arr,l,m);
    mergesort(arr,m+1,r);
    merge(arr,l,m,r);

}
 

btn.addEventListener('click', async function()
{
	var start = new Date().getTime();
	mergesort(arr,0,arr.length-1)
	var end = new Date().getTime();
	var tottime=end-start+1;
	document.getElementById('time').textContent="time taken:"+tottime+" S"
	performer();
});





