function createUser(username, score) {
    this.username = username
    this.score = score
}

createUser.prototype.increment = function () {
    this.score++
}

createUser.prototype.printMe = function () {
    console.log(`price is ${this.score}`);
}

const chai = new createUser("chai", 45)
const tea = new createUser("tea", 6654)

chai.printMe()
tea.printMe()

/**
 * behind the scene working of new keyword:
 * 
 *  A new object is created: the new keyword initiates the creation
 *  of a new Javascript object.
 * 
 * A prototype is linked: The newly created object gets linked to
 * the prototype property of the constructor function.
 * This means that it has access to properties and methods defined on the
 * constructor's prototype.
 *  
 * The constructor is called: the constructor function is
 * called with the specified arguments and this is bound to
 * the newly created object. if no explicit return value is 
 * sprecified from constructor, Javascript assumes this,
 * the newly created object , to be the intended return value.
 * 
 * The new object is returned: After the constructor function
 * has been called , if it doesnt return a non-primitive value
 * (object, array, function). the newly created object is returned.
 * 
 * 
 */

/**
 * in javascript evrything is object, so we will
 * add a prototype in main object so that protoype
 * will be available for all (arrays,strings,objects,functions,etc..) 
 */
let heroPower = {

}

Object.prototype.hitesh = function () {
    console.log("hites is present in all objects");
}

heroPower.hitesh()