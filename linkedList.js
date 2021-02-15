class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

// for mergeSortList
class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let prevNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      prevNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    prevNode.next = currNode.next;
  }

  insertBefore(nextNode, item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let currNode = this.head;
      let prevNode = this.head;

      while (currNode !== null && currNode.value !== nextNode) {
        prevNode = currNode;
        currNode = currNode.next;
      }
      prevNode.next = new _Node(item, currNode);
    }
  }

  insertAfter(prevNode, item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let currNode = this.head;
      let prevNode = this.head;

      while (currNode !== null && currNode.value !== prevNode) {
        prevNode = currNode;
        currNode = currNode.next;
      }
      if (currNode !== null) {
        console.log('Item not found on list');
        return;
      }
      prevNode.next = new _Node(item, currNode);
    }
  }

  insertAt(index, item) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    let currNode = this.head;
    let prevNode = this.head;
    let i = 0;

    while (i !== index) {
      if (!currNode.next) {
        console.log(
          'This index does not exist use insertLast to add to the end of the list'
        );
        return;
      }
      prevNode = currNode;
      currNode = currNode.next;
      i++;
    }
    if (currNode === null) {
      console.log('Item not found on list (insertAt)');
      return;
    }

    let pushedItem = prevNode;
    let newItem = new _Node(item, prevNode.next);
    pushedItem.next = newItem;
  }
}

function main() {
  let SLL = new LinkedList();
  SLL.insertLast('Apollo');
  SLL.insertLast('Boomer');
  SLL.insertLast('Helo');
  SLL.insertLast('Husker');
  SLL.insertLast('Starbuck');
  SLL.insertLast('Tauhida');
  SLL.remove('Husker');
  SLL.insertBefore('Boomer', 'Athena');
  SLL.insertAfter('Helo', 'Hotdog');
  SLL.insertAt(3, 'Kat');
  SLL.remove('Tauhida');
}

main();

function display(linkedList) {
  let tempNode = linkedList.head;
  while (tempNode !== null) {
    console.log(tempNode);
    tempNode = tempNode.next;
  }
}

function size(list) {
  let currNode = list.head;
  let i = 0;
  while (currNode.next !== null) {
    currNode = currNode.next;
    i++;
  }
  return i;
}

function isEmpty(list) {
  return list.head ? false : true;
}

function findPrevious(item, linkedList) {
  let tempNode = linkedList.head;
  if (tempNode.value === item) {
    console.log('Previous Node: Null');
  }
  while (tempNode.next !== null) {
    if (tempNode.next.value === item) {
      console.log('Previous Node: ', tempNode);
    }
    tempNode = tempNode.next;
  }
}

function findLast(linkedList) {
  let tempNode = linkedList.head;
  if (tempNode === null) {
    console.log('Empty List');
  }
  while (tempNode.next !== null) {
    tempNode = tempNode.next;
  }
  console.log(`Last Item: ${tempNode.value}`);
}

function WhatDoesThisProgramDo(lst) {
  let current = lst.head;
  while (current !== null) {
    let newNode = current;
    while (newNode.next !== null) {
      if (newNode.next.value === current.value) {
        newNode.next = newNode.next.next;
      } else {
        newNode = newNode.next;
      }
    }
    current = current.next;
  }
}

function reverse(list) {
  if (!list.head || list.head === null) {
    return null;
  }
  let currNode = list.head;
  let previousNode = null;
  let temp = currNode;
  while (currNode !== null) {
    temp = currNode.next;
    currNode.next = previousNode;
    previousNode = currNode;
    currNode = temp;
  }
  list.head = previousNode;
  return display(list);
}

function thirdLast(list) {
  let index = 0;
  let bounds = size(list);
  let currNode = list.head;
  while (currNode !== null && index !== bounds - 2) {
    currNode = currNode.next;
    index++;
  }
  return currNode;
}

function middleList(list) {
  let index = 0;
  let bounds = size(list);
  let currNode = list.head;
  while (currNode !== null && index !== Math.floor(bounds / 2)) {
    currNode = currNode.next;
    index++;
  }
  return currNode;
}

const CycleList = new LinkedList();
CycleList.insertLast('A');
CycleList.insertLast('B');
CycleList.insertLast('C');
CycleList.insertLast('D');

function cycles(list) {
  if (!list.head || list.head === null) {
    return null;
  }
  let currNode = list.head;
  let tempNode = null;
  while (currNode !== null && currNode.next !== null) {
    tempNode = currNode.next;
    while (tempNode !== null) {
      if (currNode.value === tempNode.value) {
        return 'Cycle in the list';
      }
      tempNode = tempNode.next;
    }
    currNode = currNode.next;
  }
  return 'No Cycle in the list';
}

console.log(cycles(CycleList));

function sortList(list) {
  let currentNode = list.head;
  let storeNode;
  let shouldSort = true;

  while (shouldSort) {
    shouldSort = false;

    while (currentNode.next !== null) {
      if (currentNode.value > currentNode.next.value) {
        storeNode = currentNode.value;
        currentNode.value = currentNode.next.value;
        currentNode.next.value = storeNode;
        shouldSort = true;
      }
      currentNode = currentNode.next;
    }
    if (!currentNode.next) {
      currentNode = list.head;
    }
  }
}

const toBeSorted = new LinkedList();
toBeSorted.insertLast(3);
toBeSorted.insertLast(2);
toBeSorted.insertLast(1);
toBeSorted.insertLast(4);

sortList(toBeSorted);
display(toBeSorted);

module.exports = { LinkedList, display };
