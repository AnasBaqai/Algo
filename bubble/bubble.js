
var container = document.getElementById("array");

let upload = document.getElementById('upload');
let btn = document.querySelector(".radixSortbtn");
let arr = [];
let newarray=[];
function fileupload() {
    // let upload = document.getElementById('upload');


    let arrfile;
    let fr = new FileReader();
    fr.onload = function () {
        arrfile = JSON.parse(fr.result);
        arr = arrfile.split(",");
        newarray=arrfile.split(",");
        console.log(arr);
    };
    fr.readAsText(upload.files[0]);
}
// const newfile = document.querySelector(".upload");
upload.addEventListener("change", function () {

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

// Promise to swap two blocks
function swap(el1, el2) {
    return new Promise((resolve) => {

        // For exchanging styles of two blocks
        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(function () {

            // For waiting for .25 sec
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}

// Asynchronous BubbleSort function
async function BubbleSort(delay = 100) {
    var blocks = document.querySelectorAll(".block");

    // BubbleSort Algorithm
    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {

            // To change background-color of the
            // blocks to be compared
            blocks[j].style.backgroundColor = "#FF4949";
            blocks[j + 1].style.backgroundColor = "#FF4949";

            // To wait for .1 sec
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            console.log("run");
            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1]
                .childNodes[0].innerHTML);

            // To compare value of two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1]);
                blocks = document.querySelectorAll(".block");
            }

            // Changing the color to the previous one
            blocks[j].style.backgroundColor = "#fc032c";
            blocks[j + 1].style.backgroundColor = "#fc032c";
        }

        //changing the color of greatest element 
        //found in the above traversal
        blocks[blocks.length - i - 1]
            .style.backgroundColor = "#13CE66";
    }
}
 
function bblSort(arr){
    var start = new Date().getTime();
  
    for(var i = 0; i < arr.length; i++){
       
      // Last i elements are already in place 
      for(var j = 0; j < ( arr.length - i -1 ); j++){
         
        // Checking if the item at present iteration
        // is greater than the next iteration
        if(arr[j] > arr[j+1]){
           
          // If the condition is true then swap them
          var temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j+1] = temp
        }
      }
    }
    var end = new Date().getTime();
	var tottime=end-start+1;
	document.getElementById('time').textContent="time taken:"+tottime+" S"
    // Print the sorted array
    console.log(arr);
   }

btn.addEventListener('click', async function () {

    
    bblSort(newarray);
    // Calling generatearray function
    generatearray();

    // Calling BubbleSort function
    BubbleSort();

});

