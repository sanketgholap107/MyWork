// class User {
//     constructor(username, email, password) {
//         this.username = username,
//             this.email = email,
//             this.password = password
//     }

//     encryptPassword() {
//         return `${this.password}abc`
//     }
// }

// const chai = new User("sanket", "sanket@yopmail.com", "123")
// console.log(chai.encryptPassword());

class User {
    constructor(username) {
        this.username = username
    }

    logMe() {
        return `Username is ${this.username}`
    }

    static dummy() {
        console.log("dummy function");
    }
}

class Teacher extends User {
    constructor(username, email, password) {
        super(username)
        this.email = email
        this.password = password
    }

    addCourse() {
        console.log(`a new course added by ${this.username}`);
    }
}

const tea = new Teacher("chai", "chai@yopmail.com", "123")
tea.addCourse()

//static keyword is used to deny access for objects to access the function.
tea.dummy();