function User(username, loginCount, isLoggedIn) {
    this.username = username;
    this.loginCount = loginCount;
    this.isLoggedIn = isLoggedIn;

    this.greeting = function () {
        console.log(`WELCOME ${this.username}`);
    }

    return this  //this step is not needed bcoz it gets return implicitly.
}

const userOne = new User("sanket", 4566, true)
const userTwo = new User("john", 66, false)

/**
 *   "new"  keyword is function constructor.
 *    if we dont use "new" then userTwo will override 
 *    the previous values.
 *    Basically new keyword creates a new instance/object
 *    
 *    this keyword refers to the current object.
 */

// prtotyple inheritance

const user = {
    name: "sanket",
    email: "sanket@yopmail.com"
}

const teacher = {
    makeVideo: true
}

const TeachingSupport = {
    isAvailable: false
}

const TASupport = {
    makeAssignment: "JS Assignment",
    fullTime: true,
    __proto__: TeachingSupport
}

teacher.__proto__ = user;

// modern syntax
Object.setPrototypeOf(TeachingSupport, teacher)