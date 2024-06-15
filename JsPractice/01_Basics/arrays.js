// shallow copy: a shallow copy of an object is a copy whose properties sahre the same references
// deep copy: a depp copy of an object is a copy whose properties do not share the same refernces(point to the same underlying values)

const arr = [1221, "awdskdjn", {}]

const arr1 = ["adkjkan", "awkdjnaw"]

const newArr = new Array(1, "efad", {}, '');
//  .join() method converts an array to string 


/**
 *  difference between slice() and splice()
 *  let originalArray = [0,1,2,3,4,5]
 *  
 *  let sliceArray = originalArray.slice(1,3)
 *  o/p: [1,2]
 *  console.log(originalArray) o/p:0,1,2,3,4,5
 * 
 * let spliceArray =  originalArray.splice(1,3)
 * o/p:[1,2,3]
 * TRICKY PART: console.log(originalArray) o/p:[0,4,5]
 * 
*/ 

// ARRAY METHODS:
/**
 * arr1 = [1,2,3]
 * arr2 = [4,5,6]
 * arr1.push(arr2) o/p:[1,2,3,[4,5,6]]
 * 
 * newArr = arr1.concat(arr2)
 * console.log(newArr) o/p:[1,2,3,4,5,6]
 */