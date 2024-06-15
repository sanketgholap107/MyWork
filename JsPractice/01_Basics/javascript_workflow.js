
/**
 * Whenever Javascript runs , it firsts creates a global execution context
 * {} = this is nothing but global execution context
 * for web browser enviornment it creates a window{} object
 * It creates an empty object for node.js enviornment
 * 
 * there are 3 contexts available:
 * 1.global execution context
 * 2.function execution context
 * 3.Eval execution context
 * 
 * there are 2 phases while executng JS
 * 1. memory creation phase 
 * 2. execution phase

 */

// for each loop does not return any of the values 
// it outputs as undefiined.
// const coding = ["js", "ruby", "java", "python", "cpp"]

// const values = coding.forEach((item) => {
//     return item;
// })

// console.log(values);

/**
 * FILTER : function takes a callback funciton and returns a value. 
 * we need to add condition while returning using filter.
 */
// const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const newNums = myNums.filter((num) => num > 4)
// console.log(newNums);  //o/p: this will output [5,6,7,8,9,10]

// const newNums = []

// myNums.forEach((num) => {
//     if (num > 4) {
//         newNums.push(num)
//     }
// });
// console.log(newNums);

const myNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

/**
 * MAP :function takes a callback funciton and returns a value. 
 * we dont need to add condition while returning using MAP.
 */
// const newNums = myNumbers.map((num) => { return num + 10 })
// console.log(newNums);

//CHAINING:
const newNums = myNumbers
    .map((num) => num * 10)
    .map((num) => num + 1)
    .filter((num) => num >= 40)
// console.log(newNums);

/**
 * REDUCE method:
 * const array1 = [1,2,3,4];
 * 
 * const initialValue = 0;
 * const sumWithInitial = array1.reduce(
 *      (accumulator,currentValue) => accumulator + currentValue,
 *       initialValue   
 * );
 * 
 * console.log(sumWithInitial);
 */

const myNums = [1, 2, 3]
// Normal way:
// const myTotal = myNums.reduce(function (acc, currval) {
//     console.log(`acc:${acc} and currval:${currval}`);
//     return acc + currval;
// }, 0)

// Another way:
const myTotal = myNums.reduce((acc, currval) => acc + currval, 0)

console.log(myTotal);

