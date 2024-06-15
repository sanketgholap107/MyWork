let a = 100;
const b = 200;
var c = 300;

if (true) {
    let a = 10;
    const b = 20;
    var c = 30;
    console.log("Inner 'a':", a);
}

console.log(a);  //100
console.log(b);  //200   
console.log(c);  //30   


// Hoisting

console.log(addOne(5)); //this will not throw an error. o/p:6
function addOne(num) {
    return num + 1;
}


console.log(addTwo(5));   // this will throw an error Bcoz function is stored inside a variable.
const addTwo = function (num) {
    return num + 2;
}
