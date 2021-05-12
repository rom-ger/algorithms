// merge :: (Array arr, Number lf, Number mid, Number rg) -> Array 
// merge_sort :: (Array arr, Number lf, Number rg) -> void

function merge(arr, lf, mid, rg) {
    let result = new Array(rg - lf);
    let l = lf;
    let r = mid;
    let k = 0;
    while(l < mid && r < rg) {
        if (arr[l] <= arr[r]) {
            result[k] = arr[l];
            l++;
        } else {
            result[k] = arr[r];
            r++;
        }
        k++;
    }
    while (l < mid) {
        result[k] = arr[l];
        l++;
        k++;
    }
    while (r < rg) {
        result[k] = arr[r];
        r++;
        k++;
    }
    return result;
}

function merge_sort(arr, lf, rg) {
    if (rg - lf === 1) {
        return {lf, rg};
    }
    if (lf < 0) {
        lf = 0;
    }
    if (rg > arr.length) {
        rg = arr.length;
    }
    let mid = Math.floor((lf + rg) / 2);
    let left = merge_sort(arr, lf, mid);
    let right = merge_sort(arr, mid, rg);
    let result = merge(arr, left.lf, left.rg, right.rg);
    result.forEach((el, index) => {
        arr[left.lf + index] = el;
    });
    return {lf: left.lf, rg: right.rg};
}
// let arr = [4, 5, 3, 0, 1, 2];
// let result = merge_sort(arr, 3, 7);
// console.log(result, arr);