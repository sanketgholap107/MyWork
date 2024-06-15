// Primitive :Primitive Datatypes are Call by value
// 7 types : String , Number, Boolean, null, undefined, Symbol(to make something unique), BigInt


// Javascript is Dynamically typed language because we dont need to declare a datatype

// Non Primitive: these are also known as REFERENCE datatypes

// array , objects , functions
// mostly return type of non primitive datatype is OBJECT only.
// for function it Function only but it is called as OBJECT FUNCTION
const id = Symbol('123')
const anotherId = Symbol('123')

console.log(id === anotherId); //answer is false

const heros = ["asdasdasd", 61351, true];

let myObj = {
    name: "hitesh",
    age: 22
}

const myFunction = function () {
    console.log("hello world!");
}

// stack memory (Primitve): whatever changes we make it modifies copied variable.
// Heap memory (Non primitive) : whatever changes we make , it midfies the original value.


