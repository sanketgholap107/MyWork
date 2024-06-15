// object literals
// normal way of creating object , this does not create a singleton.
const jsUser = {
    name: "sanket",
    age: 21,
    "location": "pune"
}

console.log(Object.keys(jsUser)) //this will output the "ARRAY" of keys.
console.log(jsUser.name);
console.log(jsUser["name"]);  //alternate way of retrieving values from an object


// singleton object is created when it is created using constructor
Object.create  //this is singleton object

