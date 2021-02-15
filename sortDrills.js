const { LinkedList, display } = require('./linkedList');

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    console.log(leftIndex, rightIndex);
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    } else {
      array[outputIndex++] = right[rightIndex++];
    }
  }
  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }
  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  console.log(j);
  return j;
}

// 1. Understanding merge sort
const nums = [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40];

// What is the resulting list that will be sorted after 3 recursive calls to mergesort?
//
//  [ 21, 1 ] [ 26, 45 ]
//
// What is the resulting list that will be sorted after 16 recursive calls to mergesort?
//
//  [ 1, 2, 9, 16, 21, 26, 27, 28, 29, 34, 39, 40, 43, 45, 46, 49 ]
//
// What are the first 2 lists to be merged?
//
//  [ 21, 1, 26, 45, 29, 28, 2, 9 ] [ 16, 49, 39, 27, 43, 34, 46, 40 ]
//
// Which two lists would be merged on the 7th merge?
//
//  [ 29 ] [ 28 ]
//

// 2. Understanding quicksort
//
// 1) Suppose you are debugging a quicksort implementation that is supposed to sort
// an array in ascending order. After the first partition step has been completed,
// the contents of the array is in the following order: 3 9 1 14 17 24 22 20.
// Which of the following statements is correct about the partition step?
// Explain your answer.
//
//  "The pivot could have been either 14 or 17"
//  Because of the right being greater than the left,
//  they were likely sorted based on that (left < right)
//
// 2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12
// show the resulting list after the second partitioning according to the quicksort
// algorithm.
//
//  When using the last item on the list as a pivot,
//  [3, 9, 10, 12, 14, 17, 13, 15, 19, 16]
//
//  When using the first item on the list as a pivot,
//  [10, 3, 9, 12, 13, 14, 17, 15, 19, 16]

const num = [
  89,
  30,
  25,
  32,
  72,
  70,
  51,
  42,
  25,
  24,
  53,
  55,
  78,
  50,
  13,
  40,
  48,
  32,
  26,
  2,
  14,
  33,
  45,
  72,
  56,
  44,
  21,
  88,
  27,
  68,
  15,
  62,
  93,
  98,
  73,
  28,
  16,
  46,
  87,
  28,
  65,
  38,
  67,
  16,
  85,
  63,
  23,
  69,
  64,
  91,
  9,
  70,
  81,
  27,
  97,
  82,
  6,
  88,
  3,
  7,
  46,
  13,
  11,
  64,
  76,
  31,
  26,
  38,
  28,
  13,
  17,
  69,
  90,
  1,
  6,
  7,
  64,
  43,
  9,
  73,
  80,
  98,
  46,
  27,
  22,
  87,
  49,
  83,
  6,
  39,
  42,
  51,
  54,
  84,
  34,
  53,
  78,
  40,
  14,
  5,
];

// 3. Implementing quicksort
function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
}

console.log(quickSort(num));

// 4. Implementing merge sort
function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);
  console.log(left, right);
  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right, array);
}

console.log(mergeSort(num));

// 5. Sorting a linked list using merge sort
function mergeSortList(list) {
  let currNode = list.head;
  if (currNode.next === null) {
    return list;
  }
  let length = 1;
  while (currNode.next !== null) {
    length++;
    currNode = currNode.next;
  }
  const middleI = Math.floor(length / 2);
  let leftList = splitList(list, 0, middleI);
  let rightList = splitList(list, middleI, length);
  leftList = mergeSortList(leftList);
  rightList = mergeSortList(rightList);
  return mergeLists(leftList, rightList);
}

function splitList(list, startI, endI) {
  let currNode = list.head;
  if (currNode === null) return;
  const returnList = new LinkedList();
  let i = 0;
  while (currNode !== null) {
    if (i >= startI && i < endI) {
      returnList.insertLast(currNode.value);
    }
    i++;
    currNode = currNode.next;
  }
  return returnList;
}

function mergeLists(leftList, rightList) {
  const mergedList = new LinkedList();
  let currLeft = leftList.head;
  let currRight = rightList.head;
  while (currLeft && currRight) {
    if (currLeft.value <= currRight.value) {
      mergedList.insertLast(currLeft.value);
      currLeft = currLeft.next;
    } else {
      mergedList.insertLast(currRight.value);
      currRight = currRight.next;
    }
  }
  while (currLeft) {
    mergedList.insertLast(currLeft.value);
    currLeft = currLeft.next;
  }
  while (currRight) {
    mergedList.insertLast(currRight.value);
    currRight = currRight.next;
  }
  return mergedList;
}

function mergeSortList_main() {
  const LL = new LinkedList();
  LL.insertFirst(5);
  LL.insertFirst(7);
  LL.insertFirst(3);
  LL.insertFirst(6);
  LL.insertFirst(8);
  LL.insertFirst(1);
  LL.insertFirst(2);
  LL.insertFirst(4);

  const sorted = mergeSortList(LL);
  display(sorted);
}

mergeSortList_main();

// 6. Bucket sort
function bucketSort(arr, min, max) {
  const numMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (numMap.get(arr[i]) === undefined) {
      numMap.set(arr[i], 1);
    } else {
      numMap.set(arr[i], numMap.get(arr[i]) + 1);
    }
  }
  let arrI = 0;
  for (let i = min; i <= max; i++) {
    let numAppearing = numMap.get(i);
    while (numAppearing) {
      arr[arrI] = i;
      numAppearing--;
      arrI++;
    }
  }
  return arr;
}

function bucketSort_main() {
  const ARR = [3, 7, 4, 9, 12, 5, 19, 4, 2, 9, 1, 5];
  const MAX = Math.max(...ARR);
  const MIN = Math.min(...ARR);
  bucketSort(ARR, MIN, MAX);
  console.log(ARR);
}

bucketSort_main();

// 7. Sort in place
function shuffle(array) {
  let ran = Math.floor(Math.random() * array.length);
  for (let i = 0; i < array.length - 1; i++) {
    swap(array, i, ran);
  }
  return array;
}

console.log(shuffle([4, 2, 1, 9, 5]));

// 8. Sorting books
const books = [
  'Book 05',
  'Book 07',
  'Book 12',
  'Book 16',
  'Book 17',
  'Book 18',
  'Book 19',
  'Book 20',
  'Book 08',
  'Book 09',
  'Book 10',
  'Book 11',
  'Book 01',
  'Book 06',
  'Book 02',
  'Book 03',
  'Book 13',
  'Book 14',
  'Book 15',
  'Book 04',
];

function charCompare(str1, str2, index = 0) {
  if (str1 === str2) {
    return true;
  }
  if (
    str1.toLowerCase().charCodeAt(index) < str2.toLowerCase().charCodeAt(index)
  ) {
    return true;
  } else if (
    str1.toLowerCase().charCodeAt(index) > str2.toLowerCase().charCodeAt(index)
  ) {
    return false;
  } else {
    return charCompare(str1, str2, index + 1);
  }
}

function bookSort(books) {
  if (books.length <= 1) return books;
  const mid = Math.floor(books.length / 2);
  let left = books.slice(0, mid);
  let right = books.slice(mid, books.length);
  left = bookSort(left);
  right = bookSort(right);
  let lIdx = 0;
  let rIdx = 0;
  let outIdx = 0;
  while (lIdx < left.length && rIdx < right.length) {
    if (charCompare(left[lIdx], right[rIdx])) books[outIdx++] = left[lIdx++];
    else books[outIdx++] = right[rIdx++];
  }
  for (let i = lIdx; i < left.length; i++) {
    books[outIdx++] = left[i];
  }
  for (let j = rIdx; j < right.length; j++) {
    books[outIdx++] = right[j];
  }
  return books;
}

console.log(bookSort(books));
