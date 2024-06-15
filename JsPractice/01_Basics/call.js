function SetUsername(username) {
    this.username = username
    console.log("called");
}

function createUser(username, email, password) {
    SetUsername.call(this, username)
    //call is holding the reference.
    // in above step we are sending the 
    // context of createUser to SetUsername, so
    // that when SetUsername will be out from global execution context
    // that time it will give its properties to the createUser context

    this.email = email
    this.password = password
}

const chai = new createUser("chai", "chai@fb.com", "123")
console.log(chai);