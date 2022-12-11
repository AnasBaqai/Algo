const K = 2;

var arr= [90,65,60,50];


 quicksort=(arr, p, r)=>{
    if (p < r - 1) {
        var q = partition(arr, p, r);
        
        quicksort(arr, p, q);
        quicksort(arr, q + 1, r);
    }
}

 modifed_quicksort=(arr, p, r)=> 
{
    limited_quicksort(arr, p, r, K);
    insertion(arr, p, r);
}

 limited_quicksort=(arr, p, r, treshold)=> 
{
    if (r - p > treshold) {
        var q = partition(arr, p, r); 
        limited_quicksort(arr, p, q, treshold); 
        limited_quicksort(arr, q + 1, r, treshold);
    }
}
partition=(arr,  p, r) =>
{ 
    var x, i, j, tmp;

    x = arr[r - 1];
    i = p;

    for (j = p; j < r - 1; j++) {
        if (arr[j] <= x) {
            tmp = arr[i]; arr[i] = arr[j];
            arr[j] = tmp; i;
        }
    }

    tmp = arr[i]; arr[i] = arr[r - 1];
    arr[r - 1] = tmp;

    return i;
}

//  insertion_sort=(arr,  p,  r)=> 
// {
 
// var i, j, key;

//     for (j = p + 1; j < r; j++) {
//         key = arr[j];
//         for (i = j - 1; i >= p &&  arr[i] > key; i-- ) {
//             arr[i + 1] = arr[i];
//         }
//         arr[i + 1] = key;
//     }
// }

async function insertion(){
    console.log('In insertion()');
    const ele = document.querySelectorAll(".bar");
    // color
    ele[0].style.background = 'green';
    for(let i = 1; i < ele.length; i++){
        console.log('In ith loop');
        let j = i - 1;
        let key = ele[i].style.height;
        // color
        ele[i].style.background = 'blue';

        await waitforme(delay);

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){
            console.log('In while loop');
            // color
            ele[j].style.background = 'blue';
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await waitforme(delay);

            // color
            for(let k = i; k >= 0; k--){
                ele[k].style.background = 'green';
            }
        }
        ele[j + 1].style.height = key;
        // color
        ele[i].style.background = 'green';
    }
}

// quicksort(arr,0,arr.length);
const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = ele.length - 1;
    
    modifed_quicksort(ele,l,r);
  
   
   
   
});
