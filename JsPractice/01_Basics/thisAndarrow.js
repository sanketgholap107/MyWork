const user = {
    username: "eakj",
    price: 35,

    customFunction: function (params) {
        console.log(`${this.username}, welcome to website`);
        console.log(this);
        //this keyword points to current context/object.
    }
}

user.customFunction();
user.username = "sanket"
user.customFunction();

console.log(this);  //o/p: {}  i.e emty object and if we see this in browser enviornment then output will be window object.

//this keyword does not work in functions
function chai() {
    let username = "hitesh"
    console.log(this.username);  //o/p : undefined
}

chai()
// ways of writing arrow functions.
// const addTwo = (num1, num2) => {
//     return num1 + num2;
// }

// const addTwo = (num1, num2) => num1 + num2

// if we use {} , then we need to write return
// in case of parantheses , we dont need to use return
// const addTwo = (num1, num2)=> (num1, num2)

// if we want to return a ov=bject in above way then:
// const addTwo = (num1, num2)=> ({username:"hitesh"})
