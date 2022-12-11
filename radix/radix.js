function getMax(random)
{
	let max = random[0];
		for (let i = 1; i < random.length; i++)
			if (random[i] > max)
				max = random[i];
		return max;
}

function countSort(random, exp)
{
	let output = [], i, count = [];
    
    for(i = 0; i < 10; i++ )
        count[i] = 0;

    for (i = 0; i < random.length; i++)
        count[Math.floor(random[i] / exp) % 10]++;

    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];

    for (i = random.length - 1; i >= 0; i--) 
    {
        output[count[Math.floor(random[i] / exp) % 10] - 1] = random[i];
        count[Math.floor(random[i] / exp) % 10]--;
    }

    for (i = 0; i < random.length; i++)
    {
        random[i] = output[i];
    }
}

async function radixsort(ele)
{
    var random = [], i, exp;
    for(i = 0 ;i < ele.length ; i++)
    {
        random[i] = parseInt((ele[i].style.height).slice(0,(ele[i].style.height).length-2))/2;
    }
    console.log(random);

	let m = getMax(random);

    for (exp = 1; Math.floor(m / exp) > 0; exp *= 10)
        countSort(random, exp);

    for(i  = 0; i < ele.length; i++)
    {
        await waitforme(delay);
        ele[i].style.height = random[i]*2+"px";
        console.log((ele[i].style.height).slice(0,(ele[i].style.height).length-2)/2);
    }    
}

function getmax(arr,n)
{
    let mx = arr[0];
        for (let i = 1; i < n; i++)
            if (arr[i] > mx)
                mx = arr[i];
        return mx;
}
 
// A function to do counting sort of arr[] according to
    // the digit represented by exp.
function countsort(arr,n,exp)
{
    let output = new Array(n); // output array
        let i;
        let count = new Array(10);
        for(let i=0;i<10;i++)
            count[i]=0;
  
        // Store count of occurrences in count[]
        for (i = 0; i < n; i++)
            count[Math.floor(arr[i] / exp) % 10]++;
  
        // Change count[i] so that count[i] now contains
        // actual position of this digit in output[]
        for (i = 1; i < 10; i++)
            count[i] += count[i - 1];
  
        // Build the output array
        for (i = n - 1; i >= 0; i--) {
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
            count[Math.floor(arr[i] / exp) % 10]--;
        }
  
        // Copy the output array to arr[], so that arr[] now
        // contains sorted numbers according to current digit
        for (i = 0; i < n; i++)
            arr[i] = output[i];
}
 
// The main function to that sorts arr[] of size n using
    // Radix Sort
function radixSort(arr,n)
{
    // Find the maximum number to know number of digits
        let m = getmax(arr, n);
  
        // Do counting sort for every digit. Note that
        // instead of passing digit number, exp is passed.
        // exp is 10^i where i is current digit number
        for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
            countsort(arr, n, exp);
}

const radixbtn = document.querySelector(".radixSortbtn");
radixbtn.addEventListener('click', async function()
{
        let ele = document.querySelectorAll('.bar');
    var start = new Date().getTime();
    radixsort(ele,ele.length);
    var end = new Date().getTime();
	var tottime=end-start+1;
	document.getElementById('time').textContent="time taken:"+tottime+" S"

    disableSortingBtn();
    await radixsort(ele);
    for(let j = 0; j < ele.length; j++)
    {
        ele[j].style.background= 'green';
    }
    enableSortingBtn();
});