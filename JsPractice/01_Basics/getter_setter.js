class User {
    constructor(email, password) {
        this.email = email;
        this.password = password
    }

    get email() {
        return this._email.toUpperCase()
    }

    set email(value) {
        this._email = value;
    }
}

const hitesh = new User("hitesh@yopmail.com", "abc")
console.log(hitesh.email);