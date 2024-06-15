const course = {
    courseName: "object de-structuring",
    endDate: "04/05/2024"
}

// normal way of retreiving value:
console.log(course.courseName);

// de-Structure:
const { courseName: cName } = course
console.log(cName);

const navbar = ({ company }) => {

}

navbar(company = "Hitesh")

// API : the format of output of data that we get from an API is JSON FORMAT.
// this is nothing but object only , only difference is both the keys and values are in string format. numbers and booleans are not in string format.
//  JSON : JAVASCRIT OBJECT NOTATION
// {
//     "id":68446,
//      "bool":false,
//     "json" : "data",
//     "key" : "value",
//     "jai" : "shreeRam"
// }

function loginUserMessage(username) {
    return `${username} just logged in`
}

console.log(loginUserMessage("hitesh"));  //o/p: hitesh just logged in
console.log(loginUserMessage()); //o/p:undefined just logged in

// spread/rest operator 
function calculatPrice(...num1) {
    return num1;
}

console.log(calculatPrice(3544, 3, 354, 4, 353454, 2454));
// o/p:[3544, 3, 354, 4, 353454, 2454]

function calculatPrice(val1, val2, ...num1) {
    return num1;
}
// o/p:[354, 4, 353454, 2454]

// passing objects into function
const user = {
    username: "sanket",
    prices: 199
}

function handleObject(anyObject) {
    console.log(`Username is ${anyObject.username} and price is ${anyObject.prices}`);
}
handleObject(user);

// we can directly pass an object also 
handleObject({
    username: "sanket",
    prices: 199
})

// in same way we can pass array too
